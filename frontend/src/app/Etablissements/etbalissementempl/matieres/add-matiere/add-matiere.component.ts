import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from 'src/app/_models/matiere';
import { MatiereService } from 'src/app/_services/matiere.service';


@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.scss']
})
export class AddMatiereComponent implements OnInit {

  matiere :Matiere =new Matiere();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  //roles : any;
  //etbalissements :any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private matiereService: MatiereService,
    //private roleService:RoleService,
    //private etablissementService:EtablissementService,
    
    //private toastr: ToastrService
  ) { 
    //this.user.role = new Role();
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
      
      nom: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          
        ],
      ],
     
      //policy_checked: [false, Validators.required],
    });
    //this.getRoles();
    //this.getEtablissements();
  }

 

   

  get fval_2() {
    return this.registerForm.controls;
  }

 

  saveMatiere() {
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    //this.loading = true;
    console.log('enabled');
    this.matiereService.createMatiere(this.registerForm.value).subscribe(
      (data) => {
        console.log('api done');
        
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/DirecteurHomeCrech/matieres', {caller : "Ajout avec succès"}])
    }
    onSubmit(){
      console.log("zzz");
      this.saveMatiere();
    }
 


}
