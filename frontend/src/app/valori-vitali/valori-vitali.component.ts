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
export class ValoriVitaliComponent implements OnInit {

  idPatient: any;
  patient: any;
  myId: any;
  vitalValues: any;
  active = 1;
  ricoverato: boolean = false;
  newValueForm: FormGroup = new FormGroup({
    hr: new FormControl(null, Validators.required),
    press_min: new FormControl(null, Validators.required),
    press_max: new FormControl(null, Validators.required),
    saturazione: new FormControl(null, Validators.required),
    freq_respriratoria: new FormControl(null, Validators.required),
    livello_dolore: new FormControl(null, Validators.required),
  });

  constructor(private route:ActivatedRoute,  private _vitalValue: VitalValueService, private _patient:PatientService, private _user:UserService) {
  }

  ngOnInit() {
    this.idPatient = this.route.snapshot.paramMap.get('id');
    this._patient.findById(this.idPatient)
        .subscribe(
            res => {
              this.patient = res.data
              this.setStatePatient()
            },
            err => {}
        );
    this.myId = localStorage.getItem("id");
    this.setVitalValue();
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

  setStatePatient() {
    // @ts-ignore
    if (this.patient.orario_dimissioni === null || this.formatDateForm(this.patient.orario_dimissioni) > this.formatDateForm(new Date())) this.ricoverato = true;
    else this.ricoverato = false;
  }

  formatDate(data: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data, 'dd MMM yyyy');
  }
  formatDate2(data: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data, 'dd/MM/yyyy');
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

  private setVitalValue() {
    var vitalValues: {
      data: any;
      oper: any;
    }[] = [];
    this._vitalValue.findByIdPatient(this.idPatient)
        .subscribe(
            res => {
              for (let i: number = 0; i < res.data.length; i++) {
                // prendo l'infermiere che lo ha somministrato
                this._user.findById(res.data[i].id_operatore).subscribe(
                    res2 => {
                      vitalValues.push({data: res.data[i], oper: res2.data});
                    },
                    error => {
                    }
                )
              }
              this.vitalValues = vitalValues;
            },
            err => {}
        );
  }
}
