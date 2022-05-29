import { Component, OnInit } from '@angular/core';
import {PatientService} from "../service/patient-service/patient.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-lista-dimessi',
  templateUrl: './lista-dimessi.component.html',
  styleUrls: ['./lista-dimessi.component.css']
})
export class ListaDimessiComponent implements OnInit {

  patients: any;
  p: number = 1;
  constructor(private _patient:PatientService, private _router:Router) {
    this._patient.dismissPatients().subscribe(
        res => this.patients = res.data,
        error => console.log(error)
    )
  }

  ngOnInit(): void { }

  openProfile(_id: any) {
    // todo vedere per _id
    this._router.navigate(['profilo-paziente/' + _id]);
  }

  formatDate(data_nascita: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data_nascita, 'dd/MM/YYYY');
  }
  formatDateTime(data: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data, 'dd/MM/YYYY hh:mm');
  }

}