import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DemosRoutingModule } from './demos-routing.module';
import { PagesAllDemosComponent } from './pages-all-demos/pages-all-demos.component';

@NgModule({
  declarations: [PagesAllDemosComponent],
  imports: [CommonModule, SharedModule, DemosRoutingModule],
})
export class DemosModule {}
