import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-searchable-table',
  templateUrl: './searchable-table.component.html',
  styleUrls: ['./searchable-table.component.scss'],
})
export class SearchableTableComponent implements OnInit {
  userData = [];
  constructor() {}
  ngOnInit(): void {
    setTimeout(() => {
      this.userData = [...USER_DATA, ...USER_DATA, ...USER_DATA];
    }, 20);
  }
}
