import { useEffect, useState } from 'react';
import {type PacoteViagem, fetchPacotesViagem } from '../services/api';
import { PacoteViagemCard } from '../components/PacoteViagemCard';

export function DestinationsPage() {
  const [upcoming, setUpcoming] = useState<PacoteViagem[]>([]);
  const [past, setPast] = useState<PacoteViagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarPacotes = async () => {
      try {
        const data = await fetchPacotesViagem();
        setUpcoming(data.upcoming);
        setPast(data.past);
      } catch (err) {
        setError('Não foi possível carregar as viagens.');
      } finally {
        setLoading(false);
      }
    };
    carregarPacotes();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto py-24 px-8">
        {loading && <p className="text-center text-brand-gray">Carregando...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!loading && !error && (
          <>
            {/* Seção de Próximas Viagens */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-heading font-extrabold text-brand-dark dark:text-brand-light">Próximas Viagens</h1>
              <p className="text-lg text-brand-gray mt-4">Vagas abertas para as próximas expedições. Garanta a sua!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {upcoming.map((pacote) => <PacoteViagemCard key={pacote.id} pacote={pacote} />)}
            </div>

            {/* Seção de Portfólio (Viagens Realizadas) */}
            {past.length > 0 && (
              <>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-heading font-extrabold text-brand-dark dark:text-brand-light">Nosso Portfólio</h2>
                  <p className="text-lg text-brand-gray mt-4">Veja algumas das incríveis jornadas que já realizamos.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {past.map((pacote) => <PacoteViagemCard key={pacote.id} pacote={pacote} />)}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
