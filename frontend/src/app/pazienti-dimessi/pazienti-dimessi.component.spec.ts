import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PazientiDimessiComponent } from './pazienti-dimessi.component';

describe('PazientiDimessiComponent', () => {
  let component: PazientiDimessiComponent;
  let fixture: ComponentFixture<PazientiDimessiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PazientiDimessiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PazientiDimessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
