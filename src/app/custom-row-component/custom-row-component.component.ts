import { Component, OnInit } from '@angular/core';
import { USER_DATA } from '../fixtures';
import { SampleRowComponent } from '../sample-row/sample-row.component';

@Component({
  selector: 'app-custom-row-component',
  templateUrl: './custom-row-component.component.html',
  styleUrls: ['./custom-row-component.component.scss'],
})
export class CustomRowComponentComponent implements OnInit {
  userData = [...USER_DATA];
  sampleRow = SampleRowComponent;
  constructor() {}

  ngOnInit(): void {}
}
