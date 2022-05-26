import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../service/user-service/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  });

  message: any = undefined;

  constructor(private _router:Router, private _user:UserService) {
    if (localStorage.getItem("token") != undefined) {
      this._router.navigate(['/']);
    }
  }

  login() {
    if (!this.loginForm.valid) {
      this.message = "I campi sono obbligatori";
      return;
    }

    this._user.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.user._id);
          this._user.userLogged()
              .subscribe(
                  res => {
                    if (res.success) {
                      localStorage.setItem("role", res.data.ruolo);
                      this._router.navigate(['/']);
                    }
                  }, error => this._router.navigate(['/login'])
              )
          },
        error => this.message = error.error.message
      );

  }

}
