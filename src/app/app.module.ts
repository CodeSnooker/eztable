import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { Clock, Phone } from 'angular-feather/icons';
import { MarkdownModule } from 'ngx-markdown';
import { EztableModule } from './../../projects/codesnooker/eztable/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

// Select some icons (use an object, not an array)
const icons = {
  Clock,
  Phone,
};

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EztableModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    FeatherModule.pick(icons),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
