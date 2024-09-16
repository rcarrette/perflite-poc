import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private networkStatusSubject = new Subject<boolean>();
  
  public networkStatus$ = this.networkStatusSubject.asObservable();

  constructor() {
    this.initializeNetworkListeners();
  }

  initializeNetworkListeners() {
    Network.addListener('networkStatusChange', (status) => {
      this.networkStatusSubject.next(status.connected);
    });
  }

  isOnline() {
    return Network.getStatus().then(status => status.connected);
  }

  isOffline() {
    return Network.getStatus().then(status => !status.connected);
  }
}