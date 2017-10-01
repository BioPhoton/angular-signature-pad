import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {minLines, minPointsInEachNLines} from 'angular-signature-pad';

@Component({
  selector: 'app-signature-pad-card-group',
  templateUrl: './signature-pad-card-group.component.html'
})
export class SignaturePadCardGroupComponent implements OnInit {

  testForm: FormGroup;
  signatureControl: FormControl;

  constructor(fb: FormBuilder) {
    this.testForm = fb.group({
      signature: ['', [
        minLines(1),
        minPointsInEachNLines(4, 1)
      ]]
    });
    this.signatureControl = this.testForm.get('signature') as FormControl;
  }

  ngOnInit() {
  }

}
