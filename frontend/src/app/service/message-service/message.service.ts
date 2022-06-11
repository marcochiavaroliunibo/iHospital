import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {io} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket = io('http://localhost:4000');

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

  sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });
    return this.message$.asObservable();
  }

}
