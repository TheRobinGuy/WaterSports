// import { HttpClient } from '@angular/common/http';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class DiveDataProvider {

  // dives: any = [];

  // constructor(public db: AngularFireDatabase) {
  //   this.getDiveData();
  // }

  // getDiveData = () => {
  //   this.db.list('/dives').valueChanges().subscribe((datas) => {
  //     console.log("data", datas);
  //     this.dives = datas;
  //     this.dives.forEach(element => {
  //       dbData.push( element );
  //     });
  //   },
  //     (err) => { console.log("problem : ", err) });
  // }

  // returnDiveData = () => {
  //   return this.dives;
  // }

}

export var dbData;