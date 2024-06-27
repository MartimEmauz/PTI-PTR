import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { Address } from '../../Model/address.model';
import { PolicePost } from '../../Model/postopolice.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  policePostForm: FormGroup;
  policePosts: PolicePost[] = [];

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private router: Router
  ) {
    this.policePostForm = this.fb.group({
      stationnumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      street: ['', Validators.required],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      zip: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{3}$/)]]
    });
  }

  ngOnInit() {
    this.loadPolicePosts();
  }

  loadPolicePosts() {
    this.masterService.getPolicePosts().subscribe(
      (data) => {
        this.policePosts = data;
        this.loadAddresses();
      },
      (error) => {
        console.error('Error fetching police posts:', error);
      }
    );
  }

  loadAddresses() {
    this.policePosts.forEach((post) => {
      if (post.location && typeof post.location === 'number') {
        this.masterService.getAddressById(post.location).subscribe(
          (address) => {
            post.location = address;
          },
          (error) => {
            console.error('Error fetching address:', error);
          }
        );
      }
    });
  }

  onSubmit() {
    if (this.policePostForm.valid) {
      const address: Address = {
        street: this.policePostForm.value.street,
        country: this.policePostForm.value.country,
        city: this.policePostForm.value.city,
        zip: this.policePostForm.value.zip,
      };

      this.masterService.createAddress(address).subscribe(
        (addressResponse) => {
          const policePost: PolicePost = {
            stationnumber: this.policePostForm.value.stationnumber,
            location: addressResponse.id
          };

          this.masterService.addPolicePost(policePost).subscribe(
            (policePostResponse) => {
              this.loadPolicePosts();
            },
            (error) => {
              console.error('Error creating police post:', error);
            }
          );
        },
        (error) => {
          console.error('Error creating address:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  deletePolicePost(id: number) {
    this.masterService.deletePolicePost(id).subscribe(
      () => {
        this.loadPolicePosts();
      },
      (error) => {
        console.error('Error deleting police post:', error);
      }
    );
  }

  isAddress(location: number | Address | undefined): location is Address {
      return (location as Address).street !== undefined;
  }
}
