import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchAdminUserById, updateAdminUser, type UserAdminUpdateData, type UserAdminView } from '../../services/api';

export function AdminEditUserPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserAdminView | null>(null);
  const [formData, setFormData] = useState<UserAdminUpdateData>({ nome: '', email: '', roles: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchAdminUserById(userId)
        .then(data => {
          setUser(data);
          setFormData({
            nome: data.nome,
            email: data.email,
            roles: data.roles
          });
        })
        .catch(() => setError('Não foi possível carregar os dados do usuário.'))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    setError(null);
    try {
      await updateAdminUser(userId, formData);
      alert('Usuário atualizado com sucesso!');
      navigate('/admin/users');
    } catch (err) {
      console.error(err);
      setError('Falha ao atualizar o usuário. Verifique os dados e tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center py-20">Carregando usuário...</p>;
  if (error && !user) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!user) return <p className="text-center py-20">Usuário não encontrado.</p>;

  return (
    <div className="container mx-auto py-12 px-8 max-w-2xl">
      <Link to="/admin/users" className="text-brand-primary hover:underline mb-4 block">&larr; Voltar para a lista</Link>
      <h1 className="text-4xl font-heading font-bold mb-8">Editar Usuário: {user.nome}</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium mb-1">Nome</label>
          <input 
            type="text" 
            name="nome" 
            id="nome" 
            value={formData.nome} 
            onChange={handleChange} 
            required 
            className="w-full input-style"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="w-full input-style"
          />
        </div>
        
        <div>
          <label htmlFor="roles" className="block text-sm font-medium mb-1">
            Funções (Roles)
            <span className="text-xs text-gray-500"> (ex: ROLE_USER,ROLE_ADMIN)</span>
          </label>
          <input 
            type="text" 
            name="roles" 
            id="roles" 
            value={formData.roles} 
            onChange={handleChange} 
            required 
            className="w-full input-style"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        
        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="bg-brand-primary text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400">
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}
