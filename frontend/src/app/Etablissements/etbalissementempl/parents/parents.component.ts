import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user.model';
import { ParentService } from 'src/app/_services/parent.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {

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
 parents: User[] = [];
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
 tableSize: number = 25;
 tableSizes: any = [3, 6, 9, 12];
 
 constructor(private parentService :ParentService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal
  ,private toastr: ToastrService) 
 {
   
  }
 ngOnInit(): void {
  
   this.getParents();
  
   
   
 }



 getParents(){
   console.log("imed")
   this.parentService.getParents().subscribe(e=>{
    
       this.parents=e;
      
         })
        
 }
 


 deleteParent(parent:User)
{
 console.log("bnsr")
this.parentService.deleteParent(parent._id).subscribe(e=>
 {
   console.log("bnsr")
   this.show=true;
   this.toastr.error('Ajout avec succés')
   this.getParents();
 })
 this.modalService.dismissAll()
} 

updateParent(id:string)
{
 console.log("mouha")
 this.router.navigate(['DirecteurHomeCrech/parents/UpdateParent',id])
 console.log("eeeeeeeeeeeeeee")
}


search()
{
 if(this.firstName != "" || this.lastName != "" || this.email != ""  )
  {
 this.parents = this.parents.filter(res=>{
   return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase()) 
   || res.lastName.toLocaleLowerCase().match(this.lastName.toLocaleLowerCase()) 
   || res.email.toLocaleLowerCase().match(this.email.toLocaleLowerCase()
    ) 
 })
  }
  else if(this.firstName == "" && this.lastName == "" && this.email == "")
  {
    this.getParents();
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
 this.parentService.EditSatutEnseignant(user._id).subscribe(e=>
   {
     console.log("bnsr")
     this.getParents();
   })
   this.modalService.dismissAll()
 } 
 onTableDataChange(event: any) {
   this.page = event;
   this.getParents();
 }
 onTableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   this.getParents();
 }

}
