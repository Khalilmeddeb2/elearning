import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Exercice } from 'src/app/_models/exercice';
import { ClasseService } from 'src/app/_services/classe.service';
import { ExerciceService } from 'src/app/_services/exercice.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-get-matiere',
  templateUrl: './get-matiere.component.html',
  styleUrls: ['./get-matiere.component.scss']
})
export class GetMatiereComponent implements OnInit {

  exercice :Exercice =new Exercice();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  questions ;
  classes ;
  show;
  id;
  d
  toutesClasses;
  toutesQuestions;
  mat;
  matieres
  closeResult: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private exerciceService: ExerciceService,
    private classesService:ClasseService,
    private QuestionsService :QuestionService,
    private modalService: NgbModal,
    private classeService :ClasseService,

    
    //private toastr: ToastrService
  ) { 
    //this.user.role = new Role();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    //console.log(this.id)
    this.d=this.exerciceService.getExerciceById(this.id).subscribe(async data=>{
      this.exercice=data;
      console.log('data',data.matiere)
     
    }),
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
     
      //matiere:  ['',Validators.required],
      classe :[''],
      question :[''],
    });
    this.getMatieres();
    
 
}
open2(content2) {
  this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'});

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
get fval_2() {
  return this.registerForm.controls;
}


getMatieres(){
  console.log("imed")
    this.classeService.getMatieresByEnseignant().subscribe(e=>{
      this.matieres=e;
      //this.exercices.matiere.id = e[0]._id

        console.log("ert")
        console.log(e)
     
     
    
           })
  }
  onChange2()
  { 
    for(let i of this.matieres)
    {
      i.selected = false;
    }
    //this.matResults = this.registerForm.value.matiere;
  console.log("this",this.matieres)
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
   }

   updateExercice(idmat:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/exercices/UpdateExercice',idmat])
 console.log("eeeeeeeeeeeeeee")
}

}
