import { Component, OnInit } from '@angular/core';
import {NotesService} from "../service/notes.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public data: any;
  public selectData = {
    title: "",
    content: "",
    status: ""
  };

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getData();
  }

  public getData(){
    this.notesService.getCompletedNotes()
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe({
        next: (response) => {
          this.data = response;
          if(this.data.length > 0){
            this.selectData = this.data[0];
          }
        }
      });
  }

  public select(note: any){
    this.selectData = note;
  }
}
