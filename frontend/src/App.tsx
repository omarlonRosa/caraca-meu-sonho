
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import { CreatePackagePage } from './pages/CreatePackagePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { EditPackagePage } from "./pages/EditPackagePage";
import { AuthProvider } from './contexts/AuthContext';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { TripDetailPage } from "./pages/TripDetailPage";
import { SuccessPage } from './pages/SuccessPage';
import { CancelPage } from './pages/CancelPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ClienteDashboardPage } from './pages/ClienteDashboardPage';
import { ReservaDocumentosPage } from './pages/ReservaDocumentosPage';
import { ReservaFotosPage } from './pages/ReservaFotosPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { GoogleCallbackPage } from './pages/GoogleCallbackPage';

function App() {

  return (
    <AuthProvider>
  <div >
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: 'font-body',
          style: {
            background: '#334155',
            color: '#F1F5F9',
            border: '1px solid #334155',
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: '#0D9488',
              secondary: '#F1F5F9',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#F97316',
              secondary: '#F1F5F9',
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
            <Route path="/viagem/:pacoteId" element={<TripDetailPage />} />

            <Route path="/reserva/sucesso" element={<SuccessPage />} />
          <Route path="/reserva/cancelada" element={<CancelPage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth2/callback" element={<GoogleCallbackPage />} />

          <Route path="/admin/pacotes/novo" element={<ProtectedRoute><CreatePackagePage/></ProtectedRoute>}/>
          <Route path="/admin/dashboard" element={<ProtectedRoute>< AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/pacotes/editar/:pacoteId" element={<ProtectedRoute><EditPackagePage /></ProtectedRoute>}/>

            <Route path="/cliente/dashboard" element={<ProtectedRoute><ClienteDashboardPage /></ProtectedRoute>} />
            <Route path="/cliente/reservas/:reservaId/documentos" element={<ProtectedRoute><ReservaDocumentosPage /></ProtectedRoute>} />
            <Route path="/cliente/reservas/:reservaId/fotos" element={<ProtectedRoute><ReservaFotosPage /></ProtectedRoute>} />
       
        </Routes>
      </BrowserRouter>
  </div>
  </AuthProvider>
  );
}

export default App
