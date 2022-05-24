import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciRegistratiComponent } from './farmaci-registrati.component';

describe('FarmaciRegistratiComponent', () => {
  let component: FarmaciRegistratiComponent;
  let fixture: ComponentFixture<FarmaciRegistratiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmaciRegistratiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmaciRegistratiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
