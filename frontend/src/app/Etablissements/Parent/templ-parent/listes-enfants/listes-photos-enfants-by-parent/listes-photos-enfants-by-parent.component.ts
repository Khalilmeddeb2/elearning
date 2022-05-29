import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProfilEnfantService } from 'src/app/_services/profil-enfant.service';

@Component({
  selector: 'app-listes-photos-enfants-by-parent',
  templateUrl: './listes-photos-enfants-by-parent.component.html',
  styleUrls: ['./listes-photos-enfants-by-parent.component.scss']
})
export class ListesPhotosEnfantsByParentComponent implements OnInit {

  id
  ids
  datebe
  photosEnfants;
    constructor(private router: Router,private profilEnfantService :ProfilEnfantService,private sanitization: DomSanitizer) { }
  
    ngOnInit(): void {
      this.id=this.router.url.split('/');
      console.log(this.id[4])
      this.ids=this.id[4]
    
      console.log("ioi",this.ids)
      
      this.getPhotosAndDescriptionsEnfants()
    }
  
    getPhotosAndDescriptionsEnfants(){
      
      
      console.log("imed")
     this.profilEnfantService.getProfils(this.ids).subscribe(e=>{
      
         this.photosEnfants=e.map(p=>{
          //console.log("e",this.profils)
         p.filename=this.sanitization.bypassSecurityTrustResourceUrl("http://localhost:3007/"+p.filename);
         p.datebe =p.date
       return p;
      
       
      
       })
      
         
            })   
    }


    search()
    {
      if (this.datebe != "" )
       {
      this.photosEnfants = this.photosEnfants.filter(res=>{
        return  res.datebe.toLocaleLowerCase().match(this.datebe.toLocaleLowerCase())
        
      })
      
       }
       else if(this.datebe == "")
       {
         this.getPhotosAndDescriptionsEnfants();
       }
    }
  
}
