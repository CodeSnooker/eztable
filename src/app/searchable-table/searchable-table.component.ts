import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';
import { ITableOptions } from './../../../projects/codesnooker/eztable/src/public-api';

@Component({
  selector: 'app-searchable-table',
  templateUrl: './searchable-table.component.html',
  styleUrls: ['./searchable-table.component.scss'],
})
export class SearchableTableComponent implements OnInit {
  userData = [];
  loading = false;
  tableOptions: ITableOptions;
  constructor() {}
  ngOnInit(): void {
    setTimeout(() => {
      this.userData = [...USER_DATA, ...USER_DATA, ...USER_DATA];
      this.loading = false;
    }, 50);
  }
}
