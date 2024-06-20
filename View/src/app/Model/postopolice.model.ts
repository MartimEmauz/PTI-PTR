import { Address } from './address.model';

export interface PolicePost {
  stationnumber: number;
  location: number | Address;
}