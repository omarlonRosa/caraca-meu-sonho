import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { AppLayout } from './layouts/AppLayout';
import { AdminProtectedRoute } from './routes/AdminProtectedRoute';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NewPackagePage } from './pages/admin/NewPackagePage';
import { EditPackagePage } from './pages/admin/EditPackagePage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { DashboardPage } from './pages/DashboardPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { MeuPerfilPage } from './pages/MeuPerfilPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinos" element={<DestinationsPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
		<Route path="/meu-perfil" element={<MeuPerfilPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/pagamento-sucesso" element={<PaymentSuccessPage />} />
        </Route>
        
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/pacotes/novo" element={<NewPackagePage />} />
          <Route path="/admin/pacotes/editar/:id" element={<EditPackagePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
