import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionClass } from 'src/app/question-class';
import { ExerciceService } from 'src/app/_services/exercice.service';

@Component({
  selector: 'app-view-exercice',
  templateUrl: './view-exercice.component.html',
  styleUrls: ['./view-exercice.component.scss']
})
export class ViewExerciceComponent implements OnInit {
id
d
exercice
questions;
isQuestionCardShow: boolean = false;
	totalAnswered: number = 0;
	rightAnswer: number;
  score:any;
	questionObj = new QuestionClass();
	//@ViewChild('submitModal') submitModal: ModalDirective;
	//@ViewChild('addQuestionModal') addQuestionModal : ModalDirective;
	//@ViewChild('answerModal') answerModal : ModalDirective;
	@ViewChild('questionForm') questionForm: any;
	@ViewChild('questionTest') questionTest : any;
	submitModal: any;
	addQuestionModal: any;
	answerModal: any;
	content;
	closeResult: string;
	exercices;
  constructor(private exerciceService:ExerciceService,private route: ActivatedRoute,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.exerciceService.getExerciceById(this.id).subscribe(async data=>{
      this.exercice=data;
      console.log('data',data)
      console.log('questions',data.question)
      this.questions=data.question
    })

}

submitTest() {
  this.rightAnswer = 0;
  this.totalAnswered = 0;
  for ( let ex of this.questions)

      {

      console .log("verfiee",ex.answer)
      for ( let c of ex.choix)

      {
      if (c.selected == true)
         {
           console.log("s7i7a",c.text)
        this.totalAnswered++;  
        c.selected == false
        if (c.text === ex.answer)
        {
          console.log("babbba",)
         this.rightAnswer++; 
          this.score=((this.rightAnswer/this.questions.length)*100).toFixed(2); 
        //this.score=this.exerciceService.updateScore(this.id); 
         

        }   
         }
        
    }
   
    // this.score=(this.rightAnswer*100)/this.exercices.length();
  }

  this.submitModal.show();
  //
  
}

onChange(){
    console.log(this.exercices[0].choix)
}

startQuiz() {
  console.log(this.questions)
  this.questions;

  this.questionTest.reset();
  this.isQuestionCardShow = true;

}
//














//
HomePage() {
  this.isQuestionCardShow = false;
  this.ngOnInit()
}
addQuestion(){
  this.addQuestionModal.show();
}

checkAnswers(){
  this.submitModal.hide();
  this.answerModal.show();
}


open(content) {
   
  this.modalService.open(content, { size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
   }
   open2(content2) {
    
  this.modalService.open(content2).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  this.submitTest();
   
   }

   open3(content3) {
    
  this.modalService.open(content3).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  this.submitTest();
   
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
close(){
  this.modalService.dismissAll();
  this.ngOnInit();
}

   
}
