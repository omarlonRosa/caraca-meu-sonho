import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  sub: string;
  nome: string;
  roles: string[];
  fotoPerfilUrl?: string;
  exp?: number; 
  iat?: number;
}

interface AuthContextData {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean; 
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('@CaracaMeuSonho:token');
  });
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode<User>(token);
        
        if (decodedUser.exp && (decodedUser.exp * 1000 > Date.now())) {
            setUser(decodedUser);
        } else {
            console.warn("Token expirado.");
            localStorage.removeItem('@CaracaMeuSonho:token');
            setToken(null);
            setUser(null);
        }
      } catch (error) {
        console.error("Token salvo é inválido:", error);
        localStorage.removeItem('@CaracaMeuSonho:token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [token]); 
  
  const login = (newToken: string) => {
    try {
      const decodedUser = jwtDecode<User>(newToken);
      
      if (decodedUser.exp && (decodedUser.exp * 1000 > Date.now())) {
        localStorage.setItem('@CaracaMeuSonho:token', newToken);
        setToken(newToken);
      } else {
        alert("Sessão expirada ou token inválido. Faça login novamente.");
        logout();
      }
    } catch (error) {
      console.error("Token recebido é inválido:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('@CaracaMeuSonho:token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
