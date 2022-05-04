import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profil } from 'src/app/_models/profil';
import { User } from 'src/app/_models/user.model';
import { ProfilService } from 'src/app/_services/profil.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-updatephoto',
  templateUrl: './updatephoto.component.html',
  styleUrls: ['./updatephoto.component.scss']
})
export class UpdatephotoComponent implements OnInit {
  @ViewChild('fileInput' , {static:false}) fileInput :ElementRef;
  id: any;
  d: any;
  profil:Profil=new Profil();
  user2:User=new User();

  constructor(private route :ActivatedRoute,private userService:UserService,private router:Router, private profilService :ProfilService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
  //   this.d=this.profilService.getProfilById(this.id).subscribe(async data=>{
  //     this.profil=data;
      
      
  // })

}

onSubmit()
   {
    const imagBlob =this.fileInput.nativeElement.files[0];
    
    const form =new FormData();
    form.set('image',imagBlob);
    //form.set('name',this.product.name);
    //form.set('type',this.product.type);
    //form.set('description',this.product.description);
    //form.set('url',this.product.url);
    //form.set('category',this.product.category.id);
    this.profilService.createProfil(form).subscribe(data=>{
      console.log();
      this.goToCategoriesList();
       
     })
   }
goToCategoriesList()
{
  this.router.navigate(['/EnseignantHome/profil']);
}

back()
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/profil'])
 console.log("eeeeeeeeeeeeeee")
}

}
