import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/_models/classe';
import { ClasseService } from 'src/app/_services/classe.service';
import { EnfantService } from 'src/app/_services/enfant.service';

@Component({
  selector: 'app-list-enfants',
  templateUrl: './list-enfants.component.html',
  styleUrls: ['./list-enfants.component.scss']
})
export class ListEnfantsComponent implements OnInit {

  id:string;
  classe:Classe=new Classe();
  //registerForm: FormGroup;
  //loading = false;
  //submitted = false;
  returnUrl: string;
  enseignants : any;
  d;
  enfants: any = [];
  
 
  

  
  
  constructor(private classeService :ClasseService ,
    private router: Router, 
    private route: ActivatedRoute,
    private enfantService :EnfantService
    
    //private formBuilder: FormBuilder,
   ) 
   {}

  ngOnInit(): void {
   
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    
    this.getEtudiants();
   
    //console.log('result',this.etudiantsResults)
  } 

  getEtudiants(){
   //let  results = [];
    //console.log("imed")
    this.enfantService.getEnfantsByClasse(this.id).subscribe(e=>{
         this.enfants=e
         console.log(e)
          }) 
            }

            /*
               { path: 'classes/ListesEnfants/:id/AjoutPhoto/:idEnf', component: ListEnfantsComponent },
      { path: 'classes/ListesEnfants/:id/ListesPhotos/idEnf', component: ListEnfantsComponent },
            */
      addPhotoEnfants(idEnf:string)
      {
       console.log("mouha")
       this.router.navigate(['EnseignantHome/classes/ListesEnfants/'+ this.id+'/AjoutPhoto',idEnf])
       console.log("eeeeeeeeeeeeeee")
      }
     
      viewListesPhotosEnfants(idEnf:string)
      {
        console.log("mouha")
        this.router.navigate(['EnseignantHome/classes/ListesEnfants/'+ this.id+'/ListesPhotos',idEnf])
        console.log("eeeeeeeeeeeeeee")
      }
}
