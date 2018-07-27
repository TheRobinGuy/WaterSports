import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-charts',
  // templateUrl: 'charts.html',
  template: `
  <div class="row" *ngIf="lineChartData">
    <div class="col-md-6">
      <div style="display: block; overflow: hidden;">
      <canvas class="diveChart" baseChart width="350" height="400"
                  [datasets]="lineChartData"
                  [labels]="lineChartLabels"
                  [options]="lineChartOptions"
                  [colors]="lineChartColors"
                  [legend]="lineChartLegend"
                  [chartType]="lineChartType"
                  (chartHover)="chartHovered($event)"
                  (chartClick)="chartClicked($event)"></canvas>
      </div>
    </div>
  </div>

  `
})
export class ChartsPage {

  dives: any = []; 
  data: any = [];

  ngOnInit(){
    this.db.list('/dives').valueChanges().subscribe((datas) => {
      this.dives = datas;
      this.dives.forEach(element => {
        console.log(element.depth + ", " + element.date)
        this.data.push( element.depth );
      });
      console.log("data: " + this.data);
      console.log("lineChart: " + this.lineChartData);
      this.lineChartData = this.dives;
    },
      (err) => { console.log("problem : ", err) });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    // this.db.list('/dives').valueChanges().subscribe((datas) => {
    //   this.dives = datas;
    //   this.dives.forEach(element => {
    //     console.log(element.depth + ", " + element.date)
    //     this.lineChartData.push( element.depth );
    //   });
    //   console.log(this.lineChartData);
    // },
    //   (err) => { console.log("problem : ", err) });
  }

  public lineChartData:Array<any>;// = this.data;
  //  = [
    // {data: [40], label: 'Place A'},
    // {data: [28], label: 'Place B'},
    // {data: [18], label: 'Place C'}
  // ];
  public lineChartLabels:Array<any> = ['3 min', '6 min', '9 min', '12 min', '15 min', '18 min', '21 min'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(255,0,0,0.2)',
      borderColor: 'rgba(255,0,0,1)',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(0,255,0,0.2)',
      borderColor: 'rgba(0,255,0,1)',
      pointBackgroundColor: 'rgba(0,255,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,255,0,1)'
    },
    { // grey
      backgroundColor: 'rgba(0,0,255,0.2)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(0,0,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,255,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

}
