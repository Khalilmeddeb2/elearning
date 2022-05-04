import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-etbalissementempl',
  templateUrl: './etbalissementempl.component.html',
  styleUrls: ['./etbalissementempl.component.scss']
})
export class EtbalissementemplComponent implements OnInit {

  currentUser: User;
  message: "";
  type
  test ="créche"
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private token :TokenStorageService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.route.params.subscribe( (params : Params )=>{
      this.message=params['caller']
     

    } )
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("::",this.currentUser[0])
    console.log("typeEtbali",this.currentUser[0].etablissement.type)
    this.type=this.currentUser[0].etablissement.type

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
