export interface Doctor {
  id: string;
  name: string;
  spec: string;
  slots: Array<string>;
}

export type DoctorWithoutId = Omit<Doctor, "id">;
