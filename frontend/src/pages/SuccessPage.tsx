import { Link } from "react-router-dom";

export function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-4xl font-bold font-heading text-brand-primary mb-4">
        Reserva Realizada com Sucesso!
      </h1>
      <p className="text-lg text-brand-gray max-w-lg mb-8">
        Obrigado! Em breve você receberá um e-mail com todos os detalhes da sua próxima aventura. Prepara a mochila!
      </p>
      <Link to="/" className="px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-teal-600 transition-colors">
        Voltar para a Home
      </Link>
    </div>
  );
}
