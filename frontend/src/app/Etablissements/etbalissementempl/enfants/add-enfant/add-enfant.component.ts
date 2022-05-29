import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Enfant } from 'src/app/_models/enfant';
import { ClasseService } from 'src/app/_services/classe.service';
import { EnfantService } from 'src/app/_services/enfant.service';
import { ParentService } from 'src/app/_services/parent.service';

@Component({
  selector: 'app-add-enfant',
  templateUrl: './add-enfant.component.html',
  styleUrls: ['./add-enfant.component.scss']
})
export class AddEnfantComponent implements OnInit {

  enfant :Enfant =new Enfant();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres : any;
  show;
  classes: any;
  parents;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private enfantService: EnfantService,
    private classeService : ClasseService,
    private parentService :ParentService,
    private toastr: ToastrService

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
    /*
    numero :Number,
    rue :String ,
    ville :String,
    codePostal :Number,
    */
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
     
      //dateNaissance: ['', [Validators.required]],
      dateNaissance: ['', [Validators.required]],
      numero: ['', Validators.required],
      rue: ['', Validators.required],
      ville: ['', Validators.required],
      codePostal: ['', Validators.required],
      classe:  ['', Validators.required],
      parent:  ['', Validators.required],
      //policy_checked: [false, Validators.required],
    });
    this.getclasses();
    this.getParents();
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

    getParents(){
      console.log("imed")
        this.parentService.getParents().subscribe(e=>{
          this.parents=e;
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

  saveEnfant() {
    let results= [];
    //console.log(this.matieres)
    
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
      
    this.enfantService.createEnfant(this.registerForm.value).subscribe(
      (data) => {
        this.toastr.success('Ajout avec succés')
        console.log('api done');
        
      this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/DirecteurHomeCrech/enfants'])
    }
    onSubmit(){
      console.log("zzz");
      this.saveEnfant();
    }
}
