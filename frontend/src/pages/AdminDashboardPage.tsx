import { Link } from "react-router-dom";
import { PacoteViagemList } from "../components/PacoteViagemList";


export function AdminDashboardPage() {
  return (
  <div>
      <header className="bg-brand-dark shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-brand-light font-heading">
              Painel de Controle 
            </h1>
            <p className="text-brand-gray">Caraca, meu Sonho!</p>
          </div>
          <Link to="/admin/pacotes/novo" className="px-5 py-2 font-bold bg-brand-primary text-white rounded-lg hover:bg-teal-600 transition-colors">
            + Adicionar Pacote 
          </Link>
        </div>
      </header>

      <main>
        <PacoteViagemList isAdmin={true} />
      </main>
  </div>
  );
}
