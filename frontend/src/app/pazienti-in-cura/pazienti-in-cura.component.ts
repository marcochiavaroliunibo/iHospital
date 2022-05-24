import { Component } from '@angular/core';
import {PatientService} from "../service/patient-service/patient.service";
import {Router} from "@angular/router";
import {MedicAssignmentService} from "../service/medic-assignment-service/medic-assignment.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-pazienti-in-cura',
  templateUrl: './pazienti-in-cura.component.html',
  styleUrls: ['./pazienti-in-cura.component.css']
})
export class PazientiInCuraComponent {

  patients: any;

  constructor(private _patient:PatientService, private _medicAssignment:MedicAssignmentService, private _router:Router) {
    var patients: any[] =[];
    let id = localStorage.getItem('id');

    this._medicAssignment.findByIdMedic(id).subscribe(
      res => {
        for (let i: number = 0; i < res.data.length; i++) {
          // prendo il paziente
          this._patient.findById(res.data[i].id_paziente).subscribe(
            res => patients.push(res.data),
            error => { }
          )
        }
        this.patients = patients;
      },
      error => { }
    )

  }

  formatDate(data_nascita: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data_nascita, 'dd/MM/YYYY');
  }

  formatDateTime(orario_ricovero: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(orario_ricovero, 'dd/MM/YYYY hh:mm');
  }
}
