import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _http:HttpClient) {}

  newMessage(body: any): Observable<any> {
    return this._http.post('http://127.0.0.1:3000/messages/new', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  findByIdPatient(id_paziente: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/messages/'+id_paziente);
  }

}
