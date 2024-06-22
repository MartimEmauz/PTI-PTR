import { PolicePost } from './postopolice.model'; // Importe o modelo correto para PolicePost, se necessário

export interface PoliceUser {
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string | null;
  internalid?: number | null;
  postopolice?: number | PolicePost | null; // Pode ser do tipo number ou do tipo PolicePost
}

