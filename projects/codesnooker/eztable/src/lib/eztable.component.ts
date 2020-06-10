import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { RowHostDirective } from './directives/row-host.directive';
import { SortEvent } from './interfaces/sort-event.interface';
import { ITableColumn } from './interfaces/table-column.interface';
import {
  DEFAULT_TABLE_OPTIONS,
  ITableOptions,
} from './interfaces/table-options.interface';
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
  _options: ITableOptions = DEFAULT_TABLE_OPTIONS;

  // tslint:disable-next-line: variable-name
  private _headerKeys: string[];

  // tslint:disable-next-line: variable-name
  private _viewInit = false;

  // tslint:disable-next-line: variable-name
  private _readyToReload = false;

  headerRightMargin = '0px';

  bodyHeight = 'auto';

  usableHeaders: ITableColumn<any>[];
  @ViewChildren(RowHostDirective) rowHosts: QueryList<RowHostDirective>;

  @Input() headers: Array<HeaderType>;
  @Input() rowClass: typeof SimpleRowComponent;
  @Input() enableSearch: boolean;
  @Input() searchPlaceholder = '';
  @Output() cancelUpdate = new EventEmitter();
  @Input() set heightVal(value: string) {
    this.headerRightMargin = '15px';
    this.bodyHeight = value;
  }

  filteredData: any[];
  searchForm: FormGroup;

  @Input() set options(value: ITableOptions) {
    this._options = Object.assign({}, DEFAULT_TABLE_OPTIONS, value);
  }

  @Input() set data(value: any[]) {
    // console.log('#input');
    this._data = value;
    this.filteredData = value;

    console.log('Headers => ', this.headers);

    // if (!value || value.length === 0) {
    //   return;
    // }

    if (!this.headers || this.headers.length === 0) {
      this.headers = Object.keys(value[0] || {});
      this._headerKeys = Object.keys(value[0] || {});
    } else {
      const check = (p: any): p is ITableColumn<any> => p.hasOwnProperty('key');
      if (check(this.headers[0])) {
        this._headerKeys = (this.headers as ITableColumn<any>[]).map(
          (d) => d.key
        );
      } else {
        this._headerKeys = [...(this.headers as Array<string>)];
      }
    }

    if (this._viewInit) {
      setTimeout(() => {
        this.determineWidth();
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
        this.determineWidth();
        this.loadRows();
        this.registerForSearchChange();
        this._viewInit = true;
      });
    }
  }

  onCancelUpdate() {
    this.cancelUpdate.emit();
  }

  private determineWidth() {
    console.log('determine Width');
    const headerCount = this._headerKeys?.length || 0;
    if (headerCount <= 0) {
      return;
    }

    let availableWidth = 100;
    // Now check the available width to set
    const check = (p: any): p is ITableColumn<any> => p.hasOwnProperty('key');
    const widthRecord: Record<string, number> = {};
    let canWeUseHeaderAsItIs = false;
    if (check(this.headers[0])) {
      canWeUseHeaderAsItIs = true;
      this.headers.forEach((h: ITableColumn<any>) => {
        if (!h.fixWidth) {
          widthRecord[h.key] = 0;
        }
        const w = h.fixWidth || 0;
        availableWidth = availableWidth - w;
      });
    } else {
      this._headerKeys.forEach((h) => {
        widthRecord[h] = 0;
      });
      availableWidth = 100;
    }

    this.data.forEach((d) => {
      this._headerKeys.forEach((h) => {
        const r = d[h].toString();
        widthRecord[h] = Math.max(widthRecord[h], r.length || 0);
      });
    });

    // get the sum of characters
    const keys = Object.keys(widthRecord);
    let sum = 0;
    keys.forEach((k) => {
      sum += widthRecord[k];
    });

    console.log('Available Width => ', availableWidth);
    console.log('Width Record => ', widthRecord);
    console.log('Sum => ', sum);

    // Ideal distribution
    console.log('headers => ', this.headers);
    const percentTable: Record<string, number> = {};
    const totalKeys = this._headerKeys.length;
    let maxWidth = 50;

    switch (totalKeys) {
      case 0:
      case 1: {
        maxWidth = 100;
        break;
      }
      case 2:
      case 3: {
        maxWidth = 50;
        break;
      }
      default: {
        maxWidth = 40;
        break;
      }
    }

    this._headerKeys.forEach((h) => {
      if (widthRecord[h]) {
        const percent = (widthRecord[h] / sum) * availableWidth;
        percentTable[h] = Math.max(percent, 10);
        percentTable[h] = Math.min(percentTable[h], maxWidth);
        console.log(h, ' => ', percent);
      }
    });

    // fixWidth: d.fixWidth ? d.fixWidth : undefined,
    //       fixWidthValue: d.fixWidth ? d.fixWidth + '%' : DEFAULT_COLUMN_WIDTH,

    if (canWeUseHeaderAsItIs) {
      this.usableHeaders = this.headers.map((h: ITableColumn<any>) => {
        return Object.assign({}, h, {
          fixWidth: percentTable[h.key],
          fixWidthValue: percentTable[h.key]
            ? percentTable[h.key] + '%'
            : 'auto',
        });
      });
    } else {
      this.usableHeaders = this._headerKeys.map((h) => {
        return {
          key: h,
          value: h,
          fixWidth: percentTable[h],
          fixWidthValue: percentTable[h] ? percentTable[h] + '%' : 'auto',
        };
      });
    }
  }

  private registerForSearchChange() {
    this.searchForm
      .get('searchValue')
      .valueChanges.pipe(debounce(() => timer(300)))
      .subscribe((val: string) => {
        console.log(val);
        const lVal: string = val.toLowerCase();

        if (val && val.length > 0) {
          this.filteredData = this.data.filter((r, i) => {
            const values: any[] = Object.values(r);
            const searchResult = values.some((v) => {
              if (v) {
                const t: string = v.toString().toLowerCase();
                return t.indexOf(lVal) >= 0;
              } else {
                return false;
              }
            });

            return searchResult;
          });

          // console.log(this.filteredData);
          setTimeout(() => {
            this.loadRows();
          });
          if (!this.filteredData || this.filteredData.length === 0) {
            this._readyToReload = true;
          } else if (this.filteredData.length > 0 && this._readyToReload) {
            this._readyToReload = false;
            setTimeout(() => {
              this.loadRows();
            });
          }
        } else {
          console.log('Reloading rows');
          this.filteredData = this.data;
          this._readyToReload = false;
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
      componentRef.instance.data = this.filteredData[index];
      componentRef.instance.headers = this.usableHeaders;
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
