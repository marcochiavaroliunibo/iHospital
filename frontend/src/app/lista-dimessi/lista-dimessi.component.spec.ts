import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDimessiComponent } from './lista-dimessi.component';

describe('ListaDimessiComponent', () => {
  let component: ListaDimessiComponent;
  let fixture: ComponentFixture<ListaDimessiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDimessiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDimessiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
