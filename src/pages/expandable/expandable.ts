import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-expandable',
  templateUrl: 'expandable.html',
})
export class ExpandablePage {

  dives = [
    { date: "01 Jan 2018", location: "Mullaghmore, Sligo.", hidden: false },
    { date: "05 Jan 2018", location: "Mullaghmore, Sligo.", hidden: true },
    { date: "23 Mar 2018", location: "Cassan Snd, Donegal.", hidden: true },
    { date: "24 Mar 2018", location: "St. Johns Pt, Donegal.", hidden: true },
  ];

  constructor(public navCtrl: NavController) {

  }

  expandItem(item) {

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
}
