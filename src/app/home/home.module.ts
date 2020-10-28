import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { PageHomeComponent } from './page-home/page-home.component';
import { TableIntroComponent } from './table-intro/table-intro.component';

@NgModule({
  declarations: [PageHomeComponent, TableIntroComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
