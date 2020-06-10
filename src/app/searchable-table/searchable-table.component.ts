import { Component, OnInit } from '@angular/core';
import { BOOK_DATA } from '../fixtures';
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
  headers: string[] = [
    'isbn',
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
