import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeilaoDetailsComponent } from './leilao-details.component';

describe('LeilaoDetailsComponent', () => {
  let component: LeilaoDetailsComponent;
  let fixture: ComponentFixture<LeilaoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeilaoDetailsComponent]
    });
    fixture = TestBed.createComponent(LeilaoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});