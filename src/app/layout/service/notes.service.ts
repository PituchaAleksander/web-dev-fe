import { Injectable } from '@angular/core';
import {BaseService} from "../../service/base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotesService extends BaseService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public getNotes(): Observable<any> {
    return this.get("/note");
  }

  public getCompletedNotes(): Observable<any> {
    return this.get("/note/completed");
  }

  public addNote(request: any): Observable<any> {
    return this.post("/note", request);
  }

  public updateNote(id: string, request: any): Observable<any> {
    return this.put("/note/" + id, request);
  }

  public deleteNote(id: string): Observable<any> {
    return this.delete("/note/" + id);
  }

  public getUserNotes(userUUID: string): Observable<any> {
    return this.get("/note/" + userUUID);
  }

  public updateNoteStatus(request: any): Observable<any> {
    return this.put("/note/status", request);
  }

  public deleteUserNote(id: string): Observable<any> {
    return this.delete("/note/user/" + id);
  }
}
