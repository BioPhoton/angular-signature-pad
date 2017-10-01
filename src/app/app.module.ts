import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRouterModule} from './app.routing.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {DemoModule} from './pages/demo/demo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    SharedModule,
    CoreModule.forRoot(),
    DemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
