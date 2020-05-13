import { Component, OnInit } from '@angular/core';
import { SimpleRowComponent } from '@codesnooker/eztable';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tr[app-sample-row]',
  templateUrl: './sample-row.component.html',
  styleUrls: ['./sample-row.component.scss'],
})
export class SampleRowComponent extends SimpleRowComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
