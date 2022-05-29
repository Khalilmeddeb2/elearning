import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProfilEnfantService } from 'src/app/_services/profil-enfant.service';

@Component({
  selector: 'app-listes-photos-enfants',
  templateUrl: './listes-photos-enfants.component.html',
  styleUrls: ['./listes-photos-enfants.component.scss']
})
export class ListesPhotosEnfantsComponent implements OnInit {
id
ids
id4
photosEnfants;
  constructor(private router: Router,private profilEnfantService :ProfilEnfantService,private sanitization: DomSanitizer) { }

  ngOnInit(): void {
    this.id=this.router.url.split('/');
    console.log(this.id[6])
    this.ids=this.id[6]
    this.id4=this.id[4]
    console.log("ioi",this.ids)
    console.log("ppp",this.id4)
    this.getPhotosAndDescriptionsEnfants()
  }

  getPhotosAndDescriptionsEnfants(){
    
    
    console.log("imed")
   this.profilEnfantService.getProfils(this.ids).subscribe(e=>{
    
       this.photosEnfants=e.map(p=>{
        //console.log("e",this.profils)
       p.filename=this.sanitization.bypassSecurityTrustResourceUrl("http://localhost:3007/"+p.filename);
       
     return p;
    
     
    
     })
    
       
          })   
  }

  /*
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
  */
}
