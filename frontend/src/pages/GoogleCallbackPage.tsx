import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

export function GoogleCallbackPage() {
    const navigate = useNavigate();
    const { loginWithToken } = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                const roles = decodedToken.roles;
                
                loginWithToken(token);
                
                if (roles && roles.includes('ADMIN')) {
                    toast.success("Login de Administrador efetuado com sucesso!");
                    navigate('/admin/dashboard', { replace: true });
                } else {
                    toast.success("Login de Cliente efetuado com sucesso!");
                    navigate('/cliente/dashboard', { replace: true });
                }
            } catch (error) {
                console.error("Falha ao decodificar o token:", error);
                toast.error("Falha na autenticação. Tente novamente.");
                navigate('/login', { replace: true });
            }
        } else {
            navigate('/login', { replace: true });
        }
    }, [navigate, loginWithToken]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-brand-dark">
            <p className="text-brand-light">Autenticando...</p>
        </div>
    );
}
