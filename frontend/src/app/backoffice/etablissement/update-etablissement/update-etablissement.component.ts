import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Etablissement } from 'src/app/_models/etablissement';
import { EtablissementService } from 'src/app/_services/etablissement.service';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-update-etablissement',
  templateUrl: './update-etablissement.component.html',
  styleUrls: ['./update-etablissement.component.scss']
})
export class UpdateEtablissementComponent implements OnInit {

  id:string;
  etablissement:Etablissement=new Etablissement();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  roles : any;
  d;
  toutesroles: any = [];
  
  
  constructor(private cdRef:ChangeDetectorRef,private EtablissementService :EtablissementService,private roleService :RoleService,
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
    this.d=this.EtablissementService.getEtablissementsById(this.id).subscribe(async data=>{
      this.etablissement=data;
      console.log(this.etablissement)
      this.roles= this.etablissement.role
      console.log("enseig")
      console.log(this.roles)
      this.toutesroles = await this.roleService.getRoles().toPromise();
      for(let i of  this.toutesroles.keys()){
        let index = this.roles.findIndex(m=>m._id == this.toutesroles[i]._id);
        console.log("index")
        console.log(index != -1)
        this.toutesroles[i].selected=index!=-1;      
      }
  
         
        console.log("zzert")
        console.log(this.toutesroles)
        console.log("rabi3")
        console.log(this.roles)    
    }),
    

    



      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        numeroRegister:  [
          '',
          [
            Validators.required,
            Validators.minLength(9),
            Validators.pattern('[- +()0-9]+'),
          ],
        ],
        pays: ['', Validators.required],
        adresse : ['',Validators.required ],
        telephoneFixe:  [
          '',
          [
            Validators.required,
            Validators.minLength(9),
            Validators.pattern('[- +()0-9]+'),
          ],
        ],
        siteWeb: ['', Validators.required  ],
        url:['', Validators.required],
        type:['',Validators.required],
        role:  ['',],
       
      //etablissement :  ['', Validators.required],
      //policy_checked: [false, Validators.required],
    });
    
    //this.getMatieres();
    
    //this.getEtablissements();
  }
  

  get fval_2() {
    return this.registerForm.controls;
  }
  onChange()
 {
console.log(this.roles)

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
    
    for (let m of this.toutesroles){
      
      console.log(this.registerForm.value.role);
     // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
      if(m.selected == true){
      console.log("ahaahah")
      results.push(m._id)
      this.registerForm.value.role=results;
      console.log(this.registerForm.value);}
     }
    
   


    this.EtablissementService.EditEtablissement(this.id , this.registerForm.value).subscribe( data=>{
      console.log()
      this.toastr.warning('Modification avec succés')
     this.goToEtablissementList();
      
    })
  }
  goToEtablissementList()
  {
    this.router.navigate(['/backoffice/etablissements']);
  }
}
