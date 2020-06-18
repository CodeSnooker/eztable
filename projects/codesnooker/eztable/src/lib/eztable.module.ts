import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { CheckSquare, Square } from 'angular-feather/icons';
import { CheckboxRowComponent } from './checkbox-row/checkbox-row.component';
import { EzPadRightDirective } from './directives/ez-pad-right.directive';
import { RowHostDirective } from './directives/row-host.directive';
import { DynamicCheckboxComponent } from './dynamic-checkbox/dynamic-checkbox.component';
import { DynamicCheckboxConfig } from './dynamic-checkbox/dynamic-checkbox.config';
import { EzHeaderComponent } from './ez-header/ez-header.component';
import { EztableComponent } from './eztable.component';
import { SmartCasePipe } from './pipes/smart-case.pipe';
import { SelectCheckboxService } from './select-checkbox.service';
import { SimpleRowComponent } from './simple-row/simple-row.component';

// Select some icons (use an object, not an array)
const icons = {
  Square,
  CheckSquare,
};

@NgModule({
  declarations: [
    EztableComponent,
    SimpleRowComponent,
    SmartCasePipe,
    RowHostDirective,
    EzHeaderComponent,
    EzPadRightDirective,
    CheckboxRowComponent,
    DynamicCheckboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherModule.pick(icons),
  ],
  providers: [SelectCheckboxService, DynamicCheckboxConfig],
  exports: [
    EztableComponent,
    SimpleRowComponent,
    DynamicCheckboxComponent,
    // SelectCheckboxService,
  ],
  entryComponents: [SimpleRowComponent, DynamicCheckboxComponent],
})
export class EztableModule {}
