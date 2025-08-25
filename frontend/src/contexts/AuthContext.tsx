import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import api from "../services/api";

interface AuthContextData {
 
  token: string | null;
  login: (credentials: {username: string, password: any}) => Promise <void>;
  logout:() => void;

}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({children}: { children: ReactNode } ) {

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('@CaracaMeuSonho:token');
    if (storedToken) {
      setToken(storedToken);
    }
  },[]);

async function login(credentials: { username: string, password: any}){
    const response = await api.post('/login', credentials);
    const { token: newToken } = response.data;

    setToken(newToken);
    localStorage.setItem('@CaracaMeuSonho:token', newToken);
  }

  function logout() {
    setToken(null);
    localStorage.removeItem('@CaracaMeuSonho:token');
  }

  return (
  <AuthContext.Provider value={{token, login, logout}}>
  {children}
  </AuthContext.Provider>
  );
  
}

export function useAuth() {
  return useContext(AuthContext);
}
