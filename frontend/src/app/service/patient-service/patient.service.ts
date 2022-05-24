import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _http:HttpClient) {}

  newPatient(body:any): Observable<any> {
    return this._http.post('http://127.0.0.1:3000/patients/new-patient', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  allPatients() {
    return this._http.get('http://127.0.0.1:3000/patients/all', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  findById(id: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/patients/'+id);
  }

  updatePatient(id: string | null, body: any): Observable<any> {
    return this._http.put('http://127.0.0.1:3000/patients/update/' + id, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  quitPatient(id: string | null): Observable<any> {
    return this._http.put('http://127.0.0.1:3000/patients/quit/' + id, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

}
