import { PolicePost } from './postopolice.model'; // Importe o modelo correto para PolicePost, se necessário

export interface PoliceUser {
  firstname?: string | null;
  lastname?: string | null;
  email: string;
  password?: string | null;
  internalid?: string | null;
  postopolice?: number | PolicePost | null; // Pode ser do tipo number ou do tipo PolicePost
}

