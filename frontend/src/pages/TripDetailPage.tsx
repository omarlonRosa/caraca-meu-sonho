import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { PacoteViagem } from "../types/PacoteViagem";
import api from "../services/api";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export function TripDetailPage() {

  const {pacoteId} = useParams();
  const [pacote, setPacote] = useState<PacoteViagem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);


  useEffect(() => {
    if (pacoteId) {
      api.get<PacoteViagem>(`/pacotes/${pacoteId}`)
        .then(response => {
          setPacote(response.data);
        })
      .catch(error => {
          console.error("Erro ao buscar detalhes do pacote:", error);
          setPacote(null);
        })
      .finally(() => {
          setLoading(false);
        });
    }
  }, [pacoteId]);


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price);
  };


  async function handleCheckout() {
    if (!pacote) return;

    setIsRedirecting(true);
    const toastId = toast.loading("Preparando seu checkout...");

    try {
      
      const response = await api.post('/checkout/create-session', { pacoteId: pacote.id });
      const { sessionId } = response.data;

      
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
      toast.dismiss(toastId);

    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      toast.error("Não foi possível iniciar o pagamento. Tente novamente.", { id: toastId });
      setIsRedirecting(false);
    }
  }



  if (loading) {
    return <div className="text-center text-brand-light p-10">Carregando detalhes da viagem...</div>;
  }

  if (!pacote) {
    return <div className="text-center text-brand-light p-10">Pacote de viagem não encontrado.</div>;
  }

  return (
    <div className="bg-brand-dark text-brand-light font-body">
      {/*Hero */}
      <div className="has-[60vh] relative">
        <img src={pacote.urlFotoPrincipal} alt={pacote.titulo} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-white shadow-lg">{pacote.titulo}</h1>
          <p className="text-xl md:text-2xl text-brand-gray mt-2">{pacote.destino}</p>
          </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto p-8 md:p-12">
        {/* Barra de Informações Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-y border-gray-700 py-6 mb-12">
          <div>
            <p className="text-sm text-brand-gray">Duração</p>
            <p className="text-2xl font-bold">{pacote.duracaoDias} dias</p>
          </div>
          <div>
            <p className="text-sm text-brand-gray">Vagas Restantes</p>
            <p className="text-2xl font-bold">{pacote.vagasDisponiveis}</p>
          </div>
          <div>
            <p className="text-sm text-brand-gray">Data de Partida</p>
            <p className="text-2xl font-bold">{new Date(pacote.dataPartida).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
          </div>
          <div>
            <p className="text-sm text-brand-gray">Preço</p>
            <p className="text-2xl font-bold text-brand-secondary">{formatPrice(pacote.preco)}</p>
          </div>
        </div>

         {/* Descrição Detalhada */}
        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="font-heading text-3xl">Sobre esta experiência</h2>
          <p>{pacote.descricao}</p>
        </div>

       <div className="mt-12 text-center">
        {/* 4. CONECTE A FUNÇÃO AO BOTÃO */}
        <button 
          onClick={handleCheckout}
          disabled={isRedirecting}
          className="px-10 py-4 bg-brand-primary text-white font-bold rounded-lg text-xl hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRedirecting ? 'Redirecionando...' : 'Reservar Vaga'}
        </button>
      </div>
    </div>
    </div>
  );
}
 
