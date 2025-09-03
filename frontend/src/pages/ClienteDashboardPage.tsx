import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

interface Reserva {
  id: number;
  pacoteViagem: {
    titulo: string;
    destino: string;
    urlFotoPrincipal: string;
  };
  status: string;
  dataReserva: string;
  valorTotal: number;
}

export function ClienteDashboardPage() {
  const { logout } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservas() {
      try {
        const response = await api.get("/cliente/reservas");
        setReservas(response.data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        toast.error("Falha ao carregar suas reservas. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    fetchReservas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-dark">
        <p className="text-brand-light">Carregando suas aventuras...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark font-body text-brand-light p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-heading">Sua Área do Cliente</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-teal-600 transition-colors"
        >
          Sair
        </button>
      </header>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-heading font-bold mb-6">Minhas Reservas</h2>
        {reservas.length > 0 ? (
          <div className="space-y-6">
            {reservas.map((reserva) => (
              <div
                key={reserva.id}
                className="bg-stone-800 rounded-lg shadow-lg overflow-hidden md:flex transition-transform duration-300 hover:scale-[1.01]"
              >
                <img
                  src={reserva.pacoteViagem.urlFotoPrincipal}
                  alt={reserva.pacoteViagem.titulo}
                  className="w-full h-48 md:h-auto md:w-64 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-brand-light">
                    {reserva.pacoteViagem.titulo}
                  </h3>
                  <p className="text-brand-gray text-sm mb-4">
                    Destino: {reserva.pacoteViagem.destino}
                  </p>
                  <p>
                    <span className="font-bold">Status:</span> {reserva.status}
                  </p>
                  <p>
                    <span className="font-bold">Valor Total:</span> R${" "}
                    {reserva.valorTotal.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-bold">Data da Reserva:</span>{" "}
                    {new Date(reserva.dataReserva).toLocaleDateString()}
                  </p>
                  <div className="mt-4 flex gap-4">

                    <Link
                      to={`/cliente/reservas/${reserva.id}/documentos`}
                      className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Ver Documentos
                    </Link>
                    <Link
                      to={`/cliente/reservas/${reserva.id}/fotos`}
                      className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      Ver Fotos
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-brand-gray">
            Você ainda não tem nenhuma reserva.{" "}
            <Link to="/" className="text-brand-primary hover:underline">
              Explore nossos pacotes!
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
