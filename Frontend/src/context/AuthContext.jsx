import React from 'react';
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("laptopwise_user")) || null; }
    catch { return null; }
  });

  function signIn(data) {
    localStorage.setItem("laptopwise_token", data.token);
    localStorage.setItem("laptopwise_user", JSON.stringify(data.user));
    setUser(data.user);
  }

  function signOut() {
    localStorage.removeItem("laptopwise_token");
    localStorage.removeItem("laptopwise_user");
    setUser(null);
  }

  const value = useMemo(() => ({ user, signIn, signOut }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
