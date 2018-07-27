import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Chart } from 'chart.js';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-charts',
  template: `
  <div *ngIf="lineChartData">
  <div class="row">
    <div class="col-md-6">
      <div style="display: block; overflow: hidden;">
      <canvas class="diveChart" baseChart width="350" height="400"
                  [data]="lineChartData"
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
  </div>

  `
})
export class ChartsPage {

  dives: any = []; 
  data: any = [];
  labels: any = [];

  // ngOnInit(){
  //   this.db.list('/dives').valueChanges().subscribe((datas) => {
  //     this.dives = datas;
  //     this.dives.forEach(element => {
  //       // if(element.showInGraph){
  //       this.data.push( Number(element.depth.slice(0, -1)));
  //       this.labels.push( element.date );
  //       // }
  //     });
  //     setTimeout(() => {this.lineChartData = this.data;
  //       this.lineChartLabels = this.labels;
  //       console.log("data: " + this.data);
  //       console.log("lineChart: " + this.lineChartData);
  //       console.log("First in array", this.lineChartData[0])} , 1000);

  //   },
  //     (err) => { console.log("problem : ", err) });
  // }

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.db.list('/dives').valueChanges().subscribe((datas) => {
      this.dives = datas;
      this.dives.forEach(element => {
        // if(element.showInGraph){
        this.data.push( Number(element.depth.slice(0, -1)));
        this.labels.push( element.date );
        // }
      });
      setTimeout(() => {this.lineChartData = this.data;
        this.lineChartLabels = this.labels;
        console.log("data: " + this.data);
        console.log("lineChart: " + this.lineChartData);
        console.log("First in array", this.lineChartData[0])} , 1000);

    },
      (err) => { console.log("problem : ", err) });
  }

  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>;
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
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
  
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

}
