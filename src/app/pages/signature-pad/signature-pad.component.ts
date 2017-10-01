import {Component} from '@angular/core';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html'
})
export class SignaturePadComponent {

  lastChange = [];

  constructor() {
  }

  setLastChange(value): void {
    this.lastChange = value;
  }

}
