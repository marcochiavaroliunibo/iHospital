import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MedicAssignmentService} from "../service/medic-assignment-service/medic-assignment.service";
import {PatientService} from "../service/patient-service/patient.service";
import {DatePipe} from "@angular/common";
import {OperationService} from "../service/operation-service/operation.service";
import {UserService} from "../service/user-service/user.service";
import {AdministrationService} from "../service/administration-service/administration.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    text: string | undefined;
    blocks: {
        title: string;
        value: number;
        link: string;
    }[] = [];
    user: any;
    role: any;

    // Queste costanti sono i testi da mostrare in home page, a seconda del tipo di utente che effettua l'accesso
    TEXT_DIR = "Questo account ha un ruolo di privilegio, è infatti possibile visualizzare la lista di tutti i medici e infermieri registrati nel sistema," +
        "la lista completa di ogni paziente presente o dimesso dalla struttuta. " +
        "Sarà responsabilità vostra effettuare il check-in dei pazienti e quindi registrarli tramite il modulo accessibile dal menù in alto. " +
        "E' possibile visualizzare e registrare nuovi farmaci al sistema, ma questa funzionalià può essere anche lasciata in gestione ai medici. " +
        "Infine, di fondamentale importanza, sarà vostro compito assgenare medici e infermieri ai nuovi pazienti, in modo che questi potranno gestire i loro dati e registrare ogni operazione svolta su di loro. " +
        "Per qualsiasi dubbio, consultare la sezione FAQ.";
    TEXT_MED = "Questo account ti permette di gestire le informazioni e le operazioni di tutti i pazienti che ti verranno assegnati. In particolare potrai visualizzare le loro cartelle cliniche e modificare i loro daiti. " +
        "Sarà ovviamente compito del medico prescrivere i farmaci di cui il paziente dovrà avere bisogno nel periodo di ricovero, e programmare eventuali interventi operatori. " +
        "Se non trovi il farmaco da prescrivere avrai la possibilità di aggiungerne uno nuovo al sistema. " +
        "E' fondamentale riportare ogni informazione tramite l'area di segnalazione, mentre in caso di analisi potrai riportare i valori vitali registrati nelle sezione appositamente creata. " +
        "Una volta registrato un intervento operatorio sarà possibile accedervi, modificarlo, e durante l'operazione tenere sotto controllo i valori vitali del paziente in real-time." +
        "Sarà compito del medico segnalare la data di dimissione del paziente." +
        "Per qualsiasi dubbio, consultare la sezione FAQ.";
    TEXT_INF = "Questo account ti permette di visualizzare le cartelle clini he dei pazienti che ti verranno assegnati, non sarà possibile, in quanto non compito dell'infermiere, modificare le informazioni del paziente. " +
        "Bensì dovrai registrare, nella sezione apposita, ogni somministrazione effettuata al paziente dei farmaci precedentemente prescritti. " +
        "Dovranno essere riportati anche eventuali valori vitali registrati. Per ogni altra informazione usare l'area chat di segnalazione. " +
        "Sarà possbile visualizzare le informazioni di un intervento operatorio programmato e durante l'operazione tenere sotto controllo i valori vitali del paziente in real-time. " +
        "Per qualsiasi dubbio, consultare la sezione FAQ.";

    constructor(private route: ActivatedRoute, private _medicAssignment: MedicAssignmentService, private _patient: PatientService,
                private _operation: OperationService, private _user: UserService, private _administration: AdministrationService) {
        this._user.findById(localStorage.getItem('id'))
            .subscribe(
                res => this.user = res.data,
                err => {
                }
            )
        this.role = localStorage.getItem('role');
        switch (this.role) {
            case "DIRETTORE":
                this.setHomeDirettore();
                break;
            case "MEDICO":
                this.setHomeMedico();
                break;
            case "INFERMIERE":
                this.setHomeInfermiere();
                break;
        }
    }

    ngOnInit(): void {
    }

    private setHomeDirettore() {
        this.blocks.push({title: "Medici iscritti", value: 0, link: "lista-medici"});
        this.blocks.push({title: "Infermieri iscritti", value: 0, link: "lista-infermieri"});
        this.blocks.push({title: "Pazienti in cura", value: 0, link: "lista-pazienti"});
        this.blocks.push({title: "Pazienti dimessi", value: 0, link: "lista-dimessi"});
        this._user.findByRole("MEDICO")
            .subscribe(
                res => this.blocks[0].value = res.data.length,
                err => {
                }
            )
        this._user.findByRole("INFERMIERE")
            .subscribe(
                res => this.blocks[1].value = res.data.length,
                err => {
                }
            )
        let valC = 0;
        let valD = 0;
        this._patient.allPatients().subscribe(
            res => {
                for (let i: number = 0; i < res.data.length; i++) {
                    // prendo il paziente
                    this._patient.findById(res.data[i]._id).subscribe(
                        res => {
                            // @ts-ignore
                            if (res.data.orario_dimissioni === undefined || res.data.orario_dimissioni === null || this.formatDateDB(res.data.orario_dimissioni) > this.formatDateDB(new Date()))
                                this.blocks[2].value = ++valC;
                            else
                                this.blocks[3].value = ++valD;
                        },
                        error => {
                        }
                    )
                }
            }
        )
        this.text = this.TEXT_DIR;
    }

    private setHomeMedico() {
        this.blocks.push({title: "Pazienti in cura", value: 0, link: "pazienti-in-cura"});
        this.blocks.push({title: "Pazienti dimessi", value: 0, link: "pazienti-dimessi"});
        this.blocks.push({title: "Operazioni programmate", value: 0, link: "calendario-operazioni"});
        this.blocks.push({title: "???", value: 0, link: ""});
        // Calcolo pazienti (in cura (C) e dimessi (D))
        let valC = 0;
        let valD = 0;
        this._medicAssignment.findByIdMedic(localStorage.getItem('id')).subscribe(
            res => {
                for (let i: number = 0; i < res.data.length; i++) {
                    // prendo il paziente
                    this._patient.findById(res.data[i].id_paziente).subscribe(
                        res => {
                            // @ts-ignore
                            if (res.data.orario_dimissioni === undefined || res.data.orario_dimissioni === null || this.formatDateDB(res.data.orario_dimissioni) > this.formatDateDB(new Date()))
                                this.blocks[0].value = ++valC;
                            else
                                this.blocks[1].value = ++valD;
                        },
                        error => {
                        }
                    )
                }
            },
            error => {
            }
        )
        // Calcolo numero di operazioni programmate
        let op = 0;
        this._medicAssignment.findByIdMedic(localStorage.getItem('id')).subscribe(
            res => {
                for (let i: number = 0; i < res.data.length; i++) {
                    // prendo il paziente
                    this._operation.findByPatient(res.data[i].id_paziente).subscribe(
                        res => {
                            for (let k: number = 0; k < res.data.length; k++)
                                // @ts-ignore
                                if (this.formatDateDB(res.data[k].data_ora) > this.formatDateDB(new Date()))
                                    this.blocks[2].value = ++op;
                        },
                        error => {
                        }
                    )
                }

            },
            error => {
            }
        )
        this.text = this.TEXT_MED;
    }

    private setHomeInfermiere() {
        this.blocks.push({title: "Pazienti in cura", value: 0, link: "pazienti-in-cura"});
        this.blocks.push({title: "Pazienti dimessi", value: 0, link: "pazienti-dimessi"});
        this.blocks.push({title: "Operazioni programmate", value: 0, link: "calendario-operazioni"});
        this.blocks.push({title: "Farmaci somministrati", value: 0, link: "pazienti-in-cura"});
        // Calcolo pazienti (in cura (C) e dimessi (D))
        let valC = 0;
        let valD = 0;
        this._medicAssignment.findByIdMedic(localStorage.getItem('id')).subscribe(
            res => {
                for (let i: number = 0; i < res.data.length; i++) {
                    // prendo il paziente
                    this._patient.findById(res.data[i].id_paziente).subscribe(
                        res => {
                            // @ts-ignore
                            if (res.data.orario_dimissioni === undefined || res.data.orario_dimissioni === null || this.formatDateDB(res.data.orario_dimissioni) > this.formatDateDB(new Date()))
                                this.blocks[0].value = ++valC;
                            else
                                this.blocks[1].value = ++valD;
                        },
                        error => {
                        }
                    )
                }
            },
            error => {
            }
        )
        // Calcolo numero di operazioni programmate
        let op = 0;
        this._medicAssignment.findByIdMedic(localStorage.getItem('id')).subscribe(
            res => {
                for (let i: number = 0; i < res.data.length; i++) {
                    // prendo il paziente
                    this._operation.findByPatient(res.data[i].id_paziente).subscribe(
                        res => {
                            for (let k: number = 0; k < res.data.length; k++)
                                // @ts-ignore
                                if (this.formatDateDB(res.data[k].data_ora) > this.formatDateDB(new Date()))
                                    this.blocks[2].value = ++op;
                        },
                        error => {
                        }
                    )
                }

            },
            error => {
            }
        )
        // Calolo farnaci somministrati
        this._administration.findByNurse(localStorage.getItem('id')).subscribe(
            res => this.blocks[3].value = res.data.length,
            error => {
            }
        )
        this.text = this.TEXT_INF;
    }

    formatDateDB(date: any) {
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(date, 'yyyy-MM-dd');
    }

}
