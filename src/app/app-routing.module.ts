import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Jeux1Component } from './jeux1/jeux1.component';
import { Jeux2Component } from './jeux2/jeux2.component';
import { Jeux3Component } from './jeux3/jeux3.component';


const routes: Routes = [
  { path: 'jeux1', component: Jeux1Component },
  { path: 'jeux2', component: Jeux2Component },
  { path: 'jeux3', component: Jeux3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
