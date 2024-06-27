import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetosperdidospoliciaComponent } from './objetosperdidospolicia.component';

describe('ObjetosperdidospoliciaComponent', () => {
  let component: ObjetosperdidospoliciaComponent;
  let fixture: ComponentFixture<ObjetosperdidospoliciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjetosperdidospoliciaComponent]
    });
    fixture = TestBed.createComponent(ObjetosperdidospoliciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
