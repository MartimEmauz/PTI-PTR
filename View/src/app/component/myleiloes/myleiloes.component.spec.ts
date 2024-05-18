import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeiloesComponent } from './myleiloes.component';

describe('MyLeiloesComponent', () => {
  let component: MyLeiloesComponent;
  let fixture: ComponentFixture<MyLeiloesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLeiloesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLeiloesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
