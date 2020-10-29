import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesAllDemosComponent } from './pages-all-demos/pages-all-demos.component';

const routes: Routes = [
  {
    path: '',
    component: PagesAllDemosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemosRoutingModule {}
