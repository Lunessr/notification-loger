export interface User {
  id: string;
  name: string;
  phone: number;
}

export type UserWithoutId = Omit<User, "id">;
