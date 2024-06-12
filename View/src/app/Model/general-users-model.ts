import { Address } from './address.model';

export interface GeneralUser {
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string | null;
  gender?: string;
  birthday?: Date;
  status?: boolean;
  address?: number | Address;
  idcivil?: number;
  idfiscal?: number;
  phoneNumber?: number;
}
