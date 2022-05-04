import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Cours } from '../_models/cours';
import { CoursService } from '../_services/cours.service';

@Component({
  selector: 'app-view-cours-enseignant',
  templateUrl: './view-cours-enseignant.component.html',
  styleUrls: ['./view-cours-enseignant.component.scss']
})
// @NgModule({
//   imports: [
//     CommonModule,
//     BrowserAnimationsModule, // required animations module
//     ToastrModule.forRoot(), // ToastrModule added
//   ],
//   bootstrap: [],
//   declarations: [],
// })

export class ViewCoursEnseignantComponent implements OnInit {

  id
  d
  cours :Cours
  contenu
  result;
  @ViewChild('content', {static:false}) el!: ElementRef;
    constructor(private coursService :CoursService,private route: ActivatedRoute,private toastr: ToastrService) { }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      console.log(this.id)
      this.d=this.coursService.getCoursById(this.id).subscribe(data=>{
        
        this.cours=data;
        //this.user.password="";
        console.log(data)
        //console.log(data)
        //console.log(data.role.type)
        //this.test=data.role.type
        //console.log("test",this.test)
        //console.log("data :",data.description)
        this.contenu=data.description
        //console.log("data 2:",this.contenu)
         console.log('enseig',data.enseignant)
          console.log('matiere',data.matiere.nom)
        //this.contenu =data.description.innerHTML
         //this.contenu.innerHTML=data.description
         //this.result=this.contenu.innerHTML
         //console.log("data 2:",this.contenu.innerHTML)
       })
    }

   

    makePDF(id)
  {
  
    let pdf =new jsPDF ('p','pt','a1');
     console.log("helo")
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        console.log("he")
      pdf.save("cours.pdf")
      }
    }
    )
    
   
  }
  showSuccess() {
    //this.toastr.success('Hello world!', 'Toastr fun!');
    this.toastr.error('everything is broken', 'Major Error', {
      timeOut: 3000,
    })
  }
}
