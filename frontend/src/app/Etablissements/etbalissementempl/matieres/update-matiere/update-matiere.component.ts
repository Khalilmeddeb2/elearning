import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from 'src/app/_models/matiere';
import { MatiereService } from 'src/app/_services/matiere.service';

@Component({
  selector: 'app-update-matiere',
  templateUrl: './update-matiere.component.html',
  styleUrls: ['./update-matiere.component.scss']
})
export class UpdateMatiereComponent implements OnInit {

  id:string;
  //category :any={name:""}
  matiere:Matiere=new Matiere();
   constructor(private matiereService :MatiereService,private route:ActivatedRoute,private router : Router) { }
 
   ngOnInit(): void {
    /*if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }*/
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.matiereService.getMatiereById(this.id).subscribe(data=>{
      
      this.matiere=data;
      console.log("taraji")
      console.log(data)
      
     })
    
   }
 
   onSubmit()
   {
     this.matiereService.EditRole(this.id , this.matiere).subscribe( data=>{
      this.goToMatieresList();
       
     })
   }
   goToMatieresList()
   {
     this.router.navigate(['/DirecteurHomeCrech/matieres', {caller2 : "Modification avec succès"}]);
   }

}
