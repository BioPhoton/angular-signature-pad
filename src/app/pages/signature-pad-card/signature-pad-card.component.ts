import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {isArray, consistOfArrays, consistOfObjects, minLines, minPointsInEachNLines} from 'angular-signature-pad';

@Component({
  selector: 'app-signature-pad-card',
  templateUrl: './signature-pad-card.component.html'
})
export class SignaturePadCardComponent implements OnInit {

  testForm: FormGroup;
  signatureControl: FormControl;

  constructor(fb: FormBuilder) {
    this.testForm = fb.group({
      signature: ['', [
        isArray,
        consistOfArrays,
        consistOfObjects,
        minLines(1),
        minPointsInEachNLines(4, 1)
      ]]
    });
    this.signatureControl = this.testForm.get('signature') as FormControl;
  }

  ngOnInit() {
  }

}
