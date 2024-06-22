// lost-object.model.ts

export interface LostObject {
  title?: string | null;
  specific_date?: Date | string | null;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
  category?: string | null;
  adress?: number | null;
  generaluser?: number | null;
}
