import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'control-state',
  templateUrl: './control-state.component.html',
  styles: [`
    ul {
      list-style: none;
      margin-bottom: 0;
    }

    .control-value {
      max-height: 200px;
      overflow-y: scroll;
    }
  `]
})
export class ControlStateComponent implements OnChanges, OnInit {

  @Input()
  control;

  @Input()
  errorColor = 'danger';

  ngOnChanges(changes: SimpleChanges): void {

    console.log(changes);

    if ('errorColor' in changes) {
      this.errorColor = changes.errorColor.currentValue || 'danger'
    }
  }

  ngOnInit() {

  }

  getErrors(): any[] {
    return Object.keys(this.control.errors)
      .map((key) => {
        return {
          name: key,
          value: this.control.errors[key]
        }
      })
  }

}
