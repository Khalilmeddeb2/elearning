import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Question } from 'src/app/_models/question';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

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
 questions: Question[] = [];
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
 constructor(private questionsService :QuestionService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal) 
 {
   this.route.params.subscribe( (params : Params )=>{
     this.message=params['caller']
     this.message2=params['caller2']

   } )
  }
  
 ngOnInit(): void {
   this.getQuestions();
 }



 getQuestions(){
   console.log("imed")
   this.questionsService.getQuestions().subscribe(e=>{
    
       this.questions=e;
      
   })
  }
 


 deleteQuestion(question :Question)
{
 //console.log("bnsr")
this.questionsService.deleteQuestion(question._id).subscribe(e=>
 {
   //console.log("bnsr")
   this.show=true;
   this.getQuestions();
 })
 this.modalService.dismissAll()
} 


// updateExercice(id:string)
// {
//  console.log("mouha")
//  this.router.navigate(['EnseignantHome/cours/UpdateCours',id])
//  console.log("eeeeeeeeeeeeeee")
// }

search()
{
  if(this.nom != ""  )
   {
  this.questions = this.questions.filter(res=>{
    return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase())
    
  })
  
   }
   else if(this.nom == "")
   {
     this.getQuestions();
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
   this.getQuestions();
 }
 onTableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   this.getQuestions();
 }

}
