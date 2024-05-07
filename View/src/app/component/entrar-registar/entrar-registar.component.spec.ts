import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrarRegistarComponent } from './entrar-registar.component';

describe('EntrarRegistarComponent', () => {
  let component: EntrarRegistarComponent;
  let fixture: ComponentFixture<EntrarRegistarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrarRegistarComponent]
    });
    fixture = TestBed.createComponent(EntrarRegistarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
