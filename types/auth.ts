export type UserRole = 'superadmin' | 'admin' | 'user' | 'client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company: string;
  department?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'on_leave';
  createdAt: Date;
  lastLogin: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  canAccess: (allowedRoles: UserRole[]) => boolean;
}