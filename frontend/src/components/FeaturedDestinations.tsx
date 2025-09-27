import { useEffect, useState } from 'react';
import { type PacoteViagem, fetchPacotesViagem } from '../services/api';
import { PacoteViagemCard } from './PacoteViagemCard';

export function FeaturedDestinations() {
  const [pacotes, setPacotes] = useState<PacoteViagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarPacotes = async () => {
      try {
        const data = await fetchPacotesViagem();
        setPacotes(data.upcoming.filter(p => p.featured));
      } catch (err) {
        setError('Não foi possível carregar as viagens. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
    carregarPacotes();
  }, []); 
  return (
    <div className="bg-white dark:bg-slate-900">
      <div className="container mx-auto p-8">
        <section id="destaques" className="my-16">
          <h2 className="text-4xl font-heading font-extrabold text-center mb-12 text-brand-dark dark:text-brand-light">
            Destinos em Destaque
          </h2>
          
          {loading && <p className="text-center text-brand-gray">Carregando destinos...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pacotes.map((pacote) => (
                <PacoteViagemCard key={pacote.id} pacote={pacote} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
