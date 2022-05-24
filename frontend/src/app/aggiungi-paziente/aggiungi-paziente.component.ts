import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DrugService} from "../service/drug-service/drug.service";
import {PatientService} from "../service/patient-service/patient.service";

@Component({
  selector: 'app-aggiungi-paziente',
  templateUrl: './aggiungi-paziente.component.html',
  styleUrls: ['./aggiungi-paziente.component.css']
})
export class AggiungiPazienteComponent {

  patientForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    data_nascita: new FormControl(null, Validators.required),
    luogo_nascita: new FormControl(null, Validators.required),
    reparto: new FormControl(null, Validators.required),
    motivo_ricovero: new FormControl(null, Validators.required),
    cartella_clinica: new FormControl(null, Validators.required),
  });

  constructor(private _router:Router, private _patient:PatientService) { }

  message : any = undefined;
  color: string = "success";
  nuovoPaziente() {
    if (!this.patientForm.valid) {
      this.message = "Compila tutti i campi";
      this.color = "danger";
      return;
    }
    this._patient.newPatient(JSON.stringify(this.patientForm.value))
      .subscribe(
        data => { this.message = data.message; this.color = "success"},
        error => {this.message = error.error.message; this.color = "danger"}
      );
  }

}
