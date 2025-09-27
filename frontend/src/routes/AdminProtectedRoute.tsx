// frontend/web/src/routes/AdminProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AdminProtectedRoute() {
  // 1. Pegamos também o estado de 'loading'
  const { user, token, loading } = useAuth();

  // 2. Se ainda estiver verificando, mostramos uma mensagem de espera
  if (loading) {
    return <div>Verificando autenticação...</div>;
  }

  // 3. A lógica de redirecionamento agora só roda DEPOIS que o loading termina
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.roles.includes('ROLE_ADMIN')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
