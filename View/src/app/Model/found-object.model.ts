import { PoliceUser } from './police-users-model';
import { GeneralUser } from './general-users-model';
import { Objeto } from './object-model';

export interface FoundObject {
  title?: string | null;
  specific_date?: Date | string | null;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
  category?: string | null;
  address?: number | null;
  generaluser?: number | null;
  firstname: string;
  lastname: string;
  genero: string;
  birthday: Date;
  idcivil: string;
  idfiscal: string;
  phonenumber: number;
  police: number | PoliceUser;
  possibleowner?: number | GeneralUser;
  objeto_id?: number | Objeto;
  delivered: boolean;
}

