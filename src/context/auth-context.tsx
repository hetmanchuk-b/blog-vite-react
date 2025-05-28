import type {User} from "../types/user.ts";
import {createContext, useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        setUser(decoded);
      } catch (err: any) {
        localStorage.removeItem("token");
        setUser(null);
        console.error('Auth Provider Error', err);
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: User = jwtDecode(token);
    setUser(decoded);
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{user, isAuthenticated, isAdmin, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}