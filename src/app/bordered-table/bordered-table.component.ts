import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-bordered-table',
  templateUrl: './bordered-table.component.html',
  styleUrls: ['./bordered-table.component.scss'],
})
export class BorderedTableComponent implements OnInit {
  userData = [...USER_DATA];
  constructor() {}

  ngOnInit(): void {}
}
