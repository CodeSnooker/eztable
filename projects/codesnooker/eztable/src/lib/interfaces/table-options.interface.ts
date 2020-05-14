import { SortDirection } from '../types/sort-direction.enum';

export interface ITableOptions {
  sorting?: {
    disabled?: boolean;
    byKey?: string;
    direction?: SortDirection;
  };

  // Not supported yet
  selectable?: boolean;
  multiSelect?: boolean;

  pagination?: {
    enabled: boolean;
    pageSize?: number;
    index?: number;
  };

  exportable?: boolean;
  expandable?: boolean;
}
