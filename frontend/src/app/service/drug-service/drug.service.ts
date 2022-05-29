import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(private _http:HttpClient) {}

  newDrug(body:any): Observable<any> {
    return this._http.post('http://127.0.0.1:3000/drugs/new-drug', body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  findById(id: string | null): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/drugs/find-by-id/'+id);
  }

  allDrugs(): Observable<any> {
    return this._http.get('http://127.0.0.1:3000/drugs/all', {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

  updateDesc(id: string | null, desc: any): Observable<any> {
    return this._http.put('http://127.0.0.1:3000/drugs/update-desc/' + id + '/' +  desc, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-type', 'application/json')
    });
  }

}
