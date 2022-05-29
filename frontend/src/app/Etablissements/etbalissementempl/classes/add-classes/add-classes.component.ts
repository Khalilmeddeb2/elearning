import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Classe } from 'src/app/_models/classe';
import { ClasseService } from 'src/app/_services/classe.service';
import { EnseignantService } from 'src/app/_services/enseignant.service';

@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.scss']
})
export class AddClassesComponent implements OnInit {

  classe :Classe =new Classe();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  enseignants : any;
  show;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private enseignantService: EnseignantService,
    private classeService:ClasseService,
    private toastr: ToastrService
    //private toastr: ToastrService
  ) { 
    //this.enseignant.matiere = new Matiere();
  }

  ngOnInit(): void {
    /*if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }*/
    
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      enseignant:  ['', ]
      //policy_checked: [false, Validators.required],
    });
    this.getEnseignants();
  }

  getEnseignants(){
    console.log("imed")
      this.enseignantService.getEnseignants().subscribe(e=>{
        this.enseignants=e;
        //this.enseignant.matiere.id = e[0]._id

          console.log("ert")
          console.log(e)
       
       
      
            })
    }

  get fval_2() {
    return this.registerForm.controls;
  }

 onChange()
 {
console.log(this.enseignants)
 }

  saveClasse() {
    let results= [];
    console.log(this.enseignants)
    
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    
    //this.loading = true;
    for (let e of this.enseignants){
      
    console.log(this.registerForm.value.enseignant);
   // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
    if(e.selected == true){
    console.log("ahaahah")
    results.push(e._id)
    this.registerForm.value.enseignant=results;
    console.log(this.registerForm.value);}}
    if(results.length == 0)
    {
      
      this.show =false;
    }
    else{
      this.show=true;
    }  
    console.log( results.length)
    this.classeService.createClasse(this.registerForm.value).subscribe(
      (data) => {
        console.log('api done');
        this.toastr.success('Ajout avec succés') 
      this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/DirecteurHomeCrech/classes'])
    }
    onSubmit(){
      console.log("zzz");
      this.saveClasse();
    }


}
