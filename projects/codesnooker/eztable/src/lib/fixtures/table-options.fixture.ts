import { ITableOptions } from '../interfaces/table-options.interface';

const tableOptions: ITableOptions = {
  sorting: {
    disabled: false,
  },
  expandable: false,
  exportable: false,
  multiSelect: false,
  selectable: false,
  pagination: { enabled: false },
};

export const DEFAULT_TABLE_OPTIONS = Object.assign({}, tableOptions);
