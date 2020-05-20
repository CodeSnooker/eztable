import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RowHostDirective } from './directives/row-host.directive';
import { EzHeaderComponent } from './ez-header/ez-header.component';
import { EztableComponent } from './eztable.component';
import { SmartCasePipe } from './pipes/smart-case.pipe';
import { SimpleRowComponent } from './simple-row/simple-row.component';

@NgModule({
  declarations: [
    EztableComponent,
    SimpleRowComponent,
    SmartCasePipe,
    RowHostDirective,
    EzHeaderComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [EztableComponent, SimpleRowComponent],
  entryComponents: [SimpleRowComponent],
})
export class EztableModule {}
