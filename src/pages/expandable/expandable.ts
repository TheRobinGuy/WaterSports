import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
// import { of } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Observable, Subject } from 'rxjs';
// import { dbData, DiveDataProvider } from '../../providers/dive-data/dive-data';
import { DiveDataProvider } from '../../providers/dive-data/dive-data';
import { AuthService } from '../../services/auth.services';

@IonicPage()
@Component({
  selector: 'page-expandable',
  templateUrl: 'expandable.html',
  providers: [DiveDataProvider]
})
export class ExpandablePage {

  inputList: any;
  dives : any = [];
  divesHolding : any = [];

  hideAdd: boolean = true;

  dateIn = '';
  locationIn = '';
  minutesIn = '';
  depthIn = '';
  buddyIn = '';
  divetypeIn = '';
  addSelectedClicked = false;
  addIcon = '+';


  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public diveGetter: DiveDataProvider, private auth: AuthService) {
    this.db.list('/dives').valueChanges().subscribe((datas) => {
      console.log("datas", datas);
      this.divesHolding = datas;
      this.dives = [];
      for(var i = 0; i< this.divesHolding.length; i++){
        if(this.divesHolding[i].user == this.auth.getEmail()){
          this.dives.push(this.divesHolding[i]);
        }
      }

      console.log("dives", this.dives)
    },
      (err) => { console.log("problem : ", err) });

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
      let item = { date: this.dateIn, location: this.locationIn, buddy: this.buddyIn, depth: this.depthIn + "m", time: this.minutesIn, airIn: "210", airOut: "160", diveType: this.divetypeIn, hidden: true, showInGraph: true, user: this.auth.getEmail() }
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
