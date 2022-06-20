import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../service/user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class DirectorGuard implements CanActivate {

  constructor(private _auth: UserService, private _router: Router) {

  }

  canActivate() {
    let role = localStorage.getItem("role");
    if (role === "DIRETTORE") {
      return true;
    }else{
      this._router.navigate(["/"]);
      return false;
    }
  }

}
