import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private _http:HttpClient) {}

  newPrescription(body:any): Observable<any> {
    return this._http.post('http://127.0.0.1:3000/prescriptions/new', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  findByIdPatient(id_paziente: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/prescriptions/find-by-patient/'+id_paziente);
  }

  delete(id_paziente: string | null, id_medicina: string | null): Observable<any> {
    return this._http.delete('http://127.0.0.1:3000/prescriptions/delete/'+id_paziente+'/'+id_medicina);
  }

}
