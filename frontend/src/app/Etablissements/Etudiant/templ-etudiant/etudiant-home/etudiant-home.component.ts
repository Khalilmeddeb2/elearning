import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/_services/cours.service';
import { ExerciceService } from 'src/app/_services/exercice.service';
import { TestService } from 'src/app/_services/test.service';


@Component({
  selector: 'app-etudiant-home',
  templateUrl: './etudiant-home.component.html',
  styleUrls: ['./etudiant-home.component.scss']
})
export class EtudiantHomeComponent implements OnInit {
id
ids
  nbreCours
  nbreDoucuments
  nbreExercices;
  nbreTests;
  constructor(private router:Router,private coursService :CoursService,private exerciceService :ExerciceService,
    private testService :TestService) { }

  ngOnInit(): void {
    // if (!localStorage.getItem('page_js')) {
    //   localStorage.setItem('page_js', 'no reload');
    //   location.reload();
    //   console.log(localStorage.getItem('page_js'));
    // } else {
    //   localStorage.removeItem('page_js');
    // }
    this.id=this.router.url.split('/');
    console.log(this.id[2])
    this.ids=this.id[2]
    this.totalCours()
    this.totalDoucuments()
    this.totalExercices()
    this.totalTests()
  }
  // totalClasses()
  // {
  //   console.log("e")
  //   this.classeService.getNumberclassesByEnseignant().subscribe(data =>{
  //     console.log(data);
  
  //     this.nbreClasses=data;
  //     console.log(this.nbreClasses);
  //   })
  // }
  
  // totalMatieres()
  // {
  //   console.log("e")
  //   this.classeService.getNumberMatieresByEnseignant().subscribe(data =>{
  //     console.log(data);
  
  //     this.nbreMatieres=data;
  //     console.log(this.nbreMatieres);
  //   })
  // }
  
  totalCours()
  {
    console.log("e")
    this.coursService.totalCoursEtudiant(this.ids).subscribe(data =>{
      console.log(data);
  
      this.nbreCours=data;
      console.log(this.nbreCours);
    })
  }
  
  totalDoucuments()
  {
    //nbreDoucuments
    console.log("e")
    this.coursService.totalDoucumentsEtudiants(this.ids).subscribe(data =>{
      console.log(data);
  
      this.nbreDoucuments=data;
      console.log(this.nbreDoucuments);
    })
  }
  
  totalTests()
  {
    console.log("e")
    this.testService.totalTestsEtudiants(this.ids).subscribe(data =>{
      console.log(data);
  
      this.nbreTests=data;
      console.log('**',this.nbreTests);
    })
  }
  
  totalExercices()
  {
    console.log("e")
    this.exerciceService.totalExercicesEtudiants(this.ids).subscribe(data =>{
      console.log(data);
  
      this.nbreExercices=data;
      console.log(this.nbreExercices);
    })
  }
}
