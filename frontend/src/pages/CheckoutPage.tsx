import { useState, useEffect, useRef } from 'react'; // 1. Importe o useRef
import { loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import { createPaymentIntent } from '../services/api';
import { CheckoutForm } from '../components/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const location = useLocation();
  const { pacote, reservaId } = location.state || {};
  
  const hasFetched = useRef(false);

  useEffect(() => {
    // 3. Adicione a condição !hasFetched.current para rodar o código apenas uma vez
    if (pacote?.id && reservaId && !hasFetched.current) {
      // 4. Marque que a busca está sendo feita imediatamente
      hasFetched.current = true;

      createPaymentIntent({ pacoteId: pacote.id, reservaId: reservaId })
        .then(data => setClientSecret(data.clientSecret))
        .catch(err => {
          console.error("Erro ao criar Payment Intent:", err);
          // Opcional: mostrar uma mensagem de erro para o utilizador
        });
    }
  }, [pacote, reservaId]);

  // Não há necessidade de criar 'options' fora do JSX se ele depende do clientSecret
  // Vamos passar diretamente para o componente Elements

  if (!pacote) {
    return <div className="p-8 text-center">Pacote de viagem não selecionado. Por favor, volte e escolha um destino.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-2">Finalizar Reserva</h1>
        <h2 className="text-xl text-brand-primary mb-6">{pacote.titulo}</h2>
        
        {clientSecret ? ( // Verificação mais robusta
          <Elements 
            options={{ clientSecret, appearance: { theme: 'stripe' } }} 
            stripe={stripePromise}
          >
            <CheckoutForm pacote={pacote} />
          </Elements>
        ) : (
          <div className="text-center p-8 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <p>A carregar o formulário de pagamento...</p>
          </div>
        )}
      </div>
    </div>
  );
}
