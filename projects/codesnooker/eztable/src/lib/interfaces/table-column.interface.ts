import { SortDirection } from '../types/sort-direction.enum';
import { SortIconType } from '../types/sort-icon.enum';

export interface ITableColumn<T> {
  key: string;
  value: T;
  index?: number;
  icon?: string;
  imgIconPath?: string;
  noSmartCase?: boolean;
  sortDirection?: SortDirection;
  sortIconType?: SortIconType;
  fixWidth?: number;
  fixWidthValue?: string;
  clazz?: string; // CSS class for sort icon
}
