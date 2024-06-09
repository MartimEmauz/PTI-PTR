import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-completion',
  templateUrl: './profile-completion.component.html',
  styleUrls: ['./profile-completion.component.css']
})
export class ProfileCompletionComponent {
  name: string = '';
  gender: string = '';
  birthday: string = '';
  address: string = '';
  country: string = '';
  city: string = '';
  zipCode: string = '';
  nif: string = '';
  cc: string = '';
  phoneNumber: string = '';

  constructor() { }

  onCompleteProfile() {
    // Here you can handle the form submission, such as sending the data to a backend
    console.log("Nome:", this.name);
    console.log("Género:", this.gender);
    console.log("Data de Nascimento:", this.birthday);
    console.log("Morada:", this.address);
    console.log("País:", this.country);
    console.log("Cidade:", this.city);
    console.log("Código Postal:", this.zipCode);
    console.log("NIF:", this.nif);
    console.log("CC:", this.cc);
    console.log("Número de Telefone:", this.phoneNumber);
  }

  isNameValid(name: string): boolean {
    return /^[a-zA-Z\s]+$/.test(name);
  }

  isDateValid(date: string): boolean {
    return !isNaN(Date.parse(date));
  }

  isAddressValid(address: string): boolean {
    return address.trim().length > 0;
  }

  isCountryValid(country: string): boolean {
    return /^[a-zA-Z\s]+$/.test(country);
  }

  isCityValid(city: string): boolean {
    return /^[a-zA-Z\s]+$/.test(city);
  }

  isZipCodeValid(zipCode: string): boolean {
    return /^\d{4}-\d{3}$/.test(zipCode);
  }

  isNifValid(nif: string): boolean {
    return /^\d{9}$/.test(nif);
  }

  isCcValid(cc: string): boolean {
    return /^\d{8}$/.test(cc);
  }

  isPhoneNumberValid(phoneNumber: string): boolean {
    return /^\d{9}$/.test(phoneNumber);
  }
}
