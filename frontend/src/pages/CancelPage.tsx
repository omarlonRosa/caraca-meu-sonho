import { Link } from "react-router-dom";

export function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-3xl font-bold font-heading text-brand-secondary mb-4">
        Pagamento Cancelado
      </h1>
      <p className="text-lg text-brand-gray max-w-lg mb-8">
        Parece que a sua reserva não foi finalizada. Não se preocupe, sua vaga ainda pode estar disponível.
      </p>
      <Link to="/" className="px-6 py-3 bg-brand-secondary text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">
        Ver Viagens Novamente
      </Link>
    </div>
  );
}
