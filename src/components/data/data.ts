import { Component } from '@angular/core';

/**
 * Generated class for the DataComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'data',
  templateUrl: 'data.html'
})
export class DataComponent {

  text: string;

  constructor() {
    console.log('Hello DataComponent Component');
    this.text = 'Hello World';
  }

}
