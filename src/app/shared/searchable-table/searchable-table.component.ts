import { Component, OnInit } from '@angular/core';
import { ITableOptions } from 'src/../projects/codesnooker/eztable/src/public-api';
import { BOOK_DATA } from '../fixtures';

@Component({
  selector: 'app-searchable-table',
  templateUrl: './searchable-table.component.html',
  styleUrls: ['./searchable-table.component.scss'],
})
export class SearchableTableComponent implements OnInit {
  userData = [];
  loading = false;
  tableOptions: ITableOptions;
  headers: string[] = [
    'ISBN',
    'title',
    'subtitle',
    'author',
    'publisher',
    'pages',
    'description',
  ];
  constructor() {}
  ngOnInit(): void {
    // this.headers = ['isbn', 'title', 'author', 'publisher', 'pages'];
    setTimeout(() => {
      this.userData = [...BOOK_DATA];
      this.loading = false;
    }, 50);
  }
}
