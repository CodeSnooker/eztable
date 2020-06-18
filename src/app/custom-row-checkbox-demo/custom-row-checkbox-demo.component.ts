import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';
import { SampleCheckboxRowComponent } from '../sample-checkbox-row/sample-checkbox-row.component';

@Component({
  selector: 'app-custom-row-checkbox-demo',
  templateUrl: './custom-row-checkbox-demo.component.html',
  styleUrls: ['./custom-row-checkbox-demo.component.scss'],
})
export class CustomRowCheckboxDemoComponent implements OnInit {
  userData = [...USER_DATA].map((d) => {
    return Object.assign({}, d, {
      dateOfBirth: new Date(d.dateOfBirth).getTime(),
      // new Date(d.dateOfBirth).getTime() - new Date('1900-Jan-01').getTime(),
    });
  });
  sampleRow = SampleCheckboxRowComponent;
  constructor() {}

  ngOnInit(): void {}
}
