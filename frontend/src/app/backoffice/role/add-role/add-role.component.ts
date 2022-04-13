import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/_models/role';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {

  role :Role = new Role();
 
  constructor(private roleService :RoleService,private router :Router){}
  ngOnInit(): void {
    /*if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }*/
  }


  saveRole(){
   
     this.roleService.createRole(this.role).subscribe(data=>{
       console.log(data);
       this.goToListRoles();
 
   },
    );

 }
 
 goToListRoles(){
   this.router.navigate(['/backoffice/roles', {caller : "Ajout avec succès"}])
   }
 
 
   onSubmit(){
     console.log(this.role);
     this.saveRole();
     
   }

}
