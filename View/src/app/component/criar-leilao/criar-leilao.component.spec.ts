import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarLeilaoComponent } from './criar-leilao.component';

describe('CriarLeilaoComponent', () => {
  let component: CriarLeilaoComponent;
  let fixture: ComponentFixture<CriarLeilaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarLeilaoComponent]
    });
    fixture = TestBed.createComponent(CriarLeilaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
