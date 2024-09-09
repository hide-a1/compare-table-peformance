import { Route } from '@angular/router';
import { PlaneMaterialTable } from '../plane-material-table/plane-material-table';
import { MaterialTable } from '../material-table/material-table';
import { AgGridTable } from '../ag-grid-table/ag-grid-table';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'plane',
    pathMatch: 'full',
  },
  {
    path: 'plane',
    title: 'plane material',
    component: PlaneMaterialTable,
  },
  {
    path: 'virtual',
    title: 'virtual material',
    component: MaterialTable,
  },
  {
    path: 'ag-grid',
    title: 'AG Grid',
    component: AgGridTable,
  },
];
