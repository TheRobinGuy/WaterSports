import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  lat: any;
  lng: any;

  path: any = [];

  constructor(public navCtrl: NavController, public geo: Geolocation) {
  }

  ionViewDidLoad(){
    this.geo.getCurrentPosition().then( pos => {
      this.lat = pos.coords.latitude;
      this.lng = pos.coords.longitude;
      this.path.push({"lat": this.lat, "lng": this.lng});
      this.addToPath();
    }).catch( err => console.log(err));
  }

  addToPath(){
    setInterval(() => {
      this.geo.getCurrentPosition().then( pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.path.push({"lat": this.lat, "lng": this.lng});
      }).catch( err => console.log(err));
    },6000);
  }
 

}
