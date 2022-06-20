import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../service/contact-service/contact.service";

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.css']
})
export class ContattiComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({
    id_operatore: new FormControl(null, Validators.required),
    messaggio: new FormControl(null, Validators.required),
  });

  message: any = undefined;
  color: string = "success";

  constructor (private _contact:ContactService) { }

  ngOnInit(): void {
  }

  send() {
    this.contactForm.get('id_operatore')?.setValue(localStorage.getItem('id'));
    if (!this.contactForm.valid) {
      this.message = "Compilare correttamente tutti i campi";
      this.color = "danger";
      return;
    }
    this._contact.newContact(JSON.stringify(this.contactForm.value)).subscribe(
        res => { this.message = res.message; this.color = "success"; this.contactForm.get('messaggio')?.setValue(""); },
        err => { }
    )
  }

}
