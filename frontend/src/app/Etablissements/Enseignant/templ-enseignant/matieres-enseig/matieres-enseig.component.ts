import { Component, OnInit } from '@angular/core';
import { Matiere } from 'src/app/_models/matiere';
import { ClasseService } from 'src/app/_services/classe.service';

@Component({
  selector: 'app-matieres-enseig',
  templateUrl: './matieres-enseig.component.html',
  styleUrls: ['./matieres-enseig.component.scss']
})
export class MatieresEnseigComponent implements OnInit {

  nom:string
  numeroRegister:string
  pays:string
  taille:number ;
  //nbreEtablissements ;
  
  //lastName:string // comentithom
  //email:string    //comentithom
  //error :boolean=false ;
  //eroorMessage :String="Il faut remplir e champs,il est obligatoire.";
  matieres :Matiere [] =[] ;
  page: number = 1;
 count: number = 0;
 tableSize: number = 10;
 tableSizes: any = [3, 6, 9, 12];
 
  constructor(private classeService :ClasseService) 
  {}
 
  ngOnInit(): void {
    this.getMatieres();
  }
 
  getMatieres(){
    console.log("imed")
    this.classeService.getMatieresByEnseignant().subscribe(e=>{
        this.matieres=e;
        console.log(e[0].nom)
          })   
  }

  search()
{
  if(this.nom != ""  )
   {
  this.matieres = this.matieres.filter(res=>{
    return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) })
  
   }
   else if(this.nom == "")
   {
     this.getMatieres();
   }
}


onTableDataChange(event: any) {
  this.page = event;
  this.getMatieres();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getMatieres();
}

}
