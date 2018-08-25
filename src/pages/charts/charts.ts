import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Chart } from 'chart.js';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../services/auth.services';


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
  divesHolding : any = [];



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

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, private auth: AuthService) {
    this.db.list('/dives').valueChanges().subscribe((datas) => {
      this.divesHolding = datas;
      this.dives = [];
      this.data = [];
      this.labels = [];
      for(var i = 0; i< this.divesHolding.length; i++){
        if(this.divesHolding[i].user == this.auth.getEmail()){
          this.dives.push(this.divesHolding[i]);
        }
      }

      this.dives.forEach(element => {
        this.data.push( Number(element.depth.slice(0, -1)));
        this.labels.push( element.date );
      });
        this.lineChartData = this.data;
        this.lineChartLabels = this.labels;

    },
      (err) => { console.log("problem : ", err) });
  }
  
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

}
