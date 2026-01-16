import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Map, Users, LogOut, ClipboardList, Plane } from 'lucide-react';

export function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900">
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-brand-primary flex items-center gap-2">
            <Plane className="text-brand-primary" size={24} />
            Caraca Admin
          </h1>
          <p className="text-xs text-gray-500 mt-2">Logado como: {user?.nome}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/admin" icon={<LayoutDashboard size={20} />} label="Visão Geral" currentPath={location.pathname} exact />
          <NavLink to="/admin/reservas" icon={<ClipboardList size={20} />} label="Reservas & Vendas" currentPath={location.pathname} />
          <NavLink to="/admin/users" icon={<Users size={20} />} label="Usuários" currentPath={location.pathname} />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden bg-white dark:bg-slate-800 p-4 border-b flex justify-between items-center shadow-sm">
           <span className="font-bold text-gray-800 dark:text-white">Painel Admin</span>
           <button onClick={handleLogout} className="text-red-500"><LogOut size={20} /></button>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8 bg-gray-50 dark:bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavLink({ to, icon, label, currentPath, exact = false }: any) {
  const isActive = exact ? currentPath === to : currentPath.startsWith(to);
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
        isActive 
          ? 'bg-brand-primary text-white shadow-md' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
