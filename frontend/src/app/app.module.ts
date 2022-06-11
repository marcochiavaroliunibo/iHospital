import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent, NgbdModaLogout} from './app.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './home/home.component';
import {PazientiInCuraComponent} from './pazienti-in-cura/pazienti-in-cura.component';
import {AggiungiFarmacoComponent} from './aggiungi-farmaco/aggiungi-farmaco.component';
import {AggiungiOperazioneComponent} from './aggiungi-operazione/aggiungi-operazione.component';
import {CalendarioOperazioniComponent} from './calendario-operazioni/calendario-operazioni.component';
import {NgbdModalNotePrescription, ProfiloPazienteComponent} from './profilo-paziente/profilo-paziente.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from './service/user-service/user.service';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {RegistrazioneComponent} from './registrazione/registrazione.component';
import {DrugService} from "./service/drug-service/drug.service";
import {AggiungiPazienteComponent} from './aggiungi-paziente/aggiungi-paziente.component';
import {ListaPazientiComponent} from './lista-pazienti/lista-pazienti.component';
import {FAQComponent} from './faq/faq.component';
import {ValoriVitaliComponent} from './valori-vitali/valori-vitali.component';
import {MedicAssignmentService} from "./service/medic-assignment-service/medic-assignment.service";
import {OperationService} from "./service/operation-service/operation.service";
import {PatientService} from "./service/patient-service/patient.service";
import {PrescriptionService} from "./service/prescription-service/prescription.service";
import {VitalValueService} from "./service/vital-value-service/vital-value.service";
import {DettagliOperazioneComponent} from './dettagli-operazione/dettagli-operazione.component';
import {SegnalazioniComponent} from './segnalazioni/segnalazioni.component';
import {AreaRiservataComponent} from './area-riservata/area-riservata.component';
import {
    NgbdModalNoteAdministration,
    SomministrazioneFarmacoComponent
} from './somministrazione-farmaco/somministrazione-farmaco.component';
import {NgxPaginationModule} from "ngx-pagination";
import {PazientiDimessiComponent} from './pazienti-dimessi/pazienti-dimessi.component';
import {ListaDimessiComponent} from './lista-dimessi/lista-dimessi.component';
import {ListaMediciComponent} from './lista-medici/lista-medici.component';
import {ListaInfermieriComponent} from './lista-infermieri/lista-infermieri.component';
import {ChartValueComponent} from './chart-value/chart-value.component';
import {FlatpickrModule} from 'angularx-flatpickr';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { ContattiComponent } from './contatti/contatti.component';
import {FeedbackRicevutiComponent, NgbdModalFeedback} from './feedback-ricevuti/feedback-ricevuti.component';
import {FarmaciRegistratiComponent, NgbdModalDrug} from "./farmaci-registrati/farmaci-registrati.component";
import { PasswordDimenticataComponent } from './password-dimenticata/password-dimenticata.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PazientiInCuraComponent,
        PazientiDimessiComponent,
        FarmaciRegistratiComponent,
        AggiungiFarmacoComponent,
        AggiungiOperazioneComponent,
        CalendarioOperazioniComponent,
        ProfiloPazienteComponent,
        LoginComponent,
        NgbdModaLogout,
        NgbdModalDrug,
        NgbdModalFeedback,
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
        ListaDimessiComponent,
        ListaMediciComponent,
        ListaInfermieriComponent,
        ChartValueComponent,
        ContattiComponent,
        FeedbackRicevutiComponent,
        PasswordDimenticataComponent,
    ],
    imports: [
        CommonModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxPaginationModule,
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
export class AppModule {
}
