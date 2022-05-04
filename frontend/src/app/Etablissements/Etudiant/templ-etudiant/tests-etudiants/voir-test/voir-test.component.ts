import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { QuestionClass } from 'src/app/question-class';
import { NoteEtudiant } from 'src/app/_models/note-etudiant';
import { NoteEtudiantService } from 'src/app/_services/note-etudiant.service';
import { TestService } from 'src/app/_services/test.service';

@Component({
  selector: 'app-voir-test',
  templateUrl: './voir-test.component.html',
  styleUrls: ['./voir-test.component.scss']
})
export class VoirTestComponent implements OnInit {
  //date:Date;
  date=new Date();
  id
d
test
questions;
isQuestionCardShow: boolean = false;
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
  id0;
  ids
dateAuj =new Date() ;
  d2 : string; 
  d1 ;
  dateTest ;
  etat;
  constructor(private TestService:TestService,private route: ActivatedRoute,private modalService: NgbModal,
    private router:Router,private noteService :NoteEtudiantService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.dateAuj.toISOString(); 
    //this.date=Date.now();
    console.log("ff",this.date)
    this.d=this.TestService.getTestById(this.id).subscribe(async data=>{
      this.test=data;
      console.log('data',data)
      console.log('titre',this.test.titre)
      console.log('questions',data.question)
      console.log('temps',data.temps)
      console.log('datetest',data.dateFin)
      this.etat=data.verif;
      this.date
      console.log('etat',this.etat)
      
      console.log("date mill",data.dateFin)
     // console.log("dd niow",this.date.getMilliseconds()>data.dateFin.getMilliseconds())
      this.questions=data.question
      this.counter =data.temps
      this.dateTest=data.dateFin;
      console.log("dd",this.date.toISOString().substring(0,10)> this.dateTest.toString().substring(0,10))
      this.id0=this.router.url.split('/');
        //console.log(this.id0[2])
        this.ids=this.id0[2]
      //this.startCounter()
    })

}
compareDate(d1,d2)
{
  if(d1 > d2)
  return true
  else
  return false;
}

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
  this.saveScore(this.score)
  this.interval$.unsubscribe()

  this.submitModal.show();
  //this.stopCounter()
  //
  
}
saveScore(note)
  {
    console.log("yee score")
    this.noteService.SaveScoreEtudiant(this.id,note).subscribe(data=>{
      console.log("score",data)
       
     })
  }
onChange(){
    console.log(this.exercices[0].choix)
}
updateTest(id)
{
    this.TestService.updateDoneTest(id).subscribe(e=>{
      console.log(e)
    })
} 
startQuiz() {
  if(this.compareDate(this.date.toISOString().substring(0,10), this.dateTest.toString().substring(0,10)) == false)
  {
  if(this.etat ==false)
  {
  this.updateTest(this.id)
    console.log("yeeeeeeeeeeeeeeeees")
  this. startCounter()
  console.log(this.questions)
  this.questions;

  this.questionTest.reset();
  this.isQuestionCardShow = true;
  }
  else{
     this.showEroorTest();
  }
  }
  else{
    this.showEroorTestDate();
  }
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
  //this.submitTest();
   
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
    this.router.navigate(['EtudiantHome/'+this.ids+'/tests'])
  }

  close1(){
    this.router.navigate(['EtudiantHome/'+this.ids+'/tests'])
  }
  startCounter()
  {
    this.interval$ = interval(1000).subscribe(val=>{
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
   /// this.submitTest()
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


  showEroorTest() {
    //this.toastr.success('Hello world!', 'Toastr fun!');
    this.toastr.error( 'Vous avez passer le test',this.test.nom ,{
      timeOut: 7000,
    })
  }

  showEroorTestDate() {
    //this.toastr.success('Hello world!', 'Toastr fun!');
    this.toastr.error( 'Vous avez dépasser la date du test',this.test.nom ,{
      timeOut: 7000,
    })
  }

}
