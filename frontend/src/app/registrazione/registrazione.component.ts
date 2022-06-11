import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../service/user-service/user.service";

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    nascita: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    passwordConf: new FormControl(null, Validators.required),
    ruolo: new FormControl(null, Validators.required)
  });

  constructor(private _router:Router, private _user:UserService) {
    if (localStorage.getItem("token") != undefined) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  message: any = undefined;
  color: string = "success";

  registra() {
    if (!this.registerForm.valid) {
      this.message = "Compilare correttamente tutti i campi";
      return;
    }
    if (this.registerForm.value.password.length < 6) {
      this.message = "La password deve essere lunga almeno 6 caratteri";
      return;
    }
    if (this.registerForm.value.password !== this.registerForm.value.passwordConf) {
      this.message = "Le password non coincidono";
      return;
    }
    this._user.registra(JSON.stringify(this.registerForm.value))
      .subscribe(
        data => { this._router.navigate(["/login"]); },
        error => {this.message = error.error.message; this.color = "danger"}
      );
  }

}
