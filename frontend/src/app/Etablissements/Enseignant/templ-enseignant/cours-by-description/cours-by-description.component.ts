import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cours } from 'src/app/_models/cours';
import { CoursService } from 'src/app/_services/cours.service';

@Component({
  selector: 'app-cours-by-description',
  templateUrl: './cours-by-description.component.html',
  styleUrls: ['./cours-by-description.component.scss']
})
export class CoursByDescriptionComponent implements OnInit {

 //etbalissement :Etablissement = new Etablissement();
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
 cours: Cours[] = [];
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
 constructor(private coursService :CoursService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal,
  private toastr: ToastrService)
 {
  
  }
  
 ngOnInit(): void {
   this.getCours();
 }



 getCours(){
   console.log("imed")
   this.coursService.getCoursWithDescriptions().subscribe(e=>{
    
       this.cours=e;
       for (let k of e)
       {
         k.datebe= k.date
         console.log(k.datebe)
       }
     
   })
  }
 


 deleteCours(cours:Cours)
{
 //console.log("bnsr")
this.coursService.deleteCours(cours._id).subscribe(e=>
 {
   //console.log("bnsr")
   this.show=true;
   this.toastr.error('Suppression avec succés')
   this.getCours();
 })
 this.modalService.dismissAll()
} 

ViewCours(id:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/cours/ViewCours',id])
 console.log("eeeeeeeeeeeeeee")
}

updateCours(id:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/cours/UpdateCours',id])
 console.log("eeeeeeeeeeeeeee")
}

search()
{
  if(this.nom != "" || this.datebe != "" )
   {
  this.cours = this.cours.filter(res=>{
    return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) ||
    res.datebe.toLocaleLowerCase().match(this.datebe.toLocaleLowerCase())
    
  })
  
   }
   else if(this.nom == "" && this.datebe == "")
   {
     this.getCours();
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
// open2(content2) {
//  this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
//    this.closeResult = `Closed with: ${result}`;
//  }, (reason) => {
//    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//  });
// }



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
   this.getCours();
 }
 onTableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   this.getCours();
 }

}


