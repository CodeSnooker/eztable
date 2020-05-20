import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';
import { SampleRowComponent } from '../sample-row/sample-row.component';

@Component({
  selector: 'app-custom-row-component',
  templateUrl: './custom-row-component.component.html',
  styleUrls: ['./custom-row-component.component.scss'],
})
export class CustomRowComponentComponent implements OnInit {
  userData = [...USER_DATA].map((d) => {
    return Object.assign({}, d, {
      dateOfBirth: new Date(d.dateOfBirth).getTime(),
      // new Date(d.dateOfBirth).getTime() - new Date('1900-Jan-01').getTime(),
    });
  });
  sampleRow = SampleRowComponent;
  constructor() {}

  ngOnInit(): void {}
}
