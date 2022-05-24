import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendario-operazioni',
  templateUrl: './calendario-operazioni.component.html',
  styleUrls: ['./calendario-operazioni.component.css']
})
export class CalendarioOperazioniComponent implements OnInit {

  calendarPlugin = [dayGridPlugin];

  constructor() { }

  ngOnInit(): void {
  }

}
