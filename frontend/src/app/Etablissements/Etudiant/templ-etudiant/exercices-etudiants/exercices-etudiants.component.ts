import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from 'src/app/_services/exercice.service';

@Component({
  selector: 'app-exercices-etudiants',
  templateUrl: './exercices-etudiants.component.html',
  styleUrls: ['./exercices-etudiants.component.scss']
})
export class ExercicesEtudiantsComponent implements OnInit {

  id;

  ids: string;
  url 
  exercices ;
  coursResults : any = [];
  url2
  constructor(private route: ActivatedRoute,private router: Router,private exerciceService :ExerciceService) {}
  ngOnInit(): void {
   
    //console.log(this.id)
    //console.log(this.ids)
    this.id=this.router.url.split('/');
    console.log(this.id[2])
    this.ids=this.id[2]
    console.log("ioi",this.ids)
    this.getExercices();
  }

  getExercices(){
    
    
    console.log("imed")
   this.exerciceService.getExercicesByClasse(this.ids).subscribe(e=>{
    
       this.exercices=e
          })   
  }
  ViewExercice(id:string)
  {
   console.log("mouha")
   this.router.navigate(['EtudiantHome/'+this.ids+'/exercices/voirExercice',id])
   console.log("eeeeeeeeeeeeeee")
  }

}
