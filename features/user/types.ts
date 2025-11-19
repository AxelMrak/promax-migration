export enum UserLevel {
  MONTEUR = 0,
  MANAGER = 3,
  ADMIN = 5,
}

export type User = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
  user_level: UserLevel;
};
