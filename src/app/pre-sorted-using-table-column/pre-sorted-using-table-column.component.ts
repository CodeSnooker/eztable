import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';
import {
  ITableColumn,
  SortDirection,
  SortIconType,
} from './../../../projects/codesnooker/eztable/src/public-api';

@Component({
  selector: 'app-pre-sorted-using-table-column',
  templateUrl: './pre-sorted-using-table-column.component.html',
  styleUrls: ['./pre-sorted-using-table-column.component.scss'],
})
export class PreSortedUsingTableColumnComponent implements OnInit {
  userData = [...USER_DATA];
  headers: ITableColumn<string>[] = Object.keys(this.userData[0]).map(
    (d, i) => {
      return {
        key: d,
        value: i === 2 || i === 1 ? undefined : d,
        noSmartCase: true,
        sortDirection: i === 2 ? SortDirection.ASCENDING : SortDirection.NONE,
        icon: i === 2 ? 'phone' : undefined,
        imgIconPath: i === 1 ? '/assets/img-icons/cake.png' : undefined,
        sortIconType:
          i === 2 || i === 1 ? SortIconType.HIDDEN : SortIconType.ARROW,
      };
    }
  );
  constructor() {}

  ngOnInit(): void {}
}
