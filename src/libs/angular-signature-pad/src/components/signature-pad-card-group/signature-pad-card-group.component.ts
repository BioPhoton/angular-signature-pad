import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {SignaturePadControlComponent} from '../signature-pad-control/signature-pad-control.component';

@Component({
  selector: 'signature-pad-card-group',
  templateUrl: './signature-pad-card-group.component.html',
  providers: []
})
export class SignaturePadCardGroupComponent implements OnInit {

  @Input()
  theme: string;

  @Input()
  group: AbstractControl;

  @Input()
  config: any;

  control: FormControl;

  @ViewChild('signaturePad')
  signaturePad: SignaturePadControlComponent;

  constructor() {

  }


  ngOnInit() {
    console.log('this.group.get(this.config.name)', this.group, this.group.get(this.config.name))
    this.control = this.group.get(this.config.name) as FormControl;
  }

}
