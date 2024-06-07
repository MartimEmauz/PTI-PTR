import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.css']
})
export class ProfileCompletionComponent {
  name: string = '';
  gender: string = '';
  birthYear: number | null = null;
  address: string = '';
  geoCoordinates: string = '';
  nif: string = '';
  cc: string = '';
  phoneNumber: string = '';

  constructor() { }

  onCompleteProfile() {
    console.log("Name:", this.name);
    console.log("Gender:", this.gender);
    console.log("Birth Year:", this.birthYear);
    console.log("Address:", this.address);
    console.log("Geographic Coordinates:", this.geoCoordinates);
    console.log("NIF:", this.nif);
    console.log("CC:", this.cc);
    console.log("Phone Number:", this.phoneNumber);
    // Handle the profile completion logic
  }
}
