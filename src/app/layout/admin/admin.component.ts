import { Component, OnInit } from '@angular/core';
import {NotesService} from "../service/notes.service";
import {AuthService} from "../../auth/service/auth.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public users: any;
  public selectUser: any;
  public data: any;
  public selectData = {
    title: "",
    content: "",
    status: ""
  };

  constructor(private notesService: NotesService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getData() {
    this.notesService.getUserNotes(this.selectUser.userUUID)
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

  public getUsers(){
    this.authService.getUsers()
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe({
        next: (response) => {
          this.users = response;
          if(this.users.length > 0){
            this.selectUser = this.users[0];
            this.getData();
          }
        }
      });
  }

  public delete(id: string){
    this.notesService.deleteUserNote(id)
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

  public clickUser(user: any){
    this.selectUser = user;
    this.getData();
  }

  public select(note: any){
    this.selectData = note;
  }
}
