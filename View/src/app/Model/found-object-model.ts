import { Objeto } from './object-model';
import { PoliceUser } from './police-users-model';
import { GeneralUser } from './general-users-model';

export interface FoundObject extends Objeto {
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
