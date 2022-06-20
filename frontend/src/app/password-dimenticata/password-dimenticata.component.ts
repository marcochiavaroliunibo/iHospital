import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../service/user-service/user.service";

@Component({
  selector: 'app-password-dimenticata',
  templateUrl: './password-dimenticata.component.html',
  styleUrls: ['./password-dimenticata.component.css']
})
export class PasswordDimenticataComponent implements OnInit {

  recoveryForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
  });

  message: any = undefined;

  constructor(private _router:Router, private _user:UserService) { }

  ngOnInit() {
    if (localStorage.getItem("token") != undefined) {
      this._router.navigate(['/']);
    }
  }

  send() {
    if (!this.recoveryForm.valid) {
      this.message = "Inserisci una email valida";
      return;
    }

    this._user.findByEmail(this.recoveryForm.value.email).subscribe(
        res => {
          if (res.data === null)
            this.message = "L'email indicata non è registrata nel sistema."
          else
            this.message = "Abbiamo inviato una email all'indirizzo indicato con un link per il ripristino della password.";
          this.recoveryForm.get('email')?.setValue("");
        },
        err => { this.message = err.error.message; }
    )

  }

}
