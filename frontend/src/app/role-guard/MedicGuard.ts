import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {UserService} from "../service/user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class MedicGuard implements CanActivate {

  constructor(private _auth: UserService, private _router: Router) {

  }

  canActivate() {
    let role = localStorage.getItem("role");
    if (role === "MEDICO") {
      return true;
    }else{
      this._router.navigate(["/"]);
      return false;
    }
  }

}
