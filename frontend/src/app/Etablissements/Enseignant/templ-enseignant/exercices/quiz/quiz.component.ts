import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QuestionClass } from 'src/app/question-class';
import { ExerciceService } from 'src/app/_services/exercice.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {


  isQuestionCardShow: boolean = false;
	totalAnswered: number = 0;
	rightAnswer: number;
  score=0;
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
	

	constructor( private toastr: ToastrService,private modalService: NgbModal, private exerciceService :ExerciceService) { }

	answerArray = [];

	allQuestions: any = [{
		"id": 1,
		"question": "What is the capital of Belgium?",
		"a": "Vienna",
		"b": "Berlin",
		"c": "Brussels",
		"d": "Prague",
		"answer": "c"
	},
	{
		"id": 2,
		"question": "What is the capital of Australia?",
		"a": "Vienna",
		"b": "Canberra",
		"c": "Brussels",
		"d": "Prague",
		"answer": "b"
	},
	{
		"id": 3,
		"question": "What is the capital of Bulgaria?",
		"a": "Vienna",
		"b": "Sofia",
		"c": "Brussels",
		"d": "Prague",
		"answer": "b"
	}
	];

	/**Method call on submit the test */
	submitTest() {
		this.rightAnswer = 0;
		this.totalAnswered = 0;
		for ( let ex of this.exercices)

		    {

				console .log("verfiee",ex.answer)
				for ( let c of ex.choix)

		    {
				if (c.selected == true)
				   {
					   console.log("s7i7a",c.text)
					this.totalAnswered++;  
					if (c.text === ex.answer)
					{
						console.log("babbba",)
					 this.rightAnswer++;  
					 

					}   
				   }
				  
			}
     
      // this.score=(this.rightAnswer*100)/this.exercices.length();
		}
	
		this.submitModal.show();

	}
	onChange(){
      console.log(this.exercices[0].choix)
	}

	startQuiz() {
		this.exerciceService.getExercices().subscribe(e=>{
		 
			this.exercices=e;
			 console.log(e[0].choix.selected)
			  }) 

		this.questionTest.reset();
		this.isQuestionCardShow = true;

	}
	//














	//
	HomePage() {
		this.isQuestionCardShow = false;
	}
	addQuestion(){
		this.addQuestionModal.show();
	}
	submitAddQuestion(){
		
		let quesTemp = JSON.parse(JSON.stringify(this.questionObj));
		
		quesTemp["id"] = this.allQuestions.length+1;
		
		this.allQuestions.push(quesTemp);
		console.log("lll")
		//this.questionForm = new this.questionForm();
		this.modalService.dismissAll()
		this.toastr.success("Question Added Successfully!!");
		//this.addQuestionModal.hide();

	}
	checkAnswers(){
		this.submitModal.hide();
		this.answerModal.show();
	}

	ngOnInit() {

         this.getExercices();

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


	   getExercices(){
		console.log("imed")
		this.exerciceService.getExercices().subscribe(e=>{
		 
			this.exercices=e;
			console.log(e[0].answer)
			  }) 
				}

}
