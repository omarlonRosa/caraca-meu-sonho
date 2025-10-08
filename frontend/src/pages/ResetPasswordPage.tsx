import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [token, setToken] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      setError("Token de redefinição não encontrado na URL.");
    }
    setToken(tokenFromUrl);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError(null);
    setMessage(null);
    setLoading(true);
    
    try {
      const responseMessage = await resetPassword({ token, newPassword, confirmPassword });
      setMessage(responseMessage + " Você será redirecionado para o login.");
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.message || "Erro ao redefinir a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-light dark:bg-brand-dark">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold">Crie sua Nova Senha</h1>
        </div>
        
        {message ? (
          <p className="text-center text-green-500">{message}</p>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="new-password">Nova Senha</label>
              <input
                id="new-password"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Pelo menos 6 caracteres"
              />
              {newPassword && <PasswordStrengthIndicator password={newPassword} />}
            </div>
            <div>
              <label htmlFor="confirm-password">Confirme a Nova Senha</label>
              <input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Repita a senha"
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={loading || !token}
                className="w-full py-3 bg-brand-primary text-white font-bold rounded-md disabled:bg-gray-400"
              >
                {loading ? 'Salvando...' : 'Redefinir Senha'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
