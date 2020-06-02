import { ITablePaginationOptions } from './table-pagination-options.interface';
import { ITableSortOptions } from './table-sort-options.interface';

export interface ITableOptions {
  sorting?: ITableSortOptions;

  // Not supported yet
  selectable?: boolean;
  multiSelect?: boolean;

  pagination?: ITablePaginationOptions;

  exportable?: boolean;
  expandable?: boolean;
  loadingMessage?: string;
  showCancelBtn?: boolean;
  cancelBtnText?: string;
}

export const DEFAULT_TABLE_OPTIONS: ITableOptions = {
  loadingMessage: 'Updating...',
  showCancelBtn: false,
  cancelBtnText: 'Cancel Update',
};
