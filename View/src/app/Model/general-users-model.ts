import { Address } from './address.model';

export interface GeneralUser {
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string;
  gender?: string;
  birthday?: Date;
  status?: boolean;
  address?: Address;
  idcivil?: number;
  idfiscal?: number;
  phoneNumber?: number;
}
