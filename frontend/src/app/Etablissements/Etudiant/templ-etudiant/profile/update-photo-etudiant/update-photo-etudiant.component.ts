import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profil } from 'src/app/_models/profil';
import { User } from 'src/app/_models/user.model';
import { ProfilService } from 'src/app/_services/profil.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-photo-etudiant',
  templateUrl: './update-photo-etudiant.component.html',
  styleUrls: ['./update-photo-etudiant.component.scss']
})
export class UpdatePhotoEtudiantComponent implements OnInit {

  @ViewChild('fileInput' , {static:false}) fileInput :ElementRef;
  idp: any;
  d: any;
  profil:Profil=new Profil();
  user2:User=new User();
  idPath;
  ids;
  idProfil;

  constructor(private route :ActivatedRoute,private userService:UserService,private router:Router, private profilService :ProfilService) { }

  ngOnInit(): void {
    this.idp = this.route.snapshot.params['id'];
    console.log(this.idp)
    this.d=this.profilService.getProfilById(this.idp).subscribe(async data=>{
      this.profil=data;
      //this.user.password="";
      console.log("data",data)
      this.idPath=this.router.url.split('/');
    console.log(this.idPath[2])
    this.ids=this.idPath[2]
    console.log("ioi",this.ids)
    // console.log(this.idPath[5])
    // this.idProfil=this.idPath[5]
    // console.log("5",this.idProfil)
      
  })

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
     this.router.navigate(['/EtudiantHome/'+this.ids+'/profile']);
   }
   
   back()
   {
    console.log("mouha")
    this.router.navigate(['EtudiantHome/'+this.ids+'/profile'])
    console.log("eeeeeeeeeeeeeee")
   }


}
