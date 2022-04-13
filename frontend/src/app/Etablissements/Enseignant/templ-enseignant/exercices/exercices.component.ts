import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exercice } from 'src/app/_models/exercice';
import { ExerciceService } from 'src/app/_services/exercice.service';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.scss']
})
export class ExercicesComponent implements OnInit {

  firstName:string
 lastName:string
 email:string
 taille:number ;
 nom
 //nbreEtablissements ;
 
 //lastName:string // comentithom
 //email:string    //comentithom
 //error :boolean=false ;
 //eroorMessage :String="Il faut remplir e champs,il est obligatoire.";
 exercices: Exercice[] = [];
 //roles :Role [] =[];
 i
 closeResult = '';
 message="";
 message2=""
 message3="Suppression avec succès"
 show :boolean=false;
 enabled;
 page: number = 1;
 count: number = 0;
 tableSize: number = 2;
 tableSizes: any = [3, 6, 9, 12];
 datebe : string ;
 constructor(private exerciceService :ExerciceService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal) 
 {
   this.route.params.subscribe( (params : Params )=>{
     this.message=params['caller']
     this.message2=params['caller2']

   } )
  }
  
 ngOnInit(): void {
   this.getExercices();
 }



 getExercices(){
   console.log("imed")
   this.exerciceService.getExercices().subscribe(e=>{
    
       this.exercices=e;
      
   })
  }
 


 deleteExercice(exercice:Exercice)
{
 //console.log("bnsr")
this.exerciceService.deleteExercice(exercice._id).subscribe(e=>
 {
   //console.log("bnsr")
   this.show=true;
   this.getExercices();
 })
 this.modalService.dismissAll()
} 


updateExercice(id:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/exercices/UpdateExercice',id])
 console.log("eeeeeeeeeeeeeee")
}

ViewExercice(id:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/exercices/ViewExercice',id])
 console.log("eeeeeeeeeeeeeee")
}

search()
{
  if(this.nom != ""  )
   {
  this.exercices = this.exercices.filter(res=>{
    return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase())
    
  })
  
   }
   else if(this.nom == "")
   {
     this.getExercices();
   }
}


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
   this.getExercices();
 }
 onTableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   this.getExercices();
 }

}
