import { AngularSignaturePadModule } from './angular-signature-pad.module';

describe('AngularSignaturePadModule', () => {
  let angularSignaturePadModule: AngularSignaturePadModule;

  beforeEach(() => {
    angularSignaturePadModule = new AngularSignaturePadModule();
  });

  it('should create an instance', () => {
    expect(angularSignaturePadModule).toBeTruthy();
  });
});
