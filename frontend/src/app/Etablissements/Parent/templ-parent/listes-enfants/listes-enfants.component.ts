import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { EnfantService } from 'src/app/_services/enfant.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-listes-enfants',
  templateUrl: './listes-enfants.component.html',
  styleUrls: ['./listes-enfants.component.scss']
})
export class ListesEnfantsComponent implements OnInit {
  currentUser: User;
  ids
  enfants;
  constructor(private token :TokenStorageService,private enfantService :EnfantService,private router :Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("::",this.currentUser[0]._id)
    this.ids=this.currentUser[0]._id
    console.log('ids',this.ids)
    this.getEnfants();
  }

  getEnfants(){
    console.log("imed")
    this.enfantService.getEnfantsByParent(this.ids).subscribe(e=>{
        this.enfants=e;
        console.log(e)
        
          })   
  }

  viewListesPhotosEnfannts(id:string)
 {
  console.log("mouha")
  this.router.navigate(['ParentHome/listeEnfants/listesPhotosEnfant',id])
  console.log("eeeeeeeeeeeeeee")
 }
}
