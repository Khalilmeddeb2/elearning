import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/_models/user.model';
import { EnseignantService } from 'src/app/_services/enseignant.service';

@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.scss']
})
export class EnseignantsComponent implements OnInit {

  //etbalissement :Etablissement = new Etablissement();
  firstName:string
  lastName:string
  email:string
  taille:number ;
  //nbreEtablissements ;
  
  //lastName:string // comentithom
  //email:string    //comentithom
  //error :boolean=false ;
  //eroorMessage :String="Il faut remplir e champs,il est obligatoire.";
  enseignants: User[] = [];
  //roles :Role [] =[];
  i
  closeResult = '';
  message="";
  message2=""
  message3="Suppression avec succès "
  show :boolean=false;
  enabled;
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [3, 6, 9, 12];
  
  constructor(private enseignantService :EnseignantService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal) 
  {
    this.route.params.subscribe( (params : Params )=>{
      this.message=params['caller']
      this.message2=params['caller2']

    } )
   }
  ngOnInit(): void {
   
    this.getEnseignants();
   
    
    
  }

 

  getEnseignants(){
    console.log("imed")
    this.enseignantService.getEnseignants().subscribe(e=>{
     
        this.enseignants=e;
        //this.taille=e.length
        //console.log(this.taille)
       
        for(let i of e){
          
        
          for ( let m of i.matiere)
          {
            //console.log(m)
            console.log(m.nom)
           
          }
                    console.log("///////////")
                    this.enabled=i.status
                    console.log('enabled',this.enabled)
                    console.log(i)
        }
          })
         
  }
  

 
  deleteEnseignant(enseignant:User)
{
  console.log("bnsr")
this.enseignantService.deleteEnseignant(enseignant._id).subscribe(e=>
  {
    console.log("bnsr")
    this.show=true;
    this.getEnseignants();
  })
  this.modalService.dismissAll()
} 

updateEnseignant(id:string)
{
  console.log("mouha")
  this.router.navigate(['DirecteurHomeCrech/enseignants/UpdateEnseignant',id])
  console.log("eeeeeeeeeeeeeee")
}


search()
{
  if(this.firstName != "" || this.lastName != "" || this.email != ""  )
   {
  this.enseignants = this.enseignants.filter(res=>{
    return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase()) 
    || res.lastName.toLocaleLowerCase().match(this.lastName.toLocaleLowerCase()) 
    || res.email.toLocaleLowerCase().match(this.email.toLocaleLowerCase()
     ) 
  })
   }
   else if(this.firstName == "" && this.lastName == "" && this.email == "")
   {
     this.getEnseignants();
   }
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
open2(content2) {
  this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}



changeStatus(user:User)
{
  console.log("bnsr")
  this.enseignantService.EditSatutEnseignant(user._id).subscribe(e=>
    {
      console.log("bnsr")
      this.getEnseignants();
    })
    this.modalService.dismissAll()
  } 
  onTableDataChange(event: any) {
    this.page = event;
    this.getEnseignants();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getEnseignants();
  }
}
