import { PolicePost } from './postopolice.model';

export interface PoliceUser {
  id?: number;
  firstname?: string;
  lastname?: string;
  email: string;
  password?: string | null;
  internalid?: number | null;
  postopolice?: number | PolicePost;
}
