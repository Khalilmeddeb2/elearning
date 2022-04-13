import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from 'src/app/_models/cours';
import { Exercice } from 'src/app/_models/exercice';
import { ClasseService } from 'src/app/_services/classe.service';
import { CoursService } from 'src/app/_services/cours.service';
import { ExerciceService } from 'src/app/_services/exercice.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-update-exercice',
  templateUrl: './update-exercice.component.html',
  styleUrls: ['./update-exercice.component.scss']
})
export class UpdateExerciceComponent implements OnInit {

  exercice :Exercice =new Exercice();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres ;
  classes ;
  show;
  id;
  d
  toutesClasses;
  imagBlob;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private exerciceService: ExerciceService,
    private classesService:ClasseService,
    
    
    //private toastr: ToastrService
  ) { 
    //this.user.role = new Role();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.exerciceService.getExerciceById(this.id).subscribe(async data=>{
      this.exercice=data;
      console.log('data',data)
      //console.log('nom :',data.nom)
      //console.log('matiere :',data.matiere.nom)
      //console.log('file :',data.filename)
      //this.imagBlob=data.originalname
      console.log('classe :',data.classe)
      this.classes= this.exercice.classe
      console.log("classes")
      console.log(this.classes)
      this.toutesClasses = await this.classesService.getClasseByEnseignant().toPromise();
      for(let i of  this.toutesClasses.keys()){
        console.log('toutes')
        let index = this.classes.findIndex(m=>m._id == this.toutesClasses[i]._id);
        console.log("index")
        console.log(index != -1)
        this.toutesClasses[i].selected=index!=-1;      
      }

      console.log('toutes',this.toutesClasses)
    }),
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
     
      matiere:  ['',Validators.required],
      classe :[''],
      description :[''],
    });
    
 
}
onSubmit(){}
   

}
