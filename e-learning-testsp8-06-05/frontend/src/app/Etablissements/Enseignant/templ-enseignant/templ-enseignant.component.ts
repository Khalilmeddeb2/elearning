import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { io } from 'socket.io-client';
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
  private socket: any;
  public data: any;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private token :TokenStorageService
    ,private toastr: ToastrService
     
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.socket = io('http://localhost:3007');
   
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("::",this.currentUser[0]._id)
    console.log("typeEtbali",this.currentUser[0].etablissement.type)
    this.type=this.currentUser[0].etablissement.type
    this.socket.on('tx', data => {
      
      this.data = data;
      console.log('data',data)
      console.log("iddd :",data.id)
      if(this.currentUser[0]._id == data.id)
      {
        console.log("preeeeeeeeeeeeeeeeeeeeeeees")
        this.toastr.info(data.message)
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
 
  /*
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
  */
  



}
