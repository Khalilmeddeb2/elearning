import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cours } from 'src/app/_models/cours';
import { CoursService } from 'src/app/_services/cours.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.scss']
})
export class CoursComponent implements OnInit {
  //@ViewChild('fileInput',{ static : false})
  //fileInput!: ElementRef;
  nom:string
  matiere
  classe
 numeroRegister:string
 pays:string
 taille:number ;
 datebe
 //nbreEtablissements ;
 
 //lastName:string // comentithom
 //email:string    //comentithom
 //error :boolean=false ;
 //eroorMessage :String="Il faut remplir e champs,il est obligatoire.";
 cours: Cours[] = [];
 //roles :Role [] =[];
 i
 closeResult = '';
 message="";
 message2=""
 message3="Suppression avec succès "
 show :boolean=false;
 page: number = 1;
count: number = 0;
tableSize: number = 2;
tableSizes: any = [3, 6, 9, 12];
  url2

 constructor(private coursService :CoursService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal,private sanitization: DomSanitizer
  ) 
 {
  this.route.params.subscribe( (params : Params )=>{
    this.message=params['caller']
    this.message2=params['caller2']

  } )
 }

 ngOnInit(): void {
 
   this.getCours();
   
   
 }



 getCours(){
   console.log("imed")
   this.coursService.getCours().subscribe(e=>{
    
       this.cours=e.map(p=>{
        p.filename=this.sanitization.bypassSecurityTrustResourceUrl("http://localhost:3007/"+p.filename);
        //window.open(p.filename)
        //console.log('file',p.filename.changingThisBreaksApplicationSecurity)
        this.url2=p.filename.changingThisBreaksApplicationSecurity
        //this.openExercice(this.url2)
        console.log('p',p)
        p.path=p.filename.changingThisBreaksApplicationSecurity;
        p.datebe =p.date
      return p;
     
      
     
      })
     
           //console.log(m)
           //console.log(e)
           for(let i of e )
           {
             //console.log(i.classe)
             for ( let c of i.classe)
             {
               //console.log(m)
               console.log(c.nom)
             }
           }          
         })
        
 }
 search()
 {
   if(this.nom != "" || this.datebe != "" )
    {
   this.cours = this.cours.filter(res=>{
     return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) ||
     res.datebe.toLocaleLowerCase().match(this.datebe.toLocaleLowerCase())
     
   })
   
    }
    else if(this.nom == "" && this.datebe == "")
    {
      this.getCours();
    }
 }


 openFile(x)
 {
   window.open(x)
 }
 deleteCours(cours:Cours)
{
 console.log("bnsr")
this.coursService.deleteCours(cours._id).subscribe(e=>
 {
   console.log("bnsr")
   this.show=true
   this.getCours();
 })
 this.modalService.dismissAll()
} 

updateCours(id:string)
{
 console.log("mouha")
 this.router.navigate(['EnseignantHome/doucuments/UpdateDoucument',id])
 console.log("eeeeeeeeeeeeeee")
}

  






open(content) {
 this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
   this.closeResult = `Closed with: ${result}`;
 }, (reason) => {
   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
 });
}

private getDismissReason(reason: any): string {
 if (reason === ModalDismissReasons.ESC) {
   return 'by pressing ESC';
 } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
   return 'by clicking on a backdrop';
 } else {
   return `with: ${reason}`;
 }
}
onTableDataChange(event: any) {
  this.page = event;
  this.getCours();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getCours();
}

}
