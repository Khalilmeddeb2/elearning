import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/_services/classe.service';
import { EnseignantService } from 'src/app/_services/enseignant.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { MatiereService } from 'src/app/_services/matiere.service';

@Component({
  selector: 'app-directeur-home',
  templateUrl: './directeur-home.component.html',
  styleUrls: ['./directeur-home.component.scss']
})
export class DirecteurHomeComponent implements OnInit {

  nbreMatieres;
  nbreClasses;
  nbreEnseignants; 
  nbreEtudiants;
  

  constructor(private matiereService:MatiereService,private classeSerrvice :ClasseService ,private enseignantservice :EnseignantService,private etudiantService : EtudiantService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }
    this.totalMatieres();
    this.totalClasses();
    this.totaEnseignants();
    this.totalEtudiants();
  }

  totalMatieres()
  {
    console.log("e")
    this.matiereService.totalClasses().subscribe(data =>{
      console.log(data);

      this.nbreMatieres=data;
      console.log(this.nbreMatieres);
    })
  }
  totalClasses()
  {
    console.log("eiiiiiiiiiiiii")
    this.classeSerrvice.totalClasses().subscribe(data =>{
      console.log(data);

      this.nbreClasses=data;
      console.log('mmmmmmmmmmmmmmm',this.nbreClasses);
    })
  }
  totaEnseignants()
  {
    console.log("e")
    this.enseignantservice.totalEnseignants().subscribe(data =>{
      console.log(data);

      this.nbreEnseignants=data;
      console.log(this.nbreEnseignants);
    })
  }

  totalEtudiants()
  {
    console.log("e")
    this.etudiantService.totalEtudiants().subscribe(data =>{
      console.log(data);

      this.nbreEtudiants=data;
      console.log(this.nbreEtudiants);
    })
  }
  }
