import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-etbalissementempl',
  templateUrl: './etbalissementempl.component.html',
  styleUrls: ['./etbalissementempl.component.scss']
})
export class EtbalissementemplComponent implements OnInit {

  currentUser: User;
  message: "";

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.route.params.subscribe( (params : Params )=>{
      this.message=params['caller']
     

    } )
  }

  ngOnInit(): void {
    
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
