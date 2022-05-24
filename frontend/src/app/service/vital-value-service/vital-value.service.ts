import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VitalValueService {

  constructor(private _http:HttpClient) {}

  newVitalValue(my_id: string | null, id_patient: string | null, body: any): Observable<any> {
    return this._http.post('http://127.0.0.1:3000/vital-values/new/'+my_id+'/'+id_patient, body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  findByIdPatient(id_paziente: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/vital-values/find-by-patient/'+id_paziente);
  }

  delete(_id: any): Observable<any> {
    return this._http.delete('http://127.0.0.1:3000/vital-values/delete/'+_id);
  }

}
