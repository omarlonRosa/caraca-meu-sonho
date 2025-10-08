import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { type Reserva, fetchMinhasReservas } from '../services/api';
import { PacoteViagemCard } from '../components/PacoteViagemCard';

export function DashboardPage() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMinhasReservas()
      .then(data => setReservas(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const proximasViagens = reservas.filter(r =>
    r.pacoteViagem && 
    new Date(r.pacoteViagem.dataPartida) >= new Date() &&
    (r.status === 'CONFIRMADA' || r.status === 'PENDENTE')
  );

  const viagensRealizadas = reservas.filter(r =>
    r.pacoteViagem && 
    new Date(r.pacoteViagem.dataPartida) < new Date() &&
    (r.status === 'CONFIRMADA' || r.status === 'REALIZADA')
  );

  if (loading) return <div className="p-8">A carregar as suas viagens...</div>;

  return (
    <div className="container mx-auto py-12 px-8">
      <h1 className="text-4xl font-heading font-bold">Meu Painel</h1>
      {user && <p className="mt-2 text-lg text-brand-gray">Bem-vindo de volta, {user.sub}!</p>}

      <div className="mt-12">
        <h2 className="text-3xl font-heading font-bold mb-6">Próximas Viagens</h2>
        {proximasViagens.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proximasViagens.map(reserva => (
              <PacoteViagemCard key={reserva.id} pacote={reserva.pacoteViagem} />
            ))}
          </div>
        ) : (
          <p className="text-brand-gray">Você ainda não tem nenhuma viagem futura agendada.</p>
        )}
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-heading font-bold mb-6">Histórico de Viagens</h2>
        {viagensRealizadas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {viagensRealizadas.map(reserva => (
              <PacoteViagemCard key={reserva.id} pacote={reserva.pacoteViagem} showGalleryButton={true} />
            ))}
          </div>
        ) : (
          <p className="text-brand-gray">Nenhuma viagem realizada ainda.</p>
        )}
      </div>
    </div>
  );
}
