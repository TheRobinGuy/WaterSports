import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
// import { of } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Observable, Subject } from 'rxjs';
// import { dbData, DiveDataProvider } from '../../providers/dive-data/dive-data';
import { DiveDataProvider } from '../../providers/dive-data/dive-data';

@IonicPage()
@Component({
  selector: 'page-expandable',
  templateUrl: 'expandable.html',
//   template: `
//   <ion-content *ngIf="this.dives">
//   <ion-list>
//     <ion-item text-wrap *ngFor="let d of dives">
//       <ion-row>
//         <ion-col col-11>
//           <button (click)="expandItem(d)" class="divesBtn">
//             <div class="diveBtnTitle">
//               <b>{{d.date}} | {{d.location}}</b>
//             </div>
//             <div [hidden]=d.hidden class="diveBtnBody">
//               <ion-row>
//                 <ion-col style="width: 6em;">Depth : {{d.depth}}</ion-col>
//                 <ion-col class="timeFixer">Time : {{d.time}} min</ion-col>
//               </ion-row>
//               <ion-row>
//                 <ion-col>Buddy : {{d.buddy}}</ion-col>
//               </ion-row>
//               <hr/>
//               <ion-row>
//                 <ion-col>Dive Type : {{d.diveType}}</ion-col>
//               </ion-row>
//             </div>
//           </button>
//         </ion-col>
//         <ion-col col-1>
//           <input type="checkbox" (click)="showSelectedInGraph(d)">
//         </ion-col>
//       </ion-row>
//     </ion-item>
//     <button (click)="addSelected()" class="addItem">{{addIcon}}</button>
//     <div class="pushRight" [hidden]=this.hideAdd>
//       <p>
//         <ion-col class="addDiveLabel" col-5>Date : </ion-col>
//         <ion-col class="alignRight" col-6>
//           <input class="diveAddInput" [(ngModel)]="dateIn" type="date" placeholder="dd/mmm/yyy">
//         </ion-col>
//       </p>
//       <p>
//         <ion-col class="addDiveLabel" col-5>Location : </ion-col>
//         <ion-col class="alignRight" col-6>
//           <input class="diveAddInput" [(ngModel)]="locationIn" type="text" placeholder="Location">
//         </ion-col>
//       </p>
//       <p>
//         <ion-col class="addDiveLabel" col-5>Time : </ion-col>
//         <ion-col class="alignRight" col-6>
//           <input class="diveAddInput" [(ngModel)]="minutesIn" type="number" placeholder="Minutes">
//         </ion-col>
//       </p>
//       <p>
//         <ion-col class="addDiveLabel" col-5>Depth : </ion-col>
//         <ion-col class="alignRight" col-6>
//           <input class="diveAddInput" [(ngModel)]="depthIn" type="number" placeholder="Metres">
//         </ion-col>
//       </p>
//       <p>
//         <ion-col class="addDiveLabel" col-5>Buddy : </ion-col>
//         <ion-col class="alignRight" col-6>
//           <input class="diveAddInput" [(ngModel)]="buddyIn" type="text" placeholder="Name">
//         </ion-col>
//       </p>
//       <p>
//         <ion-col class="addDiveLabel" col-5>Dive Type : </ion-col>
//         <ion-col class="alignRight" col-6>
//           <input class="diveAddInput" [(ngModel)]="divetypeIn" type="text" placeholder="Type">
//         </ion-col>
//       </p>
//       <button class="addLogBtn" (click)="addItem()">Add Dive Log</button>
//     </div>
//   </ion-list>

//   <div class="pushRight" [hidden]=this.addSelectedClicked>
//     <page-charts></page-charts>
//   </div>
// </ion-content>
//   `,
  providers: [DiveDataProvider]
})
export class ExpandablePage {

  inputList: any;
  dives : any = [];

  hideAdd: boolean = true;

  dateIn = '';
  locationIn = '';
  minutesIn = '';
  depthIn = '';
  buddyIn = '';
  divetypeIn = '';
  addSelectedClicked = false;
  addIcon = '+';
  
  // ngOnInit(){
  //   this.dives = this.diveGetter.returnDiveData();
  //   console.log("dbData in expandable", this.dives);
  // }

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public diveGetter: DiveDataProvider) {
    //diveGetter.getDiveData();
    // this.dives = diveGetter.returnDiveData();
    // console.log("dbData in expandable", this.dives);
    this.db.list('/dives').valueChanges().subscribe((datas) => {
      console.log("datas", datas);
      this.dives = datas;
      console.log("dives", this.dives)
    },
      (err) => { console.log("probleme : ", err) });

  }

  expandItem = (item) => {

    this.dives.map((listItem) => {

      if (item == listItem) {
        listItem.hidden = !listItem.hidden;
        console.log("Hidden : " + listItem.hidden)
      } else {
        listItem.hidden = true;
      }
      return listItem;
    });
  }

  addSelected = () => {
    this.hideAdd = !this.hideAdd;
    this.addSelectedClicked = !this.addSelectedClicked;
    if(this.addSelectedClicked){
      this.addIcon = 'x';
    }
    else{
      this.addIcon = '+';
    }
  }

  addItem = () => {
    if (this.dateIn != '' && this.locationIn != '' && this.buddyIn != '' && this.depthIn != '' && this.minutesIn != '' && this.divetypeIn != '') {
      let item = { date: this.dateIn, location: this.locationIn, buddy: this.buddyIn, depth: this.depthIn + "m", time: this.minutesIn, airIn: "210", airOut: "160", diveType: this.divetypeIn, hidden: true, showInGraph: false }
      this.db.list('dives').push(item);      
      this.dives.push(item);
      this.dateIn = '';
      this.locationIn = '';
      this.minutesIn = '';
      this.depthIn = '';
      this.buddyIn = '';
      this.divetypeIn = '';
    }
    else{
      alert("Item must have content!");
    }
  }

  showSelectedInGraph = (d) => {
    d.showInGraph = !d.showInGraph;
  }
}
