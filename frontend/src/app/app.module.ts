import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AppComponent, NgbdModaLogout} from './app.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { PazientiInCuraComponent } from './pazienti-in-cura/pazienti-in-cura.component';
import { FarmaciRegistratiComponent } from './farmaci-registrati/farmaci-registrati.component';
import { AggiungiFarmacoComponent } from './aggiungi-farmaco/aggiungi-farmaco.component';
import { AggiungiOperazioneComponent } from './aggiungi-operazione/aggiungi-operazione.component';
import { CalendarioOperazioniComponent } from './calendario-operazioni/calendario-operazioni.component';
import {NgbdModalNotePrescription, ProfiloPazienteComponent} from './profilo-paziente/profilo-paziente.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from './service/user-service/user.service';
import {HttpClientModule} from "@angular/common/http";
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import {DrugService} from "./service/drug-service/drug.service";
import { AggiungiPazienteComponent } from './aggiungi-paziente/aggiungi-paziente.component';
import { ListaPazientiComponent } from './lista-pazienti/lista-pazienti.component';
import { FAQComponent } from './faq/faq.component';
import { ValoriVitaliComponent } from './valori-vitali/valori-vitali.component';
import {MedicAssignmentService} from "./service/medic-assignment-service/medic-assignment.service";
import {OperationService} from "./service/operation-service/operation.service";
import {PatientService} from "./service/patient-service/patient.service";
import {PrescriptionService} from "./service/prescription-service/prescription.service";
import {VitalValueService} from "./service/vital-value-service/vital-value.service";
import { DettagliOperazioneComponent } from './dettagli-operazione/dettagli-operazione.component';
import { SegnalazioniComponent } from './segnalazioni/segnalazioni.component';
import { AreaRiservataComponent } from './area-riservata/area-riservata.component';
import {PazienteInCuraGuard} from "./role-guard/PazienteInCuraGuard";
import {NgbdModalNoteAdministration, SomministrazioneFarmacoComponent } from './somministrazione-farmaco/somministrazione-farmaco.component';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PazientiInCuraComponent,
    FarmaciRegistratiComponent,
    AggiungiFarmacoComponent,
    AggiungiOperazioneComponent,
    CalendarioOperazioniComponent,
    ProfiloPazienteComponent,
    LoginComponent,
    NgbdModaLogout,
    RegistrazioneComponent,
    AggiungiPazienteComponent,
    ListaPazientiComponent,
    FAQComponent,
    ValoriVitaliComponent,
    NgbdModalNotePrescription,
    NgbdModalNoteAdministration,
    DettagliOperazioneComponent,
    SegnalazioniComponent,
    AreaRiservataComponent,
    SomministrazioneFarmacoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    UserService,
    DrugService,
    MedicAssignmentService,
    OperationService,
    PatientService,
    PrescriptionService,
    VitalValueService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
