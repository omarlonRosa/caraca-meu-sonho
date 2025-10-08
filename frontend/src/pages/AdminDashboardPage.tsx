import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type PacoteViagem, fetchAdminPacotes, fetchDashboardMetrics, type DashboardMetrics, deletePacoteViagem } from '../services/api';
import { MetricCard } from '../components/admin/MetricCard';
import { FaBoxOpen, FaUsers, FaPlaneDeparture, FaUserShield, FaClipboardList } from 'react-icons/fa';

export function AdminDashboardPage() {
	const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
	const [pacotes, setPacotes] = useState<PacoteViagem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const carregarDadosDoDashboard = async () => {
			try {
				const [metricsData, pacotesData] = await Promise.all([
					fetchDashboardMetrics(),
					fetchAdminPacotes()
				]);
				setMetrics(metricsData);
				setPacotes(pacotesData);
			} catch (err) {
				setError('Você não tem permissão para ver esta página ou ocorreu um erro.');
			} finally {
				setLoading(false);
			}
		};
		carregarDadosDoDashboard();
	}, []);


	const handleDelete = async (id: number) => {
		if (!window.confirm('Tem certeza de que deseja excluir este pacote? Esta ação não pode ser desfeita.')) {
			return;
		}
		try {
			await deletePacoteViagem(id);
			setPacotes(pacotes.filter(p => p.id !== id));
		} catch (err) {
			console.error('Falha ao excluir o pacote:', err);
			alert('Não foi possível excluir o pacote. Tente novamente.');
		}
	};



	if (loading) return <div className="p-8 text-center">Carregando dados do dashboard...</div>;
	if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

	return (
		<div className="container mx-auto py-12 px-8">
			<h1 className="text-4xl font-heading font-bold text-brand-dark dark:text-brand-light mb-8">
				Dashboard
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
				{metrics && (
					<>
						<MetricCard title="Total de Pacotes" value={metrics.totalPacotes} icon={<FaBoxOpen size={24} />} />
						<MetricCard title="Total de Usuários" value={metrics.totalUsuarios} icon={<FaUsers size={24} />} />
						<MetricCard 
							title="Próxima Viagem"
							value={ metrics.proximaViagemData ? (
								<>
									{metrics.proximaViagemTitulo}
									<span className="block text-sm font-normal text-brand-gray">
										{new Date(metrics.proximaViagemData).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
									</span>
								</>
							) : ("N/A")
							}
							icon={<FaPlaneDeparture size={24} />}
						/>


						<Link to="/admin/users">
							<MetricCard 
								title="Gerenciar Usuários" 
								value="Ver Lista" 
								icon={<FaUserShield size={24} />} 
								isAction={true} 
							/>
						</Link>


						<Link to="/admin/reservas">
							<MetricCard 
								title="Gerenciar Reservas" 
								value="Ver Lista" 
								icon={<FaClipboardList size={24} />} 
								isAction={true}
							/>
						</Link>



					</>
				)}
			</div>

			<div className="flex justify-between items-center mb-8">
				<h2 className="text-3xl font-heading font-bold text-brand-dark dark:text-brand-light">
					Gerenciar Pacotes de Viagem
				</h2>
				<div className="flex gap-4">
					<Link to="/admin/hero" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
						Editar Hero
					</Link>
					<Link to="/admin/pacotes/novo" className="bg-brand-primary hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg">
						+ Adicionar Novo
					</Link>
				</div>
			</div>
			<div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-x-auto">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-300">
						<tr>
							<th scope="col" className="px-6 py-3">Foto</th>			
							<th scope="col" className="px-6 py-3">ID</th>
							<th scope="col" className="px-6 py-3">Título</th>
							<th scope="col" className="px-6 py-3">Data</th>
							<th scope="col" className="px-6 py-3">Destaque?</th>
							<th scope="col" className="px-6 py-3">Ações</th>
						</tr>
					</thead>
					<tbody>
						{pacotes.map((pacote) => (
							<tr key={pacote.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600">
								<td className="px-6 py-4">
									<img 
										src={pacote.urlFotoPrincipal} 
										alt={pacote.titulo} 
										className="h-12 w-12 rounded-md object-cover" // Estilos para a miniatura
									/>
								</td>
								<td className="px-6 py-4">{pacote.id}</td>
								<td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{pacote.titulo}</td>
								<td className="px-6 py-4">{new Date(pacote.dataPartida).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
								<td className="px-6 py-4">{pacote.featured ? 'Sim' : 'Não'}</td>
								<td className="px-6 py-4">
									<Link to={`/admin/pacotes/editar/${pacote.id}`} className="font-medium text-brand-primary hover:underline mr-4">Editar</Link>
									<Link to={`/admin/pacotes/${pacote.id}/galeria`} className="font-medium text-green-500 hover:underline mr-4">Galeria</Link>
									<button onClick={() => handleDelete(pacote.id)} className="font-medium text-red-500 hover:underline">Excluir</button>


								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
