import { useNavigate } from 'react-router-dom';
import { type PacoteViagem, createPendingReserva } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface CardProps {
  pacote: PacoteViagem;
}

export function PacoteViagemCard({ pacote }: CardProps) {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const dataFormatada = new Date(pacote.dataPartida).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    month: 'long',
    year: 'numeric',
  });

  const handleReserveClick = async () => {
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
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img className="w-full h-56 object-cover" src={pacote.urlFotoPrincipal} alt={`Foto do destino ${pacote.destino}`} />
      <div className="p-6">
        <h3 className="text-2xl font-heading font-bold text-brand-dark dark:text-brand-light mb-2">{pacote.titulo}</h3>
        <p className="text-gray-600 dark:text-brand-gray mb-4">{dataFormatada}</p>
        <button onClick={handleReserveClick} className="w-full block text-center bg-brand-primary hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
          Reservar Agora
        </button>
      </div>
    </div>
  );
}
