import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { io } from 'socket.io-client';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/_services/notification.service';
@Component({
  selector: 'app-templ-etudiant',
  templateUrl: './templ-etudiant.component.html',
  styleUrls: ['./templ-etudiant.component.scss']
})
export class TemplEtudiantComponent implements OnInit {

  currentUser: User;
  message: "";
  private socket: any;
  public data: any;
  notifications ;
  id :string;
  closeResult: string;
  notifEtat ;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private token :TokenStorageService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private notificationService :NotificationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.socket = io('http://127.0.0.1:3007');
   
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.currentUser = this.token.getUser();
    console.log("::",this.currentUser[0]._id)
    this.socket.on('tx', data => {

      this.data = data;
      console.log('data',data) 
      /*for( let c of data.id)
      {
        if(c._id == this.currentUser[0].classe)
        {
        this.toastr.info(data.message)
        } 
      }*/
      if(this.currentUser[0]._id == data.id)
      {
        console.log("preeeeeeeeeeeeeeeeeeeeeeees")
        this.toastr.info(data.message)
      }
      
    });
    this.getNotifications();
    //this.changerEtat()
  }

  /*

ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("::",this.currentUser[0]._id)
    console.log("typeEtbali",this.currentUser[0].etablissement.type)
    this.type=this.currentUser[0].etablissement.type
    this.user=this.currentUser[0].firstName+this.currentUser[0].lastName
    this.socket.on('tx', data => {
      
      this.data = data;
      console.log('data',data)
      console.log("iddd :",data.id)
      if(this.currentUser[0]._id == data.id)
      {
        console.log("preeeeeeeeeeeeeeeeeeeeeeees")
        this.toastr.info(data.message,this.user)
      }
    });
    this.getNotifications()
  }
  */


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  changerEtat()
  {
   this.notifEtat = !this.notifEtat;
  }
  

  /*

  private socket: any;
  public data: any;

  constructor() {
    // Connect Socket with server URL
    this.socket = io('http://127.0.0.1:3007');
  }
  public ngOnInit(): void {
    this.socket.on('tx', data => {

      this.data = data;
      console.log('data',data)
    });
  }
  */

  getNotifications(){
    
    
    console.log("imed")
   this.notificationService.getNotificationsByEtudiant().subscribe(e=>{
    
       this.notifications=e
       console.log("les notifis",e)
          })   
  }

  onChange(id)
  {
    this.notificationService.getChangeSelect(id).subscribe(e=>{
    
      console.log(e)
      console.log(this.notifications)
         })   

    //console.log(this.notifications)
  }

  

}
