import { multy } from './data';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { Company } from '@shared/_interfaces/company';

@Injectable()
export class CompanyService {

  constructor() { }

  getCompanyData(): Observable<any> {
    return of(multy);
  }
}
