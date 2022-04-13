import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Classe } from 'src/app/_models/classe';
import { ClasseService } from 'src/app/_services/classe.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

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
 classes: Classe[] = [];
 //roles :Role [] =[];
 i
 closeResult = '';
 message="";
 message2=""
 message3="Suppression avec succès "
 show :boolean=false;
 page: number = 1;
count: number = 0;
tableSize: number = 2;
tableSizes: any = [3, 6, 9, 12];
 constructor(private classeService :ClasseService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal) 
 {
  this.route.params.subscribe( (params : Params )=>{
    this.message=params['caller']
    this.message2=params['caller2']

  } )
 }

 ngOnInit(): void {
   /*if (!localStorage.getItem('page_js')) {
     localStorage.setItem('page_js', 'no reload');
     location.reload();
     console.log(localStorage.getItem('page_js'));
   } else {
     localStorage.removeItem('page_js');
   }*/
   this.getClasses();
   //this.taille=this.etbalissements.length;
   //console.log(this.taille)
   
   //this.taille;
   //console.log(this.taille)
   //console.log( this.etbalissements)
   
   
 }



 getClasses(){
   console.log("imed")
   this.classeService.getClasses().subscribe(e=>{
    
       this.classes=e;
       //this.taille=e.length
       //console.log(this.taille)
      
       for(let i of e){
         console.log(i)
         //////////this.roles.push(i.role)
         /////console.log("aymen")
         //////console.log(this.roles)
         //et types =this.roles}
       
         for ( let m of i.enseignant)
         {
           //console.log(m)
           console.log(m.firstName)
          
         }
                   console.log("///////////")
       
       }
         })
        
 }
 


 deleteClasse(classe:Classe)
{
 console.log("bnsr")
this.classeService.deleteClasse(classe._id).subscribe(e=>
 {
   console.log("bnsr")
   this.show=true
   this.getClasses();
 })
 this.modalService.dismissAll()
} 

updateClasse(id:string)
{
 console.log("mouha")
 this.router.navigate(['DirecteurHomeCrech/classes/UpdateClasse',id])
 console.log("eeeeeeeeeeeeeee")
}

viewClasse(id:string)
{
 console.log("mouha")
 this.router.navigate(['DirecteurHomeCrech/classes/ViewClasse',id])
 console.log("eeeeeeeeeeeeeee")
}

search()
{
  if(this.nom != ""  )
   {
  this.classes = this.classes.filter(res=>{
    return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) })
  
   }
   else if(this.nom == "")
   {
     this.getClasses();
   }
}


/*search()
{
 if(this.firstName != "" || this.numeroRegister != "" || this.pays != "" )
  {
 this.etbalissements = this.etbalissements.filter(res=>{
   return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase()) 
   || res.numeroRegister.toLocaleLowerCase().match(this.numeroRegister.toLocaleLowerCase()) 
   || res.pays.toLocaleLowerCase().match(this.pays.toLocaleLowerCase()
    ) 
 })
  }
  else if(this.firstName == "" && this.numeroRegister == "" && this.pays == "")
  {
    this.getEtablissements();
  }
}*/

open(content) {
 this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
   this.closeResult = `Closed with: ${result}`;
 }, (reason) => {
   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
 });
}

private getDismissReason(reason: any): string {
 if (reason === ModalDismissReasons.ESC) {
   return 'by pressing ESC';
 } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
   return 'by clicking on a backdrop';
 } else {
   return `with: ${reason}`;
 }
}
onTableDataChange(event: any) {
  this.page = event;
  this.getClasses();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getClasses();
}

}
