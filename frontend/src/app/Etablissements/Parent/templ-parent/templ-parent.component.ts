import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-templ-parent',
  templateUrl: './templ-parent.component.html',
  styleUrls: ['./templ-parent.component.scss']
})
export class TemplParentComponent implements OnInit {

  currentUser: User;
  message: "";
  id :string;
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
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
