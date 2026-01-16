import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMinhasReservas, type Reserva } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, MapPin, Clock, FileText, 
  Ticket, Shield, Download, AlertCircle, CheckCircle, ExternalLink 
} from 'lucide-react';

export function DashboardPage() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMinhasReservas()
      .then(data => setReservas(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
          Olá, {user?.nome?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Aqui estão os detalhes das suas próximas aventuras.
        </p>
      </div>

      {reservas.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Nenhuma viagem agendada</h3>
          <p className="text-gray-500 mb-6">Você ainda não reservou nenhuma experiência conosco.</p>
          <Link 
            to="/destinos" 
            className="inline-block bg-brand-primary hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-all"
          >
            Explorar Destinos
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reservas.map((reserva) => (
            <ReservaCard key={reserva.id} reserva={reserva} />
          ))}
        </div>
      )}
    </div>
  );
}

function ReservaCard({ reserva }: { reserva: Reserva }) {
  const pacote = reserva.pacoteViagem;
  const isConfirmed = reserva.status === 'CONFIRMADA' || reserva.status === 'CONFIRMED' || reserva.status === 'REALIZADA';
  const isPending = reserva.status === 'PENDENTE';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 h-48 md:h-auto relative">
        <img 
          src={pacote.urlFotoPrincipal} 
          alt={pacote.titulo} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <StatusBadge status={reserva.status} />
        </div>
      </div>

      <div className="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white">
              {pacote.titulo}
            </h2>
            <span className="text-brand-primary font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pacote.preco)}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              {pacote.destino}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(pacote.dataPartida).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              {pacote.duracaoDias} dias
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
              <FileText size={16} /> Central da Viagem
            </h3>

            {isPending && (
              <div className="flex items-center justify-between bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800 text-sm">
                  <AlertCircle size={18} />
                  <span>Pagamento pendente. Garanta sua vaga!</span>
                </div>
                
                {reserva.asaasBoletoUrl || reserva.asaasInvoiceUrl ? (
                   <a 
                     href={reserva.asaasBoletoUrl || reserva.asaasInvoiceUrl} 
                     target="_blank"
                     className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                   >
                     Pagar Agora
                   </a>
                ) : (
                   <Link 
                     to="/checkout" 
                     state={{ pacote, reservaId: reserva.id }}
                     className="bg-brand-primary hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                   >
                     Ir para Pagamento
                   </Link>
                )}
              </div>
            )}

            {isConfirmed ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DocumentButton 
                  label="Voucher do Hotel" 
                  icon={<FileText size={18} />} 
                  url={reserva.urlHotelVoucher} 
                />
                <DocumentButton 
                  label="Passagem Aérea" 
                  icon={<Ticket size={18} />} 
                  url={reserva.urlPassagem} 
                />
                <DocumentButton 
                  label="Seguro Viagem" 
                  icon={<Shield size={18} />} 
                  url={reserva.urlSeguroViagem} 
                />
                {reserva.pacoteViagem.roteiroUrl && (
                   <DocumentButton 
                    label="Roteiro Completo" 
                    icon={<MapPin size={18} />} 
                    url={reserva.pacoteViagem.roteiroUrl} 
                  />
                )}
              </div>
            ) : (
                !isPending && <p className="text-sm text-gray-500">Aguardando confirmação para liberar documentos.</p>
            )}
          </div>
        </div>
        
        {pacote.dicasViagem && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 italic">
                    <span className="font-bold">Dica do Fotógrafo:</span> "{pacote.dicasViagem}"
                </p>
            </div>
        )}
      </div>
    </div>
  );
}

function DocumentButton({ label, icon, url }: { label: string; icon: any; url?: string }) {
  if (!url) {
    return (
      <button disabled className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-400 cursor-not-allowed w-full">
        {icon}
        <div className="text-left">
          <span className="block text-xs font-bold">{label}</span>
          <span className="text-[10px]">Em breve</span>
        </div>
      </button>
    );
  }

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-brand-primary hover:bg-teal-50 dark:hover:bg-teal-900/20 text-gray-700 dark:text-gray-200 hover:text-brand-primary transition-all w-full group"
    >
      <div className="text-gray-400 group-hover:text-brand-primary transition-colors">
        {icon}
      </div>
      <div className="text-left flex-1">
        <span className="block text-xs font-bold">{label}</span>
        <span className="text-[10px] flex items-center gap-1 text-gray-400 group-hover:text-brand-primary">
          Baixar PDF <Download size={10} />
        </span>
      </div>
    </a>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    PENDENTE: "bg-yellow-500 text-white",
    CONFIRMADA: "bg-green-500 text-white",
    CONFIRMED: "bg-green-500 text-white",
    CANCELADA: "bg-red-500 text-white",
    REALIZADA: "bg-blue-500 text-white",
  };
  
  const safeStatus = status ? status.toUpperCase() : "DESCONHECIDO";
  const classe = styles[safeStatus] || "bg-gray-500 text-white";
  
  const labels: any = {
      PENDENTE: "Aguardando Pagamento",
      CONFIRMADA: "Confirmada",
      CONFIRMED: "Confirmada",
      CANCELADA: "Cancelada",
      REALIZADA: "Concluída"
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${classe}`}>
      {labels[safeStatus] || safeStatus}
    </span>
  );
}
