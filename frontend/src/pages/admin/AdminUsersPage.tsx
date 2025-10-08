import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminUsers, deleteAdminUser, type UserAdminView } from '../../services/api';
import { FaEdit, FaPlus, FaTrash, FaUserShield } from 'react-icons/fa';

export function AdminUsersPage() {
	const [users, setUsers] = useState<UserAdminView[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchAdminUsers()
			.then(data => setUsers(data))
			.catch(() => setError('Não foi possível carregar a lista de usuários.'))
			.finally(() => setLoading(false));
	}, []);

	const handleDelete = async (userId: number, userName: string) => {
		if (!window.confirm(`Tem certeza de que deseja excluir o usuário "${userName}"?`)) {
			return;
		}
		try {
			await deleteAdminUser(userId);
			setUsers(users.filter(user => user.id !== userId));
			alert('Usuário excluído com sucesso!');
		} catch (err) {
			console.error(err);
			setError('Falha ao excluir o usuário.');
		}
	};

	if (loading) return <p className="text-center py-20">Carregando usuários...</p>;
	if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

	return (
		<div className="container mx-auto py-12 px-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-4xl font-heading font-bold">Gerenciar Usuários</h1>
				<Link to="/admin" className="text-brand-primary hover:underline">&larr; Voltar para o Dashboard</Link>

				<div className="flex items-center gap-4">
					<Link to="/register" target="_blank" className="bg-brand-primary hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
						<FaPlus />
						Adicionar Usuário
					</Link>
					<Link to="/admin" className="text-brand-primary hover:underline">&larr; Voltar</Link>
				</div>


			</div>

			<div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-300">
						<tr>
							<th scope="col" className="px-6 py-3">ID</th>
							<th scope="col" className="px-6 py-3">Nome</th>
							<th scope="col" className="px-6 py-3">Email</th>
							<th scope="col" className="px-6 py-3">Funções (Roles)</th>
							<th scope="col" className="px-6 py-3">Ações</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600">
								<td className="px-6 py-4 font-bold">{user.id}</td>
								<td className="px-6 py-4 flex items-center gap-3">
									{user.fotoPerfilUrl ? (
										<img src={user.fotoPerfilUrl} alt={user.nome} className="h-10 w-10 rounded-full object-cover" />
									) : (
											<FaUserShield className="h-10 w-10 text-gray-400 p-2 bg-gray-100 dark:bg-slate-700 rounded-full" />
										)}
									<span className="font-medium text-gray-900 dark:text-white">{user.nome}</span>
								</td>
								<td className="px-6 py-4">{user.email}</td>
								<td className="px-6 py-4">
									<span className={`px-2 py-1 rounded-full text-xs font-semibold ${
user.roles.includes('ROLE_ADMIN') 
? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
}`}>
										{user.roles}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<Link to={`/admin/users/editar/${user.id}`} className="p-2 text-brand-primary hover:text-teal-600">
										<FaEdit />
									</Link>
									<button onClick={() => handleDelete(user.id, user.nome)} className="p-2 text-red-500 hover:text-red-700">
										<FaTrash />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
