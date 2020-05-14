import { Component, OnInit } from '@angular/core';
import { LONG_DATA } from '../fixtures';
import { ILongData } from '../interfaces';

@Component({
  selector: 'app-always-responsive-table',
  templateUrl: './always-responsive-table.component.html',
  styleUrls: ['./always-responsive-table.component.scss'],
})
export class AlwaysResponsiveTableComponent implements OnInit {
  longData: ILongData[] = [...LONG_DATA];
  longDataHeaders = Object.keys(this.longData[0]).map((d) => {
    return { key: d, value: 'heading' };
  });
  constructor() {}

  ngOnInit(): void {}
}
