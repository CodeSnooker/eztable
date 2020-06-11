import { Component, OnInit } from '@angular/core';
import {
  ITableColumn,
  SortDirection,
} from 'projects/codesnooker/eztable/src/public-api';
import { USER_DATA } from '../fixtures';

@Component({
  selector: 'app-custom-headers',
  templateUrl: './custom-headers.component.html',
  styleUrls: ['./custom-headers.component.scss'],
})
export class CustomHeadersComponent implements OnInit {
  userData = [...USER_DATA];
  customHeaders: ITableColumn<string>[] = [
    {
      key: 'name',
      value: 'Name',
      fixWidth: 15,
      sortDirection: SortDirection.ASCENDING,
    },
    {
      key: 'dateOfBirth',
      value: 'Birthday',
    },
    {
      key: 'phoneNumber',
      value: 'tel',
      fixWidth: 15,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
