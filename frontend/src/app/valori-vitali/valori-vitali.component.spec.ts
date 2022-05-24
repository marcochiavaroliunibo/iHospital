import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoriVitaliComponent } from './valori-vitali.component';

describe('ValoriVitaliComponent', () => {
  let component: ValoriVitaliComponent;
  let fixture: ComponentFixture<ValoriVitaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoriVitaliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoriVitaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
