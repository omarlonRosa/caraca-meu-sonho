import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPublicPacoteById, createPendingReserva, joinWaitingList, type PacoteViagem } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { FaCalendarAlt, FaClock, FaUsers, FaTag, FaListAlt } from 'react-icons/fa';

export function PackageDetailPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { token, isAuthenticated } = useAuth(); 

	const [pacote, setPacote] = useState<PacoteViagem | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [isJoiningWaitingList, setIsJoiningWaitingList] = useState(false);
	const [isInWaitingList, setIsInWaitingList] = useState(false); 
	const [waitingListError, setWaitingListError] = useState<string | null>(null);


	useEffect(() => {
		if (id) {
			fetchPublicPacoteById(id)
				.then(data => setPacote(data))
				.catch(() => setError('Não foi possível carregar os detalhes do pacote.'))
				.finally(() => setLoading(false));
		}
	}, [id]);

	const handleReserveClick = async () => {
		if (!token) {
			navigate('/login');
			return;
		}
		if (!pacote) return;
		try {
			const novaReserva = await createPendingReserva(pacote.id);
			navigate('/checkout', { state: { pacote, reservaId: novaReserva.id } });
		} catch (error) {
			console.error("Erro ao iniciar reserva:", error);
			alert("Não foi possível iniciar o processo de reserva.");
		}
	};

	const handleWaitingListClick = async () => {
		if (!isAuthenticated) {
			navigate('/login');
			return;
		}
		if (!pacote) return;

		setIsJoiningWaitingList(true);
		setWaitingListError(null);
		try {
			await joinWaitingList(pacote.id);
			setIsInWaitingList(true);
		} catch (error: any) {
			console.error("Erro ao entrar na lista de espera:", error);
			setWaitingListError(error.message || "Ocorreu um erro. Tente novamente.");
		} finally {
			setIsJoiningWaitingList(false);
		}
	};


	if (loading) return <p className="text-center py-20">Carregando pacote...</p>;
	if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
	if (!pacote) return null;

	const dataFormatada = new Date(pacote.dataPartida).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
	const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pacote.preco);

	const isPacotePassado = new Date(pacote.dataPartida) < new Date();
	const shouldShowWaitingList = isPacotePassado || pacote.vagasDisponiveis === 0;


	const renderActionButton = () => {
    if (isPacotePassado) {
        return (
            <div className="w-full bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400 font-bold text-lg text-center py-4 px-6 rounded-lg">
                Viagem já realizada
            </div>
        );
    }

    if (!hasVagas) {
        if (isInWaitingList) {
            return (
                <div className="w-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 font-bold text-lg text-center py-4 px-6 rounded-lg flex items-center justify-center gap-2">
                    <FaListAlt /> Você está na Lista!
                </div>
            );
        }
        return (
            <>
                <button
                    onClick={handleWaitingListClick}
                    disabled={isJoiningWaitingList}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-6 rounded-lg shadow-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isJoiningWaitingList ? 'A processar...' : 'Entrar na Lista de Espera'}
                </button>
                {waitingListError && <p className="text-red-500 text-center mt-2">{waitingListError}</p>}
            </>
        );
    }

    return (
        <button onClick={handleReserveClick} className="w-full bg-brand-primary hover:bg-teal-600 text-white font-bold text-lg py-4 px-6 rounded-lg shadow-md transition-colors">
            Reservar Agora
        </button>
    );
};

	return (
		<div className="container mx-auto py-12 px-8">
			<div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
				<div className="lg:col-span-3">
					<img src={pacote.urlFotoPrincipal} alt={pacote.titulo} className="w-full h-auto object-cover rounded-lg shadow-lg" />
				</div>

				<div className="lg:col-span-2">
					<h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">{pacote.titulo}</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{pacote.destino}</p>

					<div className="space-y-6 border-t border-b border-gray-200 dark:border-slate-700 py-8 mb-8">
						<div className="flex items-center gap-4 text-lg">
							<FaCalendarAlt className="text-brand-primary" size={20} />
							<span>{dataFormatada}</span>
						</div>
						<div className="flex items-center gap-4 text-lg">
							<FaClock className="text-brand-primary" size={20} />
							<span>{pacote.duracaoDias} dias</span>
						</div>
						<div className="flex items-center gap-4 text-lg">
							<FaUsers className="text-brand-primary" size={20} />
							<span>{pacote.vagasDisponiveis > 0 ? `${pacote.vagasDisponiveis} vagas restantes` : 'Vagas esgotadas'}</span>
						</div>
						<div className="flex items-center gap-4 text-lg">
							<FaTag className="text-brand-primary" size={20} />
							<span className="font-bold">{precoFormatado}</span>
						</div>
					</div>

					<p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
						{pacote.descricao}
					</p>

					{renderActionButton()}

				</div>
			</div>
		</div>
	);
}
