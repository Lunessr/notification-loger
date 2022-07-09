export interface Reception {
  id: string;
  user_id: string;
  doctor_id: string;
  slot: string;
}

export type ReceptionWithoutId = Omit<Reception, "id">;
