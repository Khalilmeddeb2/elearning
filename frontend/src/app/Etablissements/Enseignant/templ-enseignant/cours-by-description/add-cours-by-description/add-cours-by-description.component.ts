import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { Cours } from 'src/app/_models/cours';
import { ClasseService } from 'src/app/_services/classe.service';
import { CoursService } from 'src/app/_services/cours.service';

@Component({
  selector: 'app-add-cours-by-description',
  templateUrl: './add-cours-by-description.component.html',
  styleUrls: ['./add-cours-by-description.component.scss']
})
export class AddCoursByDescriptionComponent implements OnInit {

  cours :Cours =new Cours();
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  matieres ;
  classes ;
  show;
  showFootNote 
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coursService: CoursService,
    private classesService:ClasseService,
    private toastr: ToastrService
    
    
    //private toastr: ToastrService
  ) { 
   
  }

  ngOnInit(): void {
  
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],     
      description: ['', Validators.required], 
      matiere:  ['', Validators.required],
      classe: ['', Validators.required],    
      
      //policy_checked: [false, Validators.required],
    });
    this.getMatieres();
    this.getclasses();
    //console
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
    getclasses(){
      console.log("mouha")
        this.classesService.getClasseByEnseignant().subscribe(e=>{
          this.classes=e;
          this.cours.matiere.id = e[0]._id
  
            console.log("brb")
            console.log(e)
         
         
        
              })
      }


      updateState(){
        // Reset
        this.showFootNote = !this.showFootNote;
      }

  get fval_2() {
    return this.registerForm.controls;
  }
//   onChange()
//   {
//  console.log(this.classes)
//   }
onChange()
{
console.log(this.classes)
}

  saveCours() {
     let results = [];
    // const imagBlob =this.fileInput.nativeElement.files[0];
     for (let m of this.classes){
      
    //   console.log('tt',this.registerForm.value.classe);
    //  // this.registerForm.value.matiere=["620e06c80eb6fd6eb99936a9","620e23690eb6fd6eb99937f3"]
       if(m.selected == true){
    //   console.log("ahaahah")
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
    //   console.log( results.length)
    // const form =new FormData();
    // form.set('file',imagBlob);
    // form.set('nom',this.registerForm.value.nom);
    // form.set('matiere',this.registerForm.value.matiere);
    // form.set('classe',this.registerForm.value.classe);
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
   // console.log('form',imagBlob.name)
    
    this.coursService.addCoursByDescription(this.registerForm.value).subscribe(
      (data) => {
        //console.log('form11',imagBlob)
        console.log('api done');
        this.toastr.success('Ajout avec succés')
        this.goToList();
      },
     
    );
    console.log('all done');
  }
  goToList(){
    this.router.navigate(['/EnseignantHome/cours' ])
    }
    onSubmit(){
      console.log("zzz");
      this.saveCours();
    }
    editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: "15rem",
      minHeight: "5rem",
      placeholder: "Enter text here...",
      translate: "no",
      defaultParagraphSeparator: "p",
      defaultFontName: "Arial",
      toolbarHiddenButtons: [["bold"]],
      customClasses: [
        {
          name: "quote",
          class: "quote"
        },
        {
          name: "redText",
          class: "redText"
        },
        {
          name: "titleText",
          class: "titleText",
          tag: "h1"
        }
      ]
    };
}
