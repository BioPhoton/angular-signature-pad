import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {DemoComponent} from './demo.component';

const BASIC_IMPLEMENTATION_ROUTES: Routes = [
  {
    path: '',
    component: DemoComponent  }
];

const extraOptions: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [
    RouterModule.forChild(BASIC_IMPLEMENTATION_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class DemoRouterModule {
}
