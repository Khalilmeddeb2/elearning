import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-informations',
  templateUrl: './update-informations.component.html',
  styleUrls: ['./update-informations.component.scss']
})
export class UpdateInformationsComponent implements OnInit {

  iduser: any;
  d: any;
  user:User=new User();
  user2:User=new User();

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

onSubmit()
   {
    //  console.log("78",this.user2)
    //  console.log("79",this.user)
    //  this.user.firstName=this.user2.firstName
    //  this.user.lastName=this.user2.lastName
    //  console.log("80",this.user)
     this.userService.EditUser(this.iduser , this.user).subscribe( data=>{
      this.goToCategoriesList();
       
     })
   }
goToCategoriesList()
{
  this.router.navigate(['/EnseignantHome/profil']);
}

back()
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/profil'])
 console.log("eeeeeeeeeeeeeee")
}

}
