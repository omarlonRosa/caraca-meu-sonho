import { Link } from 'react-router-dom';

export function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-heading font-bold text-green-500">Pagamento Aprovado!</h1>
      <p className="mt-4 text-lg text-brand-gray">Sua reserva foi confirmada. Em breve você receberá um email com todos os detalhes.</p>
      <Link to="/dashboard" className="mt-8 inline-block bg-brand-primary hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
        Ir para Meu Painel
      </Link>
    </div>
  )
}
