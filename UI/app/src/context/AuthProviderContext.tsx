import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Auth {
  userId: string;
  userAlias: string;
  jwtToken: string;
}

interface AuthContextType {
  auth: Auth | null;
  setAuth: React.Dispatch<Auth | null>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem('remember') || 'false')
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
