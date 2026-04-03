"use client";

import { api } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface UserProfile {
  age: number;
  gender: number;
  skinType: number;
  concerns?: any;
  allergies?: any;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
  profile?: UserProfile | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  hasProfile: boolean;
  isReady: boolean; // <--- Flag indikator proses Loading internal kita
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, pass: string, confirm: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false); // Default belum dicek

  useEffect(() => {
    const savedToken = localStorage.getItem("kyra_token");
    const savedUser = localStorage.getItem("kyra_user");

    const initAuth = async () => {
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));

        // Verifikasi ke server biar session tetap fresh
        try {
          const freshUser = await api.get<User>("/me");
          setUser(freshUser);
          localStorage.setItem("kyra_user", JSON.stringify(freshUser));
        } catch (err) {
          // Kalau tokennya busuk/expire di server, baru logout paksa
          console.error("Session expired/invalid:", err);
          localStorage.removeItem("kyra_token");
          localStorage.removeItem("kyra_user");
          setToken(null);
          setUser(null);
        }
      }
      setIsReady(true);
    };

    initAuth();
  }, []);

  const saveSession = (newToken: string, newUser: User) => {
    localStorage.setItem("kyra_token", newToken);
    localStorage.setItem("kyra_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const clearSession = () => {
    localStorage.removeItem("kyra_token");
    localStorage.removeItem("kyra_user");
    setToken(null);
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    const data = await api.post<{ token: string; user: User }>("/login", { email, password });
    saveSession(data.token, data.user);
    return data.user;
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => {
    const data = await api.post<{ token: string; user: User }>("/register", {
      name,
      email,
      password,
      password_confirmation,
    });
    saveSession(data.token, data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await api.post("/logout", {});
    } finally {
      clearSession();
    }
  };

  const refreshUser = async () => {
    try {
      const freshUser = await api.get<User>("/me");
      setUser(freshUser);
      localStorage.setItem("kyra_user", JSON.stringify(freshUser));
    } catch {
      clearSession();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        hasProfile: !!user?.profile,
        isReady,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
