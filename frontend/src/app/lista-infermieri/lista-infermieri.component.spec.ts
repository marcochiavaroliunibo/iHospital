import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInfermieriComponent } from './lista-infermieri.component';

describe('ListaInfermieriComponent', () => {
  let component: ListaInfermieriComponent;
  let fixture: ComponentFixture<ListaInfermieriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaInfermieriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInfermieriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
