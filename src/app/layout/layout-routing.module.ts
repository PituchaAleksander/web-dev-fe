import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {HistoryComponent} from "./history/history.component";
import {ListComponent} from "./list/list.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        {
          path: '',
          redirectTo: 'notes',
          pathMatch: 'prefix'
        },
        {
            path: 'notes',
            canActivate: [],
            component: ListComponent
        },
        {
            path: 'history',
            canActivate: [],
            component: HistoryComponent
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
