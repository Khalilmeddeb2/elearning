import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/_models/role';
import { User } from 'src/app/_models/user.model';
import { EtablissementService } from 'src/app/_services/etablissement.service';
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user :User =new User();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  roles : any;
  etbalissements :any;
  countryCode="32";
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService:RoleService,
    private etablissementService:EtablissementService,
    
    //private toastr: ToastrService
  ) { 
    this.user.role = new Role();
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
     
      role:  ['', Validators.required],
      etablissement: ['', Validators.required],
      //policy_checked: [false, Validators.required],
    });
    this.getRoles();
    this.getEtablissements();
  }

  getRoles(){
    console.log("imed")
      this.roleService.getRoles().subscribe(e=>{
        this.roles=e;
        this.user.role.id = e[0]._id

          console.log("ert")
          console.log(e)
       
       
      
            })
    }

    getEtablissements(){
      console.log("oooooooooo")
        this.etablissementService.getEtablissements().subscribe(e=>{
          this.etbalissements=e;
         // this.user.etablissement.id = e[0]._id
  
            console.log("zooooo")
            console.log(e)
         
         
        
              })
      }

  get fval_2() {
    return this.registerForm.controls;
  }

 

  saveUser() {
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    //this.loading = true;
    console.log('enabled');
    //this.registerForm.value
    //this.registerForm.controls['phone']?.setValue('+' + this.countryCode +this.registerForm.get('phone')?.value)
    this.registerForm.value.phone ="+" +this.countryCode + " "+ this.registerForm.value.phone
    console.log(this.registerForm.value.phone)
    this.userService.createUser(this.registerForm.value).subscribe(
      (data) => {
        console.log('api done');
        
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/backoffice/users', {caller : "Ajout avec succès"}])
    }
    onSubmit(){
      console.log("zzz");
      this.saveUser();
    }

    hasError(event: any): void {
      if (!event && this.registerForm.value.phone !== '') {
          this.registerForm.get('phone')?.setErrors(['invalid_cell_phone', true]);
      }
  }

  onCountryChange(event : any) {
    console.log(event.dialCode);
    console.log(event.name);
    console.log(event.iso2);
    console.log(event.dialCode)
    this.countryCode = event.dialCode;
  }

 
}
