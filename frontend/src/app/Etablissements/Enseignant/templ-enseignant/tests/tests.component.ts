import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Test } from 'src/app/_models/test';
import { TestService } from 'src/app/_services/test.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

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
 tests: Test[] = [];
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
 tableSize: number = 25;
 tableSizes: any = [3, 6, 9, 12];
 datebe : string ;
 constructor(private testService :TestService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal,
  private toastr: ToastrService) 
 {
   this.route.params.subscribe( (params : Params )=>{
     this.message=params['caller']
     this.message2=params['caller2']

   } )
  }
  
 ngOnInit(): void {
   this.getTests();
 }



 getTests(){
   console.log("imed")
   this.testService.getTests().subscribe(e=>{
    
       this.tests=e;
      //  for (let k of e)
      //  {
      //    //k.datebe= k.date
      //    console.log(k.datebe)
      //  }
     
   })
  }
 


 deleteTest(test:Test)
{
 //console.log("bnsr")
this.testService.deleteTest(test._id).subscribe(e=>
 {
   //console.log("bnsr")
   this.show=true;
   this.toastr.error('Suppression avec succés')
   this.getTests();
 })
 this.modalService.dismissAll()
} 

ViewTest(id:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/tests/ViewTest',id])
 console.log("eeeeeeeeeeeeeee")
}

updateTest(id:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/tests/UpdateTest',id])
 console.log("eeeeeeeeeeeeeee")
}

VoirNotesEtudiants(id:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/tests/VoirNotes',id])
 console.log("eeeeeeeeeeeeeee")
}

downloadTest(id :string)
{
  console.log("mouha")
 this.router.navigate(['TelechargerTest',id])
 console.log("eeeeeeeeeeeeeee")
}
// search()
// {
//   if(this.nom != "" || this.datebe != "" )
//    {
//   this.cours = this.cours.filter(res=>{
//     return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) ||
//     res.datebe.toLocaleLowerCase().match(this.datebe.toLocaleLowerCase())
    
//   })
  
//    }
//    else if(this.nom == "" && this.datebe == "")
//    {
//      this.getCours();
//    }
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
   this.getTests();
 }
 onTableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   this.getTests();
 }

}
