import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContributorsComponent } from './components/contributors/contributors.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ScannerCapawesomeComponent } from './components/scanner-capawesome/scanner-capawesome.component';
import { DiffCheckerComponent } from './components/diff-checker/diff-checker.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contributors',
    component: ContributorsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'scanner-capawesome',
    component: ScannerCapawesomeComponent
  },
  {
    path: 'diff-checker',
    component: DiffCheckerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
