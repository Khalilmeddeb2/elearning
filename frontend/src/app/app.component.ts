import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { VisitorsService } from './_services/visitors.service';
//import { NotificationsService } from './_services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'e-learning';
  ipaddress:string = '';
  latitude:string= '';
  longitude:string= '';
  currency:string = '';
  currencysymbol:string = '';
  isp:string= '';
  city:string = '';
  country:string ='';
  contryEror;
  private socket: any;
  public data: any;

  constructor(private visitorsService:VisitorsService) {
    // Connect Socket with server URL
    
  }
  public ngOnInit(): void {
 
    // this.visitorsService.getIpAddress().subscribe(res => {

    //   this.ipaddress = res['ip'];
    //   this.visitorsService.getGEOLocation(this.ipaddress).subscribe(res => {

    //     this.latitude = res['latitude'];
    //     this.longitude = res['longitude'];
    //     this.currency = res['currency']['code'];
    //     this.currencysymbol = res['currency']['symbol'];
    //     this.city = res['city'];
    //     this.country = res['country_code3'];
    //     this.isp = res['isp'];
    //     console.log(res);
    //   });
    //   //console.log(res);

    // });
  }


}
