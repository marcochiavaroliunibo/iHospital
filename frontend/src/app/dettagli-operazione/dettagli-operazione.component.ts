import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PatientService} from "../service/patient-service/patient.service";
import {OperationService} from "../service/operation-service/operation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ValueChart} from "../value-chart";
import * as d3 from 'd3';
import {ValueStatusService} from "../service/chart-service/value-status.service";

@Component({
    selector: 'app-dettagli-operazione',
    templateUrl: './dettagli-operazione.component.html',
    styleUrls: ['./dettagli-operazione.component.css'],
})
export class DettagliOperazioneComponent {

    idOperation: string | null;
    patient: any;
    operation: any;
    stato: any;
    color: any;
    message: any;
    active = 1;
    realTime: boolean = false;
    dataForm: FormGroup = new FormGroup({
        titolo: new FormControl(null, Validators.required),
        data_ora: new FormControl(null, Validators.required),
        durata: new FormControl(null, Validators.required),
        rischio: new FormControl(null, Validators.required),
        descrizione: new FormControl(null),
        verbale: new FormControl(null),
    });
    role = localStorage.getItem('role');

    valueChartStatus: ValueChart[] | undefined;
    valueChartStatusToPlot: ValueChart[] | undefined;

    set ValueStatus(status: ValueChart[]) {
        this.valueChartStatus = status;
        this.valueChartStatusToPlot = this.valueChartStatus.slice(0, 20);
    }

    constructor(private route: ActivatedRoute, private _patient: PatientService,
                private _operation: OperationService, private _valueStatus: ValueStatusService) {
        this.idOperation = this.route.snapshot.paramMap.get('id');
        this._operation.findById(this.idOperation)
            .subscribe(
                res => {
                    this.operation = res.data;
                    this._patient.findById(this.operation.id_paziente)
                        .subscribe(
                            res => {this.patient = res.data},
                        );
                    this.setValueForm();
                },
                err => {
                }
            );
        this._valueStatus.getInitialValueStatus()
            .subscribe(prices => {
                this.ValueStatus = prices;
                let valueUpdateObservable =  this._valueStatus.getUpdates();
                valueUpdateObservable.subscribe((latestStatus: ValueChart) => {
                    // @ts-ignore
                    this.ValueStatus = [latestStatus].concat(this.valueChartStatus);
                });
            });
    }

    resetUpdate() {
        this.setValueForm();
    }

    updateOperation() {
        if (!this.dataForm.valid) {
            this.message = "Compilare correttamente tutti i campi";
            this.color = "danger";
            return;
        }
        this._operation.updateOperation(this.idOperation, JSON.stringify(this.dataForm.value))
            .subscribe(
                data => {
                    window.location.reload();
                },
                error => {
                    this.message = error.error.message;
                    this.color = "danger"
                }
            );
    }

    private setValueForm() {
        this.dataForm.get('titolo')?.setValue(this.operation.titolo);
        this.dataForm.get('data_ora')?.setValue(this.formatDateFormTime(this.operation.data_ora));
        this.dataForm.get('durata')?.setValue(this.operation.durata);
        this.dataForm.get('rischio')?.setValue(this.operation.rischio);
        this.dataForm.get('descrizione')?.setValue(this.operation.descrizione);
        if (this.operation.verbale !== undefined && this.operation.verbale !== null) {
            this.dataForm.get('verbale')?.setValue(this.operation.verbale);
            if (this.dataForm.value.verbale !== "") this.dataForm.get('data_ora')?.disable();
        }
        // @ts-ignore
        if (this.formatDateForm(this.operation.data_ora) > this.formatDateForm(new Date())) {
            this.stato = "DA SVOLGERE";
            this.dataForm.get('verbale')?.disable();
        } else {
            // @ts-ignore
            if (this.formatDateForm(this.operation.data_ora) === this.formatDateForm(new Date())) {
                this.stato = "OGGI"
                this.realTime = true;
            } else {
                this.stato = "COMPLETATA";
            }
        }
        if (this.role !== "MEDICO") {
            this.dataForm.get('titolo')?.disable();
            this.dataForm.get('data_ora')?.disable();
            this.dataForm.get('durata')?.disable();
            this.dataForm.get('rischio')?.disable();
            this.dataForm.get('descrizione')?.disable();
            this.dataForm.get('verbale')?.disable();
        }
    }

    formatDateFormTime(data: any) {
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(data, 'yyyy-MM-ddTHH:mm');
    }
    formatDateForm(data: any) {
        const datepipe: DatePipe = new DatePipe('en-US');
        return datepipe.transform(data, 'yyyy-MM-dd');
    }

}
