import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/_models/classe';
import { ClasseService } from 'src/app/_services/classe.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';

@Component({
  selector: 'app-list-etudiants',
  templateUrl: './list-etudiants.component.html',
  styleUrls: ['./list-etudiants.component.scss']
})
export class ListEtudiantsComponent implements OnInit {

  id:string;
  classe:Classe=new Classe();
  //registerForm: FormGroup;
  //loading = false;
  //submitted = false;
  returnUrl: string;
  enseignants : any;
  d;
  etudiants: any = [];
  
 
  

  
  
  constructor(private classeService :ClasseService ,
    private router: Router, 
    private route: ActivatedRoute,
    private etudiantService :EtudiantService
    
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
    this.etudiantService.getEtudiantsByClasse(this.id).subscribe(e=>{
         this.etudiants=e
         console.log(e)
          }) 
            }
  
           

}
