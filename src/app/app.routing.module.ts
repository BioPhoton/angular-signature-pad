import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {DemoComponent} from './pages/demo/demo.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'demo'
  },
  {
    path: 'demo',
    component: DemoComponent,
  },
  {
    path: 'signature-pad',
    loadChildren: 'app/pages/signature-pad/signature-pad.module#SignaturePadModule'
  },
  {
    path: 'signature-pad-control',
    loadChildren: 'app/pages/signature-pad-control/signature-pad-control.module#SignaturePadControlModule'
  },
  {
    path: 'signature-pad-configuration',
    loadChildren: 'app/pages/signature-pad-configuration/signature-pad-configuration.module#SignaturePadConfigurationModule'
  },
  {
    path: 'signature-pad-control-validation',
    loadChildren: 'app/pages/signature-pad-control-validation/signature-pad-control-validation.module#SignaturePadControlValidationModule'
  },
  {
    path: 'signature-pad-card',
    loadChildren: 'app/pages/signature-pad-card/signature-pad-card.module#SignaturePadCardModule'
  },
  {
    path: 'signature-pad-card-group',
    loadChildren: 'app/pages/signature-pad-card-group/signature-pad-card-group.module#SignaturePadCardGroupModule'
  }
];

const extraOptions: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, extraOptions)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
