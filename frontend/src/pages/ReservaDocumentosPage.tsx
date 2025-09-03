import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

interface DocumentoViagem {
  id: number;
  titulo: string;
  url: string;
  dataUpload: string;
}

export function ReservaDocumentosPage() {
  const { reservaId } = useParams<{ reservaId: string }>();
  const [documentos, setDocumentos] = useState<DocumentoViagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocumentos() {
      try {
        const response = await api.get(`/cliente/reservas/${reservaId}/documentos`);
        setDocumentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
        toast.error("Falha ao carregar documentos.");
      } finally {
        setLoading(false);
      }
    }
    fetchDocumentos();
  }, [reservaId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-dark">
        <p className="text-brand-light">Carregando documentos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark font-body text-brand-light p-8">
      <h1 className="text-4xl font-bold font-heading mb-8">
        Documentos da Reserva #{reservaId}
      </h1>
      <div className="max-w-4xl mx-auto">
        <Link to="/cliente/dashboard" className="mb-4 inline-block text-brand-gray hover:underline">
          &larr; Voltar para o Dashboard
        </Link>
        {documentos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentos.map((doc) => (
              <div key={doc.id} className="bg-stone-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-2">{doc.titulo}</h2>
                <p className="text-sm text-brand-gray mb-4">
                  Enviado em: {new Date(doc.dataUpload).toLocaleDateString()}
                </p>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Abrir Documento
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-brand-gray">Nenhum documento disponível para esta reserva.</p>
        )}
      </div>
    </div>
  );
}
