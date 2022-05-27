import {Component, OnInit, Type} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../service/patient-service/patient.service";
import {DrugService} from "../service/drug-service/drug.service";
import {PrescriptionService} from "../service/prescription-service/prescription.service";
import {DatePipe, formatDate} from "@angular/common";
import {AdministrationService} from "../service/administration-service/administration.service";
import {UserService} from "../service/user-service/user.service";
import {NgbdModalNotePrescription} from "../profilo-paziente/profilo-paziente.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";

let idNote: string | null;
let note: string | null;

@Component({
    selector: 'app-somministrazione-farmaco',
    templateUrl: './somministrazione-farmaco.component.html',
    styleUrls: ['./somministrazione-farmaco.component.css']
})
export class SomministrazioneFarmacoComponent implements OnInit {

    prescription: any;
    administrations: any;
    drug: any;
    patient: any;
    message: any = undefined;
    color: string = "success";
    stato: any;
    oggi: any;
    TIMESTAMP: number = 1000 * 60 * 60 * 24;
    p: number = 1;

    constructor(private route: ActivatedRoute, private _patient: PatientService, private _drug: DrugService, private _prescription: PrescriptionService,
                private _administration: AdministrationService, private _user: UserService,  private _modalService:NgbModal) {
        this._prescription.findById(this.route.snapshot.paramMap.get('id'))
            .subscribe(
                res => {
                    this.prescription = res.data;
                    this.stato = this.setStatePrescription();
                    let start = this.formatDateDB(new Date())
                    console.log(start)
                    this.setAdministrations();
                    this._administration.findByInterval(this.prescription._id, start)
                        .subscribe(
                            res => {
                                this.oggi = res.data.length
                            },
                            err => {
                            }
                        );
                    this._patient.findById(this.prescription.id_paziente)
                        .subscribe(
                            res => {
                                this.patient = res.data
                            },
                            err => {
                            }
                        );
                    this._drug.findById(this.prescription.id_medicina)
                        .subscribe(
                            res => {
                                this.drug = res.data
                            },
                            err => {
                            }
                        );
                },
                err => {
                }
            );
    }

    ngOnInit(): void {

    }

    newAdministration() {

        let start = this.formatDateDB(new Date())
        this._administration.findByInterval(this.prescription._id, start)
            .subscribe(
                res => {
                    if (res.data.length >= this.prescription.dosi_giornaliere) {
                        this.message = "Dosi giornaliere raggiunte";
                        this.color = "warning";
                    } else {
                        this._administration.newAdministration(this.prescription._id, localStorage.getItem('id'))
                            .subscribe(
                                res => {
                                    window.location.reload()
                                },
                                err => {
                                    this.message = "Errore generico";
                                    this.color = "warning";
                                }
                            )
                    }
                },
                err => {
                }
            )

        /**/
    }
    private setStatePrescription() {
        let start = this.prescription.data_inizio;
        let end = this.prescription.data_fine;
        // @ts-ignore
        if (this.formatDateDB(new Date()) > this.formatDateDB(end))
            return "CONCLUSA";
        else {
            // @ts-ignore
            if (this.formatDateDB(new Date()) < this.formatDateDB(start))
                return "DA INIZIARE";
            else
                return "IN CORSO";
        }
    }
    private setAdministrations() {
        var administrations: {
            data: any;
            inf: any;
        }[] = [];
        this._administration.findByPrescription(this.prescription._id)
            .subscribe(
                res => {
                    for (let i: number = 0; i < res.data.length; i++) {
                        // prendo l'infermiere che lo ha somministrato
                        this._user.findById(res.data[i].id_infermiere).subscribe(
                            res2 => {
                                administrations.push({data: res.data[i], inf: res2.data});
                            },
                            error => {
                            }
                        )
                    }
                    this.administrations = administrations;
                },
                err => {
                }
            )
    }

    formatDate(date: any) {
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(date, 'dd/MM/yyy');
    }
    formatTime(date: any) {
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(date, 'HH:mm');
    }
    formatDateDB(date: any) {
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(date, 'yyyy-MM-dd');
    }
    formatDateTimeDB(date: any) {
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(date, 'yyyy-MM-ddTHH:mm:00.000+00:00');
    }

    private MODALS:  {[name: string]: Type<any>} = {modalNoteAdministration: NgbdModalNoteAdministration};
    open(modal: string, _id: any, nota: any) {
        idNote = _id;
        note = nota;
        this._modalService.open((this.MODALS[modal]));
    }
}

@Component({
    selector: 'ngbd-modal-note-administration',
    templateUrl: '../modals/modal-note-administration.html',
})
export class NgbdModalNoteAdministration {

    noteForm: FormGroup = new FormGroup({
        note: new FormControl(null),
    });

    message: any = undefined;

    constructor(public modal: NgbActiveModal, private _administration:AdministrationService, private _router:Router) {
        this.noteForm.get('note')?.setValue(note);
    }

    save() {
        if (this.noteForm.value.note === "") this.noteForm.get('note')?.setValue('Nessun nota da inserire.');
        this._administration.updateNote(idNote, this.noteForm.value.note).subscribe(
            res => {
                this.modal.dismiss();
                window.location.reload();
                //this._router.navigate(['/profilo-paziente/' + _id], {queryParams: {active: 2}})
            },
            err => { this.message = err.message; }
        )
    }

}

