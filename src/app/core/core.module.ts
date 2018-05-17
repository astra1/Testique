import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyService } from '@core/_services/company.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [CompanyService]
})
export class CoreModule {
  /* CoreModule должен быть импортирован только в AppModule */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule уже загружен. Его следует импортировать только в AppModule');
    }
  }
}
