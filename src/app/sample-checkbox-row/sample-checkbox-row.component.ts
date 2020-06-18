import { Component, Inject, OnInit } from '@angular/core';
import {
  CheckboxRowComponent,
  SelectCheckboxService,
} from './../../../projects/codesnooker/eztable/src/public-api';

@Component({
  selector: 'app-sample-checkbox-row',
  templateUrl: './sample-checkbox-row.component.html',
  styleUrls: ['./sample-checkbox-row.component.scss'],
})
export class SampleCheckboxRowComponent extends CheckboxRowComponent
  implements OnInit {
  constructor(@Inject(SelectCheckboxService) service: SelectCheckboxService) {
    super(service);
  }

  ngOnInit(): void {}
}
