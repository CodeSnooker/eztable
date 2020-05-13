import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EztableModule } from '@codesnooker/eztable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleRowComponent } from './sample-row/sample-row.component';

@NgModule({
  declarations: [AppComponent, SampleRowComponent],
  imports: [BrowserModule, AppRoutingModule, EztableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
