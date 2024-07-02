import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public features = [
    { name: 'Home', url: '/', icon: 'home' },
    { name: 'Contributors', url: '/contributors', icon: 'people' },
    { name: 'Scanner (capawesome)', url: '/scanner-capawesome', icon: 'scan' },
    { name: 'Settings', url: '/settings', icon: 'settings' }
  ];
  constructor() {}
}
