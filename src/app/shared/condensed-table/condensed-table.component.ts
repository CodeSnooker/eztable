import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-condensed-table',
  templateUrl: './condensed-table.component.html',
  styleUrls: ['./condensed-table.component.scss'],
})
export class CondensedTableComponent implements OnInit {
  userData = [...USER_DATA];
  constructor() {}

  ngOnInit(): void {}
}
