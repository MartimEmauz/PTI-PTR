import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { MasterService } from '../../service/master.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PolicePost } from '../../Model/postopolice.model';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let masterService: MasterService;

  const mockPolicePosts: PolicePost[] = [
    { id: 1, stationnumber: 101, location: { street: '123 Main St', country: 'Country1', city: 'City1', zip: '12345' } },
    { id: 2, stationnumber: 102, location: { street: '456 Side St', country: 'Country2', city: 'City2', zip: '67890' } }
  ];

  beforeEach(async () => {
    const masterServiceSpy = jasmine.createSpyObj('MasterService', ['getPolicePosts', 'addPolicePost', 'deletePolicePost']);
    masterServiceSpy.getPolicePosts.and.returnValue(of(mockPolicePosts));
    masterServiceSpy.addPolicePost.and.returnValue(of(mockPolicePosts[0]));
    masterServiceSpy.deletePolicePost.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: MasterService, useValue: masterServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    masterService = TestBed.inject(MasterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load police posts on init', () => {
    expect(component.policePosts.length).toBe(2);
    expect(component.policePosts).toEqual(mockPolicePosts);
  });

  it('should add a new police post', () => {
    component.newPost = { id: 0, stationnumber: 103, location: { street: '789 Another St', country: 'Country3', city: 'City3', zip: '54321' } };
    component.addPolicePost();
    fixture.detectChanges();

    expect(component.policePosts.length).toBe(3);
    expect(component.policePosts[2].stationnumber).toBe(103);
  });

  it('should delete a police post', () => {
    component.deletePolicePost(1);
    fixture.detectChanges();

    expect(component.policePosts.length).toBe(1);
    expect(component.policePosts.find(post => post.id === 1)).toBeUndefined();
  });
});
