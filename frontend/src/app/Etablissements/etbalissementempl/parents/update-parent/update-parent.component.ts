import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user.model';
import { ParentService } from 'src/app/_services/parent.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
@Component({
  selector: 'app-update-parent',
  templateUrl: './update-parent.component.html',
  styleUrls: ['./update-parent.component.scss']
})
export class UpdateParentComponent implements OnInit {

  id:string;
  parent:User=new User();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres : any;
  d;
  toutesmatieres: any = [];
  Ttmatieres;
  tabs;
  phone0
  countryCode;
  
 
  phone;
  codePays;
  numero;
  
  constructor(private cdRef:ChangeDetectorRef,private parentService :ParentService,
    private router: Router, 
    private route: ActivatedRoute,
    
    private formBuilder: FormBuilder,
    private toastr: ToastrService
   ) 
   {}

  ngOnInit(): void {
    //let tabs ;
    /*if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }*/
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.parentService.getParentById(this.id).subscribe(async data=>{
      this.parent=data;
      this.parent.password="";
      this.phone0=data.phone;
      console.log("phone",data.phone)


      this.phone=data.phone.split(' ')
      this.codePays=this.phone[0]
      this.numero=this.phone[1]
      console.log('codepays',this.codePays)
      console.log('numero',this.numero)
     
      console.log("enseig")
      console.log(this.matieres)
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
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
      
      },
      {
          validator: MustMatch('password', 'confirmpassword')
      }
      );
  
    })
    

    



      
    
    //this.getMatieres();
    
    //this.getEtablissements();
  }
  

  get fval_2() {
    return this.registerForm.controls;
  }
  onChange()
 {
console.log(this.matieres)

 }
  onSubmit()
  {
    let results= [];
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }

    if(this.registerForm.value.phone === this.phone0)
    {
      this.registerForm.value.phone = this.phone0
    }
    
    this.parentService.EditParent(this.id , this.registerForm.value).subscribe( data=>{
      console.log()
      this.toastr.warning('Modification avec succés')
     this.goToParentsList();
      
    })
  }
  goToParentsList()
  {
    this.router.navigate(['/DirecteurHomeCrech/parents']);
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
