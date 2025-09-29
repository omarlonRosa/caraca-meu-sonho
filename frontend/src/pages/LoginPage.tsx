import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLoginButton } from '../components/GoogleLoginButton';
import { loginUser } from '../services/api';


export function LoginPage() {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [error, setError] = useState<string | null>(null);

	const { login } = useAuth(); 
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		try {
			const response = await loginUser({ email, senha });

			login(response.token);
			navigate('/');
		} catch (err) {
			setError('Email ou senha inválidos.');
		}
	};

	const handleGoogleLoginSuccess = (token: string) => {
		login(token);
		navigate('/');
	};


	return (
		<div className="flex items-center justify-center min-h-screen bg-brand-light dark:bg-brand-dark">
			<div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
				<div className="text-center">
					<h1 className="text-3xl font-heading font-bold text-brand-dark dark:text-brand-light">Acesse sua Conta</h1>
					<p className="mt-2 text-brand-gray">E continue sua jornada.</p>
				</div>
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email-address" className="sr-only">Email</label>
						<input
							id="email-address"
							name="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
							placeholder="Seu email"
						/>
					</div>
					<div>
						<label htmlFor="password" className="sr-only">Senha</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							value={senha}
							onChange={(e) => setSenha(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
							placeholder="Sua senha"
						/>
					</div>

					<div className="flex items-center justify-end">
						<div className="text-sm">
							<Link to="/forgot-password" className="font-medium text-brand-primary hover:underline">
								Esqueceu sua senha?
							</Link>
						</div>
					</div>

					{error && <p className="text-sm text-red-500 text-center">{error}</p>}

					<div>
						<button
							type="submit"
							className="w-full py-3 px-4 bg-brand-primary hover:bg-teal-600 text-white font-bold rounded-md transition-colors"
						>
							Entrar
						</button>
					</div>

				</form>


				<div className="relative my-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300 dark:border-slate-600" />
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-2 bg-white dark:bg-slate-800 text-brand-gray">OU</span>
					</div>
				</div>

				<div>
					<GoogleLoginButton onSuccess={handleGoogleLoginSuccess} />
				</div>


				<p className="text-sm text-center text-brand-gray">
					Não tem uma conta?{' '}
					<Link to="/register" className="font-medium text-brand-primary hover:underline">
						Crie uma agora
					</Link>        
				</p>
			</div>
		</div>
	);
}
