import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
import { Address } from 'src/app/Model/address.model';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AuthSwitchService } from 'src/app/auth-switch.service';

@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.css']
})
export class ObjectDetailsComponent implements OnInit {
  objectDetails: any = {
    title: '',
    specific_date: '',
    description: '',
    category: '',
    cat_att: [],
    att_obj: [],
    address: {
      street: '',
      country: '',
      city: '',
      zip: '',
      location: '',
      radius: 0
    },
    policePost: {
      stationnumber: '',
      address: {
        street: '',
        country: '',
        city: '',
        zip: '',
        location: '',
        radius: 0
      },
    },
  };

  constructor(
    private route: ActivatedRoute, 
    private service: MasterService,
    private authSwitchService: AuthSwitchService
  ) { }

  ngOnInit(): void {
    const objectId = this.route.snapshot.paramMap.get('id');
    if (objectId) {
      this.service.getObjectDetails(+objectId).subscribe(
        (data: any) => {
          this.objectDetails = data;
          this.loadAttributesObject(data.id);
          this.loadCategory(data.category);
          this.loadAddress(data.address);
          if (this.isPoliceUser()) {
            this.service.getFoundObjectById(data.id).subscribe(
              (foundObject: any) => {
                this.loadPolicePost(foundObject.police);
              },
              (error: any) => {
                console.error('Error loading police post:', error);
              }
            );
          }
          console.log(data);
        },
        (error: any) => {
          console.error('Error loading object details:', error);
        }
      );
    }
  }

  isPoliceUser(): boolean {
    return this.authSwitchService.getRole() === 'police'; // Método fictício para verificar se o usuário é do tipo "police"
  }

  loadPolicePost(police: number): void {
    this.service.getPoliceUser(police).subscribe(
      (policeUser: any) => {
        this.service.getPolicePostsById(policeUser.postopolice).subscribe(
          (policePost: any) => {
            this.objectDetails.policePost = policePost;
            this.service.getAddressById(policePost.location).subscribe(
              (address: Address) => {
                this.objectDetails.policePost.address = address;
              },
              (error: any) => {
                console.error('Error loading police post address:', error);
              }
            );
          },
          (error: any) => {
            console.error('Error loading police post:', error);
          }
        );  
      },
      (error: any) => {
        console.error('Error loading police post:', error);
      }
    );
  }

  loadCategory(categoryId: number): void {
    this.service.getCategory(categoryId).subscribe(
      (category: any) => {
        this.objectDetails.category = category.name;
      },
      (error: any) => {
        console.error('Error loading category:', error);
      }
    );
  }

  loadAddress(addressId: number): void {
    this.service.getAddressById(addressId).subscribe(
      (address: Address) => {
        this.objectDetails.address = address;
        console.log(address)
      },
      (error: any) => {
        console.error('Error loading address:', error);
      }
    );
  }

  loadAttributesObject(objectId: number): void {
    this.service.getAttributesObject(objectId).subscribe(
      (attributes: any[]) => {
        this.objectDetails.att_obj = attributes;
      });
    this.service.getCategoryAttributes(this.objectDetails.category).subscribe(
      (attributes: any[]) => {
        this.objectDetails.cat_att = attributes;
      });
  }
}
