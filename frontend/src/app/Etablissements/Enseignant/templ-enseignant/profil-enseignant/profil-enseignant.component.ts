import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
//import { Console } from 'console';
import { Profil } from 'src/app/_models/profil';
import { ProfilService } from 'src/app/_services/profil.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profil-enseignant',
  templateUrl: './profil-enseignant.component.html',
  styleUrls: ['./profil-enseignant.component.scss']
})
export class ProfilEnseignantComponent implements OnInit {

  currentUser: any;
  id;
  ids;
  user;
  d
  profils :Profil [];
  image: Profil []
  length
  //sanitization: any;
  constructor(private token :TokenStorageService,private router :Router,private userService :UserService,private profilService :ProfilService,private sanitization: DomSanitizer) { }

  ngOnInit(): void {
    //console.log("aaa")
    this.currentUser = this.token.getUser();
    console.log("salem",this.profils)
    console.log("::",this.currentUser[0])
    this.d=this.userService.getUserById(this.currentUser[0]._id).subscribe(async data=>{
      this.user=data
    
    //console.log("user,user",this.user)
  })
  this.profilService.getProfilUser().subscribe(e=>{
    
    this.profils=e.map(p=>{
      console.log("e",e)
     
     p.filename=this.sanitization.bypassSecurityTrustResourceUrl("http://localhost:3007/"+p.filename);
   
       

  
   return p;
   
   })

   this.length=this.profils.length;
   console.log("taille",this.length)
 
 })

}
    
 
  updateProfileInformations(iduser:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/profil/updateInformations',iduser])
 console.log("eeeeeeeeeeeeeee")
}

updateProfilePassword(iduser:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/profil/updatePassword',iduser])
 console.log("eeeeeeeeeeeeeee")
}

updateProfilePhoto(iduser:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/profil/updatePhoto',iduser])
 console.log("eeeeeeeeeeeeeee")
}
}
