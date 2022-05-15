import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  constructor() { }

 
    ngOnInit(): void {
      if (!localStorage.getItem('page_js')) {
        localStorage.setItem('page_js', 'no reload');
        location.reload();
        console.log(localStorage.getItem('page_js'));
      } else {
        localStorage.removeItem('page_js');
      }
     
    }
  

}
