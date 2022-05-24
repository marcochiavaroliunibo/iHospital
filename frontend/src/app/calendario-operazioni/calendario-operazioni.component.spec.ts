import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioOperazioniComponent } from './calendario-operazioni.component';

describe('CalendarioOperazioniComponent', () => {
  let component: CalendarioOperazioniComponent;
  let fixture: ComponentFixture<CalendarioOperazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioOperazioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioOperazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
