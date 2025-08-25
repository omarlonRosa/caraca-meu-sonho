import { useEffect, useState } from "react";
import type { PacoteViagem } from "../types/PacoteViagem";
import api from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface PacoteViagemListProps {
  isAdmin?: boolean;
}

export function PacoteViagemList({isAdmin = false}: PacoteViagemListProps) {

  const[pacotes, setPacotes] = useState<PacoteViagem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPacotes(){
      try {
        const response = await api.get('/pacotes');
        setPacotes(response.data);
      } catch (error) {
        console.error("Erro ao buscar pacotes:", error);
      }finally {
        setLoading(false);
      }
    }
    fetchPacotes();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };


  async function handleDelete(pacoteId: number) {
    if (!window.confirm("Tem certeza que deseja excluir este pacote? A ação não pode ser desfeita.")){
      return;
    }

    try{
      await api.delete(`/pacotes/${pacoteId}`, {
        auth: { username: 'admin', password: 'senha123'}
      });
      setPacotes(pacotesAtuais => pacotesAtuais.filter(pacote => pacote.id !== pacoteId));

      toast.success("Pacote excluído com sucesso!");
    }catch (error) {
      console.error("Erro ao excluir pacote:", error);
      toast.error("Falha ao excluir o pacote.");
    }
  }


  if (loading) {
    return <p className="text-brand-ligth text-center">Carregamento viagens...</p>;
  }

  return (
    <div className="">
      <h2 className="text-3xl text-center text-brand-gray font-heading font-bold mb-8">{isAdmin ? 'Gerenciar Experiências' : 'Próximas Experiências'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto font-body">
        {pacotes.map((pacote) => (

        <div key={pacote.id} className="bg-brand-dark rounded-lg shadow-lg overflow-hidden flex flex-col group transition-transform duration-300 hover:scale-105">
  <Link to={`/viagem/${pacote.id}`} className="flex flex-col flex-grow">
    <div className="overflow-hidden">      
    <img 
        src={pacote.urlFotoPrincipal} 
        alt={`Foto de ${pacote.destino}`} 
        className="w-full h-56 object-cover transition-all duration-500 group-hover:scale-110" 
      />
    </div> 
              <div className="p-6 flex flex-col flex-grow">
                {/* Título e Destino */}
                <h3 className="text-2xl font-semibold text-brand-light mb-2 font-heading">{pacote.titulo}</h3>
                <div className="flex items-center text-brand-gray mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>

                  <span>{pacote.destino}</span>
                </div>

                {/* Preço e Duração */}

                <div className="flex-grow"></div>
                <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-4">
                  <p className="text-xl font-bold text-brand-secondary">{formatPrice(pacote.preco)}</p>
                  <p className="text-sm text-brand-ligth bg-gray-700 px-3 py-1 rounded-full">{pacote.duracaoDias} dias</p>
                </div>
              </div>
            </Link>
            {isAdmin && (
              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end gap-3">
                <Link to={`/admin/pacotes/editar/${pacote.id}`}
                  className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Editar
                </Link>
                <button onClick={() => handleDelete(pacote.id)} className="px-4 py-2 text-sm font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Excluir
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
