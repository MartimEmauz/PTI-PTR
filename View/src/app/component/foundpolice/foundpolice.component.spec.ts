import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundpoliceComponent } from './foundpolice.component';

describe('FoundpoliceComponent', () => {
  let component: FoundpoliceComponent;
  let fixture: ComponentFixture<FoundpoliceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoundpoliceComponent]
    });
    fixture = TestBed.createComponent(FoundpoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
