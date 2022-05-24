import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DrugService} from "../service/drug-service/drug.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-aggiungi-farmaco',
  templateUrl: './aggiungi-farmaco.component.html',
  styleUrls: ['./aggiungi-farmaco.component.css']
})
export class AggiungiFarmacoComponent {

  drugForm: FormGroup = new FormGroup({
    nominativo: new FormControl(null, Validators.required),
    tipologia: new FormControl(null, Validators.required),
    codice: new FormControl(null, Validators.required),
    somministrazione: new FormControl(null, Validators.required),
    libretto: new FormControl(null, Validators.required),
  });

  constructor(private _router:Router, private _drug:DrugService) { }

  message : any = undefined;
  color: string = "success";
  nuovoFarmaco() {
    if (!this.drugForm.valid) {
      this.message = "Compila tutti i campi";
      this.color = "danger";
      return;
    }

    this._drug.newDrug(JSON.stringify(this.drugForm.value))
      .subscribe(
        data => { this.message = data.message; this.color = "success"},
        error => {this.message = error.error.message; this.color = "danger"}
      );
  }

}
