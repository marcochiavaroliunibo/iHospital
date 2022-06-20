import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {UserService} from "../service/user-service/user.service";
import {MedicAssignmentService} from "../service/medic-assignment-service/medic-assignment.service";

@Injectable({
  providedIn: 'root'
})
export class MyPatientGuard implements CanActivate {

  constructor(private _auth: UserService, private route: ActivatedRoute,
              private _router: Router, private _assignment: MedicAssignmentService) { }

  // @ts-ignore
  canActivate(par: ActivatedRouteSnapshot) {
    let role = localStorage.getItem("role");
    if (role === "DIRETTORE") {
      return true;
    }else{
      let id = localStorage.getItem('id');
      let patient =  par.paramMap.get('id');
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
        return true;
    }
  }

}
