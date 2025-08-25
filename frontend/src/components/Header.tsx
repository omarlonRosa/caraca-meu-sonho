import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-3">
        <Link to="/" className="text-2xl font-bold text-brand-light font-heading">
          Caraca, meu Sonho!
        </Link>
        
        <div>
          <Link to="/admin/dashboard" className="text-sm text-brand-gray hover:text-brand-light transition-colors">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  )
}

