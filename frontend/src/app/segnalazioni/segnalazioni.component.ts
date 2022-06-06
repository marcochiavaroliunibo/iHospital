import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user-service/user.service";
import {PatientService} from "../service/patient-service/patient.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-segnalazioni',
  templateUrl: './segnalazioni.component.html',
  styleUrls: ['./segnalazioni.component.css']
})
export class SegnalazioniComponent implements OnInit {

  id: any;
  patient: any;
  ricoverato: boolean = false;


  constructor(private route:ActivatedRoute, private _patient:PatientService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this._patient.findById(this.id).subscribe(
        res => { this.patient = res.data },
          err => { }
    );
  }

  formatDate(data_nascita: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data_nascita, 'dd/MM/yyy');
  }
  formatDateForm(data_nascita: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data_nascita, 'yyyy-MM-dd');
  }

  ngOnInit(): void {}

}
