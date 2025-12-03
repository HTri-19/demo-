export type UserRole = "user" | "admin";
export type UserStatus = "active" | "unactive";

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  register_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface UserFormPayload {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
}
