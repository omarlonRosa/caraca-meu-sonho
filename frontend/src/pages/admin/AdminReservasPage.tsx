import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  fetchAdminReservas, 
  updateReservaStatus, 
  updateReservaDocs, 
  uploadImage, 
  type ReservaAdminView 
} from '../../services/api';

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
  
  const [editingDocsId, setEditingDocsId] = useState<number | null>(null);
  const [docLinks, setDocLinks] = useState({ urlPassagem: '', urlHotelVoucher: '', urlSeguroViagem: '' });
  const [uploading, setUploading] = useState(false);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'urlPassagem' | 'urlHotelVoucher' | 'urlSeguroViagem') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadImage(file, 'auto');
      setDocLinks(prev => ({ ...prev, [field]: response.imageUrl }));
      alert('Upload concluído! O link foi preenchido.');
    } catch (err) {
      console.error(err);
      alert('Erro ao fazer upload do arquivo.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveDocs = async (reservaId: number) => {
    try {
      await updateReservaDocs(reservaId, docLinks);
      alert('Documentos salvos com sucesso!');
      setEditingDocsId(null);
      setDocLinks({ urlPassagem: '', urlHotelVoucher: '', urlSeguroViagem: '' }); 
    } catch (err) {
      alert('Erro ao salvar documentos.');
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
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Pacote</th>
              <th scope="col" className="px-6 py-3">Data</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Ações</th> 
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
                <td className="px-6 py-4">{new Date(reserva.dataReserva).toLocaleDateString('pt-BR')}</td>
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
                
                <td className="px-6 py-4">
                  <button 
                    onClick={() => {
                      if (editingDocsId === reserva.reservaId) {
                        setEditingDocsId(null);
                      } else {
                        setEditingDocsId(reserva.reservaId);
                      }
                    }}
                    className="text-brand-primary font-bold hover:underline"
                  >
                    {editingDocsId === reserva.reservaId ? 'Fechar' : 'Gerenciar Docs'}
                  </button>

                  {editingDocsId === reserva.reservaId && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded border border-gray-200 dark:border-slate-600 min-w-[300px]">
                      <h4 className="font-bold mb-3 text-gray-700 dark:text-gray-200">Anexar Documentos</h4>
                      
                      <div className="mb-3">
                        <label className="block text-xs font-medium mb-1">Passagem Aérea (PDF/Img)</label>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'urlPassagem')} className="block w-full text-xs" disabled={uploading} />
                        <input 
                          type="text" 
                          placeholder="Ou cole o link aqui"
                          value={docLinks.urlPassagem}
                          onChange={e => setDocLinks({...docLinks, urlPassagem: e.target.value})}
                          className="mt-1 w-full text-xs p-1 border rounded"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="block text-xs font-medium mb-1">Voucher Hotel</label>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'urlHotelVoucher')} className="block w-full text-xs" disabled={uploading} />
                        <input 
                          type="text" 
                          placeholder="Ou cole o link aqui"
                          value={docLinks.urlHotelVoucher}
                          onChange={e => setDocLinks({...docLinks, urlHotelVoucher: e.target.value})}
                          className="mt-1 w-full text-xs p-1 border rounded"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="block text-xs font-medium mb-1">Seguro Viagem</label>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'urlSeguroViagem')} className="block w-full text-xs" disabled={uploading} />
                        <input 
                          type="text" 
                          placeholder="Ou cole o link aqui"
                          value={docLinks.urlSeguroViagem}
                          onChange={e => setDocLinks({...docLinks, urlSeguroViagem: e.target.value})}
                          className="mt-1 w-full text-xs p-1 border rounded"
                        />
                      </div>

                      <button 
                        onClick={() => handleSaveDocs(reserva.reservaId)}
                        disabled={uploading}
                        className="w-full bg-brand-primary hover:bg-brand-dark text-white text-xs font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
                      >
                        {uploading ? 'Enviando...' : 'Salvar Documentos'}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
