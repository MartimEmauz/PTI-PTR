import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { colorentity } from '../Entity/colorentity';
import { Country, Customer } from '../Model/Customer';
import { LostObject } from '../Model/lost-object.model';
import { GeneralUser } from '../Model/general-users-model';
import { Address } from '../Model/address.model';
import { PoliceUser } from '../Model/police-users-model';
import { FoundObject } from '../Model/found-object.model';
import { Leilao } from '../Model/leilao-model';
import { Licitacao } from '../Model/licitacao-model';
import { Objeto } from '../Model/object-model';
import { PolicePost } from '../Model/postopolice.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  followLeilao(id: any) {
    throw new Error('Method not implemented.');
  }

  getObjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}objects/`);
  }

  GetColorList(): colorentity[] {
    return [
      { code: 'c0', name: 'black' },
      { code: 'c1', name: 'Red' },
      { code: 'c2', name: 'Green' },
      { code: 'c3', name: 'Yellow' },
      { code: 'c4', name: 'White' }
    ];
  }

  addObject(newObject: Objeto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}objects/`, newObject);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}categories/`);
  }

  GetCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://localhost:8000/customer');
  }

  Savecustomer(data: any): Observable<any> {
    return this.http.post('http://localhost:8000/customer', data);
  }

  GetCustomerbycode(code: any): Observable<any> {
    return this.http.get(`http://localhost:8000/customer/${code}`);
  }

  GetAssociate(): Observable<any> {
    return this.http.get('http://localhost:8000/associate');
  }

  GetAssociatebycode(code: any): Observable<any> {
    return this.http.get(`http://localhost:8000/associate/${code}`);
  }

  GetCountry(): Observable<Country[]> {
    return this.http.get<Country[]>('http://localhost:8000/country');
  }

  SaveAssociate(data: any, code: any): Observable<any> {
    return this.http.put(`http://localhost:8000/associate/${code}`, data);
  }

  // API ------------------------------------------------------------------
  private jsonUrl = 'assets/lost_objects.json';

  getLostObjects(): Observable<any[]> {
    return this.http.get<LostObject[]>(`${this.apiUrl}lostobjects/`);
  }

  sendData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}endpoint`, data);
  }

  addLostObject(newLostObject: LostObject): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}lostobjects/`, newLostObject); 
  } 

  addFoundObject(newFoundObject: FoundObject): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}foundobjects/`, newFoundObject); 
  } 

  addAttributeObject(attribute: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}atributesobjects/`, attribute);
  }

  createUser(user: GeneralUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}generalusers/`, user);
  }

  updateUser(email: string, userData: Partial<GeneralUser>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}generalusers/${email}/`, userData);
  }

  updateFoundObject(id: number, foundObjectData: Partial<FoundObject>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}foundobjects/${id}/`, foundObjectData);
  }

  getAttributes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}categoryattributes/`);
  }
      

  getUserByEmail(email: string): Observable<GeneralUser | null> {
    return this.http.get<GeneralUser | null>(`${this.apiUrl}generalusers/${email}/`);
  }

  getPoliceByEmail(email: string): Observable<PoliceUser | null> {
    return this.http.get<PoliceUser | null>(`${this.apiUrl}policeusers/${email}/`);
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

  getAdressById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}addresses/${id}/`);
  }

  updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}addresses/${address.id}/`, address);
  }

  // Method to fetch object details
  getObjectDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}objects/${id}/`);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}categories/${id}/`);
  }


  getCategoryAttributes(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}categoryattributes/category/${categoryId}/`);
  }


  getAddressById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}addresses/${id}/`);
  }

  deleteFoundObject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}foundobjects/${id}/`);
  }

  deleteLostObject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}lostobjects/${id}/`);
  }

  deleteUser(email: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}generalusers/${email}/`);
  }

  deleteObject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}objects/${id}/`);
  }

  getLeilao(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}auctions/`);
  }

  addLeilao(auction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auctions/`, auction);
  }

  addBid(bid: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}bids/`, bid);
  }

  getFoundObjects(): Observable<any[]> {
    return this.http.get<FoundObject[]>(`${this.apiUrl}foundobjects/`);
  }

  // Get all police posts
  getPolicePosts(): Observable<PolicePost[]> {
    return this.http.get<PolicePost[]>(`${this.apiUrl}policeposts/`);
  }

  // Add a new police post
  addPolicePost(newPost: PolicePost): Observable<PolicePost> {
    return this.http.post<PolicePost>(`${this.apiUrl}policeposts/`, newPost);
  }

  // Delete a police post
  deletePolicePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}policeposts/${id}/`)
  }
  
  getFoundObjectById(id: number): Observable<FoundObject> {
    return this.http.get<FoundObject>(`${this.apiUrl}foundobjects/${id}/`);
  }

  getObjectById(id: number): Observable<Objeto> {
    return this.http.get<Objeto>(`${this.apiUrl}objects/${id}/`);
  }

  getLeilaoById(id: number): Observable<Leilao> {
    return this.http.get<Leilao>(`${this.apiUrl}auctions/${id}/`);
  }

  getBidsByLeilaoId(id: number): Observable<Licitacao[]> {
    return this.http.get<Licitacao[]>(`${this.apiUrl}auctions/bids/${id}/`);
  }
  
  getGeneralUserById(id: number): Observable<GeneralUser> {
    return this.http.get<GeneralUser>(`${this.apiUrl}generalusers/${id}/`);
  }

  updateBidValueInAuction(auctionId: number, bidValue: number): Observable<any> {
    const url = `${this.apiUrl}auctions/${auctionId}/`;
    return this.http.put<any>(url, { maior_licitacao: bidValue });
  }
}
