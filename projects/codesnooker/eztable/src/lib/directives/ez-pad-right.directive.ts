import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ezPadRight]',
})
export class EzPadRightDirective {
  // @HostBinding('style.color') color: string;
  // @HostBinding('style.border-color') borderColor: string;

  @HostBinding('style.margin-right')
  @Input()
  marginRight = '0px';

  constructor() {
    // const colorPick = Math.floor(Math.random() * this.possibleColors.length);
    // this.color = this.borderColor = this.possibleColors[colorPick];
    // this.background = 'red';
  }
}
