import { Component, OnInit } from '@angular/core';
import { ITableColumn, SortDirection } from '@codesnooker/eztable';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-pre-sorted-using-table-column',
  templateUrl: './pre-sorted-using-table-column.component.html',
  styleUrls: ['./pre-sorted-using-table-column.component.scss'],
})
export class PreSortedUsingTableColumnComponent implements OnInit {
  userData = [...USER_DATA];
  headers: ITableColumn<string>[] = Object.keys(this.userData[0]).map(
    (d, i) => {
      return {
        key: d,
        value: d,
        sortDirection: i === 2 ? SortDirection.ASCENDING : SortDirection.NONE,
      };
    }
  );
  constructor() {}

  ngOnInit(): void {}
}
