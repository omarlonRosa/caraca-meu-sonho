import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminReservas, updateReservaStatus, type ReservaAdminView } from '../../services/api';

const statusColors: { [key: string]: string } = {
  PENDENTE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  CONFIRMADA: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  REALIZADA: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  CANCELADA: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export function AdminReservasPage() {
  const [reservas, setReservas] = useState<ReservaAdminView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminReservas()
      .then(data => setReservas(data))
      .catch(() => setError('Não foi possível carregar a lista de reservas.'))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (reservaId: number, newStatus: string) => {
    try {
      const reservaAtualizada = await updateReservaStatus(reservaId, { newStatus });
      setReservas(reservas.map(r => r.reservaId === reservaId ? reservaAtualizada : r));
    } catch (err) {
      console.error(err);
      alert('Falha ao atualizar o status.');
    }
  };

  if (loading) return <p className="text-center py-20">Carregando reservas...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-12 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-heading font-bold">Gerenciar Reservas</h1>
        <Link to="/admin" className="text-brand-primary hover:underline">&larr; Voltar para o Dashboard</Link>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">ID Reserva</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Pacote</th>
              <th scope="col" className="px-6 py-3">Data da Reserva</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.reservaId} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
                <td className="px-6 py-4 font-bold">{reserva.reservaId}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white">{reserva.clienteNome}</div>
                  <div className="text-xs text-gray-500">{reserva.clienteEmail}</div>
                </td>
                <td className="px-6 py-4">{reserva.pacoteTitulo}</td>
                <td className="px-6 py-4">{new Date(reserva.dataReserva).toLocaleString('pt-BR')}</td>
                <td className="px-6 py-4">
                  <select 
                    value={reserva.status}
                    onChange={(e) => handleStatusChange(reserva.reservaId, e.target.value)}
                    className={`p-2 rounded-md border-transparent focus:ring-2 focus:ring-brand-primary text-xs font-semibold ${statusColors[reserva.status] || 'bg-gray-100 text-gray-800'}`}
                  >
                    <option value="PENDENTE">Pendente</option>
                    <option value="CONFIRMADA">Confirmada</option>
                    <option value="REALIZADA">Realizada</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
