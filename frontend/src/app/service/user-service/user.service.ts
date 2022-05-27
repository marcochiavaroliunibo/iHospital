import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  login(body: any): Observable<any> {
    return this._http.post('http://127.0.0.1:3000/users/login', body, {
      withCredentials: true,
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  registra(body:any): Observable<any> {
    return this._http.post('http://127.0.0.1:3000/users/registrati', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  userLogged(): Observable<any> {
    let headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this._http.get('http://127.0.0.1:3000/users/user-logged', {
      withCredentials: true,
      headers: headers
    });
  }

  findByEmail(email: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/users/find-email/'+email);
  }

  findById(id: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/users/find-id/'+id);
  }

  updatePassword(id: string | null, body: any): Observable<any> {
    return this._http.put('http://127.0.0.1:3000/users/update-pwd/' + id, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

}