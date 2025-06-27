// store user state

import { createContext, useState } from 'react';
import type { ReactNode, ReactElement } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string,
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Wrapper for components we want share auth state with
const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {

  // USER STATE
  // using callback so localstorage is not run on each render
  const [user, setUser] = useState<User | null>(() => {
    // reading user info stored in the browser (localStorage)
    const stored = localStorage.getItem('user');

    return stored ? JSON.parse(stored) : null;
  });

  // LOGIN: update user state & save user info
  const login = (userData: User) => {
    setUser(userData);
    // localStorage only stores strings
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // LOGOUT: clear user & delete user info
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};



export { AuthProvider, AuthContext} ;
export type { AuthContextType };