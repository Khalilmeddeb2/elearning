import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from 'src/app/_models/matiere';
import { User } from 'src/app/_models/user.model';
import { EnseignantService } from 'src/app/_services/enseignant.service';
import { MatiereService } from 'src/app/_services/matiere.service';

@Component({
  selector: 'app-add-enseignant',
  templateUrl: './add-enseignant.component.html',
  styleUrls: ['./add-enseignant.component.scss']
})
export class AddEnseignantComponent implements OnInit {

  enseignant :User =new User();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres : any;
  show;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private enseignantService: EnseignantService,
    private matiereService:MatiereService,
    //private toastr: ToastrService
  ) { 
    this.enseignant.matiere = new Matiere();
  }

  ngOnInit(): void {
   /* if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }*/
    
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern('[- +()0-9]+'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, ,Validators.pattern('((?=)(?=.*[a-z])(?=.*[A-Z]).{8,})'),]],
      
     
     
      matiere:  ['', ],
      //policy_checked: [false, Validators.required],
    });
    this.getMatieres();
  }

  getMatieres(){
    console.log("imed")
      this.matiereService.getMartieres().subscribe(e=>{
        this.matieres=e;
        this.enseignant.matiere.id = e[0]._id

          console.log("ert")
          console.log(e)
       
       
      
            })
    }

  get fval_2() {
    return this.registerForm.controls;
  }

 onChange()
 {
console.log(this.matieres)
 }

  saveEnseignant() {
    let results= [];
    console.log(this.matieres)
    
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    
    //this.loading = true;
    let i=0;
    for (let m of this.matieres){
      
    console.log(this.registerForm.value.matiere);
   // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
    if(m.selected == true){
    console.log("ahaahah")
    results.push(m._id)
    this.registerForm.value.matiere=results;
      }}
      if(results.length == 0)
      {
        
        this.show =false;
      }
      else{
        this.show=true;
      }  
      console.log( results.length)
      
    this.enseignantService.createEnseignant(this.registerForm.value).subscribe(
      (data) => {
        console.log('api done');
        
      this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/DirecteurHomeCrech/enseignants', {caller : "Ajout avec succès"}])
    }
    onSubmit(){
      console.log("zzz");
      this.saveEnseignant();
    }

}
