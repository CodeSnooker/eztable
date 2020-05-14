import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { SimpleRowComponent } from '../public-api';
import { RowHostDirective } from './directives/row-host.directive';
import { SortEvent } from './interfaces/sort-event.interface';
import { ITableColumn } from './interfaces/table-column.interface';
import { ITableOptions } from './interfaces/table-options.interface';
import { SortDirection } from './types/sort-direction.enum';

type HeaderType = ITableColumn<any> | string;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'eztable',
  templateUrl: './eztable.component.html',
  styleUrls: ['./eztable.component.scss'],
})
export class EztableComponent implements OnInit, AfterViewInit {
  // tslint:disable-next-line: variable-name
  private _data: any[];

  // tslint:disable-next-line: variable-name
  private _headerKeys: string[];

  usableHeaders: ITableColumn<any>[];
  @ViewChildren(RowHostDirective) rowHosts: QueryList<RowHostDirective>;

  @Input() headers: Array<HeaderType>;
  @Input() rowClass: typeof SimpleRowComponent;
  @Input() options: ITableOptions;

  @Input() set data(value: any[]) {
    // console.log('#input');
    this._data = value;
    if (!this.headers) {
      this.headers = Object.keys(value[0] || {});
      this._headerKeys = Object.keys(value[0] || {});
    } else {
      const check = (p: any): p is ITableColumn<any> => p.hasOwnProperty('key');
      if (check) {
        this._headerKeys = (this.headers as ITableColumn<any>[]).map(
          (d) => d.key
        );
      } else {
        this._headerKeys = Object.keys(value[0] || {});
      }
    }
  }

  get data(): any[] {
    return this._data;
  }

  constructor(private cfr: ComponentFactoryResolver) {}

  ngOnInit(): void {
    // console.log('#ngOnInit');
  }

  ngAfterViewInit(): void {
    // console.log('#ngAfterViewInit');
    if (this.data && this.rowHosts) {
      setTimeout(() => {
        this.loadRows();
      });
    }
  }

  private loadRows() {
    // console.log(this._data[0]);
    const componentFactory = this.cfr.resolveComponentFactory(
      this.rowClass || SimpleRowComponent
    );

    this.rowHosts.forEach((host: RowHostDirective, index: number) => {
      const viewContainerRef = host.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.data = this.data[index];
      componentRef.instance.headers = this._headerKeys;
    });
  }

  /**
   * Performs the sorting on the dataset based on key and direction specified in the event
   */
  sortBy({ key, direction }: SortEvent) {
    const compare = (v1: string, v2: string) =>
      v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

    this.data.sort((a, b) => {
      const res = compare(`${a[key]}`, `${b[key]}`);
      return direction === SortDirection.ASCENDING ? res : -res;
    });
  }
}
