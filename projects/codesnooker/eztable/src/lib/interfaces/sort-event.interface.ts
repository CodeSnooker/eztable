import { SortDirection } from '../types/sort-direction.enum';

export interface SortEvent {
  key: string;
  direction: SortDirection;
}
