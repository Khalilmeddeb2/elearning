import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { Cours } from '../_models/cours';
import { CoursService } from '../_services/cours.service';

@Component({
  selector: 'app-view-cours',
  templateUrl: './view-cours.component.html',
  styleUrls: ['./view-cours.component.scss']
})
export class ViewCoursComponent implements OnInit {

  id
  d
  cours :Cours
  contenu
  result;
  @ViewChild('content', {static:false}) el!: ElementRef;
    constructor(private coursService :CoursService,private route: ActivatedRoute) { }
  
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

    updateDowload(id)
    {
        this.coursService.updateDownload(id).subscribe(e=>{
          console.log(e)
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
    ),
    this.updateDowload(id)
   
  }

}


