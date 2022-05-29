import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate() : boolean{ 
        
    
    if (this.authenticationService.loggedIn()) {
      // authorised so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    else{
    this.router.navigate(['/login']);
    return false;
    }
  }

    // not logged in so redirect to login page with the return url
    
   
}
