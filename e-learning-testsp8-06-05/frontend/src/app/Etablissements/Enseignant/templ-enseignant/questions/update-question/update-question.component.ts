import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/_models/question';
import { ClasseService } from 'src/app/_services/classe.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit {
id
d
//question 
registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres ;
  classes ;
  show;
  showFootNote ;
  reponses
  results;
  question: Question= new Question();
  constructor(private route :ActivatedRoute,private questionService :QuestionService,
    private formBuilder: FormBuilder,private classesService:ClasseService,
    private router :Router ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.questionService.getQuestionById(this.id).subscribe(async data=>{
      this.question=data;
      this.results=data.choix
      console.log('data',data)
      console.log('len',this.results.length+1)
      this.registerForm = this.formBuilder.group({
        nom: ['', Validators.required],     
        question: ['', Validators.required],
        choix :this.formBuilder.array([]),
        answer: ['',],
        matiere:  ['', Validators.required],
        //classe: ['', Validators.required],    
        
        //policy_checked: [false, Validators.required],
      });
       for (let i of this.results){
    this.choix().push(this.formBuilder.group({
      numero: i.numero,
      text: i.text,
    }))}
    }),
    this.getMatieres();
  }
  choix() : FormArray {
    return this.registerForm.get("choix") as FormArray
  }
   
  newchoix(): FormGroup {
    return this.formBuilder.group({
      numero: this.results.length+1 ,
      text: '',
    })
  }
   
  addQuantity() {
    this.choix().push(this.newchoix());
  }
   
  removeQuantity(i:number) {
    this.choix().removeAt(i);
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
  this.reponses = this.registerForm.value.choix;
console.log("this",this.reponses)
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
  updateState(){
    // Reset
    this.showFootNote = !this.showFootNote;
  }
  UpdateCours() {
    // let results = [];
    // console.log('1321')
    // //const imagBlob =this.fileInput.nativeElement.files[0];
    // for (let m of this.toutesClasses){
      
    //   console.log('tt',this.registerForm.value.classe);
    //  // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
    //   if(m.selected == true){
    //   console.log("ahaahah")
    //   results.push(m._id)
    //   this.registerForm.value.classe=results;
      
    //     }}
    //   if(results.length == 0)
    //   {
        
    //     this.show =false;
    //   }
    //   else{
    //     this.show=true;
    //   }  
    //   console.log( results.length)
    //const form =new FormData();
    //form.set('file',imagBlob);
    //form.set('nom',this.registerForm.value.nom);
    //form.set('matiere',this.registerForm.value.matiere);
    //form.set('classe',this.registerForm.value.classe);
    //form.set('type',this.product.type);
    //form.set('description',this.product.description);
    //form.set('url',this.product.url);
    //form.set('category',this.product.category.id);

    this.submitted = true;
    console.log("eze",this.registerForm.value)
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    //this.loading = true;
    console.log('enabled');
    console.log("fff",this.registerForm.value.choix)
    console.log("vvvv",this.registerForm.value)
    this.questionService.EditQuestion(this.id ,this.registerForm.value).subscribe(
      (data) => {
        console.log('api done');
        
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/EnseignantHome/questions' , {caller2 : "Modification avec succès"}] )
    }
    onSubmit(){
      console.log("zzz");
      this.UpdateCours();
    }

}
