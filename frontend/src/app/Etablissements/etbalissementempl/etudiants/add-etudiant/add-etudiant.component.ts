import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { ClasseService } from 'src/app/_services/classe.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.scss']
})
export class AddEtudiantComponent implements OnInit {
  etudiant :User =new User();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres : any;
  show;
  classes: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private etudiantService: EtudiantService,
    private classeService : ClasseService,
    //private matiereService:MatiereService,
    //private toastr: ToastrService
  ) { 
    //this.enseignant.matiere = new Matiere();
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
      
     
     
      classe:  ['', Validators.required],
      //policy_checked: [false, Validators.required],
    });
    this.getclasses();
  }

  getclasses(){
    console.log("imed")
      this.classeService.getClasses().subscribe(e=>{
        this.classes=e;
        //this.enseignant.matiere.id = e[0]._id

          console.log("ert")
          console.log(e)
       
       
      
            })
    }

  get fval_2() {
    return this.registerForm.controls;
  }

 /*onChange()
 {
console.log(this.matieres)
 }*/

  saveEtudiant() {
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
    
      console.log( results.length)
      
    this.etudiantService.createEtudiant(this.registerForm.value).subscribe(
      (data) => {
        console.log('api done');
        
      this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/DirecteurHomeCrech/etudiants', {caller : "Ajout avec succès"}])
    }
    onSubmit(){
      console.log("zzz");
      this.saveEtudiant();
    }
 
}
