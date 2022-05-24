import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiloPazienteComponent } from './profilo-paziente.component';

describe('ProfiloPazienteComponent', () => {
  let component: ProfiloPazienteComponent;
  let fixture: ComponentFixture<ProfiloPazienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiloPazienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiloPazienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
