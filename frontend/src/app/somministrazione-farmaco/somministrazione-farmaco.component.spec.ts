import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomministrazioneFarmacoComponent } from './somministrazione-farmaco.component';

describe('SomministrazioneFarmacoComponent', () => {
  let component: SomministrazioneFarmacoComponent;
  let fixture: ComponentFixture<SomministrazioneFarmacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomministrazioneFarmacoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SomministrazioneFarmacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
