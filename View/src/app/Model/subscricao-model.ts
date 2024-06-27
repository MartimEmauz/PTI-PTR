import { GeneralUser } from './general-users-model';
import { Leilao } from './leilao-model';

export interface Subscription {
  id: number;
  id_user: number | GeneralUser;
  id_leilao: number | Leilao;
}
