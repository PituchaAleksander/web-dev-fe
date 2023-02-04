import { Component, OnInit } from '@angular/core';
import {NotesService} from "../service/notes.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  public data: any;
  public selectNoteId: string | undefined;
  public noChange = {
    title: "",
    content: "",
    status: ""
  };
  public request = {
    title: "",
    content: "",
    status: "TODO"
  };

  public statusSelect = ["TODO", "IN_PROGRESS", "COMPLETED"];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getData();
  }

  public getData(){
    this.notesService.getNotes()
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe({
        next: (response) => {
          this.data = response;
        }
      });
  }

  public saveNote(){
    if(this.selectNoteId != undefined){
      console.log(this.request)
      if(this.request.status != this.noChange.status){
        this.notesService.updateNoteStatus({id: this.selectNoteId, status: this.request.status})
          .pipe(
            catchError((error) => {
              return error;
            })
          )
          .subscribe({
            next: () => {
              this.getData();
            }
          });
      }
      if(this.request.title != this.noChange.title || this.request.content != this.noChange.content){

        this.notesService.updateNote(this.selectNoteId, this.request)
          .pipe(
            catchError((error) => {
              return error;
            })
          )
          .subscribe({
            next: () => {
              this.getData();
            }
          });
      }
    }else{
      this.notesService.addNote(this.request)
        .pipe(
          catchError((error) => {
            return error;
          })
        )
        .subscribe({
          next: () => {
            this.getData();
          }
        });
    }
  }

  public delete(id: string){
    this.notesService.deleteNote(id)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe({
        next: () => {
          this.getData();
        }
      });
  }

  public select(note: any){
    this.selectNoteId = note.id;
    this.noChange = Object.assign({}, note);
    this.request = Object.assign({}, note);
  }

  public addNote(){
    this.selectNoteId = undefined;
    this.request = {
      title: "",
      content: "",
      status: "TODO"
    };
  }
}
