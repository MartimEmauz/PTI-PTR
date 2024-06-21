import { Injectable } from '@angular/core';
import { colorentity } from '../Entity/colorentity';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Country, Customer } from '../Model/Customer';
import { LostObject } from '../Model/lost-object.model';
import { GeneralUser } from '../Model/general-users-model';
import { Address } from '../Model/address.model';
import { PoliceUser } from '../Model/police-users-model';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private apiUrl = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) { }

  GetColorList(): colorentity[] {
    return [
      { code: 'c0', name: 'black' },
      { code: 'c1', name: 'Red' },
      { code: 'c2', name: 'Green' },
      { code: 'c3', name: 'Yellow' },
      { code: 'c4', name: 'White' }
    ]
  }

  GetCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>("http://localhost:8000/customer");
  }

  Savecustomer(data: any) {
    console.log(data)
    return this.http.post("http://localhost:8000/customer", data);
  }

  GetCustomerbycode(code: any) {
    return this.http.get("http://localhost:8000/customer/" + code);
  }

  GetAssociate() {
    return this.http.get('http://localhost:8000/associate');
  }

  GetAssociatebycode(code: any) {
    return this.http.get('http://localhost:8000/associate/' + code);
  }

  GetCountry(): Observable<Country[]> {
    return this.http.get<Country[]>('http://localhost:8000/country');
  }

  SaveAssociate(data: any, code: any) {
    return this.http.put('http://localhost:8000/associate/' + code, data);
  }

  //API ------------------------------------------------------------------
  private jsonUrl = 'assets/lost_objects.json';

  getLostObjects(): Observable<any[]> {
    return this.http.get<LostObject[]>(`${this.apiUrl}/lostobjects/`);
  }

  /*
  getLostObjects(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/lostobjects/`);
  }
  */

  // Example function to send data to Django API
  sendData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/endpoint`, data);
  }

  addLostObject(newLostObject: LostObject): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/lostobjects/`, newLostObject); 
  } 
  createUser(user: GeneralUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}generalusers/`, user);
  }

  updateUser(email: string, userData: Partial<GeneralUser>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}generalusers/${email}/`, userData);
  }

  getUserByEmail(email: string): Observable<GeneralUser | null> {
    return this.http.get<GeneralUser | null>(`${this.apiUrl}generalusers/${email}/`);
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}addresses/`, address);
  }

  createPoliceUser(pUser: PoliceUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}policeusers/`, pUser);
  }

  updatePoliceUser(email: string, pUserData: Partial<PoliceUser>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}policeusers/${email}/`, pUserData);
  }

  getPoliceUserByEmail(email: string): Observable<PoliceUser | null> {
    return this.http.get<GeneralUser | null>(`${this.apiUrl}policeusers/${email}/`);
  }


}
