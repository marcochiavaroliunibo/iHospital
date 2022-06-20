import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user-service/user.service";
import {PatientService} from "../service/patient-service/patient.service";
import {DatePipe} from "@angular/common";
import {MessageService} from "../service/message-service/message.service";
import {local} from "d3";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {delay} from "rxjs";

@Component({
    selector: 'app-segnalazioni',
    templateUrl: './segnalazioni.component.html',
    styleUrls: ['./segnalazioni.component.css']
})
export class SegnalazioniComponent implements OnInit {

    idPatient: any;
    myId: any;
    patient: any;
    messages: {
        data: any;
        username: string;
    }[] = [];
    messageForm: FormGroup = new FormGroup({
        testo: new FormControl(null, Validators.required),
        id_operatore: new FormControl(null),
        id_paziente: new FormControl(null),
        data_ora: new FormControl(null),
    });

    constructor(private route: ActivatedRoute, private _patient: PatientService, private _message: MessageService, private _user: UserService) {
        this.idPatient = this.route.snapshot.paramMap.get('id');
        this.myId = localStorage.getItem('id');
        this._patient.findById(this.idPatient).subscribe(
            res => {
                this.patient = res.data;
                this._message.findByIdPatient(this.patient._id).subscribe(
                    res => {
                        for (let i = 0; i < res.data.length; i++) {
                            // todo non ordina
                            this._user.findById(res.data[i].id_operatore).subscribe(
                                res2 => {
                                    this.messages.push({
                                        data: res.data[i],
                                        username: res2.data.nome + " " + res2.data.cognome,
                                    });
                                }
                            )
                        }
                    },
                    error => { }
                )
            },
            err => {
            }
        );
        this._message.getNewMessage().subscribe((message: any) => {
            console.log(message)
            if (JSON.parse(message).id_paziente === this.idPatient)
                this._user.findById(JSON.parse(message).id_operatore).subscribe(
                    res => {
                        this.messages.push({
                            data: JSON.parse(message),
                            username: res.data.nome + " " + res.data.cognome
                        });
                    })
        })
    }

    formatDate(data: any) {
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(data, 'dd/MM/yyy HH:mm');
    }

    ngOnInit() {
    }

    sendMessage() {
        if (!this.messageForm.valid) return;
        this.messageForm.get('id_operatore')?.setValue(this.myId);
        this.messageForm.get('id_paziente')?.setValue(this.idPatient);
        this.messageForm.get('data_ora')?.setValue(new Date());
        this._message.newMessage(JSON.stringify(this.messageForm.value))
            .subscribe(
                data => {
                },
                error => {
                }
            );
        this._message.sendMessage(JSON.stringify(this.messageForm.value));
        this.messageForm.get('testo')?.setValue("");
    }

}
