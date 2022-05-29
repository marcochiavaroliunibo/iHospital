import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user-service/user.service";
import {MedicAssignmentService} from "../service/medic-assignment-service/medic-assignment.service";
import {PatientService} from "../service/patient-service/patient.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-lista-infermieri',
  templateUrl: './lista-infermieri.component.html',
  styleUrls: ['./lista-infermieri.component.css']
})
export class ListaInfermieriComponent implements OnInit {

  nurses: any;
  p: number = 1;

  constructor(private route: Router, private _user: UserService, private _medicAssignment: MedicAssignmentService, private _patient: PatientService) {
    this._user.findByRole("INFERMIERE")
        .subscribe(
            res => this.nurses = res.data,
            err => {
            }
        )
  }

  ngOnInit(): void {
  }

  formatDate(date: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(date, 'dd/MM/yyy');
  }

}
