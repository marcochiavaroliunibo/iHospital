import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private _http:HttpClient) {}

  newOperation(body:any): Observable<any> {
    return this._http.post('http://127.0.0.1:3000/operations/new-operation', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  allOperations() {
    return this._http.get('http://127.0.0.1:3000/operations/all', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  findByPatient(id_paziente: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/operations/find-by-patient/'+id_paziente);
  }

  updateOperation(id: string | null, body: any): Observable<any> {
    return this._http.put('http://127.0.0.1:3000/operations/update/' + id, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  findById(id: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/operations/'+id);
  }

}
