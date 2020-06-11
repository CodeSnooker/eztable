import { Component, Input, OnInit } from '@angular/core';
import { ITableColumn } from './../interfaces/table-column.interface';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tr[ez-simple-row]',
  templateUrl: './simple-row.component.html',
  styleUrls: ['./simple-row.component.scss'],
})
export class SimpleRowComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  _headers: ITableColumn<any>[];
  mappedHeaders: Record<string, ITableColumn<any>> = {};

  @Input() index: number;
  @Input() data: any;
  @Input() set headers(value: ITableColumn<any>[]) {
    this._headers = value;
    value.forEach((h) => (this.mappedHeaders[h.key] = h));
  }

  constructor() {}
  ngOnInit() {}
}
