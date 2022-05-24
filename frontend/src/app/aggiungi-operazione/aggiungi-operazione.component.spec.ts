import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiOperazioneComponent } from './aggiungi-operazione.component';

describe('AggiungiOperazioneComponent', () => {
  let component: AggiungiOperazioneComponent;
  let fixture: ComponentFixture<AggiungiOperazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiOperazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiOperazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
