import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContributorsComponent } from './components/contributors/contributors.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ScannerCapawesomeComponent } from './components/scanner-capawesome/scanner-capawesome.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContributorsComponent,
    SettingsComponent,
    ScannerCapawesomeComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
