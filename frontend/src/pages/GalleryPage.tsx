import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGalleryForPackage, type FotoGaleria } from '../services/api';

export function GalleryPage() {
  const { pacoteId } = useParams<{ pacoteId: string }>();
  const [galeria, setGaleria] = useState<FotoGaleria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pacoteId) {
      fetchGalleryForPackage(Number(pacoteId))
        .then(data => setGaleria(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [pacoteId]);

  if (loading) return <p className="text-center py-20">Carregando galeria...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-12 px-8">
      <Link to="/dashboard" className="text-brand-primary hover:underline mb-8 block">&larr; Voltar para Meu Painel</Link>
      <h1 className="text-4xl font-heading font-bold mb-8">Galeria de Fotos</h1>
      
      {galeria.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galeria.map(foto => (
            <div key={foto.id} className="group relative rounded-lg overflow-hidden shadow-lg">
              <img 
                src={foto.imageUrl} 
                alt="Foto da viagem" 
                className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-brand-gray">Nenhuma foto encontrada para esta viagem.</p>
      )}
    </div>
  );
}
