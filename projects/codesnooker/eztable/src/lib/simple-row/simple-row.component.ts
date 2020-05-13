import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tr[ez-simple-row]',
  templateUrl: './simple-row.component.html',
  styleUrls: ['./simple-row.component.scss'],
})
export class SimpleRowComponent implements OnInit {
  @Input() data: any;
  @Input() headers: string[];

  constructor() {}
  ngOnInit() {}
}
