import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteEtudiant } from 'src/app/_models/note-etudiant';
import { NoteEtudiantService } from 'src/app/_services/note-etudiant.service';

@Component({
  selector: 'app-voir-notes-etudiants',
  templateUrl: './voir-notes-etudiants.component.html',
  styleUrls: ['./voir-notes-etudiants.component.scss']
})
export class VoirNotesEtudiantsComponent implements OnInit {

  //etbalissement :Etablissement = new Etablissement();
 firstName:string
 lastName:string
 email:string
 taille:number ;
 nom
 notes: NoteEtudiant[] = [];
 show :boolean=false;
 page: number = 1;
 count: number = 0;
 tableSize: number = 2;
 tableSizes: any = [3, 6, 9, 12];
  id
 constructor(private noteService :NoteEtudiantService,private router: Router, private route: ActivatedRoute,private modalService: NgbModal) 
 {}
  
 ngOnInit(): void {
  this.id = this.route.snapshot.params['id'];
  console.log(this.id)
   this.getNotes();
 }



 getNotes(){
   console.log("imed")
   this.noteService.getNotes(this.id).subscribe(e=>{
    
       this.notes=e;
       console.log("e",e)
   })
  }
 



// search()
// {
//   if(this.nom != "" || this.datebe != "" )
//    {
//   this.cours = this.cours.filter(res=>{
//     return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) ||
//     res.datebe.toLocaleLowerCase().match(this.datebe.toLocaleLowerCase())
    
//   })
  
//    }
//    else if(this.nom == "" && this.datebe == "")
//    {
//      this.getCours();
//    }
// }



 onTableDataChange(event: any) {
   this.page = event;
   this.getNotes();
 }
 onTableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   this.getNotes();
 }

}
