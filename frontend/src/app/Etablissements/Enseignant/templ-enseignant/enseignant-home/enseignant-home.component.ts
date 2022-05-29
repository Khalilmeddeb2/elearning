import { Component, OnInit } from '@angular/core';
import { ClasseService } from 'src/app/_services/classe.service';
import { CoursService } from 'src/app/_services/cours.service';
import { ExerciceService } from 'src/app/_services/exercice.service';
import { QuestionService } from 'src/app/_services/question.service';
import { TestService } from 'src/app/_services/test.service';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-enseignant-home',
  templateUrl: './enseignant-home.component.html',
  styleUrls: ['./enseignant-home.component.scss']
})
export class EnseignantHomeComponent implements OnInit {
  publieee
nbreClasses;
nbreMatieres;
nbreCours;
nbreDoucuments
nbreExercices;
nbreQuestions;
lustTest;
lustUpdatesTest
dataCases8: any = {
  chart3: [0,0,0,0,0,0,0,0,0,0,2,1],
  //chart2: [200, 1000, 1200, 1400, 600, 0, 0, 0, 0, 0, 0, 0]
  chart2: [0,0,0,0,0,0,0,0,0,0,2,1],
};
chartResults : [100,2000,0,0,0,0,0,0,0,0,2,800]
public canvas: any;
public ctx: any;
public labels: any = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
  publieeeeeee: any;
  constructor(private classeService :ClasseService,private coursService :CoursService,
    private exerciceService :ExerciceService,private questionService :QuestionService,
    public testSrvice :TestService
    ) { }

  ngOnInit(): void {
    // if (!localStorage.getItem('page_js')) {
    //   localStorage.setItem('page_js', 'no reload');
    //   location.reload();
    //   console.log(localStorage.getItem('page_js'));
    // } else {
    //   localStorage.removeItem('page_js');
    // }
    this.totalClasses();
    this.totalMatieres();
    this.totalCours()
    this.totalExercices();
    this.totalQuestions();
    this.totalDoucuments();
    this.number5LustUpdatesTest();
    this.numberTestByMonthJAN()
   this.numberTestByMonthFev()
   this.numberTestByMonthMAR()
   this.numberTestByMonthAPP()
   this.numberTestByMonthMAY()
   this.numberTestByMonthJUIN()
   this.numberTestByMonthJUIL()
   this.numberTestByMonthAUG()
   this.numberTestByMonthSEP()
   this.numberTestByMonthOCT()
   this.numberTestByMonthNOV()
   this.numberTestByMonthDEC()
   this.number5LustTest()
    
  }

totalClasses()
{
  console.log("e")
  this.classeService.getNumberclassesByEnseignant().subscribe(data =>{
    console.log(data);

    this.nbreClasses=data;
    console.log(this.nbreClasses);
  })
}

totalMatieres()
{
  console.log("e")
  this.classeService.getNumberMatieresByEnseignant().subscribe(data =>{
    console.log(data);

    this.nbreMatieres=data;
    console.log(this.nbreMatieres);
  })
}

totalCours()
{
  console.log("e")
  this.coursService.totalCours().subscribe(data =>{
    console.log(data);

    this.nbreCours=data;
    console.log(this.nbreCours);
  })
}

totalDoucuments()
{
  //nbreDoucuments
  console.log("e")
  this.coursService.totalDoucuments().subscribe(data =>{
    console.log(data);

    this.nbreDoucuments=data;
    console.log(this.nbreDoucuments);
  })
}

totalQuestions()
{
  console.log("e")
  this.questionService.totalQuestions().subscribe(data =>{
    console.log(data);

    this.nbreQuestions=data;
    console.log('**',this.nbreQuestions);
  })
}

totalExercices()
{
  console.log("e")
  this.exerciceService.totalExercices().subscribe(data =>{
    console.log(data);

    this.nbreExercices=data;
    console.log(this.nbreExercices);
  })
}

private createLineChart(labels, dataCases, chartId) {
  this.canvas = document.getElementById(chartId);
  this.ctx = this.canvas.getContext('2d');

 
  
  let chart = new Chart(this.ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
      //   {
      //   label: "Chart 1",
      //   data: this.dataCases8.chart3,
      //   backgroundColor: '#ffbb33',
      //   borderColor: '#ffbb33',
      //   fill: false,
      //   borderWidth: 2
      // },
      {
        label: "Chart ",
        data: this.dataCases8.chart2,
        backgroundColor: '#ff4444',
        borderColor: '#ff4444',
        fill: false,
        borderWidth: 2
      }
    ]
    },
    options: {
      title: {
        display: true,
        text: "Le nombre des tests par mois"
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



numberTestByMonthJAN()
  {
    console.log("e")
    let n :string
    n='1'
    this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
     // this.testSrvice.totalTests().subscribe(data =>{
      console.log(data);

      this.dataCases8.chart2[0]=data;
      console.log(this.dataCases8.chart2[0])
      this.createLineChart(this.labels, this.dataCases8, 'myChart');

      // console.log('number en avril',this.numberTestAPR);
    })
}

numberTestByMonthFev()
  {
    console.log("e")
    let n :string
    n='2'
    this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
     // this.testSrvice.totalTests().subscribe(data =>{
      console.log(data);

      this.dataCases8.chart2[1]=data;
      console.log(this.dataCases8.chart2[1])
      this.createLineChart(this.labels, this.dataCases8, 'myChart');

      // console.log('number en avril',this.numberTestAPR);
    })
}
numberTestByMonthMAR()
  {
    console.log("e")
    let n :string
    n='3'
    this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
     // this.testSrvice.totalTests().subscribe(data =>{
      console.log(data);

      this.dataCases8.chart2[2]=data;
      console.log(this.dataCases8.chart2[2])
      this.createLineChart(this.labels, this.dataCases8, 'myChart');

      // console.log('number en avril',this.numberTestAPR);
    })
}

