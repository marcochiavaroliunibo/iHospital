import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {UserService} from "../service/user-service/user.service";
import {MedicAssignmentService} from "../service/medic-assignment-service/medic-assignment.service";
import {PatientService} from "../service/patient-service/patient.service";
import {OperationService} from "../service/operation-service/operation.service";

@Injectable({
  providedIn: 'root'
})
export class MyOperationGuard implements CanActivate {

  constructor(private _auth: UserService, private route: ActivatedRoute, private _router: Router, private _assignment: MedicAssignmentService, private _operation: OperationService) {

  }

  // @ts-ignore
  canActivate(par: ActivatedRouteSnapshot) {
    let role = localStorage.getItem("role");
    if (role === "DIRETTORE") {
      return true;
    }else{
      let id = localStorage.getItem('id');
      let op =  par.paramMap.get('id');
      let patient;
      this._operation.findById(op).subscribe(
          res => {
              patient = res.data.id_paziente;
              this._assignment.findById(patient, id)
                  .subscribe(
                      res => {
                          if (res.data !== null) {
                          }else{
                              this._router.navigate(["/pazienti-in-cura"]);
                          }
                      },
                      err => {
                          this._router.navigate(["/pazienti-in-cura"]);
                      }
                  )
          }
      )
        return true;
    }
  }

}
