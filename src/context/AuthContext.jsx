import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Admin credentials (in production, this would be handled by a backend)
const ADMIN_CREDENTIALS = {
  email: "admin@techvault.com",
  password: "Harsh789",
};

const AUTH_KEY = "techvault_auth";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Check for existing session
    const authData = localStorage.getItem(AUTH_KEY);
    if (authData) {
      const parsed = JSON.parse(authData);
      if (parsed.expiry > Date.now()) {
        setIsAuthenticated(true);
        setAdmin(parsed.admin);
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        if (
          email === ADMIN_CREDENTIALS.email &&
          password === ADMIN_CREDENTIALS.password
        ) {
          const adminData = {
            email,
            name: "Admin User",
            role: "admin",
          };
          const authData = {
            admin: adminData,
            expiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
          };
          localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
          setIsAuthenticated(true);
          setAdmin(adminData);
          resolve(adminData);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, admin, login, logout }}
    >
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
};
