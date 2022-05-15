import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from 'src/app/_models/cours';
import { ClasseService } from 'src/app/_services/classe.service';
import { CoursService } from 'src/app/_services/cours.service';

@Component({
  selector: 'app-update-cours',
  templateUrl: './update-cours.component.html',
  styleUrls: ['./update-cours.component.scss']
})
export class UpdateCoursComponent implements OnInit {

  @ViewChild('fileInput' , {static:false}) 
  fileInput :ElementRef;
  
  cours :Cours =new Cours();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres ;
  classes ;
  show;
  id;
  d
  toutesClasses;
  imagBlob;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coursService: CoursService,
    private classesService:ClasseService,
    
    
    //private toastr: ToastrService
  ) { 
    //this.user.role = new Role();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.d=this.coursService.getCoursById(this.id).subscribe(async data=>{
      this.cours=data;
      console.log('data',data)
      console.log('nom :',data.nom)
      console.log('matiere :',data.matiere.nom)
      console.log('file :',data.filename)
      this.imagBlob=data.originalname
      console.log('classe :',data.classe)
      this.classes= this.cours.classe
      console.log("classes")
      console.log(this.classes)
      this.toutesClasses = await this.classesService.getClasseByEnseignant().toPromise();
      for(let i of  this.toutesClasses.keys()){
        console.log('toutes')
        let index = this.classes.findIndex(m=>m._id == this.toutesClasses[i]._id);
        console.log("index")
        console.log(index != -1)
        this.toutesClasses[i].selected=index!=-1;      
      }

      console.log('toutes',this.toutesClasses)
    }),
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
     
      matiere:  ['',Validators.required],
      classe :[''],
      file :[''],
    });
    this.getMatieres();
 
}

getMatieres(){
  console.log("imed")
    this.classesService.getMatieresByEnseignant().subscribe(e=>{
      this.matieres=e;
      this.cours.matiere.id = e[0]._id

        console.log("ert")
        console.log(e)
     
     
    
          })
  }
  get fval_2() {
    return this.registerForm.controls;
  }


  UpdateCours() {
    let results = [];
    //console.log('1321')
    const imagBlob =this.fileInput.nativeElement.files[0];
    for (let m of this.toutesClasses){
      
      //console.log('tt',this.registerForm.value.classe);
     // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
      if(m.selected == true){
      //console.log("ahaahah")
      results.push(m._id)
      this.registerForm.value.classe=results;
      
        }}
      if(results.length == 0)
      {
        
        this.show =false;
      }
      else{
        this.show=true;
      }  
      //console.log( results.length)
    const form =new FormData();
    form.set('file',imagBlob);
    form.set('nom',this.registerForm.value.nom);
    form.set('matiere',this.registerForm.value.matiere);
    form.set('classe',this.registerForm.value.classe);
    //form.set('type',this.product.type);
    //form.set('description',this.product.description);
    //form.set('url',this.product.url);
    //form.set('category',this.product.category.id);
    this.submitted = true;
    console.log('clicked');
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      console.log('invalid');
      return;
    }
    //this.loading = true;
    console.log('enabled');
    console.log('form :',form)
    this.coursService.EditCours(this.id ,form).subscribe(
      (data) => {
        console.log('api done');
        
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/EnseignantHome/doucuments' , {caller2 : "Modification avec succès"}] )
    }
    onSubmit(){
      //console.log("zzz");
      this.UpdateCours();
    }
}