import { Address } from './address.model';

export interface PolicePost {
  id: number;
  stationnumber: number;
  location: number | Address;
}