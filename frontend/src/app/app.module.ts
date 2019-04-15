import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CakesComponent } from './components/cakes/cakes.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CakeService} from "./services/cake.service";

@NgModule({
  declarations: [
    AppComponent,
    CakesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
