export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  bio?: string | null;
}

export interface UpdateUserData {
  username: string;
  email: string;
  bio: string | null;
}