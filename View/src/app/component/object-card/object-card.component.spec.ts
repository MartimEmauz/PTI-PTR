import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCardComponent } from './object-card.component';

describe('ObjectCardComponent', () => {
  let component: ObjectCardComponent;
  let fixture: ComponentFixture<ObjectCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectCardComponent]
    });
    fixture = TestBed.createComponent(ObjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
