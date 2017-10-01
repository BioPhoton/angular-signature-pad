import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'app-signature-pad-configuration',
  templateUrl: './signature-pad-configuration.component.html'
})
export class SignaturePadConfigurationComponent {

  configForm: FormGroup;
  valueChanges;

  initialConfig = {
    dotSize: 1.5,
    minWidth: 1,
    maxWidth: 3,
    throttle: 16,
    backgroundColor: '#ffff80',
    penColor: '#000',
    velocityFilterWeight: 0.7
  };

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      dotSize: [],
      minWidth: [],
      maxWidth: [],
      throttle: [],
      backgroundColor: [],
      penColor: [],
      velocityFilterWeight: []
    });

    this.configForm.reset(this.initialConfig);
    // ugly hack to init subscription with values
    this.valueChanges = this.configForm.valueChanges.startWith(this.configForm.value);
  }

  reset() {
    this.configForm.reset(this.initialConfig);
  }

}
