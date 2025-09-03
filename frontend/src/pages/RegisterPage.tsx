import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post('/register', {
        nome,
        email,
        senha
      });

      toast.success("Cadastro realizado com sucesso! Faça login para continuar.");
      navigate('/login'); // Redireciona para a página de login
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      if (error.response && error.response.status === 400) {
        toast.error("Este e-mail já está em uso.");
      } else {
        toast.error("Falha ao se cadastrar. Tente novamente.");
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-dark">
      <div className="w-full max-w-md p-8 bg-stone-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-brand-light font-heading">
          Crie sua Conta
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-brand-gray">Nome</label>
            <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)}
              className="mt-1 block w-full rounded-md bg-slate-700 border-transparent text-brand-light focus:border-brand-primary focus:ring-brand-primary" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-gray">E-mail</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-slate-700 border-transparent text-brand-light focus:border-brand-primary focus:ring-brand-primary" required />
          </div>
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-brand-gray">Senha</label>
            <input type="password" id="senha" value={senha} onChange={e => setSenha(e.target.value)}
              className="mt-1 block w-full rounded-md bg-slate-700 border-transparent text-brand-light focus:border-brand-primary focus:ring-brand-primary" required />
          </div>
          <button type="submit"
            className="w-full px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-teal-600 transition-colors duration-300">
            Cadastrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-brand-gray">
          Já tem uma conta? <Link to="/login" className="text-brand-primary hover:underline">Faça login</Link>
        </p>
      </div>
    </div>
  );
}
