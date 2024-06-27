import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
import { Address } from 'src/app/Model/address.model';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

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
    address: {
      street: '',
      country: '',
      city: '',
      zip: '',
      location: '',
      radius: 0
    },
  };

  constructor(private route: ActivatedRoute, private service: MasterService) { }

  ngOnInit(): void {
    const objectId = this.route.snapshot.paramMap.get('id');
    if (objectId) {
      this.service.getObjectDetails(+objectId).subscribe(
        (data: any) => {
          console.log(data.address);
          this.objectDetails = data;
          this.loadCategory(data.category);
          this.loadAddress(data.address);
          console.log(data);
        },
        (error: any) => {
          console.error('Error loading object details:', error);
        }
      );
    }
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
}
