import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SmartComponent } from '@components/smart/smart.component';
import { DumbComponent } from '@components/dumb/dumb.component';

import { MatCardModule, MatSelectModule, MatButtonModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
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
