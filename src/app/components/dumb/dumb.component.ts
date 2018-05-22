import {
  Component,
  OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy,
  OnChanges, SimpleChanges, ElementRef, ViewChild, NgZone
} from '@angular/core';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Item } from '../../shared/_interfaces/item';

import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-testique-dumb',
  templateUrl: './dumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dumb.component.css']
})
export class DumbComponent implements OnInit, OnChanges {

  @Input() items: Item[] = [];
  @Output() onItemSelected: EventEmitter<Item> = new EventEmitter<Item>();
  @ViewChild('graphWrapper') graphWrapper: ElementRef;

  private changeSize$: Subject<Event> = new Subject();

  chartForm: FormGroup;

  month = 0;
  total = 0;
  categories: any[] = [];
  occurrencies: any[] = [];

  chartWidth = 270;
  chartHeight = 300;

  scheme = 'vivid';

  results: any[] = [];

  constructor(private zone: NgZone, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();

    this.fixGraphPosition();

    this.chartForm.get('category').valueChanges
      .subscribe(val => {
        const filteredItems = val ? this.items.filter(i => i.category === val) : this.items;
        this.refreshDumb(filteredItems);
      });

    this.onResize(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.categories = this.getCategories(this.items);
    this.occurrencies = this.getOccurrencies(this.items);
    if (this.results.length === 0) {
      this.refreshDumb(this.items);
    }
  }

  private getCategories(obj: Item[]) {
    const categories = obj.map(i => i.category);
    const distinctCategories = new Set(categories);
    return Array.from(distinctCategories);
  }

  private getOccurrencies(obj: Item[]) {
    return obj.map(o => {
      return { name: o.name, value: o.id };
    });
  }

  private generateSeries(items: Item[]): any[] {
    const result = items.map(v => {
      return {
        name: v.name,
        series: Object.keys(v.weekStats).map(k => {
          return {
            name: k.slice(0, 2).toLocaleUpperCase(),
            value: v.weekStats[k]
          };
        })
      };
    });
    return result;
  }

  private refreshDumb(items: Item[]) {
    this.month = this.total = this.getTotal(items);
    this.results = this.generateSeries(items);
  }

  onSelectClick() {
    const selectedId = this.chartForm.get('occurrence').value;
    if (selectedId && selectedId > 0) {
      const item = this.items.find(i => i.id === selectedId);
      this.onItemSelected.emit(item);
    }
  }

  private getTotal(items: Item[]) {
    let result = 0;
    items.forEach(i => result = result + i.monthBalance);

    return result;
  }

  private buildForm() {
    this.chartForm = this.fb.group({
      category: new FormControl(''),
      occurrence: new FormControl('')
    });
  }

  fixGraphPosition() {
    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(150),
          distinctUntilChanged(),
      ).subscribe((e: Event) => {
        this.zone.run(() => this.changeSize$.next(e));
      });
    });


    this.changeSize$.subscribe((e: Event) => {
      this.onResize(e);
    });
  }

  onResize(event) {
    if (this.graphWrapper && this.graphWrapper.nativeElement) {
      this.chartWidth = this.graphWrapper.nativeElement.offsetWidth;
    }
  }

  getView() {
    return [this.chartWidth, this.chartHeight];
  }
}
