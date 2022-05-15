import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ClasseService } from 'src/app/_services/classe.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MatieresComponent } from '../../etbalissementempl/matieres/matieres.component';

@Component({
  selector: 'app-templ-enseignant',
  templateUrl: './templ-enseignant.component.html',
  styleUrls: ['./templ-enseignant.component.scss']
})
export class TemplEnseignantComponent implements OnInit {

  currentUser: User;
  message: "";
  matieres
  type
  test ="créche"
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private token :TokenStorageService
     
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
   
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
