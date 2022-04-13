import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QuestionClass } from 'src/app/question-class';
import { Cours } from 'src/app/_models/cours';
import { Exercice } from 'src/app/_models/exercice';
import { ClasseService } from 'src/app/_services/classe.service';
import { CoursService } from 'src/app/_services/cours.service';
import { ExerciceService } from 'src/app/_services/exercice.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.scss']
})
export class AddExerciceComponent implements OnInit {

  //cours :Cours =new Cours();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres ;
  classes ;
  show;
  showFootNote 
  exercice: Exercice= new Exercice();
  questions;
  af :string="||";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private classesService:ClasseService,
    private exerciceService:ExerciceService
    
    //private toastr: ToastrService
  ) { 
   
  }

  ngOnInit(): void {
  
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],     
      question: ['', Validators.required],
      // choix :this.formBuilder.array([]),
      // answer: ['', Validators.required],
      // matiere:  ['', Validators.required],
      classe: ['', Validators.required],    
      
      //policy_checked: [false, Validators.required],
    });
    this.getquestions();
    this.getclasses();
    //console.log(':',this.newchoix())
   
  }

  choix() : FormArray {
    return this.registerForm.get("choix") as FormArray
  }
   
  newchoix(): FormGroup {
    return this.formBuilder.group({
      numero: '',
      text: '',
    })
  }
   
  addQuantity() {
    this.choix().push(this.newchoix());
  }
   
  removeQuantity(i:number) {
    this.choix().removeAt(i);
  }

  // getMatieres(){
  //   console.log("imed")
  //     this.classesService.getMatieresByEnseignant().subscribe(e=>{
  //       this.matieres=e;
  //       this.exercice.matiere.id = e[0]._id

  //         console.log("ert")
  //         console.log(e)
       
       
      
  //            })
  //   }
    getclasses(){
      //console.log("mouha")
        this.classesService.getClasseByEnseignant().subscribe(e=>{
          this.classes=e;
          this.exercice.question.id = e[0]._id
  
            console.log("brb")
            console.log(e)
         
         
        
              })
      }

      getquestions(){
        console.log("mouha")
          this.questionService.getQuestions().subscribe(e=>{
            this.questions=e;
            console.log(this.questions)
            this.exercice.question.id = e[0]._id
    
              console.log("brb")
              console.log(e)
           
           
          
                })
        }



      // updateState(){
      //   // Reset
      //   this.showFootNote = !this.showFootNote;
      // }

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

  saveExercice() {
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
    this.exerciceService.createExercice(this.registerForm.value).subscribe(
      (data) => {
        //console.log('form11',imagBlob)
        console.log('api done');
        
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/EnseignantHome/exercices' , {caller : "Ajout avec succès"}])
    }
    onSubmit(){
      console.log("zzz");
      this.saveExercice();
    }
}
