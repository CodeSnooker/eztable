import { Component, OnInit } from '@angular/core';
import { ITableColumn } from '@codesnooker/eztable';
import { SortDirection } from 'projects/codesnooker/eztable/src/public-api';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-disable-sort-on-column',
  templateUrl: './disable-sort-on-column.component.html',
  styleUrls: ['./disable-sort-on-column.component.scss'],
})
export class DisableSortOnColumnComponent implements OnInit {
  userData = [...USER_DATA];
  headers: ITableColumn<string>[] = Object.keys(this.userData[0]).map(
    (d, i) => {
      return {
        key: d,
        value: d,
        sortDirection: i === 0 ? SortDirection.NONE : SortDirection.LOCKED,
      };
    }
  );
  constructor() {}

  ngOnInit(): void {}
}
