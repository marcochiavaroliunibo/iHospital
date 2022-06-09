import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../service/user-service/user.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.component.html',
  styleUrls: ['./area-riservata.component.css']
})
export class AreaRiservataComponent implements OnInit {

  dataForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    data_nascita: new FormControl(null, Validators.required),
  });
  pwdForm: FormGroup = new FormGroup({
    current: new FormControl(null, Validators.required),
    pwd: new FormControl(null, Validators.required),
  });
  message : any = undefined;
  color: string = "success";
  user: any;

  constructor(private _user: UserService) {
    let myId = localStorage.getItem("id")
    this._user.findById(myId)
        .subscribe(
          res => {
            this.user = res.data
            this.setValueForm();
            },
          err => { }
        );
  }

  ngOnInit(): void { }

  private setValueForm() {
    this.dataForm.get('nome')?.setValue(this.user.nome);
    this.dataForm.get('cognome')?.setValue(this.user.cognome);
    this.dataForm.get('email')?.setValue(this.user.email);
    this.dataForm.get('data_nascita')?.setValue(this.formatDateForm(this.user.data_nascita));
    this.dataForm.get('nome')?.disable();
    this.dataForm.get('cognome')?.disable();
    this.dataForm.get('email')?.disable();
    this.dataForm.get('data_nascita')?.disable();
  }

  formatDateForm(data: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data, 'yyyy-MM-dd');
  }

  newPwd() {
    console.log(this.user.password)
    if (!this.pwdForm.valid) {
      this.message = "Compilare correttamente tutti i campi";
      this.color = "danger";
      return;
    }
    if (this.pwdForm.value.pwd.length < 6) {
      this.message = "La password deve essere lunga almeno 6 caratteri";
      this.color = "danger";
      return;
    }
    // todo non funziona il controllo della password attuale (per ora non controllo e modifico direttamente)
    this._user.updatePassword(this.user._id,  JSON.stringify(this.pwdForm.value))
        .subscribe(
            res => { this.message = "Password aggiornata"; this.color = "success" },
            error => {this.message = error.message; this.color = "danger"}
        )
  }

}
