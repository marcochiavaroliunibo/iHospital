import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private _http:HttpClient) {}

  newAdministration(id:any, inf:any): Observable<any> {
    return this._http.post('http://127.0.0.1:3000/administrations/new/' + id + '/' + inf, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  findByInterval(id: string|null,start: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/administrations/find-by-interval/'+id+'/'+start);
  }

  findByPrescription(id: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/administrations/find-by-prescription/'+id);
  }

  findByNurse(id: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/administrations/find-by-nurse/'+id);
  }

  updateNote(id: string | null, note: string | null): Observable<any> {
    return this._http.put('http://127.0.0.1:3000/administrations/update/' + id + '/' + note, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

}
