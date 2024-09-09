import { afterNextRender, Component, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ELEMENT_DATA } from '../element-data';

@Component({
  selector: 'plane-material-table',
  templateUrl: 'plane-material-table.html',
  standalone: true,
  imports: [MatTableModule],
})
export class PlaneMaterialTable implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'description',
  ];
  dataSource = ELEMENT_DATA;

  renderStart = signal<DOMHighResTimeStamp>(0);
  renderEnd = signal<DOMHighResTimeStamp>(0);
  renderTime = signal<DOMHighResTimeStamp>(0);

  constructor() {
    afterNextRender(() => {
      this.renderEnd.set(performance.now());
      this.renderTime.set(this.renderEnd() - this.renderStart());
      window.performance.measure(
        '起動までの時間',
        'AppBootStrap:start',
        'AppBootStrap:end'
      );
    });
  }

  ngOnInit(): void {
    this.renderStart.set(performance.now());
  }
}
