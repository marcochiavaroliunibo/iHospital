import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user-service/user.service";
import {MedicAssignmentService} from "../service/medic-assignment-service/medic-assignment.service";
import {DatePipe} from "@angular/common";
import {PatientService} from "../service/patient-service/patient.service";

@Component({
    selector: 'app-lista-medici',
    templateUrl: './lista-medici.component.html',
    styleUrls: ['./lista-medici.component.css']
})
export class ListaMediciComponent implements OnInit {

    medics: any;
    p: number = 1;

    constructor(private route: Router, private _user: UserService, private _medicAssignment: MedicAssignmentService, private _patient: PatientService) {
        this._user.findByRole("MEDICO")
            .subscribe(
                res => this.medics = res.data,
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
