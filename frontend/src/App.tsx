import { Routes, Route } from 'react-router-dom';

// Layouts
import { AppLayout } from './layouts/AppLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Proteção de Rotas
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminProtectedRoute } from './routes/AdminProtectedRoute';

// Páginas Públicas / Auth
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { PackageDetailPage } from './pages/PackageDetailPage';

// Páginas do Cliente (Protegidas)
import { DashboardPage } from './pages/DashboardPage';
import { MeuPerfilPage } from './pages/MeuPerfilPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { GalleryPage } from './pages/GalleryPage';

import { AdminReservasPage } from './pages/admin/AdminReservasPage';
import { NewPackagePage } from './pages/admin/NewPackagePage';
import { EditPackagePage } from './pages/admin/EditPackagePage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminHeroPage } from './pages/admin/AdminHeroPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminEditUserPage } from './pages/admin/AdminEditUserPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { MyDocuments } from './pages/MyDocuments';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route element={<AppLayout />}>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/destinos" element={<DestinationsPage />} />
        <Route path="/destinos/:id" element={<PackageDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/meu-perfil" element={<MeuPerfilPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/meus-documentos" element={<MyDocuments />} />
          <Route path="/pagamento-sucesso" element={<PaymentSuccessPage />} />
          <Route path="/minhas-viagens/:pacoteId/galeria" element={<GalleryPage />} />
        </Route>

      </Route>

      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/reservas" element={<AdminReservasPage />} />
          
          <Route path="/admin/pacotes/novo" element={<NewPackagePage />} />
          <Route path="/admin/pacotes/editar/:id" element={<EditPackagePage />} />
          <Route path="/admin/pacotes/:pacoteId/galeria" element={<AdminGalleryPage />} />
          
          <Route path="/admin/hero" element={<AdminHeroPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/users/editar/:userId" element={<AdminEditUserPage />} />

        </Route>
      </Route>

    </Routes>
  );
}

export default App;
