import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/_services/classe.service';
import { CoursService } from 'src/app/_services/cours.service';
import { ExerciceService } from 'src/app/_services/exercice.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-enseignant-home',
  templateUrl: './enseignant-home.component.html',
  styleUrls: ['./enseignant-home.component.scss']
})
export class EnseignantHomeComponent implements OnInit {
nbreClasses;
nbreMatieres;
nbreCours;
nbreDoucuments
nbreExercices;
nbreQuestions;
  constructor(private classeService :ClasseService,private coursService :CoursService,
    private exerciceService :ExerciceService,private questionService :QuestionService
    ) { }

  ngOnInit(): void {
    // if (!localStorage.getItem('page_js')) {
    //   localStorage.setItem('page_js', 'no reload');
    //   location.reload();
    //   console.log(localStorage.getItem('page_js'));
    // } else {
    //   localStorage.removeItem('page_js');
    // }
    this.totalClasses();
    this.totalMatieres();
    this.totalCours()
    this.totalExercices();
    this.totalQuestions();
    this.totalDoucuments();
    
  }

totalClasses()
{
  console.log("e")
  this.classeService.getNumberclassesByEnseignant().subscribe(data =>{
    console.log(data);

    this.nbreClasses=data;
    console.log(this.nbreClasses);
  })
}

totalMatieres()
{
  console.log("e")
  this.classeService.getNumberMatieresByEnseignant().subscribe(data =>{
    console.log(data);

    this.nbreMatieres=data;
    console.log(this.nbreMatieres);
  })
}

totalCours()
{
  console.log("e")
  this.coursService.totalCours().subscribe(data =>{
    console.log(data);

    this.nbreCours=data;
    console.log(this.nbreCours);
  })
}

totalDoucuments()
{
  //nbreDoucuments
  console.log("e")
  this.coursService.totalDoucuments().subscribe(data =>{
    console.log(data);

    this.nbreDoucuments=data;
    console.log(this.nbreDoucuments);
  })
}

totalQuestions()
{
  console.log("e")
  this.questionService.totalQuestions().subscribe(data =>{
    console.log(data);

    this.nbreQuestions=data;
    console.log('**',this.nbreQuestions);
  })
}

totalExercices()
{
  console.log("e")
  this.exerciceService.totalExercices().subscribe(data =>{
    console.log(data);

    this.nbreExercices=data;
    console.log(this.nbreExercices);
  })
}


}
