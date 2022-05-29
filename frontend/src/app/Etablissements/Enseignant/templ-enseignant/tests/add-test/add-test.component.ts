import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Matiere } from 'src/app/_models/matiere';
import { Test } from 'src/app/_models/test';
import { ClasseService } from 'src/app/_services/classe.service';
import { MatiereService } from 'src/app/_services/matiere.service';
import { QuestionService } from 'src/app/_services/question.service';
import { TestService } from 'src/app/_services/test.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {

  //cours :Cours =new Cours();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres ;
  classes ;
  show;
  showFootNote 
  test: Test= new Test();
  questions;
  af :string="||";
  matResults ="";
  questionsResults: any;
  selecteMat :Matiere;//="623725340602761b21ffee30"
  d : string; 
  d1 : string;
  matiere
  toutesQuestions;
  dateAuj = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private classesService:ClasseService,
    private testService:TestService,
    private matiereService :MatiereService,
    private toastr: ToastrService
  ) { 
   
  }

  ngOnInit(): void {
     //console.log(':',this.newchoix())
     this.d=this.dateAuj.toISOString();
     this.d1= (this.dateAuj.toISOString()).substr(0, 10);
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      titre: ['', Validators.required],
      matiere  : [''],   
      question: ['', Validators.required],
      // choix :this.formBuilder.array([]),
      // answer: ['', Validators.required],
      // matiere:  ['', Validators.required],
      classe: ['', Validators.required],   
      dateFin : ['', Validators.required],
      // temps: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern('[- +()0-9]+'),
      //   ],
      // ],
      //temps : ['', Validators.required,Validators.pattern('[- +()0-9]+')],
      temps: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern('[- +()0-9]+'),
        ],
      ],
      //policy_checked: [false, Validators.required],
    });
    
    console.log("rer",this.matResults) 
  this.getMatieres();  
    this.getclasses();
    this.getquestionsByMatiere();
    //this.getquestionsByMatiere();
   
  }

   onChangeMat(val){
    console.log('selected in change',val)
    if(!this.selecteMat)
      this.questions = []
      else
     this.questionService.getQuestionsByMatiere(val).subscribe(e=>{
      this.questions=e;console.log('quest in change',this.questions)})
    
  }     
  getMatieres(){
    console.log("les matieres")
      this.classesService.getMatieresByEnseignant().subscribe(e=>{
        this.matieres=e;
        //this.test.matiere.id = e[0]._id
        this.selecteMat=e[0];

          console.log("matiere")
          console.log(e[0])
          console.log('selected in init',this.selecteMat)
       
      
             })
    }
    getclasses(){
      //console.log("mouha")
        this.classesService.getClasseByEnseignant().subscribe(e=>{
          this.classes=e;
          this.test.question.id = e[0]._id
  
            console.log("brb")
            console.log(e)
         
         
        
              })
      }

      

      getquestionsByMatiere(){
        console.log("rere",this.matResults)

          this.questionService.getQuestionsByMatiere(this.selecteMat._id).subscribe(e=>{
           this.questions=e;
            console.log('azz',this.questionsResults)
            //this.exercice.question.id = e[0]._id
    
              console.log("brb")
              console.log(e)
           
           
          
                })
        }



     

  get fval_2() {
    return this.registerForm.controls;
  }
//   onChange()
//   {
//  console.log(this.classes)
//   }
onChange()
{
//console.log(this.classes)
console.log(this.questions)

}

onChange2()
{ 
  this.matResults = this.registerForm.value.matiere;
console.log("this",this.matResults)
}

  saveTest() {
     let results = [];
     let results2 =[];
    // const imagBlob =this.fileInput.nativeElement.files[0];
     for (let m of this.classes){
      
       console.log('tt',this.registerForm.value.classe);
    //  // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
       if(m.selected == true){
    //   console.log("ahaahah")
       results.push(m._id)
      this.registerForm.value.classe=results;
      
       }}
      if(results.length == 0)
      {
        
       this.show =false;
       }
      else{
         this.show=true;
      }  

      for (let q of this.questions){
      
          console.log('qq',q._id);
        //  // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
           if(q.selected == true){
            console.log("trué")
           results2.push(q._id)
          this.registerForm.value.question=results2;
          
           }}
          // if(results2.length == 0)
          // {
            
          //  this.show =false;
          //  }
          // else{
          //    this.show=true;
          // }  
    //this.registerForm.value.matiere="6234a7f9514fa0e882326481"
    console.log("ooo",this.registerForm.value)
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    //this.loading = true;
    console.log('enabled');
   // console.log('form',imagBlob.name)
   //this.registerForm.value.choix=[{numero:1,text:"choix1"}]
   console.log(this.registerForm.value.question)
  
    this.testService.createTest(this.registerForm.value).subscribe(
      (data) => {
        //console.log('form11',imagBlob)
        console.log('api done');
        this.toastr.success('Ajout avec succés')
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/EnseignantHome/tests'])
    }
    onSubmit(){
      console.log("zzz");
      this.saveTest();
    }
}