import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/_models/role';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  role :Role = new Role();
  //error :boolean=false ;
  //eroorMessage :String="Il faut remplir e champs,il est obligatoire.";
  roles: Role[] = [];
  message="";
  message2=""
  message3="suppression avec succès"
  show:boolean=false;
  closeResult = '';
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private roleService :RoleService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal)
   {
    this.route.params.subscribe( (params : Params )=>{
      this.message=params['caller']
      this.message2=params['caller2']

    } )
   }

  ngOnInit(): void {
    /*if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }*/
    this.getRoles();
  }

 

  getRoles(){
    console.log("imed")
    this.roleService.getRoles().subscribe(e=>{
     
        this.roles=e;
        console.log("ert")
        console.log(e) 
          })
  }
  deleteRole(role:Role)
  
{
  console.log(this.show)
this.roleService.deleteRole(role._id).subscribe(e=>
  {
    
    this.show =true;
    console.log(this.show)
    this.getRoles()
  })
  this.modalService.dismissAll()
} 

updateRole(id:String)
{
  console.log("mouha")
  this.router.navigate(['backoffice/roles/updateRole',id])
  console.log("eeeeeeeeeeeeeee")
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
onTableDataChange(event: any) {
  this.page = event;
  this.getRoles();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getRoles();
}
}
