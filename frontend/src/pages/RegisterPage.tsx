import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; 
import { PasswordStrengthIndicator } from '../components/PasswordStrengthIndicator';

export function RegisterPage() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); 
        if (value.length > 11) value = value.slice(0, 11); 

        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        setCpf(value);
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await registerUser({ nome, email, senha, roles: 'ROLE_USER', cpf: cpf.replace(/\D/g, "")
            });
            navigate('/login');
        } catch (err) {
            setError('Falha ao registrar. O email já pode estar em uso.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-light dark:bg-brand-dark">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-heading font-bold text-brand-dark dark:text-brand-light">Crie sua Conta</h1>
                    <p className="mt-2 text-brand-gray">E comece a sonhar com sua próxima aventura.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="sr-only">Nome</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            placeholder="Seu nome completo"
                        />
                    </div>
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email</label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            placeholder="Seu melhor email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="cpf">
                            CPF
                        </label>
                        <input
                            id="cpf"
                            type="text"
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={handleCpfChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-700 dark:text-white dark:border-slate-600"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Senha</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            placeholder="Crie uma senha"
                        />
                        {senha && <PasswordStrengthIndicator password={senha} />}
                    </div>
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-brand-primary hover:bg-teal-600 text-white font-bold rounded-md transition-colors"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-brand-gray">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="font-medium text-brand-primary hover:underline">
                        Faça login
                    </Link>
                </p>
            </div>
        </div>
    );
}
