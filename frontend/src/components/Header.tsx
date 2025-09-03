import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { token, logout } = useAuth(); 


  return (
    <header className="bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-3">
        <Link to="/" className="text-2xl font-bold text-brand-light font-heading">
          Caraca, meu Sonho!
        </Link>
        
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link to="/cliente/dashboard" className="text-sm text-brand-gray hover:text-brand-light transition-colors">
                Minha Conta
              </Link>
              <button onClick={logout} className="text-sm text-brand-gray hover:text-brand-light transition-colors">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-brand-gray hover:text-brand-light transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-sm text-brand-gray hover:text-brand-light transition-colors">
                Cadastrar
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )


  }
