import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { CheckboxRowComponent } from './checkbox-row/checkbox-row.component';
import { RowHostDirective } from './directives/row-host.directive';
import { EzHeaderComponent } from './ez-header/ez-header.component';
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

  // tslint:disable-next-line: variable-name
  private _allSelected = false;
  // tslint:disable-next-line: variable-name
  private _records: Record<string, any> = {};

  headerRightMargin = '0px';

  bodyHeight = 'auto';

  usableHeaders: ITableColumn<any>[];
  @ViewChildren(RowHostDirective) rowHosts: QueryList<RowHostDirective>;

  @ViewChild('ezheaders') ezHeader: EzHeaderComponent;

  @Input() headers: Array<HeaderType>;
  @Input() rowClass: typeof SimpleRowComponent;
  @Input() enableSearch: boolean;
  @Input() enableSelection: boolean;
  @Input() searchPlaceholder = '';
  @Input() infoText: string;
  @Output() cancelUpdate = new EventEmitter();

  // Emits the recently selected / unselected row
  @Output() rowSelected = new EventEmitter();

  // Emits all the records which are currently selected
  @Output() selectedRowList = new EventEmitter();

  @Output() searched = new EventEmitter<string>();

  @Input() set heightVal(value: string) {
    this.headerRightMargin = '15px';
    this.bodyHeight = value;
  }

  // tslint:disable-next-line: variable-name
  private _checklist: any[] = [];

  disableClearSearchBtn = true;

  filteredData: any[];
  searchForm: FormGroup;

  showCheckboxes = false;

  // tslint:disable-next-line: variable-name
  private _drList: CheckboxRowComponent[] = [];

  @Input() set options(value: ITableOptions) {
    this._options = Object.assign({}, DEFAULT_TABLE_OPTIONS, value);
  }

  @Input() set data(value: any[]) {
    // console.log('#input');
    this._data = value;

    // Clean up the records
    this._records = {};
    this._data.forEach((d, i) => {
      const key = `d${i}`;
      this._records[key] = d;
    });

    this.filteredData = value;

    // console.log('Headers => ', this.headers);

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
        this.preSortCheck();
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
    // this.form = new FormArray([]);
  }

  ngAfterViewInit(): void {
    // console.log('#ngAfterViewInit');
    if (this.data && this.rowHosts) {
      setTimeout(() => {
        this.determineWidth();
        this.loadRows();
        this.preSortCheck();
        this.registerForSearchChange();
        this._viewInit = true;
      });
    }
  }

  onCancelUpdate() {
    this.cancelUpdate.emit();
  }

  private determineWidth() {
    // console.log('determine Width');
    const percentTable: Record<string, number> = {};
    const headerCount = this._headerKeys?.length || 0;
    let alreadyCountedKeys = 0;
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
          return;
        }
        const w = h.fixWidth || 0;
        percentTable[h.key] = h.fixWidth;
        alreadyCountedKeys++;
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
        console.log(d[h]);
        const r = d[h]?.toString() || '';
        widthRecord[h] = Math.max(widthRecord[h], r.length || 0);
      });
    });

    // get the sum of characters
    const keys = Object.keys(widthRecord);
    let sum = 0;
    keys.forEach((k) => {
      sum += widthRecord[k] || 0;
    });

    // console.log('Available Width => ', availableWidth);
    // console.log('Width Record => ', widthRecord);
    // console.log('Sum => ', sum);

    // Ideal distribution
    // console.log('headers => ', this.headers);

    const totalKeys = this._headerKeys.length - alreadyCountedKeys;
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
        // In this case, we need to emit the search value that can be registered as valid search term
        if (val && val.length > 0) {
          console.log('Emitting => ', val);
          this.searched.emit(val);
        }
      });

    this.searchForm
      .get('searchValue')
      .valueChanges.pipe(debounce(() => timer(3)))
      .subscribe((val: string) => {
        console.log(val);
        const lVal: string = val.toLowerCase();

        if (val && val.length > 0) {
          this.disableClearSearchBtn = false;
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
          this.disableClearSearchBtn = true;
          console.log('Reloading rows');
          this.filteredData = this.data;
          this._readyToReload = false;
          setTimeout(() => {
            this.loadRows();
          });
        }
      });
  }

  selectAll(value: boolean) {
    // console.log('#selectAll => ', this._drList);

    this._allSelected = value;
    this._drList.forEach((d) => d.onCheckedByParent(this._allSelected));

    if (this._allSelected) {
      this.selectedRowList.emit(this._drList.map((d) => d.data));
    } else {
      // Emits that currently none of the row is selected
      this.selectedRowList.emit([]);
    }
  }

  clearSearch() {
    this.searchForm.get('searchValue').setValue('');
  }

  private loadRows() {
    // console.log('#loadRows');
    this._drList = [];
    let componentFactory = this.cfr.resolveComponentFactory(
      this.rowClass || SimpleRowComponent
    );

    if (this.enableSelection) {
      componentFactory = this.cfr.resolveComponentFactory(
        this.rowClass || CheckboxRowComponent
      );
    }

    // console.log('row host => ', this.rowHosts.length);

    this.rowHosts.forEach((host: RowHostDirective, index: number) => {
      const viewContainerRef = host.viewContainerRef;
      viewContainerRef.clear();

      console.log(
        // `Going to assign data (${index}) => `,
        this.filteredData[index]
      );
      const componentRef = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.index = index;
      componentRef.instance.data = this.filteredData[index];
      componentRef.instance.headers = this.usableHeaders;

      if (componentRef.instance instanceof CheckboxRowComponent) {
        // console.log('Component is of type CheckboxRowComponent ');
        const comp = componentRef.instance;
        comp.isSelected = this._allSelected;
        setTimeout(() => {
          comp.onCheckedByParent(this._allSelected);
          comp.rowSelected.subscribe((d: boolean) => {
            if (d === false) {
              this.ezHeader.uncheckByParent();
              // this._checklist.
            }
            const selectedItems = this._drList.filter((dr) => dr.isSelected);
            this.selectedRowList.next(selectedItems.map((si) => si.data));
          });
        }, 30);
        this._drList.push(componentRef.instance);
      }
    });
  }

  private isValidDate(value) {
    const dateWrapper = new Date(value);
    return !isNaN(dateWrapper.getDate());
  }

  private preSortCheck() {
    setTimeout(() => {
      if (this.usableHeaders) {
        this.usableHeaders.forEach((h) => {
          if (
            h.sortDirection === SortDirection.ASCENDING ||
            h.sortDirection === SortDirection.DESCENDING
          ) {
            this.sortBy({ key: h.key, direction: h.sortDirection });
          }
        });
      }
    }, 0);
  }

  /**
   * Performs the sorting on the dataset based on key and direction specified in the event
   */
  sortBy({ key, direction }: SortEvent) {
    const compare = (v1: string | number, v2: string | number) =>
      v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

    // console.log('sortBy');
    const result = this.filteredData.sort((a, b) => {
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

    // console.log('sorted Data => ', this.filteredData);
    // console.log('result => ', result);
  }
}
