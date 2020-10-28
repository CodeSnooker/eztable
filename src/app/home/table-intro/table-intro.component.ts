import { Component, OnInit } from '@angular/core';
import { USER_DATA } from 'src/app/fixtures';

@Component({
  selector: 'app-table-intro',
  templateUrl: './table-intro.component.html',
  styleUrls: ['./table-intro.component.scss'],
})
export class TableIntroComponent implements OnInit {
  userData = [...USER_DATA];
  constructor() {}

  ngOnInit(): void {}
}
