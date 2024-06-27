import { GeneralUser } from './general-users-model';
import { Leilao } from './leilao-model';

export interface Licitacao {
  id: number;
  valor_licitacao: number;
  data: Date;
  id_user: number | GeneralUser;
  leilao: number | Leilao;
}
