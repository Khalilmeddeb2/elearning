import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/_services/cours.service';

@Component({
  selector: 'app-cours-by-description-etudiants',
  templateUrl: './cours-by-description-etudiants.component.html',
  styleUrls: ['./cours-by-description-etudiants.component.scss']
})
export class CoursByDescriptionEtudiantsComponent implements OnInit {

  id;

  ids: string;
  url 
  cours ;
  coursResults : any = [];
  url2
  constructor(private route: ActivatedRoute,private router: Router,private coursService :CoursService,private sanitization: DomSanitizer) {}
  ngOnInit(): void {
   
    //console.log(this.id)
    //console.log(this.ids)
    this.id=this.router.url.split('/');
    console.log(this.id[2])
    this.ids=this.id[2]
    //console.log(this.ids)
    this.getCours();
  }

  getCours(){
    
    
    console.log("imed")
   this.coursService.getCoursWithDescriptionByClasse(this.ids).subscribe(e=>{
    
       this.cours=e
          })   
  }
  ViewCours(id:string)
  {
   console.log("mouha")
   this.router.navigate(['viewCours',id])
   console.log("eeeeeeeeeeeeeee")
  }
//   updateDowload(id)
//   {
//       this.coursService.updateDownload(id).subscribe(e=>{
//         console.log(e)
//       })
//   }
//   openFile(x,id)
//  {
//   this.updateDowload(id)
//    window.open(x)
//  }

}
