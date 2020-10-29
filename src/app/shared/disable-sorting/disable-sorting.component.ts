import { Component, OnInit } from '@angular/core';
import { ITableOptions } from '@codesnooker/eztable';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-disable-sorting',
  templateUrl: './disable-sorting.component.html',
  styleUrls: ['./disable-sorting.component.scss'],
})
export class DisableSortingComponent implements OnInit {
  userData = [...USER_DATA];
  options: ITableOptions = { sorting: { disabled: true } };
  constructor() {}

  ngOnInit(): void {}
}
