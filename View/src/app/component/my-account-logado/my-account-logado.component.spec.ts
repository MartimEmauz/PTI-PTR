import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountLogadoComponent } from './my-account-logado.component';

describe('MyAccountLogadoComponent', () => {
  let component: MyAccountLogadoComponent;
  let fixture: ComponentFixture<MyAccountLogadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAccountLogadoComponent]
    });
    fixture = TestBed.createComponent(MyAccountLogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
