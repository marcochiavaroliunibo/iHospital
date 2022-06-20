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
  all : any;
  input: any;

  constructor(private route: Router, private _user: UserService, private _medicAssignment: MedicAssignmentService, private _patient: PatientService) {

  }

  ngOnInit() {
    this._user.findByRole("INFERMIERE")
        .subscribe(
            res => { this.nurses = res.data; this.all = this.nurses },
            err => {
            }
        )
  }

  formatDate(date: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(date, 'dd/MM/yyy');
  }

  search() {
    if (this.input == "") {
      this.nurses = this.all;
    }else{
      this.nurses = this.all.filter((res: { cognome: string; }) => {
        return res.cognome.toLocaleLowerCase().match(this.input.toLocaleLowerCase());
      })
    }
  }

}
