import {Component, OnInit, Type} from '@angular/core';
import {UserService} from "../service/user-service/user.service";
import {ContactService} from "../service/contact-service/contact.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {DrugService} from "../service/drug-service/drug.service";

let messaggio: string | null;

@Component({
    selector: 'app-feedback-ricevuti',
    templateUrl: './feedback-ricevuti.component.html',
    styleUrls: ['./feedback-ricevuti.component.css']
})
export class FeedbackRicevutiComponent {

    contacts: {
        data: any;
        sender: any;
    }[] = [];
    p: number = 1;

    constructor(private _user: UserService, private _contact: ContactService, private _router: Router, private _modalService: NgbModal) {
        this.setFeedback();
    }

    setFeedback() {
        while (this.contacts.length > 0) this.contacts.pop();
        this._contact.allContacts().subscribe(
            res => {
                for (let i = 0; i < res.data.length; i++) {
                    this._user.findById(res.data[i].id_operatore).subscribe(
                        res2 => this.contacts.push({data: res.data[i], sender: res2.data}),
                        err => {
                        }
                    )
                }
            },
            err => {
            }
        )
    }

    formatDateTime(orario_ricovero: any) {
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(orario_ricovero, 'dd/MM/YYYY HH:mm');
    }

    private MODALS: { [name: string]: Type<any> } = {modalFeedback: NgbdModalFeedback};

    open(modal: string, mess: string) {
        messaggio = mess
        this._modalService.open((this.MODALS[modal]));
    }

    delete(_id: any) {
        this._contact.delete(_id).subscribe(
            res => this.setFeedback()
        )
    }

}

@Component({
    selector: 'ngbd-modal-feedback',
    templateUrl: '../modals/modal-feedback.html',
})
export class NgbdModalFeedback {

    testo = messaggio;

    constructor(public modal: NgbActiveModal) {
    }

}
