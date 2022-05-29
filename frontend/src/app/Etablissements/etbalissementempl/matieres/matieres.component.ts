import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Matiere } from 'src/app/_models/matiere';
import { MatiereService } from 'src/app/_services/matiere.service';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.scss']
})
export class MatieresComponent implements OnInit {

  matiere :Matiere = new Matiere();
  nom:string
  /*numeroRegister:string
  pays:string
  taille:number ;*/
  //nbreEtablissements ;
  
  //lastName:string // comentithom
  //email:string    //comentithom
  //error :boolean=false ;
  //eroorMessage :String="Il faut remplir e champs,il est obligatoire.";
  matieres: Matiere[] = [];
  //roles :Role [] =[];
  //i
  closeResult = '';
  message="";
  message2=""
  message3="Suppression avec succès "
  show :boolean=false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 25;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private matiereService :MatiereService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal,
    private toastr: ToastrService) 
  {
    
   }
  ngOnInit(): void {
    /*if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }*/
    this.getMatieres();
    //this.taille=this.etbalissements.length;
    //console.log(this.taille)
    
    //this.taille;
    //console.log(this.taille)
    //console.log( this.etbalissements)
    
    
  }

 

  getMatieres(){
    console.log("imed")
    this.matiereService.getMartieres().subscribe(e=>{
     
        this.matieres=e;
        console.log(e) 
        
          })
         
  }
  

 
  deleteMatiere(matiere:Matiere)
{
  console.log("bnsr")
this.matiereService.deleteMatiere(matiere._id).subscribe(e=>
  {
    console.log("bnsr")
    this.show=true;
    this.toastr.error('Suppression avec succés')
    this.getMatieres();
  })
  this.modalService.dismissAll()
} 

updateMatiere(id:string)
{
  console.log("mouha")
  this.router.navigate(['DirecteurHomeCrech/matieres/UpdateMatiere',id])
  console.log("eeeeeeeeeeeeeee")
}


search()
{
  if(this.nom != ""  )
   {
  this.matieres = this.matieres.filter(res=>{
    return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) })
  
   }
   else if(this.nom == "")
   {
     this.getMatieres();
   }
}


/*search()
{
  if(this.firstName != "" || this.numeroRegister != "" || this.pays != "" )
   {
  this.etbalissements = this.etbalissements.filter(res=>{
    return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase()) 
    || res.numeroRegister.toLocaleLowerCase().match(this.numeroRegister.toLocaleLowerCase()) 
    || res.pays.toLocaleLowerCase().match(this.pays.toLocaleLowerCase()
     ) 
  })
   }
   else if(this.firstName == "" && this.numeroRegister == "" && this.pays == "")
   {
     this.getEtablissements();
   }
}*/

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
  this.getMatieres();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getMatieres();
}
}
