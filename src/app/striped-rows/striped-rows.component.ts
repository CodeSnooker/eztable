import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-striped-rows',
  templateUrl: './striped-rows.component.html',
  styleUrls: ['./striped-rows.component.scss'],
})
export class StripedRowsComponent implements OnInit {
  userData = [...USER_DATA];
  constructor() {}

  ngOnInit(): void {}
}
