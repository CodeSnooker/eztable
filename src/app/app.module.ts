import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { Clock, Phone } from 'angular-feather/icons';
import { EztableModule } from './../../projects/codesnooker/eztable/src/public-api';
import { AlwaysResponsiveTableComponent } from './always-responsive-table/always-responsive-table.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BorderedTableComponent } from './bordered-table/bordered-table.component';
import { CheckboxExampleComponent } from './checkbox-example/checkbox-example.component';
import { CondensedTableComponent } from './condensed-table/condensed-table.component';
import { CustomHeadersComponent } from './custom-headers/custom-headers.component';
import { CustomRowCheckboxDemoComponent } from './custom-row-checkbox-demo/custom-row-checkbox-demo.component';
import { CustomRowComponentComponent } from './custom-row-component/custom-row-component.component';
import { DisableSortOnColumnComponent } from './disable-sort-on-column/disable-sort-on-column.component';
import { DisableSortWithPreSortColumnComponent } from './disable-sort-with-pre-sort-column/disable-sort-with-pre-sort-column.component';
import { DisableSortingComponent } from './disable-sorting/disable-sorting.component';
import { HoverableTableComponent } from './hoverable-table/hoverable-table.component';
import { IntroComponent } from './intro/intro.component';
import { PreSortedUsingTableColumnComponent } from './pre-sorted-using-table-column/pre-sorted-using-table-column.component';
import { PreSortedComponent } from './pre-sorted/pre-sorted.component';
import { SampleCheckboxRowComponent } from './sample-checkbox-row/sample-checkbox-row.component';
import { SampleRowComponent } from './sample-row/sample-row.component';
import { SearchableTableComponent } from './searchable-table/searchable-table.component';
import { SortableTableComponent } from './sortable-table/sortable-table.component';
import { StripedRowsComponent } from './striped-rows/striped-rows.component';

// Select some icons (use an object, not an array)
const icons = {
  Clock,
  Phone,
};

@NgModule({
  declarations: [
    AppComponent,
    SampleRowComponent,
    IntroComponent,
    CustomHeadersComponent,
    StripedRowsComponent,
    CondensedTableComponent,
    HoverableTableComponent,
    BorderedTableComponent,
    AlwaysResponsiveTableComponent,
    CustomRowComponentComponent,
    DisableSortingComponent,
    PreSortedComponent,
    DisableSortOnColumnComponent,
    DisableSortWithPreSortColumnComponent,
    SortableTableComponent,
    PreSortedUsingTableColumnComponent,
    SearchableTableComponent,
    CheckboxExampleComponent,
    CustomRowCheckboxDemoComponent,
    SampleCheckboxRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EztableModule,
    FeatherModule.pick(icons),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
