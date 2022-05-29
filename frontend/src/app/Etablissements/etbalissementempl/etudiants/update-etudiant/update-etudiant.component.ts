import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user.model';
import { ClasseService } from 'src/app/_services/classe.service';
import { EnseignantService } from 'src/app/_services/enseignant.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styleUrls: ['./update-etudiant.component.scss']
})
export class UpdateEtudiantComponent implements OnInit {

  id:string;
  etudiant:User=new User();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres : any;
  d;
  classes: any;
  phone0
  countryCode;
  
 
  phone;
  codePays;
  numero;
  
  constructor(private cdRef:ChangeDetectorRef,private etudiantService :EtudiantService,private classeService :ClasseService,
    private toastr: ToastrService,

    private router: Router, 
    private route: ActivatedRoute,
    
    private formBuilder: FormBuilder,
   ) 
   {}

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.etudiantService.getEtudiantById(this.id).subscribe(async data=>{
      this.etudiant=data;
      console.log(this.etudiant)
      this.etudiant.password="";
      this.phone0=data.phone;
      console.log("phone",data.phone)


      this.phone=data.phone.split(' ')
      this.codePays=this.phone[0]
      this.numero=this.phone[1]
      console.log('codepays',this.codePays)
      console.log('numero',this.numero)
      console.log("enseig"),
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
        classe:  ['', Validators.required],
        
      },
      {
        validator: MustMatch('password', 'confirmpassword')
    }
      );
      
      this.getclasses(); 
      }
    )   
  }
  getclasses(){
    console.log("imed")
      this.classeService.getClasses().subscribe(e=>{
        this.classes=e;
        this.etudiant.classe.id = e[0]._id

          console.log("ert")
          console.log(e)
       
       
      
            })
    }

  get fval_2() {
    return this.registerForm.controls;
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


    this.etudiantService.EditEtudiant(this.id , this.registerForm.value).subscribe( data=>{
      console.log()
      this.toastr.warning('Modification avec succés')
     this.goToEnseignantsList();
      
    })
  }
  goToEnseignantsList()
  {
    this.router.navigate(['/DirecteurHomeCrech/etudiants']);
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
