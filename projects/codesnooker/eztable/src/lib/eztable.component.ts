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

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'eztable',
  templateUrl: './eztable.component.html',
  styleUrls: ['./eztable.component.scss'],
})
export class EztableComponent implements OnInit, AfterViewInit {
  // tslint:disable-next-line: variable-name
  private _data: any[];
  @ViewChildren(RowHostDirective) rowHosts: QueryList<RowHostDirective>;

  @Input() headers: string[];

  @Input() rowClass: typeof SimpleRowComponent;

  @Input() set data(value: any[]) {
    console.log('#input');
    this._data = value;
    if (!this.headers) {
      this.headers = Object.keys(value[0] || {});
    }
    // this.loadRows();
  }

  get data(): any[] {
    return this._data;
  }

  constructor(private cfr: ComponentFactoryResolver) {}

  ngOnInit(): void {
    console.log('#ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('#ngAfterViewInit');
    if (this.data && this.rowHosts) {
      setTimeout(() => {
        this.loadRows();
      });
    }
  }

  private loadRows() {
    console.log(this._data[0]);
    const componentFactory = this.cfr.resolveComponentFactory(
      this.rowClass || SimpleRowComponent
    );

    // console.log(this.rowHosts);

    this.rowHosts.forEach((host: RowHostDirective, index: number) => {
      const viewContainerRef = host.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.data = this.data[index];
      componentRef.instance.headers = this.headers;
      // console.log(viewContainerRef);
    });
  }
}
