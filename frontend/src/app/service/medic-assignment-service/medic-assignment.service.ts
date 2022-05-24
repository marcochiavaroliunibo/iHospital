import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicAssignmentService {

  constructor(private _http:HttpClient) {}

  newMedicAssignment(id_paziente:any, id_medico: any): Observable<any> {
    return this._http.post('http://127.0.0.1:3000/medic-assignments/new', {id_paziente, id_medico}, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  findByIdPatient(id_paziente: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/medic-assignments/patient/'+id_paziente);
  }

  findByIdMedic(id_medico: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/medic-assignments/medic/'+id_medico);
  }

  findById(id_paziente: string | null, id_medico: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/medic-assignments/'+id_paziente+'/'+id_medico);
  }

  delete(id_paziente: string | null, id_medico: string | null): Observable<any> {
    return this._http.delete('http://127.0.0.1:3000/medic-assignments/delete/'+id_paziente+'/'+id_medico);
  }

}
