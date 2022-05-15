import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from 'src/app/_services/exercice.service';
import { TestService } from 'src/app/_services/test.service';

@Component({
  selector: 'app-tests-etudiants',
  templateUrl: './tests-etudiants.component.html',
  styleUrls: ['./tests-etudiants.component.scss']
})
export class TestsEtudiantsComponent implements OnInit {

  id;

  ids: string;
  url 
  tests ;
  url2
  constructor(private route: ActivatedRoute,private router: Router,private testService :TestService) {}
  ngOnInit(): void {
   
    //console.log(this.id)
    //console.log(this.ids)
    this.id=this.router.url.split('/');
    console.log(this.id[2])
    this.ids=this.id[2]
    console.log("ioi",this.ids)
    this.getTests();
  }

  getTests(){
    
    
    console.log("imed")
   this.testService.getTestsByClasse(this.ids).subscribe(e=>{
    
       this.tests=e
          })   
  }
  ViewTest(id:string)
  {
   console.log("mouha")
   this.router.navigate(['EtudiantHome/'+this.ids+'/tests/voirTest',id])
   console.log("eeeeeeeeeeeeeee")
  }

}
