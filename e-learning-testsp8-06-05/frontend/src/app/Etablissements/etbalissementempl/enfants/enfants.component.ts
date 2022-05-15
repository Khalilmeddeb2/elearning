import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Enfant } from 'src/app/_models/enfant';
import { EnfantService } from 'src/app/_services/enfant.service';

@Component({
  selector: 'app-enfants',
  templateUrl: './enfants.component.html',
  styleUrls: ['./enfants.component.scss']
})
export class EnfantsComponent implements OnInit {

  firstName:string
 lastName:string
 email:string
 taille:number ;
 //nbreEtablissements ;
 
 //lastName:string // comentithom
 //email:string    //comentithom
 //error :boolean=false ;
 //eroorMessage :String="Il faut remplir e champs,il est obligatoire.";
 enfants: Enfant[] = [];
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
 constructor(private enfantService :EnfantService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal) 
 {
   this.route.params.subscribe( (params : Params )=>{
     this.message=params['caller']
     this.message2=params['caller2']

   } )
  }
  
 ngOnInit(): void {
   this.getEnfants();
 }



 getEnfants(){
   console.log("imed")
   this.enfantService.getEnfants().subscribe(e=>{
    
       this.enfants=e;
       for(let i of e){
        this.enabled=i.status
        console.log(i)
       }
         }) 
           }
 


 deleteEnfant(enfant:Enfant)
{
 //console.log("bnsr")
this.enfantService.deleteEnfant(enfant._id).subscribe(e=>
 {
   //console.log("bnsr")
   this.show=true;
   this.getEnfants();
 })
 this.modalService.dismissAll()
} 

updateEnfant(id:string)
{
 console.log("mouha")
 this.router.navigate(['DirecteurHomeCrech/enfants/UpdateEnfant',id])
 console.log("eeeeeeeeeeeeeee")
}


// search()
// {
//  if(this.firstName != "" || this.lastName != "" || this.email != ""  )
//   {
//  this.etudiants = this.etudiants.filter(res=>{
//    return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase()) 
//    || res.lastName.toLocaleLowerCase().match(this.lastName.toLocaleLowerCase()) 
//    || res.email.toLocaleLowerCase().match(this.email.toLocaleLowerCase()
//     ) 
//  })
//   }
//   else if(this.firstName == "" && this.lastName == "" && this.email == "")
//   {
//     this.getEtudiants();
//   }
// }


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
open2(content2) {
 this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
   this.closeResult = `Closed with: ${result}`;
 }, (reason) => {
   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
 });
}



// changeStatus(user:User)
// {
//  console.log("bnsr")
//  this.etudiantService.EditSatutEtudiant(user._id).subscribe(e=>
//    {
//      console.log("bnsr")
//      this.getEtudiants();
//    })
//    this.modalService.dismissAll()
//  } 
 onTableDataChange(event: any) {
   this.page = event;
   this.getEnfants();
 }
 onTableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   this.getEnfants();
 }

}
