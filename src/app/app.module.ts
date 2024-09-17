import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContributorsComponent } from './components/contributors/contributors.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ScannerCapawesomeComponent } from './components/scanner-capawesome/scanner-capawesome.component';
import { DiffCheckerComponent } from './components/diff-checker/diff-checker.component';
import { SideBySideDiffComponent, UnifiedDiffComponent } from 'ngx-diff';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContributorsComponent,
    SettingsComponent,
    ScannerCapawesomeComponent,
    DiffCheckerComponent
  ],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, SideBySideDiffComponent, UnifiedDiffComponent],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
