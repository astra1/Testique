import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs/observable/from';
import { pluck, map, filter, concatMap, toArray } from 'rxjs/operators';
import { CompanyService } from '../../core/_services/company.service';
import { Company } from '../../shared/_interfaces/company';
import { Item } from '../../shared/_interfaces/item';

@Component({
  selector: 'app-testique-smart',
  templateUrl: './smart.component.html',
  styleUrls: ['./smart.component.css']
})
export class SmartComponent implements OnInit {
  results: any[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {

    this.companyService.getCompanyData()
      .pipe(
        pluck('companies'),
        concatMap((arr: Company[]) => from(arr)),
        filter(v => v.monthRevenue > 0),
        map(v => this.CompanyToItem(v)),
        toArray()
      ).subscribe(companies => {
        this.results = companies;
      });

  }

  private CompanyToItem(obj: Company): Item {
    return {
      id: obj.id,
      name: obj.name,
      category: obj.type,
      weekStats: obj.revenuePerWeek,
      balance: obj.revenue,
      monthBalance: obj.monthRevenue
    };
  }

  logSelectedItem(item: Item) {
    console.log('logSelectedItem: ', item);
  }
}
