import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Actualite } from 'src/app/_models/actualite';
import { ActualiteService } from 'src/app/_services/actualite.service';

@Component({
  selector: 'app-add-actualite',
  templateUrl: './add-actualite.component.html',
  styleUrls: ['./add-actualite.component.scss']
})
export class AddActualiteComponent implements OnInit {
  
  @ViewChild('fileInput' , {static:false}) fileInput :ElementRef;

  actualites :Actualite =new Actualite();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres ;
  classes ;
  show;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private actualiteService: ActualiteService,
    private toastr: ToastrService
    //private classesService:ClasseService,
    
    
    //private toastr: ToastrService
  ) { 
   
  }

  ngOnInit(): void {
  
    this.registerForm = this.formBuilder.group({
      titre: ['', Validators.required],     
      description:  ['', Validators.required],
      image :['',Validators.required],
      //policy_checked: [false, Validators.required],
    });
   
  }

  
  get fval_2() {
    return this.registerForm.controls;
  }
  
 

  saveActualite() {
    //let results = [];
    const imagBlob =this.fileInput.nativeElement.files[0];
   
    const form =new FormData();
    form.set('image',imagBlob);
    form.set('titre',this.registerForm.value.titre);
    form.set('description',this.registerForm.value.description);
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    //this.loading = true;
    console.log('enabled');
    console.log('form',imagBlob.name)
    
    this.actualiteService.createActualite(form).subscribe(
      (data) => {
        console.log('form11',imagBlob)
        console.log('api done');
        this.toastr.success('Ajout avec succés')
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/backoffice/actualites' ])
    }
    onSubmit(){
      console.log("zzz");
      this.saveActualite();
    }

}
