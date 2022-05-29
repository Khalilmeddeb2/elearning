import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Actualite } from 'src/app/_models/actualite';
import { ActualiteService } from 'src/app/_services/actualite.service';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.scss']
})
export class ActualitesComponent implements OnInit {
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  
actualites;
  closeResult: string;
  constructor(private router: Router,private actualitéService :ActualiteService,private sanitization: DomSanitizer,private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getActualites()
  }

  getActualites(){
    
    
    console.log("imed")
   this.actualitéService.getActualites().subscribe(e=>{
    
       this.actualites=e.map(p=>{
        //console.log("e",this.profils)
       p.filename=this.sanitization.bypassSecurityTrustResourceUrl("http://localhost:3007/"+p.filename);
       
     return p;
    
     
    
     })
    
       
          })   
  }

  
  deleteActualite(actualite:Actualite)
{
  console.log("bnsr")
this.actualitéService.deleteActualite(actualite._id).subscribe(e=>
  {
    console.log("bnsr")
    //this.show=true;
    this.toastr.error('suppression avec succés')
    this.getActualites();
  })
  this.modalService.dismissAll()
} 

updateActualite(id:string)
{
  console.log("mouha")
  this.router.navigate(['backoffice/actualites/updateActualite',id])
  console.log("eeeeeeeeeeeeeee")
}

  onTableDataChange(event: any) {
    this.page = event;
    this.getActualites();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getActualites();
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
}
