import { Component, OnInit } from '@angular/core';
import { USER_DATA } from 'src/app/shared/fixtures';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  userData = [...USER_DATA];
  constructor() {}
  ngOnInit(): void {}
}
