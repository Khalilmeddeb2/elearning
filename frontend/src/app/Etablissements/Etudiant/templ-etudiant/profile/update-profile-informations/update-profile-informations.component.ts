import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-profile-informations',
  templateUrl: './update-profile-informations.component.html',
  styleUrls: ['./update-profile-informations.component.scss']
})
export class UpdateProfileInformationsComponent implements OnInit {
  iduser: any;
  d: any;
  user:User=new User();
  user2:User=new User();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  formBuilder: any;
  constructor(private route :ActivatedRoute,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.iduser = this.route.snapshot.params['id'];
    console.log(this.iduser)
    this.d=this.userService.getUserById(this.iduser).subscribe(async data=>{
      this.user=data;
      this.user.password="";
      console.log("data",data)
    
  })

}
// onSubmit()
// {
//   this.submitted = true;
//   console.log('clicked');
//   // return for here if form is invalid
  
//   //this.loading = true;
//   console.log('enabled');
//   console.log("eeee",this.registerForm)
//   //this.registerForm.value.phone="+"+this.countryCode+this.registerForm.value.phone;
//   this.userService.EditUser(this.iduser , this.registerForm.value).subscribe( data=>{
//     console.log()
//    this.goToCategoriesList();
    
//   })
// }
onSubmit()
   {
     console.log("78",this.user2)
     console.log("79",this.user)
     this.user.firstName=this.user2.firstName
     this.user.lastName=this.user2.lastName
     console.log("80",this.user)
     this.userService.EditUser(this.iduser , this.user).subscribe( data=>{
      this.goToCategoriesList();
       
     })
   }
goToCategoriesList()
{
  this.router.navigate(['/login']);
}
}