import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { PolicePost } from '../../Model/postopolice.model';
import { Address } from '../../Model/address.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  policePosts: PolicePost[] = [];
  newPost: PolicePost = { id: 0, stationnumber: 0, location: { street: '', country: '', city: '', zip: '' } as Address };

  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
    this.loadPolicePosts();
  }

  loadPolicePosts(): void {
    this.masterService.getPolicePosts().subscribe((posts: PolicePost[]) => {
      this.policePosts = posts;
    });
  }

  addPolicePost(): void {
    this.masterService.addPolicePost(this.newPost).subscribe((post: any) => {
      this.policePosts.push(post);
      this.newPost = { id: 0, stationnumber: 0, location: { street: '', country: '', city: '', zip: '' } as Address };
    });
  }

  deletePolicePost(id: number): void {
    this.masterService.deletePolicePost(id).subscribe(() => {
      this.policePosts = this.policePosts.filter(post => post.id !== id);
    });
  }
}
