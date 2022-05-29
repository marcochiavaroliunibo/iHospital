import {Component, OnInit, Type} from '@angular/core';
import {Router} from "@angular/router";
import {DrugService} from "../service/drug-service/drug.service";
import {NgbdModalNoteAdministration} from "../somministrazione-farmaco/somministrazione-farmaco.component";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {AdministrationService} from "../service/administration-service/administration.service";

let idDrug: string | null;
let nomeG: string | null;
let libretto: string | null;

@Component({
  selector: 'app-farmaci-registrati',
  templateUrl: './farmaci-registrati.component.html',
  styleUrls: ['./farmaci-registrati.component.css']
})
export class FarmaciRegistratiComponent implements OnInit {

  drugs: any;
  p: number = 1;

  constructor(private _drug:DrugService, private _router:Router,  private _modalService:NgbModal) {
    this._drug.allDrugs().subscribe(
      res => this.drugs = res.data,
      error => console.log(error)
    )
  }

  ngOnInit(): void {
  }

  private MODALS:  {[name: string]: Type<any>} = {modalDrug: NgbdModalDrug};
  open(modal: string, _id: any, n: any,lib: any) {
    idDrug = _id;
    libretto = lib;
    nomeG = n;
    this._modalService.open((this.MODALS[modal]));
  }

}

@Component({
  selector: 'ngbd-modal-note-administration',
  templateUrl: '../modals/modal-drug.html',
})
export class NgbdModalDrug {

  libForm: FormGroup = new FormGroup({
    libretto: new FormControl(null),
  });

  message: any = undefined;
  nome = nomeG;

  constructor(public modal: NgbActiveModal, private _drug:DrugService, private _router:Router) {
    this.libForm.get('libretto')?.setValue(libretto);
  }

  save() {
    if (this.libForm.value.libretto === "") this.libForm.get('libretto')?.setValue('Nessuna descrizione inserita.');
    this._drug.updateDesc(idDrug, this.libForm.value.libretto).subscribe(
        res => {
          this.modal.dismiss();
          window.location.reload();
        },
        err => { this.message = err.message; }
    )
  }

}
