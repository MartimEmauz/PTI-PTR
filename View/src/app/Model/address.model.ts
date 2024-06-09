export interface Address {
  id?: number;
  street: string;
  country: string;
  city: string;
  zip: string;
  location?: string;
  radius?: number;
}