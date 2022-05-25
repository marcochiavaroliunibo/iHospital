import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user-service/user.service";
import {VitalValueService} from "../service/vital-value-service/vital-value.service";
import {DatePipe} from "@angular/common";
import {PatientService} from "../service/patient-service/patient.service";

@Component({
  selector: 'app-valori-vitali',
  templateUrl: './valori-vitali.component.html',
  styleUrls: ['./valori-vitali.component.css']
})
export class ValoriVitaliComponent {

  idPatient: string | null;
  patient: any;
  myId: string | null;
  vitalValues: any;
  active = 1;
  newValueForm: FormGroup = new FormGroup({
    hr: new FormControl(null, Validators.required),
    press_min: new FormControl(null, Validators.required),
    press_max: new FormControl(null, Validators.required),
    saturazione: new FormControl(null, Validators.required),
    freq_respriratoria: new FormControl(null, Validators.required),
    livello_dolore: new FormControl(null, Validators.required),
  });

  constructor(private route:ActivatedRoute,  private _vitalValue: VitalValueService, private _patient:PatientService) {
    this.idPatient = this.route.snapshot.paramMap.get('id');
    this._patient.findById(this.idPatient)
      .subscribe(
        res => {
          this.patient = res.data
        },
        err => {}
      );
    this.myId = localStorage.getItem("id");
    this._vitalValue.findByIdPatient(this.idPatient)
      .subscribe(
        res => {
          this.vitalValues = res.data
        },
        err => {}
      );
  }

  message: any = undefined;
  newValue() {
    if (!this.newValueForm.valid) {
      this.message = "Compilare correttamente tutti i campi";
      return;
    }
    this._vitalValue.newVitalValue(this.myId, this.idPatient, JSON.stringify(this.newValueForm.value))
      .subscribe(
        res => window.location.reload(),
        err => this.message = err.message
      );
  }

  formatDate(data: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data, 'dd MMM yyy');
  }
  formatTime(data: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data, 'HH:mm');
  }

  deleteValue(_id: any) {
    this._vitalValue.delete(_id).subscribe(
      res => { window.location.reload(); },
      error => { console.log(error) }
    )
  }

  switchPage() {
    this.active = 2;
  }
}
