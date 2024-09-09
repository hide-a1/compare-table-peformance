import {
  afterNextRender,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ELEMENT_DATA, PeriodicElement } from '../element-data';
import {
  ScrollingModule,
  VIRTUAL_SCROLL_STRATEGY,
} from '@angular/cdk/scrolling';
import { TableVirtualScrollStrategy } from './table-virtual-scroll-strategy.service';
import { of, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'material-table',
  templateUrl: 'material-table.html',
  standalone: true,
  imports: [MatTableModule, ScrollingModule],
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useClass: TableVirtualScrollStrategy,
    },
  ],
})
export class MaterialTable implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'description',
  ];
  rows = of(ELEMENT_DATA);
  dataSource: Observable<Array<PeriodicElement>>;

  bufferSize = 3;
  rowHeight = 48;
  headerHeight = 56;
  gridHeight = 400;

  scrollStrategy = inject<TableVirtualScrollStrategy>(VIRTUAL_SCROLL_STRATEGY);

  renderStart = signal<DOMHighResTimeStamp>(0);
  renderEnd = signal<DOMHighResTimeStamp>(0);
  renderTime = signal<DOMHighResTimeStamp>(0);

  constructor() {
    afterNextRender(() => {
      this.renderEnd.set(performance.now());
      this.renderTime.set(this.renderEnd() - this.renderStart());
    });
  }

  ngOnInit() {
    this.renderStart.set(performance.now());
    const range = Math.ceil(this.gridHeight / this.rowHeight) + this.bufferSize;
    this.scrollStrategy.setScrollHeight(this.rowHeight, this.headerHeight);

    this.dataSource = combineLatest([
      this.rows,
      this.scrollStrategy.scrolledIndexChange,
    ]).pipe(
      map((value: any) => {
        // Determine the start and end rendered range
        const start = Math.max(0, value[1] - this.bufferSize);
        const end = Math.min(value[0].length, value[1] + range);

        // Update the datasource for the rendered range of data
        return value[0].slice(start, end);
      })
    );
  }
}
