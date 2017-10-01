import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignaturePadCardGroupComponent} from './signature-pad-card-group.component';

const routes: Routes = [
  {
    path: '',
    component: SignaturePadCardGroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignaturePadCardGroupRoutingModule { }
