import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule, MatSelectModule, MatButtonModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { SmartComponent } from './smart/smart.component';
import { DumbComponent } from './dumb/dumb.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    // Charts
    NgxChartsModule
  ],
  declarations: [SmartComponent, DumbComponent],
  bootstrap: [SmartComponent],
  exports: [SmartComponent]
})
export class TestiqueModule { }
