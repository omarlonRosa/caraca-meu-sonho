import { Link, useNavigate } from 'react-router-dom';
import { type PacoteViagem, createPendingReserva } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface CardProps {
  pacote: PacoteViagem;
	showGalleryButton?: boolean;
}

export function PacoteViagemCard({ pacote, showGalleryButton = false  }: CardProps) {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const dataFormatada = new Date(pacote.dataPartida).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    month: 'long',
    year: 'numeric',
  });

  const handleReserveClick = async (e: React.MouseEvent) => {
		e.stopPropagation();
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const novaReserva = await createPendingReserva(pacote.id);
      navigate('/checkout', { state: { pacote, reservaId: novaReserva.id } });
    } catch (error) {
      console.error("Erro ao iniciar reserva:", error);
      alert("Não foi possível iniciar o processo de reserva. Por favor, tente novamente.");
    }
  };

	return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <Link to={`/destinos/${pacote.id}`} className="block group">
        <img className="w-full h-56 object-cover" src={pacote.urlFotoPrincipal} alt={`Foto do destino ${pacote.destino}`} />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-heading font-bold text-brand-dark dark:text-brand-light mb-2">{pacote.titulo}</h3>
        <p className="text-gray-600 dark:text-brand-gray mb-4 flex-grow">{dataFormatada}</p>
        
        {showGalleryButton ? (
          <Link to={`/minhas-viagens/${pacote.id}/galeria`} className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Ver Galeria
          </Link>
        ) : (
          <button onClick={handleReserveClick} className="w-full block text-center bg-brand-primary hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Reservar Agora
          </button>
        )}
      </div>
    </div>
  );
}

