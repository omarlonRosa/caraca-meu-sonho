
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

            <Route path="/viagem/:pacoteId" element={<TripDetailPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/pacotes/novo" element={<CreatePackagePage/>}/>
          <Route path="/admin/dashboard" element={< AdminDashboardPage />} />
          <Route path="/admin/pacotes/editar/:pacoteId" element={<EditPackagePage />}/>
       
        </Routes>
      </BrowserRouter>
  </div>
  </AuthProvider>
  );
}

export default App
