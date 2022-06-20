import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit,
} from '@angular/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours, parse,
} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
} from 'angular-calendar';
import {UserService} from "../service/user-service/user.service";
import {PatientService} from "../service/patient-service/patient.service";
import {OperationService} from "../service/operation-service/operation.service";
import {MedicAssignmentService} from "../service/medic-assignment-service/medic-assignment.service";
import {Router} from "@angular/router";

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
    },
    green: {
        primary: '#49ff00',
        secondary: '#D1E8FF',
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA',
    },
};

@Component({
    selector: 'app-calendaraio-operazioni',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [
        `
            h3 {
                margin: 0 0 10px;
            }

            pre {
                background-color: #f5f5f5;
                padding: 15px;
            }
        `,
    ],
    templateUrl: './calendario-operazioni.component.html',
})
export class CalendarioOperazioniComponent implements OnInit {

    @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any> | undefined;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    modalData: {
        action: string;
        event: CalendarEvent;
    } | undefined;
    actions: CalendarEventAction[] = [
        {
            label: '<i class="fas fa-fw fa-pencil-alt"></i>',
            a11yLabel: 'Edit',
            onClick: ({event}: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            },
        },
    ];
    refresh = new Subject<void>();
    events: CalendarEvent[] = [];
    activeDayIsOpen: boolean = true;

    constructor(private _router: Router, private _patient: PatientService, private _operation: OperationService, private _medicAssignment: MedicAssignmentService) {

    }

    ngOnInit() {
      this._medicAssignment.findByIdMedic(localStorage.getItem('id')).subscribe(
          res => {
            for (let i = 0; i < res.data.length; i++) {
              this._operation.findByPatient(res.data[i].id_paziente).subscribe(
                  res => {
                    for (let k = 0; k < res.data.length; k++) {
                      let color: any;
                      if (res.data[k].rischio === "ALTO" || res.data[k].rischio === "MEDIO ALTO") color = colors.red;
                      if (res.data[k].rischio === "MEDIO") color = colors.yellow;
                      if (res.data[k].rischio === "MEDIO BASSO" || res.data[k].rischio === "BASSO") color = colors.green;
                      let patient;
                      this._patient.findById(res.data[k].id_paziente).subscribe(
                          res2 => {
                            patient = res2.data;
                            this.events.push({
                              start: parse(res.data[k].data_ora, "yyyy-M-dd'T'HH:mm:ss.SSSX", new Date()),
                              title: res.data[k].titolo + " - " + patient.nome + " " + patient.cognome,
                              color: color,
                              actions: this.actions,
                              id: res.data[k]._id
                            });
                          }
                      )
                    }
                  }
              )
            }
          }
      )
    }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    eventTimesChanged({event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd,
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = {event, action};
        this._router.navigate(["/dettagli-operazione/" + event.id])
    }

    addEvent(): void {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
            },
        ];
    }

    deleteEvent(eventToDelete: CalendarEvent) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

}
