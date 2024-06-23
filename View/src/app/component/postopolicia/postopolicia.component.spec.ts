import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostopoliciaComponent } from './postopolicia.component';

describe('PostopoliciaComponent', () => {
  let component: PostopoliciaComponent;
  let fixture: ComponentFixture<PostopoliciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostopoliciaComponent]
    });
    fixture = TestBed.createComponent(PostopoliciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
