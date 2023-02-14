import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FlagsComponent } from './components/flags/flags.component';
import { HttpClientModule } from '@angular/common/http';
import { ScoreComponent } from './components/score/score.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlagsComponent,
    ScoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    [SweetAlert2Module.forRoot()],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
