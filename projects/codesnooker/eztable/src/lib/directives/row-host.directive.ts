import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libRowHost]',
  // exportAs: "[row-host]",
})
export class RowHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
