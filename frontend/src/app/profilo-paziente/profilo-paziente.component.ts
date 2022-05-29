import {Component, Type} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../service/patient-service/patient.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OperationService} from "../service/operation-service/operation.service";
import {DatePipe} from "@angular/common";
import {MedicAssignmentService} from "../service/medic-assignment-service/medic-assignment.service";
import {UserService} from "../service/user-service/user.service";
import {DrugService} from "../service/drug-service/drug.service";
import {PrescriptionService} from "../service/prescription-service/prescription.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

let idNote: string | null;
let note: string | null;
let _id : string | null;

@Component({
  selector: 'app-profilo-paziente',
  templateUrl: './profilo-paziente.component.html',
  styleUrls: ['./profilo-paziente.component.css']
})
export class ProfiloPazienteComponent {

  patient: any; operations: any; medic_assignments: any; drugs: any; prescriptions: any;
  active = 1; id : any; role : any;
  p1: number = 1; p2: number = 1; p3: number = 1;
  ricoverato: boolean = false;

  profileForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    data_nascita: new FormControl(null, Validators.required),
    luogo_nascita: new FormControl(null, Validators.required),
    reparto: new FormControl(null, Validators.required),
    orario_ricovero: new FormControl(null, Validators.required),
    orario_dimissioni: new FormControl(null),
    cartella_clinica: new FormControl(null, Validators.required),
  });
  newMedicAssignmentForm: FormGroup = new FormGroup({
    email_nuovo_medico: new FormControl(null, [Validators.email, Validators.required]),
  });
  newPrescriptionForm: FormGroup = new FormGroup({
    farmaco: new FormControl(null, Validators.required),
    data_inizio: new FormControl(null, Validators.required),
    data_fine: new FormControl(null, Validators.required),
    dosi_giornaliere: new FormControl(null, Validators.required),
    note: new FormControl(null),
    id_paziente: new FormControl(null),
  });

  message: any = undefined;
  color: string = "success";

  constructor(public route: ActivatedRoute, private _user:UserService, private _patient:PatientService,
              private _operation:OperationService, private _medicAssignment:MedicAssignmentService, private _drug:DrugService,
              private _prescription:PrescriptionService, private _router:Router, private _modalService:NgbModal) {
    _id = this.route.snapshot.paramMap.get('id');
    this.role = localStorage.getItem('role');
    this.id = _id;
    //this.route.queryParams.subscribe(params => {if (params['active'] === '2') this.active = 2});
    this._drug.allDrugs().subscribe(res => { this.drugs = res.data; },error => {});
    this._patient.findById(_id)
      .subscribe(
        res => {
          this.patient = res.data;
          this.setValueForm();
          this.setDrugs();
          this.setOperations();
          //if (localStorage.getItem("role") === "DIRETTORE") // todo: poi deve essere decommentato
            this.setMedicAssignment();
          this.setChat();
        },
        error => this._router.navigate(['/'])
      );
  }

  // Dati del paziente
  setValueForm() {
    this.profileForm.get('nome')?.setValue(this.patient.nome);
    this.profileForm.get('cognome')?.setValue(this.patient.cognome);
    this.profileForm.get('data_nascita')?.setValue(this.formatDateForm(this.patient.data_nascita));
    this.profileForm.get('luogo_nascita')?.setValue(this.patient.luogo_nascita);
    this.profileForm.get('reparto')?.setValue(this.patient.reparto);
    this.profileForm.get('orario_ricovero')?.setValue(this.formatDateForm(this.patient.orario_ricovero));
    this.profileForm.get('cartella_clinica')?.setValue(this.patient.cartella_clinica);
    if (this.patient.orario_dimissioni !== undefined) {
      this.profileForm.get('orario_dimissioni')?.setValue(this.formatDateForm(this.patient.orario_dimissioni));
    }
    // L'infermiere non può modificare i dati della tabella
    if (this.role == 'INFERMIERE') {
      this.profileForm.get('nome')?.disable();
      this.profileForm.get('cognome')?.disable();
      this.profileForm.get('data_nascita')?.disable();
      this.profileForm.get('luogo_nascita')?.disable();
      this.profileForm.get('reparto')?.disable();
      this.profileForm.get('orario_ricovero')?.disable();
      this.profileForm.get('cartella_clinica')?.disable();
      this.profileForm.get('orario_dimissioni')?.disable();
    }
    // setto ricovero o dimissione paziente
    this.setStatePatient();
  }

  setStatePatient() {
    // @ts-ignore
    if (this.profileForm.value.orario_dimissioni === null || this.formatDateForm(this.profileForm.value.orario_dimissioni) > this.formatDateForm(new Date())) this.ricoverato = true;
    else this.ricoverato = false;
  }

  // Farmaci del paziente
  setDrugs() {
    // todo: join
    var prescriptions: {
      drug: any;
      dataPrescription: any;
    }[] = [];
    this._prescription.findByIdPatient(_id).subscribe(
      res => {
        for (let i: number = 0; i < res.data.length; i++) {
          // prendo il farmaco
          this._drug.findById(res.data[i].id_medicina).subscribe(
            res2 => {
              prescriptions.push({drug: res2.data, dataPrescription: res.data[i]});
              console.log(prescriptions);
            },
            error => { }
          )
        }
        this.prescriptions = prescriptions;
      },
      error => { }
    )
  }

  // Operazioni del paziente
  setOperations() {
    if (_id != null) {
      this._operation.findByPatient(_id)
        .subscribe(
          res => {this.operations = res.data},
          error => { }
        );
    }
  }

  // Medici assegnati al paziente
  setMedicAssignment() {
    var medics: any[] =[];
    this._medicAssignment.findByIdPatient(_id).subscribe(
      res => {
        for (let i: number = 0; i < res.data.length; i++) {
          // prendo il medico
          this._user.findById(res.data[i].id_medico).subscribe(
            res => medics.push(res.data),
            error => { }
          )
        }
        this.medic_assignments = medics;
      },
        error => { }
    )
  }

  setChat() { }

  // Formattazione delle date
  formatDateTime(data_nascita: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data_nascita, 'dd/MM/yyy HH:mm');
  }
  formatDate(data_nascita: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data_nascita, 'dd/MM/yyy');
  }
  formatDateForm(data_nascita: any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(data_nascita, 'yyyy-MM-dd');
  }

  newMedicAssignment() {
    if (!this.newMedicAssignmentForm.valid) {
      this.message = "Compilare correttamente tutti i campi";
      this.color = "danger";
      return;
    }

    this._user.findByEmail(this.newMedicAssignmentForm.value.email_nuovo_medico)
      .subscribe(
        res => {
          if (res.data === null || res.data.ruolo === "DIRETTORE") {
            this.message = "Nessun medico o infermiere registrato con questa email"; this.color = "danger";
            return;
          }
          this._medicAssignment.findById(_id, res.data._id)
            .subscribe(
              res2 => {
                if (res2.data !== null) {
                  this.message = "Medico già registrato su questo paziente"; this.color = "info";
                }else{
                  this._medicAssignment.newMedicAssignment(_id ,res.data._id)
                    .subscribe(
                      data => {
                        this.message = "Medico aggiunto al paziente"; this.color = "success";
                        },
                      err => { this.message = "Si è verificato un errore generico del server"; this.color = "danger" }
                    );
                }
              },
                err => { this.message = "Si è verificato un errore generico del server"; this.color = "danger" }
            )

        },
        err => { this.message = "Si è verificato un errore generico del server"; this.color = "danger" }
      )

  }

  deleteAssignment(id_medico: any) {
    this._medicAssignment.delete(_id, id_medico).subscribe(
      res => { window.location.reload(); },
      error => { console.log(error) }
    )
  }

  updatePatient() {
    if (!this.profileForm.valid) {
      this.message = "Compilare correttamente tutti i campi";
      this.color = "danger";
      return;
    }
    this._patient.updatePatient(_id, JSON.stringify(this.profileForm.value))
      .subscribe(
        data => {this.message = data.message; this.color = "success"; this.setStatePatient() },
        error => {this.message = error.error.message; this.color = "danger"}
      );
  }

  resetUpdate() {this.setValueForm();}

  newPrescription() {
    if (!this.newPrescriptionForm.valid) {
      this.message = "Compilare correttamente tutti i campi";
      this.color = "danger";
      return;
    }
    this.newPrescriptionForm.get('id_paziente')?.setValue(_id);
    this._prescription.newPrescription(JSON.stringify(this.newPrescriptionForm.value))
      .subscribe(
        data => {this.message = data.message; this.color = "success"},
        error => {this.message = error.error.message; this.color = "danger"}
      );
  }

  quitPatient() {
    this._patient.quitPatient(_id).subscribe(
      res => { window.location.reload(); },
      error => { console.log(error) }
    )
  }

  deletePrescription(id_drug: string | null) {
    this._prescription.delete(_id, id_drug).subscribe(
      res => { this.message = "Prescrizione eliminata con successo"; this.color = "success" },
      err => { this.message = err; this.color = "danger" },
    )
  }

  // Modals
  private MODALS:  {[name: string]: Type<any>} = {modalNotePrescription: NgbdModalNotePrescription};
  open(modal: string, id: string | null, nota: string | null) {
    idNote = id;
    note = nota;
    this._modalService.open((this.MODALS[modal]));
  }

}

@Component({
  selector: 'ngbd-modal-note-prescription',
  templateUrl: '../modals/modal-note-prescription.html',
})
export class NgbdModalNotePrescription {

  noteForm: FormGroup = new FormGroup({
    note: new FormControl(null),
  });

  message: any = undefined;

  constructor(public modal: NgbActiveModal, private _prescription:PrescriptionService, private _router:Router) {
    this.noteForm.get('note')?.setValue(note);
  }

  save() {
    if (this.noteForm.value.note === "") this.noteForm.get('note')?.setValue('Nessun nota da inserire.');
    this._prescription.updateNote(idNote, this.noteForm.value.note).subscribe(
        res => {
          this.modal.dismiss();
          window.location.reload();
          //this._router.navigate(['/profilo-paziente/' + _id], {queryParams: {active: 2}})
        },
        err => { this.message = err.message; }
    )
  }

}

