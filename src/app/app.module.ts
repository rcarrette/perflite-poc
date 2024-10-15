import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { ContributorService } from './services/data/contributor/contributor.service';
import { OrmService } from './services/data/orm/orm.service';
import { SQLiteService } from './services/data/sqlite/sqlite.service';

export function initializeFactory(init: SQLiteService) {
  return () => init.initializeWebStore();
}

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
    SQLiteService, OrmService, ContributorService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [SQLiteService],
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
