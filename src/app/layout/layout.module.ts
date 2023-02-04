import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { FormsModule } from '@angular/forms';
import { NotesComponent } from './notes/notes.component';
import { HistoryComponent } from './history/history.component';
import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    NotesComponent,
    HistoryComponent,
    AdminComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule
  ]
})
export class LayoutModule { }
