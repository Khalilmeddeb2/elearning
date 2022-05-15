import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/_models/role';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  id:string;
  //category :any={name:""}
  role:Role=new Role();
   constructor(private roleService :RoleService,private route:ActivatedRoute,private router : Router) { }
 
   ngOnInit(): void {
    /*if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }*/
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.roleService.getRoleById(this.id).subscribe(data=>{
      
      this.role=data;
      console.log("taraji")
      console.log(data)
      
     })
    
   }
 
   onSubmit()
   {
     this.roleService.EditRole(this.id , this.role).subscribe( data=>{
      this.goToCategoriesList();
       
     })
   }
   goToCategoriesList()
   {
     this.router.navigate(['/backoffice/roles', {caller2 : "Modification avec succès"}]);
   }

}
