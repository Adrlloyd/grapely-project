import {useContext} from 'react';
import {AuthContext} from './AuthContext';

// Safety check as AuthContext will be undefined outside of <AuthProvider />
// Custom hook to avoid error-checking for undefined everywhere

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth() must be used within <AuthProvide />");
  return context;
};

export  {useAuth};