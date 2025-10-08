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
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { AdminHeroPage } from './pages/admin/AdminHeroPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { GalleryPage } from './pages/GalleryPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminEditUserPage } from './pages/admin/AdminEditUserPage';
import { AdminReservasPage } from './pages/admin/AdminReservasPage';

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
					<Route path="/pagamento-sucesso" element={<PaymentSuccessPage />} />
					<Route path="/minhas-viagens/:pacoteId/galeria" element={<GalleryPage />} />


				</Route>

				<Route element={<AdminProtectedRoute />}>
					<Route path="/admin" element={<AdminDashboardPage />} />
					<Route path="/admin/pacotes/novo" element={<NewPackagePage />} />
					<Route path="/admin/pacotes/editar/:id" element={<EditPackagePage />} />
					<Route path="/admin/hero" element={<AdminHeroPage />} />
					<Route path="/admin/pacotes/:pacoteId/galeria" element={<AdminGalleryPage />} />
					<Route path="/admin/users" element={<AdminUsersPage />} />
					<Route path="/admin/users/editar/:userId" element={<AdminEditUserPage />} />
					<Route path="/admin/reservas" element={<AdminReservasPage />} />
				</Route>
			</Route>
		</Routes>
	);
}
export default App;
