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
import {MedicoGuard} from "./role-guard/MedicoGuard";
import {DirettoreGuard} from "./role-guard/DirettoreGuard";
import {FAQComponent} from "./faq/faq.component";
import {ValoriVitaliComponent} from "./valori-vitali/valori-vitali.component";
import {DettagliOperazioneComponent} from "./dettagli-operazione/dettagli-operazione.component";
import {SegnalazioniComponent} from "./segnalazioni/segnalazioni.component";
import {AreaRiservataComponent} from "./area-riservata/area-riservata.component";
import {PazienteInCuraGuard} from "./role-guard/PazienteInCuraGuard";
import {MedicoOrInfermiereGuard} from "./role-guard/MedicoOrInfermiereGuard";

// canActive mi indica quale tipo di profilo può accedere ad ogni pagina,
// svolge quindi il ruolo di GUARDIA per l'accesso alle varie pagine.
const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'aggiungi-farmaco', component: AggiungiFarmacoComponent, canActivate: [MedicoGuard]},
  { path: 'aggiungi-operazione', component: AggiungiOperazioneComponent, canActivate: [MedicoGuard] },
  { path: 'calendario-operazioni', component: CalendarioOperazioniComponent, canActivate: [MedicoGuard] },
  { path: 'farmaci-registrati', component: FarmaciRegistratiComponent, canActivate: [MedicoGuard] },
  { path: 'pazienti-in-cura', component: PazientiInCuraComponent, canActivate: [MedicoOrInfermiereGuard] },
  { path: 'profilo-paziente/:id', component: ProfiloPazienteComponent, canActivate: [PazienteInCuraGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'registrati', component: RegistrazioneComponent},
  { path: 'aggiungi-paziente', component: AggiungiPazienteComponent, canActivate: [DirettoreGuard]},
  { path: 'lista-pazienti', component: ListaPazientiComponent, canActivate: [DirettoreGuard]},
  { path: 'FAQ', component: FAQComponent},
  { path: 'valori-vitali/:id', component: ValoriVitaliComponent, canActivate: [PazienteInCuraGuard]},
  { path: 'dettagli-operazione/:id', component: DettagliOperazioneComponent, canActivate: [PazienteInCuraGuard]},
  { path: 'segnalazioni/:id', component: SegnalazioniComponent, canActivate: [PazienteInCuraGuard]},
  { path: 'area-riservata', component: AreaRiservataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
