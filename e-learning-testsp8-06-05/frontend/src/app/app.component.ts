
import { Component } from '@angular/core';
import { io } from 'socket.io-client';
//import { NotificationsService } from './_services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'e-learning';
  private socket: any;
  public data: any;

  constructor() {
    // Connect Socket with server URL
    this.socket = io('http://localhost:3007');
  }
  public ngOnInit(): void {
    this.socket.on('tx', data => {

      this.data = data;
      console.log('data',data)
    });
  }
}