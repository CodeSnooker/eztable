import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EztableModule } from './../../../projects/codesnooker/eztable/src/public-api';
import { IntroComponent } from './intro/intro.component';

@NgModule({
  declarations: [IntroComponent],
  imports: [CommonModule, EztableModule],
  exports: [IntroComponent, EztableModule],
})
export class SharedModule {}
