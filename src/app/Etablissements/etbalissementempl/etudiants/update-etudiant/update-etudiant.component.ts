import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { ClasseService } from 'src/app/_services/classe.service';
import { EnseignantService } from 'src/app/_services/enseignant.service';
import { EtudiantService } from 'src/app/_services/etudiant.service';

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
 
  
  constructor(private cdRef:ChangeDetectorRef,private etudiantService :EtudiantService,private classeService :ClasseService,
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
    
    
    
   


    this.etudiantService.EditEtudiant(this.id , this.registerForm.value).subscribe( data=>{
      console.log()
     this.goToEnseignantsList();
      
    })
  }
  goToEnseignantsList()
  {
    this.router.navigate(['/DirecteurHomeCrech/etudiants', {caller2 : "Modification avec succès"}]);
  }

}
