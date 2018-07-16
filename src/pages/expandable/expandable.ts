import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-expandable',
  templateUrl: 'expandable.html',
})
export class ExpandablePage {

  dives = [
    { date: "01 Jan 2018", location: "Mullaghmore, Sligo." },
    { date: "05 Jan 2018", location: "Mullaghmore, Sligo." },
    { date: "23 Mar 2018", location: "Cassan Snd, Donegal." },
    { date: "24 Mar 2018", location: "St. Johns Pt, Donegal." },
   ];

  constructor(public navCtrl: NavController) {

  }
}
