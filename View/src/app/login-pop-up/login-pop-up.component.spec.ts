import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPopUpComponent } from './login-pop-up.component';

describe('LoginPopUpComponent', () => {
  let component: LoginPopUpComponent;
  let fixture: ComponentFixture<LoginPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPopUpComponent]
    });
    fixture = TestBed.createComponent(LoginPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
