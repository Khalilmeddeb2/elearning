import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Enfant } from 'src/app/_models/enfant';
import { ClasseService } from 'src/app/_services/classe.service';
import { EnfantService } from 'src/app/_services/enfant.service';

@Component({
  selector: 'app-update-enfant',
  templateUrl: './update-enfant.component.html',
  styleUrls: ['./update-enfant.component.scss']
})
export class UpdateEnfantComponent implements OnInit {

  id:string;
  enfant:Enfant=new Enfant();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres : any;
  d;
  classes: any;
  date_start: "2014-11-19"
  
  constructor(private enfantService :EnfantService,private classeService :ClasseService,
    private router: Router, 
    private route: ActivatedRoute,
    
    private formBuilder: FormBuilder,
   ) 
   {}

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.enfantService.getEnfantById(this.id).subscribe(async data=>{
      this.enfant=data;
      console.log(this.enfant)
      console.log('date',this.enfant.dateNaissance)
      //this.etudiant.password="";
      //this.matieres= this.enseignant.matiere
      //console.log("enseig")
      //console.log(this.matieres)
      /*this.toutesmatieres = await this.matiereService.getMartieres().toPromise();
      for(let i of  this.toutesmatieres.keys()){
        let index = this.matieres.findIndex(m=>m._id == this.toutesmatieres[i]._id);
        console.log("index")
        console.log(index != -1)
        this.toutesmatieres[i].selected=index!=-1;*/      
      }
    ),
         
        //console.log("zzert")
        //console.log(this.toutesmatieres)
        //console.log("rabi3")
        //console.log(this.matieres)    
    
    

    



      this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', [Validators.required]],
      adresse: ['', Validators.required],
      classe:  ['', Validators.required],
      //etablissement :  ['', Validators.required],
      //policy_checked: [false, Validators.required],
    });
    
    this.getclasses();
    
    //this.getEtablissements();
  }
  getclasses(){
    console.log("imed")
      this.classeService.getClasses().subscribe(e=>{
        this.classes=e;
        this.enfant.classe.id = e[0]._id

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
    
    
    
   


    this.enfantService.EditEnfant(this.id , this.registerForm.value).subscribe( data=>{
      console.log()
     this.goToEnseignantsList();
      
    })
  }
  goToEnseignantsList()
  {
    this.router.navigate(['/DirecteurHomeCrech/etudiants', {caller2 : "Modification avec succès"}]);
  }

}
