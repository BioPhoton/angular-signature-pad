import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signature-pad-control',
  templateUrl: './signature-pad-control.component.html'
})
export class SignaturePadControlComponent implements OnInit {

  testForm: FormGroup;

  initialSignature = () => [
    [
      {
        x: 11.328125,
        y: 30,
        time: 1506167092932,
        color: 'red'
      }
    ]
  ]

  constructor(private fb: FormBuilder) {
    this.testForm = this.fb.group({
      signature: [this.initialSignature()]
    });
  }

  fill() {
    this.testForm.get('signature').setValue(this.initialSignature());
  }

  ngOnInit() {

  }


}
