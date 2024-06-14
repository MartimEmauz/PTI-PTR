import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetosperdidosComponent } from './objetosperdidos.component';

describe('MyLeiloesComponent', () => {
  let component: ObjetosperdidosComponent;
  let fixture: ComponentFixture<ObjetosperdidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetosperdidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjetosperdidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
