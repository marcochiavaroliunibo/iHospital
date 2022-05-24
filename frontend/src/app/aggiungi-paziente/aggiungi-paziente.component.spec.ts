import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiPazienteComponent } from './aggiungi-paziente.component';

describe('AggiungiPazienteComponent', () => {
  let component: AggiungiPazienteComponent;
  let fixture: ComponentFixture<AggiungiPazienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiPazienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiPazienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
