import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliOperazioneComponent } from './dettagli-operazione.component';

describe('DettagliOperazioneComponent', () => {
  let component: DettagliOperazioneComponent;
  let fixture: ComponentFixture<DettagliOperazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettagliOperazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliOperazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
