import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompletionPolicemanComponent } from './profile-completion-policeman.component';

describe('ProfileCompletionPolicemanComponent', () => {
  let component: ProfileCompletionPolicemanComponent;
  let fixture: ComponentFixture<ProfileCompletionPolicemanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileCompletionPolicemanComponent]
    });
    fixture = TestBed.createComponent(ProfileCompletionPolicemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
