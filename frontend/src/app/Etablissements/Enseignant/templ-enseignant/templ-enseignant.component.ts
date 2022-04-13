import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-templ-enseignant',
  templateUrl: './templ-enseignant.component.html',
  styleUrls: ['./templ-enseignant.component.scss']
})
export class TemplEnseignantComponent implements OnInit {

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
   
  }

  ngOnInit(): void {
    
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
