import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AggiungiFarmacoComponent} from "./aggiungi-farmaco/aggiungi-farmaco.component";
import {AggiungiOperazioneComponent} from "./aggiungi-operazione/aggiungi-operazione.component";
import {CalendarioOperazioniComponent} from "./calendario-operazioni/calendario-operazioni.component";
import {FarmaciRegistratiComponent} from "./farmaci-registrati/farmaci-registrati.component";
import {PazientiInCuraComponent} from "./pazienti-in-cura/pazienti-in-cura.component";
import {ProfiloPazienteComponent} from "./profilo-paziente/profilo-paziente.component";
import {LoginComponent} from "./login/login.component";
import {RegistrazioneComponent} from "./registrazione/registrazione.component";
import {AggiungiPazienteComponent} from "./aggiungi-paziente/aggiungi-paziente.component";
import {ListaPazientiComponent} from "./lista-pazienti/lista-pazienti.component";
import {MedicGuard} from "./role-guard/MedicGuard";
import {DirectorGuard} from "./role-guard/DirectorGuard";
import {FAQComponent} from "./faq/faq.component";
import {ValoriVitaliComponent} from "./valori-vitali/valori-vitali.component";
import {DettagliOperazioneComponent} from "./dettagli-operazione/dettagli-operazione.component";
import {SegnalazioniComponent} from "./segnalazioni/segnalazioni.component";
import {AreaRiservataComponent} from "./area-riservata/area-riservata.component";
import {MyPatientGuard} from "./role-guard/MyPatientGuard";
import {MedicOrNurseGuard} from "./role-guard/MedicOrNurseGuard";
import {SomministrazioneFarmacoComponent} from "./somministrazione-farmaco/somministrazione-farmaco.component";
import {PazientiDimessiComponent} from "./pazienti-dimessi/pazienti-dimessi.component";
import {ListaDimessiComponent} from "./lista-dimessi/lista-dimessi.component";
import {ListaMediciComponent} from "./lista-medici/lista-medici.component";
import {ListaInfermieriComponent} from "./lista-infermieri/lista-infermieri.component";
import {DirectorOrMedicGuard} from "./role-guard/DirectorOrMedicGuard";
import {ContattiComponent} from "./contatti/contatti.component";
import {FeedbackRicevutiComponent} from "./feedback-ricevuti/feedback-ricevuti.component";
import {PasswordDimenticataComponent} from "./password-dimenticata/password-dimenticata.component";
import {MyOperationGuard} from "./role-guard/MyOperationGuard";
import {MyPrescriptionGuard} from "./role-guard/MyPrescriptionGuard";

// canActive mi indica quale tipo di profilo può accedere ad ogni pagina,
// svolge quindi il ruolo di GUARDIA per l'accesso alle varie pagine.
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'aggiungi-farmaco', component: AggiungiFarmacoComponent, canActivate: [DirectorOrMedicGuard]},
  { path: 'aggiungi-operazione', component: AggiungiOperazioneComponent, canActivate: [MedicGuard] },
  { path: 'calendario-operazioni', component: CalendarioOperazioniComponent, canActivate: [MedicOrNurseGuard] },
  { path: 'farmaci-registrati', component: FarmaciRegistratiComponent, canActivate: [DirectorOrMedicGuard] },
  { path: 'lista-medici', component: ListaMediciComponent, canActivate: [DirectorGuard]},
  { path: 'lista-infermieri', component: ListaInfermieriComponent, canActivate: [DirectorGuard]},
  { path: 'pazienti-in-cura', component: PazientiInCuraComponent, canActivate: [MedicOrNurseGuard] },
  { path: 'pazienti-dimessi', component: PazientiDimessiComponent, canActivate: [MedicOrNurseGuard] },
  { path: 'profilo-paziente/:id', component: ProfiloPazienteComponent, canActivate: [MyPatientGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'registrati', component: RegistrazioneComponent},
  { path: 'password-dimenticata', component: PasswordDimenticataComponent},
  { path: 'aggiungi-paziente', component: AggiungiPazienteComponent, canActivate: [DirectorGuard]},
  { path: 'lista-pazienti', component: ListaPazientiComponent, canActivate: [DirectorGuard]},
  { path: 'lista-dimessi', component: ListaDimessiComponent, canActivate: [DirectorGuard]},
  { path: 'FAQ', component: FAQComponent},
  { path: 'valori-vitali/:id', component: ValoriVitaliComponent, canActivate: [MyPatientGuard]},
  { path: 'dettagli-operazione/:id', component: DettagliOperazioneComponent, canActivate: [MyOperationGuard]},
  { path: 'segnalazioni/:id', component: SegnalazioniComponent, canActivate: [MyPatientGuard]},
  { path: 'area-riservata', component: AreaRiservataComponent},
  { path: 'somministrazione-farmaco/:id', component: SomministrazioneFarmacoComponent, canActivate: [MyPrescriptionGuard]},
  { path: 'contatti', component: ContattiComponent, canActivate: [MedicOrNurseGuard]},
  { path: 'feedback-ricevuti', component: FeedbackRicevutiComponent, canActivate: [DirectorGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
