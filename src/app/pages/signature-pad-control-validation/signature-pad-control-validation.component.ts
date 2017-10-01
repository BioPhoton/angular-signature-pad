import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {isArray, consistOfArrays, consistOfObjects, minLines, minPointsInEachNLines} from 'angular-signature-pad';

@Component({
  selector: 'app-signature-pad-control-validation',
  templateUrl: './signature-pad-control-validation.component.html'
})
export class SignaturePadControlValidationComponent implements OnInit {

  testForm: FormGroup;
  signatureControl: FormControl;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.testForm = this.fb.group({
      signature: ['', [
        isArray,
        consistOfArrays,
        consistOfObjects,
        minLines(2),
        minPointsInEachNLines(4, 1)
      ]]
    });
    this.signatureControl = this.testForm.get('signature') as FormControl;
  }

  assignValidSignature() {
    this.signatureControl.setValue([
      [
        {
          x: 531.328125,
          y: 130,
          time: 1506167092932,
          color: 'red'
        },
        {
          x: 431.328125,
          y: 100,
          time: 1506167093932,
          color: 'red'
        }
      ],
      [
        {
          x: 131.328125,
          y: 30,
          time: 1506167094932,
          color: 'red'
        },
        {
          x: 231.328125,
          y: 50,
          time: 1506167095932,
          color: 'red'
        },
        {
          x: 31.328125,
          y: 10,
          time: 1506167096932,
          color: 'red'
        },
        {
          x: 61.328125,
          y: 110,
          time: 1506167097932,
          color: 'red'
        }
      ]
    ]);
  }

  assignNonArray() {
    this.signatureControl.setValue('thisIsNoArray');
  }

  assignArrayOfNonArrays() {
    this.signatureControl.setValue(['thisIsNoArray']);
  }

  assignArrayArraysOfNonObjects() {
    this.signatureControl.setValue([['thisIsNoObject']]);
  }

  assignSignatureOf1Line() {
    this.signatureControl.setValue([[
      {
        x: 131.328125,
        y: 30,
        time: 1506167094932,
        color: 'red'
      },
      {
        x: 231.328125,
        y: 50,
        time: 1506167095932,
        color: 'red'
      },
      {
        x: 31.328125,
        y: 10,
        time: 1506167096932,
        color: 'red'
      },
      {
        x: 61.328125,
        y: 110,
        time: 1506167097932,
        color: 'red'
      }
    ]]);
  }

  assignSignatureOf2LineEach2Points() {
    this.signatureControl.setValue([
      [
        {
          x: 531.328125,
          y: 130,
          time: 1506167092932,
          color: 'red'
        },
        {
          x: 431.328125,
          y: 100,
          time: 1506167093932,
          color: 'red'
        }
      ],
      [
        {
          x: 131.328125,
          y: 30,
          time: 1506167094932,
          color: 'red'
        },
        {
          x: 231.328125,
          y: 50,
          time: 1506167095932,
          color: 'red'
        }
      ]
    ]);
  }

}
