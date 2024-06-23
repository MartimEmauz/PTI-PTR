import { LostObject } from './lost-object.model';

export interface Leilao {
  id: number;
  valor_base: number;
  data_inicio: Date;
  data_fim: Date;
  maior_licitacao: number;
  objeto: number | LostObject;
}