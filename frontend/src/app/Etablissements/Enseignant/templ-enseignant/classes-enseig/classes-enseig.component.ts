import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/_models/classe';
import { Matiere } from 'src/app/_models/matiere';
import { User } from 'src/app/_models/user.model';
import { ClasseService } from 'src/app/_services/classe.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-classes-enseig',
  templateUrl: './classes-enseig.component.html',
  styleUrls: ['./classes-enseig.component.scss']
})
export class ClassesEnseigComponent implements OnInit {

  //etbalissement :Etablissement = new Etablissement();
 nom:string
 numeroRegister:string
 pays:string
 taille:number ;
 //nbreEtablissements ;
 
 //lastName:string // comentithom
 //email:string    //comentithom
 //error :boolean=false ;
 //eroorMessage :String="Il faut remplir e champs,il est obligatoire.";
 classes :Classe [] =[] ;
 page: number = 1;
count: number = 0;
tableSize: number = 2;
tableSizes: any = [3, 6, 9, 12];
  currentUser: User
  type;
  test ="créche"

 constructor(private classeService :ClasseService ,private router :Router, private etudiantService :EtudiantService,private token :TokenStorageService) 
 {}

 ngOnInit(): void {
  // this.currentUser = this.token.getUser();
  // console.log("::",this.currentUser[0])
  // console.log("typeEtbali",this.currentUser[0].etablissement.type)
  // this.type=this.currentUser[0].etablissement.type
   this.getClasses();
     this.currentUser = this.token.getUser();
   console.log("::",this.currentUser[0])
   console.log("typeEtbali",this.currentUser[0].etablissement.type)
  this.type=this.currentUser[0].etablissement.type
 }

 getClasses(){
   console.log("imed")
   this.classeService.getClasseByEnseignant().subscribe(e=>{
       this.classes=e;
       console.log(e)
       
         })   
 }

 

 viewListesEtudiants(id:string)
 {
  console.log("mouha")
  this.router.navigate(['EnseignantHome/classes/ListesEtudiants',id])
  console.log("eeeeeeeeeeeeeee")
 }

 viewListesEnfants(id:string)
 {
  console.log("mouha")
  this.router.navigate(['EnseignantHome/classes/ListesEnfants',id])
  console.log("eeeeeeeeeeeeeee")
 }



}