numberTestByMonthAPP()
  {
    console.log("e")
    let n :string
    n='4'
    this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
     // this.testSrvice.totalTests().subscribe(data =>{
      console.log(data);

      this.dataCases8.chart2[3]=data;
      console.log(this.dataCases8.chart2[3])
      this.createLineChart(this.labels, this.dataCases8, 'myChart');

      // console.log('number en avril',this.numberTestAPR);
    })
}
numberTestByMonthMAY()
  {
    console.log("e")
    let n :string
    n='5'
    this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
     // this.testSrvice.totalTests().subscribe(data =>{
      console.log(data);

      this.dataCases8.chart2[4]=data;
      console.log(this.dataCases8.chart2[4])
      this.createLineChart(this.labels, this.dataCases8, 'myChart');

      // console.log('number en avril',this.numberTestAPR);
    })
}

numberTestByMonthJUIN()
  {
    console.log("e")
    let n :string
    n='6'
    this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
     // this.testSrvice.totalTests().subscribe(data =>{
      console.log(data);

      this.dataCases8.chart2[5]=data;
      console.log(this.dataCases8.chart2[5])
      this.createLineChart(this.labels, this.dataCases8, 'myChart');

      // console.log('number en avril',this.numberTestAPR);
    })
}
numberTestByMonthJUIL()
  {
    console.log("e")
    let n :string
    n='7'
    this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
     // this.testSrvice.totalTests().subscribe(data =>{
      console.log(data);

      this.dataCases8.chart2[6]=data;
      console.log(this.dataCases8.chart2[6])
      this.createLineChart(this.labels, this.dataCases8, 'myChart');

      // console.log('number en avril',this.numberTestAPR);
    })
}

numberTestByMonthAUG()
  {
    console.log("e")
    let n :string
    n='8'
    this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
     // this.testSrvice.totalTests().subscribe(data =>{
      console.log(data);

      this.dataCases8.chart2[7]=data;
      console.log(this.dataCases8.chart2[7])
      this.createLineChart(this.labels, this.dataCases8, 'myChart');

      // console.log('number en avril',this.numberTestAPR);
    })
}

numberTestByMonthSEP()
  {
    console.log("e")
    let n :string
    n='9'
    this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
     // this.testSrvice.totalTests().subscribe(data =>{
      console.log(data);

      this.dataCases8.chart2[8]=data;
      console.log(this.dataCases8.chart2[8])
      this.createLineChart(this.labels, this.dataCases8, 'myChart');

      // console.log('number en avril',this.numberTestAPR);
    })
}

numberTestByMonthOCT()
  {
    console.log("e")
    let n :string
    n='10'
    this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
     // this.testSrvice.totalTests().subscribe(data =>{
      console.log(data);

      this.dataCases8.chart2[9]=data;
      console.log(this.dataCases8.chart2[9])
      this.createLineChart(this.labels, this.dataCases8, 'myChart');

      // console.log('number en avril',this.numberTestAPR);
    })
}

numberTestByMonthNOV()
{
  console.log("e")
  let n :string
  n='11'
  this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
   // this.testSrvice.totalTests().subscribe(data =>{
    console.log(data);

    this.dataCases8.chart2[10]=data;
    console.log(this.dataCases8.chart2[10])
    this.createLineChart(this.labels, this.dataCases8, 'myChart');

    // console.log('number en avril',this.numberTestAPR);
  })
}

numberTestByMonthDEC()
{
  console.log("e")
  let n :string
  n='12'
  this.testSrvice.totalTestsByMonth(n).subscribe(data =>{
   // this.testSrvice.totalTests().subscribe(data =>{
    console.log(data);

    this.dataCases8.chart2[11]=data;
    console.log(this.dataCases8.chart2[11])
    this.createLineChart(this.labels, this.dataCases8, 'myChart');

    // console.log('number en avril',this.numberTestAPR);
  })
}

// les 5 derniers tests
number5LustTest()
{
  console.log("5 derniers test")
 
  this.testSrvice.total5FirtsTests().subscribe(data =>{
   
    console.log(data);

    this.lustTest=data
    console.log('tabbbbb' , this.lustTest)
    for (let i of this.lustUpdatesTest)
    {
      this.publieeeeeee=i.publie
    }
   
  })
}

number5LustUpdatesTest()
{
  console.log("5 derniers test modifies")
 
  this.testSrvice.total5FirtsTestsModifies().subscribe(data =>{
   
    console.log(data);

    this.lustUpdatesTest=data
    console.log('5 dernieres tests modifees ' , this.lustUpdatesTest)
    for (let i of this.lustUpdatesTest)
    {
      this.publieee=i.publie
    }
  })
}

}
