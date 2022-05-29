import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Etablissement } from 'src/app/_models/etablissement';
import { Role } from 'src/app/_models/role';
import { EtablissementService } from 'src/app/_services/etablissement.service';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit {

  etbalissement :Etablissement = new Etablissement();
  firstName:string
  numeroRegister:string
  pays:string
  taille:number ;
  actionDisabled :boolean =false;
  message="";
  message2=""
  message3="suppression avec succès"
  show :boolean=false;
  etbalissements: Etablissement[] = [];
  roles :Role [] =[];
  i
  closeResult = '';
  enabled;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private etablissementService :EtablissementService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal
    ,private toastr: ToastrService) 
  {
  
   }

  ngOnInit(): void {
    this.getEtablissements();
    this.taille=this.etbalissements.length;
  }

 

  getEtablissements(){
    console.log("imed")
    this.etablissementService.getEtablissements().subscribe(e=>{
     
        this.etbalissements=e;
     
       
        for(let i of e){
          console.log(i.firstName)
          
          this.enabled=i.status
          console.log(i)
        
        
          for ( let r of i.role)
          {
            console.log(r)
            console.log(r.type)
           
          }
                    
        }
          })
         
  }
  

 
  deleteEtablissement(etbalissement:Etablissement)
{
  console.log("bnsr")
this.etablissementService.deleteEtablissement(etbalissement._id).subscribe(e=>
  {
    console.log("bnsr")
    this.show=true;
    this.toastr.error('suppression avec succés')
    this.getEtablissements();
  })
  this.modalService.dismissAll()
} 

updateEtablissement(id:string)
{
  console.log("mouha")
  this.router.navigate(['backoffice/etablissements/updateEtablissement',id])
  console.log("eeeeeeeeeeeeeee")
}

search()
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



changeStatusEtablissement(etbalissement:Etablissement)
{
  console.log("bnsr")
  this.etablissementService.EditSatutsEtablissement(etbalissement._id).subscribe(e=>
    {
      console.log("bnsr")
      this.getEtablissements();
    })
    this.modalService.dismissAll()
  }
  
  onTableDataChange(event: any) {
    this.page = event;
    this.getEtablissements();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getEtablissements();
  }
}


