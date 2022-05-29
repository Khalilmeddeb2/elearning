import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  user :User = new User();
  firstName:string
  lastName:string
  email:string
  closeResult = '';
  message="";
  message2=""
  message3="suppression avec succès"
  show:boolean ;
  enabled;
  page: number = 1;
  count: number = 0;
  tableSize: number = 25;
  tableSizes: any = [3, 6, 9, 12];
  users: User[] = [];
  constructor(private userService :UserService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal,private toastr: ToastrService) {
    
 
  }
    
  ngOnInit(): void {
    this.getUsers();
 
  }
  
  
  getUsers(){
    console.log("imed")
    this.userService.getUsers().subscribe(e=>{
     
        this.users=e;
        console.log("ert")
        console.log(e) 
        for(let i of e)
        {
             this.enabled=i.status
             console.log(i)
        }
          })
  }
  deleteUser(role:User)
{
  console.log("bnsr")
this.userService.deleteUser(role._id).subscribe(e=>
  {
    console.log("bnsr")
    this.show=true;
    this.toastr.error('suppression avec succés')
    this.getUsers()
     
  })
  this.modalService.dismissAll()
} 

updateUser(id:string)
{
  console.log("mouha")
  this.router.navigate(['backoffice/users/updateUser',id])
  console.log("eeeeeeeeeeeeeee")
}
search()
{
  if(this.firstName != "" || this.lastName != "" || this.email != "" )
   {
  this.users = this.users.filter(res=>{
    return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase()) 
    || res.lastName.toLocaleLowerCase().match(this.lastName.toLocaleLowerCase()) 
    || res.email.toLocaleLowerCase().match(this.email.toLocaleLowerCase()
     ) 
  })
   }
   else if(this.firstName == "" && this.lastName == "" && this.email == "")
   {
     this.getUsers();
   }
}

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

open2(content2) {
  this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}



changeStatus(user:User)
{
  console.log("bnsr")
  this.userService.EditSatutsUser(user._id).subscribe(e=>
    {
      console.log("bnsr")
      console.log(e)
      //if(e.sta == false)
       
      this.getUsers();
    })
   
    this.modalService.dismissAll()
  } 

  onTableDataChange(event: any) {
    this.page = event;
    this.getUsers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUsers();
  }
}

