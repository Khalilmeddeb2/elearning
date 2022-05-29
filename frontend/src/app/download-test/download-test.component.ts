import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { QuestionClass } from '../question-class';
import { TestService } from '../_services/test.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-download-test',
  templateUrl: './download-test.component.html',
  styleUrls: ['./download-test.component.scss']
})
export class DownloadTestComponent implements OnInit {

  
  id
d
test
questions;
isQuestionCardShow: boolean = false;
/////////////////
@ViewChild('content', {static:false}) el!: ElementRef;

/////////////////////
	totalAnswered: number = 0;
	rightAnswer: number;
  score :Number= 0;
	questionObj = new QuestionClass();
	//@ViewChild('submitModal') submitModal: ModalDirective;
	//@ViewChild('addQuestionModal') addQuestionModal : ModalDirective;
	//@ViewChild('answerModal') answerModal : ModalDirective;
	@ViewChild('questionForm') questionForm: any;
	@ViewChild('questionTest') questionTest : any;
	submitModal: any;
	addQuestionModal: any;
	answerModal: any;
	//content;
	closeResult: string;
	exercices;
  interval$ :any;
  counter;
  content2
  
  constructor(private testService:TestService,private route: ActivatedRoute,private modalService: NgbModal,
    private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.testService.getTestById(this.id).subscribe(async data=>{
      this.test=data;
      console.log('data',data)
      console.log('titre',this.test.titre)
      console.log('questions',data.question)
      console.log('temps',data.temps)
      this.questions=data.question
      this.counter =data.temps
      //this.startCounter()
    })

}

makePDF(id)
{

  let pdf =new jsPDF ('p','pt','a1');
   console.log("helo")
  pdf.html(this.el.nativeElement,{
    callback:(pdf)=>{
      console.log("he")
    pdf.save("test.pdf")
    }
  }
  )
  
 
}

/////////////

submitTest() {
  console.log("azerty")
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
          this.score=+((this.rightAnswer/this.questions.length)*100).toFixed(2); 
        //this.score=this.exerciceService.updateScore(this.id); 
         

        }   
        
         }
        
    }
   
    // this.score=(this.rightAnswer*100)/this.exercices.length();
  }

  this.submitModal.show();
  this.stopCounter()
  //
  
}

onChange(){
    console.log(this.exercices[0].choix)
}

startQuiz() {
  this. startCounter()
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
    this.router.navigate(['EnseignantHome/tests'])
  }

  close1(){
    this.router.navigate(['EnseignantHome/tests'])
  }
  startCounter()
  {
    this.interval$ = interval(60000).subscribe(val=>{
      // intervall 1000 /60000
      this.counter --;
      if(this.counter === 0)
      {
       // this.submitTest();
       this.stopCounter()
       //this.submitTest();
       this.al()
        console.log("byebye")
        

        
      }
    });
    setTimeout(() => {
       this.interval$.unsubscribe()
    }, 6000000)
  }
   

  stopCounter()
  {
    this.interval$.unsubscribe()
    this.counter =0;
    document.getElementById("pres").click();
    this.submitTest()
  }

  resetCounter()
  {
    this.stopCounter()
    this.counter =60;
    this.startCounter()
  }

  al()
  {
    console.log("eee")
    //this.ngOnInit()

  }

  updateTestPublish(id)
  {
    this.testService.updateTestPublish(id).subscribe(e=>{
    console.log("rrrrr")
    // toastar 
    })
    this.toastr.success('le test est publiée')
    this.modalService.dismissAll();
    this.ngOnInit();
  }

}