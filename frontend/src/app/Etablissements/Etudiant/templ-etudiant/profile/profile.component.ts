import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  id;
  ids;

  constructor(private token :TokenStorageService,private router :Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("::",this.currentUser[0])
    this.id=this.router.url.split('/');
    console.log(this.id[2])
    this.ids=this.id[2]
    console.log("ioi",this.ids)
    //this.getExercices();
  }

  updateProfileInformations(iduser:string)
{
 console.log("mouha")
 this.router.navigate(['EtudiantHome/'+this.ids+'/profile/updateInformations',iduser])
 console.log("eeeeeeeeeeeeeee")
}

}
