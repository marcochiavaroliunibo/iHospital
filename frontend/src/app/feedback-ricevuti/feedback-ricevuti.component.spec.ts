import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackRicevutiComponent } from './feedback-ricevuti.component';

describe('FeedbackRicevutiComponent', () => {
  let component: FeedbackRicevutiComponent;
  let fixture: ComponentFixture<FeedbackRicevutiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackRicevutiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRicevutiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
