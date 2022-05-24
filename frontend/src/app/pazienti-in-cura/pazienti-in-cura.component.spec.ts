import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PazientiInCuraComponent } from './pazienti-in-cura.component';

describe('PazientiInCuraComponent', () => {
  let component: PazientiInCuraComponent;
  let fixture: ComponentFixture<PazientiInCuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PazientiInCuraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PazientiInCuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
