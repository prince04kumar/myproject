import { createContext, useState, ReactNode } from "react";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState(null);

  const login = (userData: any) => {
    setAuthState(userData);
  };

  const logout = () => {
    setAuthState(null); 
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};