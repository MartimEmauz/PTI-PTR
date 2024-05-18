import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeiloesComponent } from '../leiloes/leiloes.component';

describe('LeiloesComponent', () => {
  let component: LeiloesComponent;
  let fixture: ComponentFixture<LeiloesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeiloesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeiloesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
