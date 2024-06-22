import { Objeto } from './object-model';
import { GeneralUser } from './general-users-model';

export interface LostObject extends Objeto {
  generalUser: number | GeneralUser;
}
