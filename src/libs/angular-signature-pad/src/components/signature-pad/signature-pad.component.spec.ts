import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePadComponent } from './signature-pad.component';

describe('SignaturePadComponent', () => {
  let component: SignaturePadComponent;
  let fixture: ComponentFixture<SignaturePadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignaturePadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
