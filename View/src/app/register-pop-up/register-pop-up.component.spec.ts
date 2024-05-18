import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPopUpComponent } from './register-pop-up.component';

describe('RegisterPopUpComponent', () => {
  let component: RegisterPopUpComponent;
  let fixture: ComponentFixture<RegisterPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPopUpComponent]
    });
    fixture = TestBed.createComponent(RegisterPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
