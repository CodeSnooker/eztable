import { Component } from '@angular/core';
import { LONG_DATA, USER_DATA } from './fixtures';
import { ILongData } from './interfaces';
import { SampleRowComponent } from './sample-row/sample-row.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'eztable-proj';
  sampleRow = SampleRowComponent;
  userData = USER_DATA;
  longData: ILongData[] = LONG_DATA;
  customHeaders = [
    {
      key: 'name',
      value: 'Name',
    },
    {
      key: 'dateOfBirth',
      value: 'Birthday',
    },
    {
      key: 'phoneNumber',
      value: 'tel',
    },
  ];

  longDataHeaders = Object.keys(this.longData[0]).map((d) => {
    return { key: d, value: 'heading' };
  });
}
