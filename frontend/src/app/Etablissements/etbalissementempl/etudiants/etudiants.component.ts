import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/_models/user.model';
import { EtudiantService } from 'src/app/_services/etudiant.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.scss']
})
export class EtudiantsComponent implements OnInit {

 //etbalissement :Etablissement = new Etablissement();
 firstName:string
 lastName:string
 email:string
 taille:number ;
 //nbreEtablissements ;
 
 //lastName:string // comentithom
 //email:string    //comentithom
 //error :boolean=false ;
 //eroorMessage :String="Il faut remplir e champs,il est obligatoire.";
 etudiants: User[] = [];
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
 constructor(private etudiantService :EtudiantService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal) 
 {
   this.route.params.subscribe( (params : Params )=>{
     this.message=params['caller']
     this.message2=params['caller2']

   } )
  }
  
 ngOnInit(): void {
   this.getEtudiants();
 }



 getEtudiants(){
   console.log("imed")
   this.etudiantService.getEtudiants().subscribe(e=>{
    
       this.etudiants=e;
       for(let i of e){
        this.enabled=i.status
        console.log(i)
       }
         }) 
           }
 


 deleteEtudiant(etudiant:User)
{
 //console.log("bnsr")
this.etudiantService.deleteEtudiant(etudiant._id).subscribe(e=>
 {
   //console.log("bnsr")
   this.show=true;
   this.getEtudiants();
 })
 this.modalService.dismissAll()
} 

updateEtudiant(id:string)
{
 console.log("mouha")
 this.router.navigate(['DirecteurHomeCrech/etudiants/UpdateEtudiant',id])
 console.log("eeeeeeeeeeeeeee")
}


search()
{
 if(this.firstName != "" || this.lastName != "" || this.email != ""  )
  {
 this.etudiants = this.etudiants.filter(res=>{
   return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase()) 
   || res.lastName.toLocaleLowerCase().match(this.lastName.toLocaleLowerCase()) 
   || res.email.toLocaleLowerCase().match(this.email.toLocaleLowerCase()
    ) 
 })
  }
  else if(this.firstName == "" && this.lastName == "" && this.email == "")
  {
    this.getEtudiants();
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
open2(content2) {
 this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
   this.closeResult = `Closed with: ${result}`;
 }, (reason) => {
   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
 });
}



changeStatus(user:User)
{
 console.log("bnsr")
 this.etudiantService.EditSatutEtudiant(user._id).subscribe(e=>
   {
     console.log("bnsr")
     this.getEtudiants();
   })
   this.modalService.dismissAll()
 } 
 onTableDataChange(event: any) {
   this.page = event;
   this.getEtudiants();
 }
 onTableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   this.getEtudiants();
 }

}

