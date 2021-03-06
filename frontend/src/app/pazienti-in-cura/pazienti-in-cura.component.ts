import {Component, OnInit} from '@angular/core';
import {PatientService} from "../service/patient-service/patient.service";
import {Router} from "@angular/router";
import {MedicAssignmentService} from "../service/medic-assignment-service/medic-assignment.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-pazienti-in-cura',
  templateUrl: './pazienti-in-cura.component.html',
  styleUrls: ['./pazienti-in-cura.component.css']
})
export class PazientiInCuraComponent implements OnInit {

  patients: any;
  p: number = 1;
  all : any;
  input: any;

  constructor(private _patient:PatientService, private _medicAssignment:MedicAssignmentService, private _router:Router) {
  }

  ngOnInit() {
    var patients: any[] =[];
    let id = localStorage.getItem('id');

    this._medicAssignment.findByIdMedic(id).subscribe(
        res => {
          for (let i: number = 0; i < res.data.length; i++) {
            // prendo il paziente
            this._patient.findById(res.data[i].id_paziente).subscribe(
                res => {
                  console.log(res.data.orario_dimissioni)
                  // @ts-ignore
                  if(res.data.orario_dimissioni === undefined || res.data.orario_dimissioni === null || this.formatDateDB(res.data.orario_dimissioni) > this.formatDateDB(new Date()))
                    patients.push(res.data)
                },
                error => { }
            )
          }
          this.patients = patients;
          this.all = this.patients;
        },
        error => { }
    )
  }

  formatDate(data_nascita: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data_nascita, 'dd/MM/YYYY');
  }
  formatDateDB(data_nascita: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data_nascita, 'yyyy-MM-dd');
  }
  formatDateTime(orario_ricovero: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(orario_ricovero, 'dd/MM/YYYY');
  }

  search() {
    if (this.input == "") {
      this.patients = this.all;
    }else{
      this.patients = this.all.filter((res: { cognome: string; }) => {
        return res.cognome.toLocaleLowerCase().match(this.input.toLocaleLowerCase());
      })
    }
  }

}
