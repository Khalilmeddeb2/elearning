import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/_models/classe';
import { ClasseService } from 'src/app/_services/classe.service';
import { EnseignantService } from 'src/app/_services/enseignant.service';

@Component({
  selector: 'app-update-classe',
  templateUrl: './update-classe.component.html',
  styleUrls: ['./update-classe.component.scss']
})
export class UpdateClasseComponent implements OnInit {

  id:string;
  classe:Classe=new Classe();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  enseignants : any;
  d;
  toutesenseignants: any = [];
  
  
  constructor(private cdRef:ChangeDetectorRef,private ClasseService :ClasseService,private enseignanService :EnseignantService,
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
    this.d=this.ClasseService.getClasseById(this.id).subscribe(async data=>{
      this.classe=data;
      console.log(this.classe)
      this.enseignants= this.classe.enseignant
      console.log("enseig")
      console.log(this.enseignants)
      this.toutesenseignants = await this.enseignanService.getEnseignants().toPromise();
      for(let i of  this.toutesenseignants.keys()){
        let index = this.enseignants.findIndex(m=>m._id == this.toutesenseignants[i]._id);
        console.log("index")
        console.log(index != -1)
        this.toutesenseignants[i].selected=index!=-1;      
      }
  
         
        console.log("zzert")
        console.log(this.toutesenseignants)
        console.log("rabi3")
        console.log(this.enseignants)    
    }),
    

    



      this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      enseignant:  ['',],
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
console.log(this.enseignants)

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
    
    for (let m of this.toutesenseignants){
      
      console.log(this.registerForm.value.enseignant);
     // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
      if(m.selected == true){
      console.log("ahaahah")
      results.push(m._id)
      this.registerForm.value.enseignant=results;
      console.log(this.registerForm.value);}
     }
    
   


    this.ClasseService.EditClasse(this.id , this.registerForm.value).subscribe( data=>{
      console.log()
     this.goToClassesList();
      
    })
  }
  goToClassesList()
  {
    this.router.navigate(['/DirecteurHomeCrech/classes', {caller2 : "Modification avec succès "}]);
  }
}
