import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export const AdminLoginPage = () => {
 
const [username, setUsername] = useState('admin');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const {login} = useAuth();


async function handleSubmit(event: FormEvent){
event.preventDefault();

const loginPromise = login({username, password});

toast.promise(loginPromise, {
loading: 'Auntenticando...',
success: () => {
navigate('/admin/dashboard');
return 'Login efetuado com sucesso!';
},
error: 'Usuário ou senha inválidos.',
});
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-dark">
    <div className="w-full max-w-md p-8 bg-stone-800 rounded-lg shadow-lg">
    <h1 className="text-3xl font-bold text-brand-light font-heading">
    Acesso Admin
    </h1>

    <form onSubmit={handleSubmit} className="space-y-6">
    <div>
    <label htmlFor="username" className="block text-sm font-medium text-brand-gray"> Usuário </label>
    <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)}
    className="mt-1 block w-full rounded-md bg-slate-700 border-transparent text-brand-light focus:border-brand-primary focus:ring-brand-primary" required/>
    </div>
    <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-gray">Senha</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-slate-700 border-transparent text-brand-light focus:border-brand-primary focus:ring-brand-primary" required />
          </div>
          <button type="submit"
            className="w-full px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-teal-600 transition-colors duration-300">
            Entrar
          </button>
    </form>
    </div>
    </div>
  );
}

