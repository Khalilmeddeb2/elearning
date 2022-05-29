import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user.model';
import { ParentService } from 'src/app/_services/parent.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import countries from 'src/app/contries.json';
import { VisitorsService } from 'src/app/_services/visitors.service';
@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.scss']
})
export class AddParentComponent implements OnInit {


  ipaddress:string = '';
   latitude:string= '';
   longitude:string= '';
   currency:string = '';
   currencysymbol:string = '';
   isp:string= '';
   city:string = '';
   country='BE'
   countryCode="32";

    // list all contries 
    public countryList:{name:string, dial_code:string , code:string}[] = countries;
    //initialContry ={initialContry: 'BE'};
    initialContry ={initialCountry: this.country};

  parent :User =new User();
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
    private parentService: ParentService,
    private toastr: ToastrService,
    private visitorsService:VisitorsService
   
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

    console.log('pays',this.countryList)
    this.visitorsService.getIpAddress().subscribe(res => {

      this.ipaddress = res['ip'];
      this.visitorsService.getGEOLocation(this.ipaddress).subscribe(res => {

        this.latitude = res['latitude'];
        this.longitude = res['longitude'];
        this.currency = res['currency']['code'];
        this.currencysymbol = res['currency']['symbol'];
        this.city = res['city'];
        this.country = res['country_code3'];
        this.isp = res['isp'];
        console.log(res);
        console.log('adresse',this.city)
      });
      //console.log(res);

    });
    for(let c of this.countryList)
    {
      if(c.name == this.city)
      {
        this.country=c.code
        this.initialContry ={initialCountry: this.country};
       this.countryCode = c.dial_code
       break;
      }
      
    }
    
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
      confirmpassword: ['', [Validators.required , Validators.pattern('((?=)(?=.*[a-z])(?=.*[A-Z]).{8,})'),]],
     
     
      
      //policy_checked: [false, Validators.required],
    },
    {
      validator: MustMatch('password', 'confirmpassword')
  }
    );
    
  }

 

  get fval_2() {
    return this.registerForm.controls;
  }



  saveParents() {
    
    
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    
    //this.loading = true;
    
     console.log("parent",this.registerForm.value) 
     this.registerForm.value.phone ="+" +this.countryCode + " "+ this.registerForm.value.phone 
    this.parentService.createParent(this.registerForm.value).subscribe(
      (data) => {
        console.log('api done');
        this.toastr.success('Ajout avec succés') 
      this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/DirecteurHomeCrech/parents'])
    }
    onSubmit(){
      console.log("zzz");
      this.saveParents();
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
