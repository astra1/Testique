import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';
import { TestiqueModule } from './components/testique.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    TestiqueModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
