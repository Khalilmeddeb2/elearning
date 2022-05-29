import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user.model';
import { EtablissementService } from 'src/app/_services/etablissement.service';
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  id:string;
  user:User=new User();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  roles : any;
  d
  etbalissements:any;
  test;
  verif="Directeur"
  countryCode;
  
  phone0;
  phone;
  codePays;
  numero;

  constructor(private userService :UserService,
    private router: Router, 
    private route: ActivatedRoute,
    private roleService:RoleService,
    private formBuilder: FormBuilder,
    private etablissementService :EtablissementService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    /*if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }*/
    this.id = this.route.snapshot.params['id'];
    //
    //console.log(this.id)
    this.d=this.userService.getUserById(this.id).subscribe(data=>{
      
      this.user=data;
      this.user.password="";
      //console.log("taraji")
      //console.log(data)
      //console.log(data.role.type)
      this.test=data.role.type
      //console.log("test",this.test)
      console.log("phone",data.phone)
      this.phone0=data.phone;
      console.log("phone",data.phone)


      this.phone=data.phone.split(' ')
      this.codePays=this.phone[0]
      this.numero=this.phone[1]
      console.log('codepays',this.codePays)
      console.log('numero',this.numero)
      this.registerForm = this.formBuilder.group({
        firstName: [this.user.firstName, Validators.required],
        lastName: ['', Validators.required],
        phone: [
         data.phone,
          [
            Validators.required,
            Validators.minLength(9),
            Validators.pattern('[- +()0-9]+'),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.pattern('((?=)(?=.*[a-z])(?=.*[A-Z]).{8,})'),]],
        confirmpassword: ['', [Validators.pattern('((?=)(?=.*[a-z])(?=.*[A-Z]).{8,})'),]],
        role:  ['', Validators.required],
        etablissement :  ['', Validators.required],
        //policy_checked: [false, Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmpassword')
    }
      );
      
     })
    
    
    this.getRoles();
    this.getEtablissements();
  }
  getRoles(){
    //console.log("imed")
      this.roleService.getRoles().subscribe(e=>{
        this.roles=e;
        this.user.role.id = e[0]._id

          //console.log("ert")
          //console.log(e)
       
       
      
            })
    }
    getEtablissements(){
      //console.log("oooooooooo")
        this.etablissementService.getEtablissements().subscribe(e=>{
          this.etbalissements=e;
         // this.user.etablissement.id = e[0]._id
  
           // console.log("zooooo")
           // console.log(e)
         
         
        
              })
      }

  get fval_2() {
    return this.registerForm.controls;
  }
  onSubmit()
  {
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    //this.loading = true;
    console.log('enabled');
    console.log("eeee")
    
    //this.registerForm.value.phone ="+" +this.countryCode + " "+ this.registerForm.value.phone
    console.log("chnoua numrou",this.registerForm.value.phone)
    if(this.registerForm.value.phone === this.phone0)
    {
      this.registerForm.value.phone = this.phone0
    }
    // else
    // {
    //   this.registerForm.value.phone ="+" +this.countryCode + " "+ this.registerForm.value.phone 
    // }

    this.userService.EditUser(this.id , this.registerForm.value).subscribe( data=>{
      console.log()
      this.toastr.warning('Modification avec succés')
     this.goToCategoriesList();
      
    })
  }
  goToCategoriesList()
  {
    this.router.navigate(['/backoffice/users']);
  }

  onCountryChange(event : any) {
    console.log(event.dialCode);
    console.log(event.name);
    console.log(event.iso2);
    console.log(event.dialCode)
    this.countryCode = event.dialCode;
    this.registerForm.value.phone="+" +this.countryCode + " "+ this.numero 
  }

}