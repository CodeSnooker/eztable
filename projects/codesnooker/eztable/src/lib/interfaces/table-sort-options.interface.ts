import { SortDirection } from '../../public-api';

export interface ITableSortOptions {
  disabled?: boolean;
  byKey?: string;
  direction?: SortDirection;
}
