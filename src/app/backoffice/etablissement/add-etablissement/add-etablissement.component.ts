import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etablissement } from 'src/app/_models/etablissement';
import { Role } from 'src/app/_models/role';
import { EtablissementService } from 'src/app/_services/etablissement.service';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-add-etablissement',
  templateUrl: './add-etablissement.component.html',
  styleUrls: ['./add-etablissement.component.scss']
})
export class AddEtablissementComponent implements OnInit {

  etbalissement :Etablissement =new Etablissement();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  roles : any;
  show ;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private etablissementService: EtablissementService,
    private roleService:RoleService,
    //private toastr: ToastrService
  ) { 
    this.etbalissement.role = new Role();
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
      firstName: ['', Validators.required],
      numeroRegister: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern('[- +()0-9]+'),
        ],
      ],
      pays: ['', Validators.required],
      adresse: ['', Validators.required,Validators.minLength(6)],
      telephoneFixe:  [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern('[- +()0-9]+'),
        ],
      ],
      siteWeb: ['', Validators.required,Validators.minLength(9)],
      url : ['', Validators.required],
      type:['', Validators.required],
     
     
      role:  ['',Validators.required],
      //policy_checked: [false, Validators.required],
    });
    this.getRoles();
  }

  getRoles(){
    console.log("imed")
      this.roleService.getRoles().subscribe(e=>{
        this.roles=e;
        this.etbalissement.role.id = e[0]._id

          console.log("ert")
          console.log(e)
       
       
      
            })
    }

  get fval_2() {
    return this.registerForm.controls;
  }

  onChange()
  {
 console.log(this.roles)
  }

  saveEtablissement() {
    let results = [];;
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    //this.loading = true;
    console.log('enabled');
    for (let m of this.roles){
      
      console.log(this.registerForm.value.role);
     // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
      if(m.selected == true){
      console.log("ahaahah")
      results.push(m._id)
      this.registerForm.value.role=results;
      
        }}
      if(results.length == 0)
      {
        
        this.show =false;
      }
      else{
        this.show=true;
      }  
      console.log( results.length)
    this.etablissementService.createEtablissement(this.registerForm.value).subscribe(
      (data) => {
        console.log('api done');
        
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/backoffice/etablissements', {caller : "Ajout avec succès"}])
    }
    onSubmit(){
      console.log("zzz");
      this.saveEtablissement();
    }
}
