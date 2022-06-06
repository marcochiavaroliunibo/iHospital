import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {OperationService} from "../service/operation-service/operation.service";
import {PatientService} from "../service/patient-service/patient.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MedicAssignmentService} from "../service/medic-assignment-service/medic-assignment.service";

@Component({
  selector: 'app-aggiungi-operazione',
  templateUrl: './aggiungi-operazione.component.html',
  styleUrls: ['./aggiungi-operazione.component.css']
})
export class AggiungiOperazioneComponent {

  operationForm: FormGroup = new FormGroup({
    id_paziente: new FormControl(null, Validators.required),
    titolo: new FormControl(null, Validators.required),
    data_ora: new FormControl(null, Validators.required),
    durata: new FormControl(null, Validators.required),
    rischio: new FormControl(null, Validators.required),
    descrizione: new FormControl(null, Validators.required),
  });
  patients: any;

  constructor(private _router:Router, private _operation:OperationService, private _patient:PatientService, private _medicAssignment: MedicAssignmentService) {
    var patients: {
      data: any;
    }[] = [];
    this._medicAssignment.findByIdMedic(localStorage.getItem('id')).subscribe(
        res => {
          for (let i: number = 0; i < res.data.length; i++) {
            // prendo il paziente
            this._patient.findById(res.data[i].id_paziente).subscribe(
                res => {
                  // @ts-ignore
                  if(res.data.orario_dimissioni === undefined || res.data.orario_dimissioni === null || this.formatDateDB(res.data.orario_dimissioni) > this.formatDateDB(new Date())) {
                    patients.push({data: res.data})
                  }
                },
                error => { }
            )
          }
          this.patients = patients;
        },
        error => { }
    )
  }

  message : any = undefined;
  color: string = "success";

  newOperation() {
    if (!this.operationForm.valid) {
      this.message = "Compila tutti i campi";
      this.color = "danger";
      return;
    }
    this._operation.newOperation(JSON.stringify(this.operationForm.value))
      .subscribe(
        data => { this.message = data.message; this.color = "success"},
        error => {this.message = error.error.message; this.color = "danger"}
      );
  }

  formatDate(data_nascita: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data_nascita, 'dd/MM/YYYY');
  }
  formatDateDB(date: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(date, 'yyyy-MM-dd');
  }


}
