import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/_models/question';
import { ClasseService } from 'src/app/_services/classe.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres ;
  classes ;
  show;
  showFootNote 
  question: Question= new Question();
  reponses=["aaa","bbb"];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private coursService: CoursService,
    private classesService:ClasseService,
    private questionService:QuestionService
    
    //private toastr: ToastrService
  ) { 
   
  }

  ngOnInit(): void {
  
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],     
      question: ['', Validators.required],
      choix :this.formBuilder.array([]),
      answer: ['', Validators.required],
      matiere:  ['', Validators.required],
      //classe: ['', Validators.required],    
      
      //policy_checked: [false, Validators.required],
    });
    this.getMatieres();
    //this.getclasses();
    
    //console
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

  getMatieres(){
    console.log("imed")
      this.classesService.getMatieresByEnseignant().subscribe(e=>{
        this.matieres=e;
        this.question.matiere.id = e[0]._id

          console.log("ert")
          console.log(e)
       
       
      
             })
    }
    // getclasses(){
    //   console.log("mouha")
    //     this.classesService.getClasseByEnseignant().subscribe(e=>{
    //       this.classes=e;
    //       this.exercice.matiere.id = e[0]._id
  
    //         console.log("brb")
    //         console.log(e)
         
         
        
    //           })
    //   }


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
  this.reponses = this.registerForm.value.choix;
console.log("this",this.reponses)
}


  saveExercice() {
    //  let results = [];
    // // const imagBlob =this.fileInput.nativeElement.files[0];
    //  for (let m of this.classes){
      
    // //   console.log('tt',this.registerForm.value.classe);
    // //  // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
    //    if(m.selected == true){
    // //   console.log("ahaahah")
    //    results.push(m._id)
    //   this.registerForm.value.classe=results;
      
    //    }}
    //   if(results.length == 0)
    //   {
        
    //    this.show =false;
    //    }
    //   else{
    //      this.show=true;
    //   }  
    //   console.log( results.length)
    // const form =new FormData();
    // form.set('file',imagBlob);
    // form.set('nom',this.registerForm.value.nom);
    // form.set('matiere',this.registerForm.value.matiere);
    // form.set('classe',this.registerForm.value.classe);
    //form.set('type',this.product.type);
    //form.set('description',this.product.description);
    //form.set('url',this.product.url);
    //form.set('category',this.product.category.id);
   
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
   //console.log(this.registerForm.value)
   console.log("fff",this.registerForm.get("choix") as FormArray)
    this.questionService.createQuestion(this.registerForm.value).subscribe(
      (data) => {
        //console.log('form11',imagBlob)
        console.log('api done');
        
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/EnseignantHome/questions' , {caller : "Ajout avec succès"}])
    }
    onSubmit(){
      console.log("zzz");
      this.saveExercice();
    }
   
}
