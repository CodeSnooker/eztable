import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RowHostDirective } from './directives/row-host.directive';
import { SortEvent } from './interfaces/sort-event.interface';
import { ITableColumn } from './interfaces/table-column.interface';
import { ITableOptions } from './interfaces/table-options.interface';
import { SimpleRowComponent } from './simple-row/simple-row.component';
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

  // tslint:disable-next-line: variable-name
  private _viewInit = false;

  usableHeaders: ITableColumn<any>[];
  @ViewChildren(RowHostDirective) rowHosts: QueryList<RowHostDirective>;

  @Input() headers: Array<HeaderType>;
  @Input() rowClass: typeof SimpleRowComponent;
  @Input() options: ITableOptions;
  @Input() enableSearch: boolean;
  @Input() searchPlaceholder = '';

  filteredData: any[];
  searchForm: FormGroup;

  @Input() set data(value: any[]) {
    // console.log('#input');
    this._data = value;
    this.filteredData = value;

    // if (!value || value.length === 0) {
    //   return;
    // }

    if (!this.headers || this.headers.length === 0) {
      this.headers = Object.keys(value[0] || {});
      this._headerKeys = Object.keys(value[0] || {});
    } else {
      const check = (p: any): p is ITableColumn<any> => p.hasOwnProperty('key');
      if (check(this.headers)) {
        this._headerKeys = (this.headers as ITableColumn<any>[]).map(
          (d) => d.key
        );
      } else {
        this._headerKeys = Object.keys(value[0] || {});
      }
    }

    if (this._viewInit) {
      setTimeout(() => {
        this.loadRows();
        this._viewInit = true;
      }, 10);
    }
  }

  get data(): any[] {
    return this._data;
  }

  constructor(
    private cfr: ComponentFactoryResolver,
    private readonly formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchValue: new FormControl(undefined),
    });
  }

  ngOnInit(): void {
    // console.log('#ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('#ngAfterViewInit');
    if (this.data && this.rowHosts) {
      setTimeout(() => {
        this.loadRows();
        this.registerForSearchChange();
        this._viewInit = true;
      });
    }
  }

  private registerForSearchChange() {
    this.searchForm.get('searchValue').valueChanges.subscribe((val: string) => {
      console.log(val);
      const lVal: string = val.toLowerCase();

      if (val && val.length > 0) {
        this.filteredData = this.data.filter((r) => {
          const values: any[] = Object.values(r);
          return values.some((v) => {
            if (v) {
              const t: string = v.toString().toLowerCase();
              return t.indexOf(lVal) >= 0;
            } else {
              return false;
            }
          });
        });
      } else {
        console.log('Reloading rows');
        this.filteredData = this.data;
        setTimeout(() => {
          this.loadRows();
        });
      }
    });
  }

  private loadRows() {
    console.log('#loadRows');
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

  private isValidDate(value) {
    const dateWrapper = new Date(value);
    return !isNaN(dateWrapper.getDate());
  }

  /**
   * Performs the sorting on the dataset based on key and direction specified in the event
   */
  sortBy({ key, direction }: SortEvent) {
    const compare = (v1: string | number, v2: string | number) =>
      v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

    console.log('sortBy');
    this.filteredData.sort((a, b) => {
      if (Number.isFinite(a[key]) && Number.isFinite(b[key])) {
        const res = compare(a[key], b[key]);
        return direction === SortDirection.ASCENDING ? res : -res;
      } else if (this.isValidDate(a[key]) && this.isValidDate(b[key])) {
        const res = compare(
          new Date(a[key]).getTime(),
          new Date(b[key]).getTime()
        );
        return direction === SortDirection.ASCENDING ? res : -res;
      } else {
        const res = compare(`${a[key]}`, `${b[key]}`);
        return direction === SortDirection.ASCENDING ? res : -res;
      }
    });
  }
}