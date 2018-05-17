import { multy } from './data';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

@Injectable()
export class CompanyService {

  constructor() { }

  getCompanyData(): Observable<any> {
    return of(multy);
  }
}
