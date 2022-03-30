import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/_services/classe.service';
import { CoursService } from 'src/app/_services/cours.service';

@Component({
  selector: 'app-enseignant-home',
  templateUrl: './enseignant-home.component.html',
  styleUrls: ['./enseignant-home.component.scss']
})
export class EnseignantHomeComponent implements OnInit {
nbreClasses;
nbreMatieres;
nbreCours;
  constructor(private classeService :ClasseService,private coursService :CoursService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }
    this.totalClasses();
    this.totalMatieres();
    this.totalCours()
    
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
  this.coursService.getNumberCoursByEnseignant().subscribe(data =>{
    console.log(data);

    this.nbreCours=data;
    console.log(this.nbreCours);
  })
}


}
