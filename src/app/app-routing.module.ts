import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { ImpactsComponent }      from './impacts/impacts.component';
import { ImpactDetailComponent }  from './impact-detail/impact-detail.component';
import { ImpactEditorComponent } from "./impacts/editor/impact.editor.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ImpactDetailComponent },
  { path: 'impacts', component: ImpactsComponent },
  { path: 'editImpact', component: ImpactEditorComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
