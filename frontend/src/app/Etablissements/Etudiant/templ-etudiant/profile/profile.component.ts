import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Profil } from 'src/app/_models/profil';
import { ProfilService } from 'src/app/_services/profil.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  id;
  ids;
  user;
  d
  profils :Profil [];
  length
  constructor(private token :TokenStorageService,private router :Router,private userService :UserService,private profilService :ProfilService,private sanitization: DomSanitizer) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("::",this.currentUser[0]._id)
    this.d=this.userService.getUserById(this.currentUser[0]._id).subscribe(async data=>{
      this.user=data
    
    console.log("user,user",this.user)
  })
    this.id=this.router.url.split('/');
    console.log(this.id[2])
    this.ids=this.id[2]
    console.log("ioi",this.ids)
    //this.getExercices();
    this.getProfiluser()
  }
  getProfiluser(){
    console.log("imed")
    this.profilService.getProfilUser().subscribe(e=>{
     
        this.profils=e.map(p=>{
          //console.log("e",this.profils)
         p.filename=this.sanitization.bypassSecurityTrustResourceUrl("http://localhost:3007/"+p.filename);
         //window.open(p.filename)
         //console.log('file',p.filename.changingThisBreaksApplicationSecurity)
         //this.url2=p.filename.changingThisBreaksApplicationSecurity
         //this.openExercice(this.url2)
         //this.co=e
         
         //console.log('p',p)
         //p.path=p.filename.changingThisBreaksApplicationSecurity;
         //p.datebe =p.date
       return p;
      
       
      
       })
       this.length=this.profils.length;
       console.log("taille",this.length)
      //console.       
     })
    
 }
 
  
  updateProfileInformations(iduser:string)
{
 console.log("mouha")
 this.router.navigate(['EtudiantHome/'+this.ids+'/profile/updateInformations',iduser])
 console.log("eeeeeeeeeeeeeee")
}

updateProfilePassword(iduser:string)
{
 console.log("mouha")
 this.router.navigate(['EtudiantHome/'+this.ids+'/profile/updatePassword',iduser])
 console.log("eeeeeeeeeeeeeee")
}

updateProfilePhoto(iduser:string)
{
 console.log("mouha")
 this.router.navigate(['EtudiantHome/'+this.ids+'/profile/updatePhoto',iduser])
 console.log("eeeeeeeeeeeeeee")
}

}
