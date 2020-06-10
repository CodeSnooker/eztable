import { SortDirection } from '../types/sort-direction.enum';

export interface ITableColumn<T> {
  key: string;
  value: T;
  index?: number;
  sortDirection?: SortDirection;
  fixWidth?: number;
  fixWidthValue?: string;
  clazz?: string; // CSS class for sort icon
}
