import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Actualite } from 'src/app/_models/actualite';
import { ActualiteService } from 'src/app/_services/actualite.service';

@Component({
  selector: 'app-update-actualite',
  templateUrl: './update-actualite.component.html',
  styleUrls: ['./update-actualite.component.scss']
})
export class UpdateActualiteComponent implements OnInit {

  @ViewChild('fileInput' , {static:false}) fileInput :ElementRef;

  actualites :Actualite =new Actualite();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres ;
  classes ;
  show;
  id
  d
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
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.actualiteService.getActualiteById(this.id).subscribe(async data=>{
      this.actualites=data;
    console.log(data)})

    this.registerForm = this.formBuilder.group({
      titre: ['', Validators.required],     
      description:  ['', Validators.required],
      image :['',],
      //policy_checked: [false, Validators.required],
    });
   
  }

  
  get fval_2() {
    return this.registerForm.controls;
  }
  
 

  UpdateCours() {
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
  this.actualiteService.EditActualite(this.id ,form).subscribe(
    (data) => {
      console.log('api done');
      this.toastr.warning('Modification avec succés')
      this.goToList();
    },
   
  );
  console.log('all done');
}
goToList(){
  this.router.navigate(['/backoffice/actualites' ] )
  }
  onSubmit(){
    console.log("zzz");
    this.UpdateCours();
  }
}
