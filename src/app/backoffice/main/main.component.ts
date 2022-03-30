import { Component, OnInit } from '@angular/core';
import { EtablissementService } from 'src/app/_services/etablissement.service';
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  nbreEtablissements;
  nbreRoles;
  nbreDirecteurs; 
  nbreUtlisateurs;
  

  constructor(private etablissementService:EtablissementService,private roleSerrvice :RoleService ,private userService :UserService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }
    this.totalEtablissements();
    this.totalRoles();
    this.totalDirecteurs();
    this.totalUtilisateurs();
  }

  totalEtablissements()
  {
    console.log("e")
    this.etablissementService.totalEtablissements().subscribe(data =>{
      console.log(data);

      this.nbreEtablissements=data;
      console.log(this.nbreEtablissements);
    })
  }
  totalRoles()
  {
    console.log("e")
    this.roleSerrvice.totalRoles().subscribe(data =>{
      console.log(data);

      this.nbreRoles=data;
      console.log(this.nbreRoles);
    })
  }
  totalDirecteurs()
  {
    console.log("e")
    this.userService.totalDirecteurs().subscribe(data =>{
      console.log(data);

      this.nbreDirecteurs=data;
      console.log(this.nbreDirecteurs);
    })
  }

  totalUtilisateurs()
  {
    console.log("e")
    this.userService.totalUtlisateurs().subscribe(data =>{
      console.log(data);

      this.nbreUtlisateurs=data;
      console.log(this.nbreUtlisateurs);
    })
  }
  

}
