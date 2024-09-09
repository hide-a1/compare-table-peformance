import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialTable } from '../material-table/material-table';
import { PlaneMaterialTable } from '../plane-material-table/plane-material-table';
import { AgGridTable } from '../ag-grid-table/ag-grid-table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MaterialTable,
    PlaneMaterialTable,
    AgGridTable,
    MatButtonToggleModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
