import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { Subscription } from 'rxjs';
import { NetworkService } from 'src/app/services/network/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  private networkSubscription: Subscription;
  public isConnected: boolean;

  constructor(private notificationsService: NotificationsService, private networkService: NetworkService, private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscribeToNetworkChanges();

    this.networkService.isOnline().then(connected => {
      this.isConnected = connected;
    });
  }

  ngOnDestroy() {
    if (this.networkSubscription) {
      this.networkSubscription.unsubscribe();
    }
  }

  async login() {
    await this.notificationsService.showConfirmationAsync('Hello', 'this is a test');
  }

  subscribeToNetworkChanges() {
    this.networkSubscription = this.networkService.networkStatus$.subscribe(async connected => {
      this.isConnected = connected;

      this.changeRef.detectChanges();
    });
  }
}
