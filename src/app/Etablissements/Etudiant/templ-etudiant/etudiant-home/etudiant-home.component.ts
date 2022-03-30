import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-etudiant-home',
  templateUrl: './etudiant-home.component.html',
  styleUrls: ['./etudiant-home.component.scss']
})
export class EtudiantHomeComponent implements OnInit {
id
ids
  constructor(private router:Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }
    this.id=this.router.url.split('/');
    console.log(this.id[2])
    this.ids=this.id[2]
  }

}
