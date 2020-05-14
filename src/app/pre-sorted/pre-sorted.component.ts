import { Component, OnInit } from '@angular/core';
import { ITableOptions, SortDirection } from '@codesnooker/eztable';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-pre-sorted',
  templateUrl: './pre-sorted.component.html',
  styleUrls: ['./pre-sorted.component.scss'],
})
export class PreSortedComponent implements OnInit {
  userData = [...USER_DATA];
  options: ITableOptions = {
    sorting: { byKey: 'phoneNumber', direction: SortDirection.DESCENDING },
  };
  constructor() {}
  ngOnInit(): void {}
}
