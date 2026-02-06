import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  role: "student" | "admin";
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const DUMMY_USERS = [
  { username: "Student01", password: "123456", role: "student" as const, displayName: "Arjun Sharma" },
  { username: "Admin01", password: "123456", role: "admin" as const, displayName: "Dr. Priya Verma" },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("nexus_user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("nexus_user", JSON.stringify(user));
    else localStorage.removeItem("nexus_user");
  }, [user]);

  const login = (username: string, password: string) => {
    const found = DUMMY_USERS.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    if (found) {
      setUser({ username: found.username, role: found.role, displayName: found.displayName });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
