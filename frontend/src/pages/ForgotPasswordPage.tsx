import React, { useState } from "react"
import { forgotPassword } from "../services/api";
import { Link } from "react-router-dom";

export function ForgotPasswordPage() {

	const [email, setEmail] = useState('');
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		console.log("A função handleSubmit foi chamada!");
		e.preventDefault();
		setError(null);
		setMessage(null);
		setLoading(true);
		try {
			 console.log("Tentando chamar a API com o email:", email);
			const responseMessage = await forgotPassword(email);
			setMessage(responseMessage);
		} catch (err) {
			 console.error("ERRO CAPTURADO:", err);
			setError('Ocorreu um erro. Tente novamente.');
		}finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-brand-light dark:bg-brand-dark">
			<div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
				<div className="text-center">
					<h1 className="text-3xl font-heading font-bold text-brand-dark dark:text-brand-light">Recuperar Senha</h1>
					<p className="mt-2 text-brand-gray">Insira seu e-mail para receber o link de redefinição.</p>
				</div>
				{message ? (
					<p className="text-center text-green-500">{message}</p>
				) : (
					<form className="space-y-6" onSubmit={handleSubmit} >
							<div>
								<label htmlFor="email-address" className="sr-only">Email</label>
								<input 
									id="email-address"
									name="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-4 border border-gray-300 rounded-md dark:border-slate-600 focus:ring-2 focus:ring-brand-primary"
									placeholder="Seu email de cadastro"
								/>
							</div>
							{error && <p className="text-sm text-red-500 text-center">{error}</p>}
							<div>
								<button
									type="submit"
									disabled={loading}
									className="w-full py-3 px-4 bg-brand-primary hover:bg-teal-600 text-white font-bold rounded-md transition-colors disabled:bg-gray-400"
								>
									{loading ? 'Enviando...' : 'Enviar Link'}
								</button>
							</div>
						</form>
				)}
				<p className="text-sm text-center text-brand-gray">
					Lembrou a Senha?{''}
					<Link to="/login" className="font-medium text-brand-primary hover:underline">
						Faça login
					</Link>
				</p>
			</div>
		</div>
	);
}


