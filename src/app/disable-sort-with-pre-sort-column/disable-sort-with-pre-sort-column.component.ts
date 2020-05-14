import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';
import { ITableColumn, SortDirection } from '@codesnooker/eztable';

@Component({
  selector: 'app-disable-sort-with-pre-sort-column',
  templateUrl: './disable-sort-with-pre-sort-column.component.html',
  styleUrls: ['./disable-sort-with-pre-sort-column.component.scss'],
})
export class DisableSortWithPreSortColumnComponent implements OnInit {
  userData = [...USER_DATA];
  headers: ITableColumn<string>[] = Object.keys(this.userData[0]).map(
    (d, i) => {
      return {
        key: d,
        value: d,
        sortDirection:
          i === 0 ? SortDirection.DESCENDING : SortDirection.LOCKED,
      };
    }
  );
  constructor() {}

  ngOnInit(): void {}
}
