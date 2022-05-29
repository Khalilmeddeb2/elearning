import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfilEnfant } from 'src/app/_models/profil-enfant';
import { ProfilEnfantService } from 'src/app/_services/profil-enfant.service';

@Component({
  selector: 'app-ajout-photo-enfant',
  templateUrl: './ajout-photo-enfant.component.html',
  styleUrls: ['./ajout-photo-enfant.component.scss']
})
export class AjoutPhotoEnfantComponent implements OnInit {

  @ViewChild('fileInput' , {static:false}) fileInput :ElementRef;
  
  profilEnfant :ProfilEnfant =new ProfilEnfant();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres ;
  classes ;
  show;
  id
  ids
  id4
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private coursService: CoursService,
    //private classesService:ClasseService,
    private profilEnfantService :ProfilEnfantService,
    private toastr: ToastrService,
    
    //private toastr: ToastrService
  ) { 
   
  }

  ngOnInit(): void {
    this.id=this.router.url.split('/');
    console.log(this.id[6])
    this.ids=this.id[6]
    this.id4=this.id[4]
    console.log("ioi",this.ids)
   
    this.registerForm = this.formBuilder.group({
      description: ['', Validators.required],     
     
      image :['', Validators.required],
      date : ['', Validators.required],
      //policy_checked: [false, Validators.required],
    });
   
  }



   

  get fval_2() {
    return this.registerForm.controls;
  }
  onChange()
  {
 console.log(this.classes)
  }
 

  saveCours() {
   
    const imagBlob =this.fileInput.nativeElement.files[0];
 
    const form =new FormData();
    form.set('image',imagBlob);
    form.set('description',this.registerForm.value.description);
    form.set('date',this.registerForm.value.date);
  
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      this.toastr.error('Toutes les champs sont obligatoires ');
      return;
    }
    //this.loading = true;
    console.log('enabled');
    console.log('form',imagBlob.name)
    
    this.profilEnfantService.createProfil(this.ids,form).subscribe(
      (data) => {
        console.log('form11',imagBlob)
        console.log('api done');
        
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/EnseignantHome/classes/ListesEnfants/'+this.id4 +'/ListesPhotos/'+  this.ids])
    }
    onSubmit(){
      console.log("zzz");
      this.saveCours();
    }

}
