import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

interface FotoViagem {
  id: number;
  titulo: string;
  url: string;
  dataUpload: string;
}

export function ReservaFotosPage() {
  const { reservaId } = useParams<{ reservaId: string }>();
  const [fotos, setFotos] = useState<FotoViagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFotos() {
      try {
        const response = await api.get(`/cliente/reservas/${reservaId}/fotos`);
        setFotos(response.data);
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
        toast.error("Falha ao carregar as fotos.");
      } finally {
        setLoading(false);
      }
    }
    fetchFotos();
  }, [reservaId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-dark">
        <p className="text-brand-light">Carregando fotos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark font-body text-brand-light p-8">
      <h1 className="text-4xl font-bold font-heading mb-8">
        Fotos da Reserva #{reservaId}
      </h1>
      <div className="max-w-6xl mx-auto">
        <Link to="/cliente/dashboard" className="mb-4 inline-block text-brand-gray hover:underline">
          &larr; Voltar para o Dashboard
        </Link>
        {fotos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fotos.map((foto) => (
              <div key={foto.id} className="bg-stone-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src={foto.url}
                  alt={foto.titulo}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{foto.titulo}</h2>
                  <p className="text-sm text-brand-gray">
                    Enviada em: {new Date(foto.dataUpload).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-brand-gray">Nenhuma foto disponível para esta reserva.</p>
        )}
      </div>
    </div>
  );
}
