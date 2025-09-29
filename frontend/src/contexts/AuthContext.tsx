import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  sub: string;
  nome: string;
  roles: string[];
  fotoPerfilUrl?: string;	
}

interface AuthContextData {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('@CaracaMeuSonho:token');
    if (savedToken) {
      try {
        const decodedUser = jwtDecode<User>(savedToken);
        
        // @ts-ignore: O payload do JWT pode ter 'exp'
        if (decodedUser.exp * 1000 > Date.now()) {
            setToken(savedToken);
            setUser(decodedUser);
        } else {
            localStorage.removeItem('@CaracaMeuSonho:token');
        }
      } catch (error) {
        console.error("Token salvo é inválido:", error);
        localStorage.removeItem('@CaracaMeuSonho:token');
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
		 try {
    const decodedUser = jwtDecode<User>(newToken);
    // @ts-ignore: O payload do JWT pode ter 'exp'
    if (decodedUser.exp * 1000 > Date.now()) {
      localStorage.setItem('@CaracaMeuSonho:token', newToken);
      setToken(newToken);
      setUser(decodedUser);
    } else {
      localStorage.removeItem('@CaracaMeuSonho:token');
      setToken(null);
      setUser(null);
    }
  } catch (error) {
    console.error("Token recebido é inválido:", error);
    localStorage.removeItem('@CaracaMeuSonho:token');
    setToken(null);
    setUser(null);
  }
  };

  const logout = () => {
    localStorage.removeItem('@CaracaMeuSonho:token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
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
