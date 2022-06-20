import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private _http: HttpClient) {
    }

    newContact(body: any): Observable<any> {
        return this._http.post('http://127.0.0.1:3000/contacts/new/', body, {
            observe: 'body',
            headers: new HttpHeaders().append('Content-type', 'application/json')
        });
    }

    allContacts(): Observable<any> {
        return this._http.get('http://127.0.0.1:3000/contacts/', {
            observe: 'body',
            headers: new HttpHeaders().append('Content-type', 'application/json')
        });
    }

    findById(id: any): Observable<any> {
        return this._http.get('http://127.0.0.1:3000/contacts/' + id, {
            observe: 'body',
            headers: new HttpHeaders().append('Content-type', 'application/json')
        });
    }

    delete(id: any): Observable<any> {
        return this._http.delete('http://127.0.0.1:3000/contacts/delete/' + id, {
            observe: 'body',
            headers: new HttpHeaders().append('Content-type', 'application/json')
        });
    }

}
