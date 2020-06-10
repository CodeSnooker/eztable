import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DEFAULT_TABLE_OPTIONS } from '../fixtures/table-options.fixture';
import { SortEvent } from '../interfaces/sort-event.interface';
import { ITableColumn } from '../interfaces/table-column.interface';
import { ITableOptions } from '../interfaces/table-options.interface';
import { HeaderSortIcon } from '../types/header-sort-icon.enum';
import { SortDirection } from '../types/sort-direction.enum';

const DEFAULT_COLUMN_WIDTH = 'auto';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tr[ez-header]',
  templateUrl: './ez-header.component.html',
  styleUrls: ['./ez-header.component.scss'],
})
export class EzHeaderComponent implements OnInit, AfterViewInit {
  // tslint:disable-next-line: variable-name
  private _data: ITableColumn<any>[];

  // tslint:disable-next-line: variable-name
  private _options: ITableOptions;

  /** Notifies Table about sort action */
  @Output() sort = new EventEmitter<SortEvent>();

  /** Final headers to be used by UI  */
  usableHeaders: ITableColumn<any>[];

  @Input() set options(value: ITableOptions) {
    console.log('set options');
    this._options = value;
    this.buildHeaders();
  }

  get options(): ITableOptions {
    return this._options;
  }

  /** Initial headers are passed as either string or actual Usable headers */
  @Input() set data(value: ITableColumn<any>[]) {
    this._data = value;
    if (value) {
      this.buildHeaders();
    }
  }

  get data(): ITableColumn<any>[] {
    return this._data;
  }

  constructor() {}

  ngAfterViewInit(): void {
    // Check if any row is asked to be sort during intialization.
    if (this.usableHeaders) {
      setTimeout(() => {
        const initialSort: ITableColumn<any>[] = this.usableHeaders.filter(
          (d) =>
            d.sortDirection === SortDirection.ASCENDING ||
            d.sortDirection === SortDirection.DESCENDING
        );

        if (initialSort && initialSort.length > 0) {
          const reverseSortDirection: SortDirection =
            initialSort[0].sortDirection === SortDirection.ASCENDING
              ? SortDirection.DESCENDING
              : SortDirection.ASCENDING;

          initialSort[0].sortDirection = reverseSortDirection;
          this.sortBy(initialSort[0].key, initialSort[0].index);
        }
      });
    }
  }

  ngOnInit(): void {}

  // Private Methods

  private buildHeaders() {
    console.log('#buildHeaders');
    if (!this._data) {
      return;
    }
    const tableOptions: ITableOptions = Object.assign(
      {},
      DEFAULT_TABLE_OPTIONS,
      this._options || {}
    );

    const disableSorting: boolean = tableOptions.sorting.disabled;
    const defaultSortDirection: SortDirection = disableSorting
      ? SortDirection.LOCKED
      : SortDirection.NONE;

    this.usableHeaders = this._data.map((d, i) => {
      return Object.assign(
        {},
        {
          sortDirection: defaultSortDirection,
          index: i,
        },
        d,
        {
          fixWidth: d.fixWidth ? d.fixWidth : undefined,
          fixWidthValue: d.fixWidth ? d.fixWidth + '%' : DEFAULT_COLUMN_WIDTH,
        }
      );
    });

    if (!disableSorting && tableOptions.sorting.byKey) {
      this.usableHeaders.map((d) => {
        if (d.key.localeCompare(tableOptions.sorting.byKey) === 0) {
          d.sortDirection =
            tableOptions.sorting.direction || SortDirection.ASCENDING;
          // switch (tableOptions.sorting.direction) {
          //   case SortDirection.ASCENDING: {
          //     d.sortDirection = SortDirection.DESCENDING;
          //     break;
          //   }
          //   case SortDirection.DESCENDING: {
          //     d.sortDirection = SortDirection.ASCENDING;
          //     break;
          //   }
          //   case SortDirection.LOCKED: {
          //     d.sortDirection = SortDirection.LOCKED;
          //     break;
          //   }
          //   default: {
          //     d.sortDirection = SortDirection.DESCENDING;
          //   }
          // }
        }
      });
    }

    this.updateHeaderIcons();
  }

  /**
   * Updates the icons for header fields
   */
  private updateHeaderIcons() {
    this.usableHeaders.forEach((d) => {
      switch (d.sortDirection) {
        case SortDirection.NONE: {
          d.clazz = HeaderSortIcon.NONE;
          break;
        }
        case SortDirection.ASCENDING: {
          d.clazz = HeaderSortIcon.ASCENDING;
          break;
        }
        case SortDirection.DESCENDING: {
          d.clazz = HeaderSortIcon.DESCENDING;
          break;
        }
        default: {
          d.clazz = HeaderSortIcon.LOCKED;
        }
      }
    });
  }

  /**
   * Change the direction of header - Asc to Desc and vice versa. Or from None to Asc.
   * If header is locked then its direction is not changed
   *
   * @param direction - Sort Direction
   */
  private rotateDirection(direction: SortDirection) {
    switch (direction) {
      case SortDirection.ASCENDING: {
        return SortDirection.DESCENDING;
      }
      case SortDirection.DESCENDING: {
        return SortDirection.ASCENDING;
      }
      case SortDirection.NONE: {
        return SortDirection.ASCENDING;
      }
      case SortDirection.LOCKED: {
        return SortDirection.LOCKED;
      }
    }
  }

  sortBy(key: string, index: number) {
    // get the direction
    const direction: SortDirection = this.usableHeaders[index].sortDirection;

    if (direction === SortDirection.LOCKED) {
      return;
    }

    this.usableHeaders.forEach((d) => {
      if (
        d.key.localeCompare(key) !== 0 &&
        d.sortDirection !== SortDirection.LOCKED
      ) {
        d.sortDirection = SortDirection.NONE;
      }
    });

    const updatedDirection = this.rotateDirection(direction);
    this.usableHeaders[index].sortDirection = updatedDirection;

    this.updateHeaderIcons();
    this.sort.next({ key, direction: updatedDirection });
    console.log(this.usableHeaders);
  }
}
