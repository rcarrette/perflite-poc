import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {}

  async login() {
    await this.notificationsService.showConfirmationAsync('Hello', 'this is a test');
  }
}
