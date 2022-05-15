import { Component, OnInit } from '@angular/core';
//import { Chart } from 'chart.js';
import { EtablissementService } from 'src/app/_services/etablissement.service';
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services/user.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  /*nbreEtablissements;
  nbreRoles;
  nbreDirecteurs; 
  nbreUtlisateurs;
  public canvas: any;
  public ctx: any;
  public labels: any = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  public dataCases: any = {
    chart1: [2000, 10000, 12000, 14000, 6000, 0, 0, 0, 0, 0, 0, 0],
    chart2: [200, 1000, 1200, 1400, 600, 0, 0, 0, 0, 0, 0, 0]
  }
  constructor(private etablissementService:EtablissementService,private roleSerrvice :RoleService ,private userService :UserService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('page_js')) {
      localStorage.setItem('page_js', 'no reload');
      location.reload();
      console.log(localStorage.getItem('page_js'));
    } else {
      localStorage.removeItem('page_js');
    }
   
    this.totalEtablissements();
    this.totalRoles();
    this.totalDirecteurs();
    this.totalUtilisateurs();
  }

  
    
  

  totalEtablissements()
  {
    console.log("e")
    this.etablissementService.totalEtablissements().subscribe(data =>{
      console.log(data);

      this.nbreEtablissements=data;
      console.log(this.nbreEtablissements);
    })
  }
  totalRoles()
  {
    console.log("e")
    this.roleSerrvice.totalRoles().subscribe(data =>{
      console.log(data);

      this.nbreRoles=data;
      console.log(this.nbreRoles);
    })
  }
  totalDirecteurs()
  {
    console.log("e")
    this.userService.totalDirecteurs().subscribe(data =>{
      console.log(data);

      this.nbreDirecteurs=data;
      console.log(this.nbreDirecteurs);
    })
  }

  totalUtilisateurs()
  {
    console.log("e")
    this.userService.totalUtlisateurs().subscribe(data =>{
      console.log(data);

      this.nbreUtlisateurs=data;
      console.log(this.nbreUtlisateurs);
    })
  }
  

  private createLineChart(labels, dataCases, chartId) {
    this.canvas = document.getElementById(chartId);
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Chart 1",
          data: dataCases.chart1,
          backgroundColor: '#ffbb33',
          borderColor: '#ffbb33',
          fill: false,
          borderWidth: 2
        },
        {
          label: "Chart 2",
          data: dataCases.chart2,
          backgroundColor: '#ff4444',
          borderColor: '#ff4444',
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        title: {
          display: true,
          text: "First chart"
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        
      }
    });
  }*/
  nbreEtablissements =0;
  nbreRoles =0;
  nbreDirecteurs =0; 
  nbreUtlisateurs =0;
  public canvas: any;
  public ctx: any;
  public labels: any = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  public dataCases: any = {
    chart1: [2000, 10000, 12000, 14000, 6000, 4000, 18000, 0, 0, 0, 0, 0],
    chart2: [200, 1000, 1200, 1400, 600, 0, 0, 0, 0, 0, 0, 0]
  };

  constructor() { }

  ngOnInit(): void {
    this.createLineChart(this.labels, this.dataCases, 'myChart');
  }

  private createLineChart(labels, dataCases, chartId) {
    this.canvas = document.getElementById(chartId);
    this.ctx = this.canvas.getContext('2d');

    let chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Chart 1",
          data: dataCases.chart1,
          backgroundColor: '#ffbb33',
          borderColor: '#ffbb33',
          fill: false,
          borderWidth: 2
        },
        {
          label: "Chart 2",
          data: dataCases.chart2,
          backgroundColor: '#ff4444',
          borderColor: '#ff4444',
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        title: {
          display: true,
          text: "First chart"
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        
      }
    });
  }
}
