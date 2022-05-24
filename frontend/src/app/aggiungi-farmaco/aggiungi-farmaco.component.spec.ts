import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiFarmacoComponent } from './aggiungi-farmaco.component';

describe('AggiungiFarmacoComponent', () => {
  let component: AggiungiFarmacoComponent;
  let fixture: ComponentFixture<AggiungiFarmacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiFarmacoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiFarmacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
