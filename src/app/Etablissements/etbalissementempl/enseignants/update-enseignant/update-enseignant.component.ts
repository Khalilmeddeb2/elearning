import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Matiere } from 'src/app/_models/matiere';
import { User } from 'src/app/_models/user.model';
import { EnseignantService } from 'src/app/_services/enseignant.service';
import { MatiereService } from 'src/app/_services/matiere.service';

@Component({
  selector: 'app-update-enseignant',
  templateUrl: './update-enseignant.component.html',
  styleUrls: ['./update-enseignant.component.scss']
})
export class UpdateEnseignantComponent implements OnInit {

  id:string;
  enseignant:User=new User();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres : any;
  d;
  toutesmatieres: any = [];
  Ttmatieres;
  tabs;
  
  constructor(private cdRef:ChangeDetectorRef,private enseignantService :EnseignantService,private matiereService :MatiereService,
    private router: Router, 
    private route: ActivatedRoute,
    
    private formBuilder: FormBuilder,
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
    this.d=this.enseignantService.getEnseignantById(this.id).subscribe(async data=>{
      this.enseignant=data;
      this.enseignant.password="";
      this.matieres= this.enseignant.matiere
      console.log("enseig")
      console.log(this.matieres)
      this.toutesmatieres = await this.matiereService.getMartieres().toPromise();
      for(let i of  this.toutesmatieres.keys()){
        let index = this.matieres.findIndex(m=>m._id == this.toutesmatieres[i]._id);
        console.log("index")
        console.log(index != -1)
        this.toutesmatieres[i].selected=index!=-1;      
      }
  
         
       // console.log("zzert")
       // console.log(this.toutesmatieres)
       // console.log("rabi3")
       // console.log(this.matieres)    
    }),
    

    



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
      password: ['', [Validators.minLength(6), ]],
      matiere:  ['',],
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
    
    for (let m of this.toutesmatieres){
      
      console.log(this.registerForm.value.matiere);
     // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
      if(m.selected == true){
      console.log("ahaahah")
      results.push(m._id)
      this.registerForm.value.matiere=results;
      console.log(this.registerForm.value);}
     }
    
   


    this.enseignantService.EditEnseignants(this.id , this.registerForm.value).subscribe( data=>{
      console.log()
     this.goToEnseignantsList();
      
    })
  }
  goToEnseignantsList()
  {
    this.router.navigate(['/DirecteurHomeCrech/enseignants', {caller2 : "Modification avec succès "}]);
  }


}
