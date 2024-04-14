import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize username and password properties', () => {
    expect(component.username).toEqual('');
    expect(component.password).toEqual('');
  });

  it('should call login method on form submission', () => {
    spyOn(console, 'log');
    const loginForm = fixture.nativeElement.querySelector('form');
    loginForm.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('Username:', component.username);
    expect(console.log).toHaveBeenCalledWith('Password:', component.password);
  });
});
