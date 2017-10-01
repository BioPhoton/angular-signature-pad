import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {

  testForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.testForm = this.fb.group({
      firstName: [],
      lastName: [],
      signature: [[]]
    });
  }

}
