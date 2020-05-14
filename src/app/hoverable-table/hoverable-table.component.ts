import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-hoverable-table',
  templateUrl: './hoverable-table.component.html',
  styleUrls: ['./hoverable-table.component.scss'],
})
export class HoverableTableComponent implements OnInit {
  userData = [...USER_DATA];
  constructor() {}

  ngOnInit(): void {}
}
