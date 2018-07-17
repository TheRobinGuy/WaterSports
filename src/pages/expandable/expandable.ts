import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-expandable',
  templateUrl: 'expandable.html',
})
export class ExpandablePage {

  dives = [
    { date: "01 Jan 2018", location: "Mullaghmore, Sligo.", buddy: "Jim o'Tool", depth: "10m", time: "28 min", airIn: "220", airOut: "180", diveType: "Scenic", hidden: true },
    { date: "05 Jan 2018", location: "Mullaghmore, Sligo.", buddy: "Fred Finch", depth: "11.1m", time: "27 min", airIn: "220", airOut: "190", diveType: "Training", hidden: true },
    { date: "23 Mar 2018", location: "Cassan Snd, Donegal.", buddy: "Mark Eer", depth: "13.2m", time: "29 min", airIn: "200", airOut: "140", diveType: "Test", hidden: true },
    { date: "24 Mar 2018", location: "St. Johns Pt, Donegal.", buddy: "Danny Rand", depth: "15m", time: "22 min", airIn: "210", airOut: "160", diveType: "Scenic", hidden: true },
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
