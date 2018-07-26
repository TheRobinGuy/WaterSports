import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { dbData, DiveDataProvider } from '../../providers/dive-data/dive-data';

@IonicPage()
@Component({
  selector: 'page-expandable',
  templateUrl: 'expandable.html',
})
export class ExpandablePage {

  inputList: any;
  dives : any = [];
  // dives = [
  //   { date: "01 Jan 2018", location: "Mullaghmore, Sligo.", buddy: "Jim o'Tool", depth: "10m", time: "28", airIn: "220", airOut: "180", diveType: "Scenic", hidden: true, showInGraph: false },
  //   { date: "05 Jan 2018", location: "Mullaghmore, Sligo.", buddy: "Fred Finch", depth: "11.1m", time: "27", airIn: "220", airOut: "190", diveType: "Training", hidden: true, showInGraph: false },
  //   { date: "23 Mar 2018", location: "Cassan Snd, Donegal.", buddy: "Mark Eer", depth: "13.2m", time: "29", airIn: "200", airOut: "140", diveType: "Test", hidden: true, showInGraph: false },
  //   { date: "24 Mar 2018", location: "St. Johns Pt, Donegal.", buddy: "Danny Rand", depth: "15m", time: "22", airIn: "210", airOut: "160", diveType: "Scenic", hidden: true, showInGraph: false },
  // ];

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
  //   this.dives = this.db.list('dives');
  
  // }

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public diveGetter: DiveDataProvider) {
    diveGetter.getDiveData();
    this.dives = dbData;
    console.log("dbData in expandable", dbData);
    // this.db.list('/dives').valueChanges().subscribe((datas) => {
    //   console.log("datas", datas);
    //   // datas.map(data => {
    //   //   this.dives.push(data);
    //   // });
    //   this.dives = datas;
    //   console.log("dives", this.dives)
    // },
    //   (err) => { console.log("probleme : ", err) });

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
