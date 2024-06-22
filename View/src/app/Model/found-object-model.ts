import { PoliceUser } from './police-users-model';
import { GeneralUser } from './general-users-model';

export interface FoundObject {
  title?: string | null;
  specific_date?: Date | string | null;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
  category?: string | null;
  adress?: number | null;
  generaluser?: number | null;
  firstName: string;
  lastName: string;
  genero: string;
  birthday: Date;
  idCivil: string;
  idFiscal: string;
  phoneNumber: number;
  police: number | PoliceUser;
  possibleOwner?: number | GeneralUser;
  delivered: boolean;
}
