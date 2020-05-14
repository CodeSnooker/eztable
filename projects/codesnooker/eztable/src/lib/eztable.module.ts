import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RowHostDirective } from './directives/row-host.directive';
import { EztableComponent } from './eztable.component';
import { SmartCasePipe } from './pipes/smart-case.pipe';
import { SimpleRowComponent } from './simple-row/simple-row.component';
import { EzHeaderComponent } from './ez-header/ez-header.component';

@NgModule({
  declarations: [
    EztableComponent,
    SimpleRowComponent,
    SmartCasePipe,
    RowHostDirective,
    EzHeaderComponent,
  ],
  imports: [CommonModule],
  exports: [EztableComponent, SimpleRowComponent],
  entryComponents: [SimpleRowComponent],
})
export class EztableModule {}
