import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ValueChart} from "../../value-chart";
import io from 'socket.io-client';
import {from, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ValueStatusService {

  private baseUrl =  'http://localhost:4000';
  constructor(private httpClient: HttpClient) { }

  getInitialValueStatus() {
    return this.httpClient.get<ValueChart[]>(`${this.baseUrl}/api/value-chart`);
  }

  getUpdates() {
    // @ts-ignore
    let socket = io(this.baseUrl, { transports : ['websocket'] });
    let valueSub = new Subject<ValueChart>();
    let valueSubObservable = from(valueSub);

    socket.on('chart', (valueChartStatus: ValueChart) => {
      valueSub.next(valueChartStatus);
    });
    return valueSubObservable;
  }

}
