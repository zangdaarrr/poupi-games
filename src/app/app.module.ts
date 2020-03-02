import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Jeux1Component } from './jeux1/jeux1.component';
import { Jeux2Component } from './jeux2/jeux2.component';
import { Jeux3Component } from './jeux3/jeux3.component';

@NgModule({
  declarations: [
    AppComponent,
    Jeux1Component,
    Jeux2Component,
    Jeux3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
