import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-sortable-table',
  templateUrl: './sortable-table.component.html',
  styleUrls: ['./sortable-table.component.scss'],
})
export class SortableTableComponent implements OnInit {
  userData = [...USER_DATA];
  constructor() {}

  ngOnInit(): void {}
}
