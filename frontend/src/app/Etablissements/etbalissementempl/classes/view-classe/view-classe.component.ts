import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/_models/classe';
import { ClasseService } from 'src/app/_services/classe.service';
import { EnseignantService } from 'src/app/_services/enseignant.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';

@Component({
  selector: 'app-view-classe',
  templateUrl: './view-classe.component.html',
  styleUrls: ['./view-classe.component.scss']
})
export class ViewClasseComponent implements OnInit {

  id:string;
  classe:Classe=new Classe();
  //registerForm: FormGroup;
  //loading = false;
  //submitted = false;
  returnUrl: string;
  enseignants : any;
  d;
  etudiants: any = [];
  etudiantsResults: any = [];
 
  

  
  
  constructor(private classeService :ClasseService ,private enseignanService :EnseignantService,
    private router: Router, 
    private route: ActivatedRoute,
    private etudiantService :EtudiantService
    
    //private formBuilder: FormBuilder,
   ) 
   {}

  ngOnInit(): void {
   
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.classeService.getClasseById(this.id).subscribe(async data=>{
      this.classe=data;
      console.log(this.classe)
      this.enseignants= this.classe.enseignant
      console.log("enseig")
      console.log(this.enseignants)
      
    }),
    this.getEtudiants();
   
    //console.log('result',this.etudiantsResults)
  } 

  getEtudiants(){
   //let  results = [];
    console.log("imed")
    this.etudiantService.getEtudiants().subscribe(e=>{
     
        this.etudiants=e;
        for(let i of e){
        
         console.log('etudiant classe //nom',i.classe.nom)
         console.log('etudiant classe //id' ,i.classe._id)
         console.log('classe courant',this.id)
         if (i.classe._id == this.id)
         {
          this.etudiantsResults.push(i)
         }
        }
        console.log('resilts',this.etudiantsResults)
        //this.etudiantsResults = results
          }) 
            }
  
            updateClasse(id:string)
{
 console.log("mouha")
 this.router.navigate(['DirecteurHomeCrech/classes/UpdateClasse',id])
 console.log("eeeeeeeeeeeeeee")
}
    



  }