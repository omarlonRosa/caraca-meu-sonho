import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, type FormEvent } from 'react';
import { type PacoteViagem } from '../services/api';

interface CheckoutFormProps {
  pacote: PacoteViagem;
}

export function CheckoutForm({ pacote }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pagamento-sucesso`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Ocorreu um erro com o seu cartão.");
    } else {
      setMessage("Um erro inesperado ocorreu.");
    }

    setIsLoading(false);
  };

  const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pacote.preco);

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="w-full bg-brand-primary hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-md mt-6 transition-opacity disabled:opacity-50">
        <span id="button-text">
          {isLoading ? "A processar..." : `Pagar ${precoFormatado}`}
        </span>
      </button>
      {message && <div id="payment-message" className="text-red-500 text-center mt-4">{message}</div>}
    </form>
  );
}
