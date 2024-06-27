import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { PolicePost } from '../../Model/postopolice.model';
import { Address } from '../../Model/address.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  policePosts: PolicePost[] = [];
  postForm: FormGroup;

  constructor(private masterService: MasterService, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      stationnumber: ['', Validators.required],
      street: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPolicePosts();
  }

  loadPolicePosts(): void {
    this.masterService.getPolicePosts().subscribe(posts => {
      this.policePosts = posts;
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const address: Address = {
        street: this.postForm.value.street,
        country: this.postForm.value.country,
        city: this.postForm.value.city,
        zip: this.postForm.value.zip
      };

      const newPost: PolicePost = {
        id: 0,
        stationnumber: this.postForm.value.stationnumber,
        location: address
      };

      this.masterService.addPolicePost(newPost).subscribe(post => {
        this.policePosts.push(post);
        this.postForm.reset();
      });
    }
  }

  deletePost(id: number): void {
    this.masterService.deletePolicePost(id).subscribe(() => {
      this.policePosts = this.policePosts.filter(post => post.id !== id);
    });
  }
}

