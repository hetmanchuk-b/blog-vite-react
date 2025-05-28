import type {User} from "../types/user.ts";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {verifyToken} from "../services/api.ts";
import { AuthContext } from "../hooks/use-auth.ts";

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await verifyToken();
          const decoded: User = jwtDecode(token);
          setUser({...decoded, ...response.user});
        } catch (err: any) {
          localStorage.removeItem("token");
          setUser(null);
          console.error('Auth Provider Error', err);
        }
      }
      setIsLoading(false);
    }
    initializeAuth();
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
    <AuthContext.Provider value={{user, isAuthenticated, isAdmin, isLoading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}