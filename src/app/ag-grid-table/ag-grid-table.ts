import { Component, signal, afterNextRender } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ELEMENT_DATA } from '../element-data';
import { AG_GRID_LOCALE_JP } from '@ag-grid-community/locale';

@Component({
  selector: 'ag-grid-table',
  templateUrl: 'ag-grid-table.html',
  standalone: true,
  imports: [AgGridAngular],
})
export class AgGridTable {
  rowData = ELEMENT_DATA;
  defaultColDef: ColDef = {
    filterParams: { buttons: ['clear'] },
  };
  colDefs: ColDef[] = [
    { field: 'position', filter: 'agNumberFilter' },
    { field: 'name', filter: 'agTextFilter' },
    { field: 'weight', filter: 'agNumberFilter' },
    { field: 'symbol', filter: 'agTextFilter' },
    {
      field: 'description',
      filter: 'agTextFilter',
      wrapText: true,
      autoHeight: true,
    },
  ];
  // localText を設定することでメニュー内のテキスト等を翻訳することができます。@ag-grid-community/locale　パッケージのインストールが必要です
  localeText = AG_GRID_LOCALE_JP;

  renderStart = signal<DOMHighResTimeStamp>(0);
  renderEnd = signal<DOMHighResTimeStamp>(0);
  renderTime = signal<DOMHighResTimeStamp>(0);

  constructor() {
    afterNextRender(() => {
      this.renderEnd.set(performance.now());
      this.renderTime.set(this.renderEnd() - this.renderStart());
    });
  }

  ngOnInit(): void {
    this.renderStart.set(performance.now());
  }
}
