import { FileText, Map, Plane, Shield, Hotel, Info } from 'lucide-react';

interface BookingResourcesProps {
  status: string;
  boletoUrl?: string;
  invoiceUrl?: string;
  ticketUrl?: string;
  hotelUrl?: string;
  insuranceUrl?: string;
  travelTips?: string; 
}

export function BookingResources({
  status,
  boletoUrl,
  invoiceUrl,
  ticketUrl,
  hotelUrl,
  insuranceUrl,
  travelTips
}: BookingResourcesProps) {

  const openLink = (url?: string) => {
    if (url) window.open(url, '_blank');
  };

  if (status === 'PENDENTE') {
    return (
      <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
        <h3 className="text-md font-bold text-orange-800 mb-2">Pagamento Pendente</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          {boletoUrl && (
            <button
              onClick={() => openLink(boletoUrl)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm"
            >
              <FileText size={16} />
              Imprimir Boleto
            </button>
          )}
          {invoiceUrl && (
            <button
              onClick={() => openLink(invoiceUrl)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              <FileText size={16} />
              Ver Fatura / Pagar com Cartão
            </button>
          )}
        </div>
      </div>
    );
  }

  if (status === 'CONFIRMED' || status === 'REALIZADA' || status === 'COMPLETED') {
    return (
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Plane className="text-brand-primary" size={20} />
            Minha Viagem e Documentos
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ResourceButton 
              label="Passagem Aérea" 
              icon={<Plane size={18} />} 
              url={ticketUrl} 
              colorClass="bg-blue-600 hover:bg-blue-700" 
            />
            <ResourceButton 
              label="Voucher Hotel" 
              icon={<Hotel size={18} />} 
              url={hotelUrl} 
              colorClass="bg-indigo-600 hover:bg-indigo-700" 
            />
            <ResourceButton 
              label="Seguro Viagem" 
              icon={<Shield size={18} />} 
              url={insuranceUrl} 
              colorClass="bg-teal-600 hover:bg-teal-700" 
            />
            <button disabled className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200">
                <Map size={18} /> Roteiro (Em breve)
            </button>
          </div>
          
          {(!ticketUrl && !hotelUrl) && (
             <p className="mt-3 text-xs text-gray-500 text-center italic">
              * Os documentos estão a ser emitidos. Volte em breve!
            </p>
          )}
        </div>

        {travelTips && (
          <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
            <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
              <Info size={20} /> Dicas do Fotógrafo
            </h4>
            <div className="prose prose-sm text-yellow-900 whitespace-pre-line">
              {travelTips}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function ResourceButton({ label, icon, url, colorClass }: { label: string, icon: any, url?: string, colorClass: string }) {
  if (!url) {
    return (
      <button disabled className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200 opacity-60">
        {icon} {label}
      </button>
    );
  }
  return (
    <button
      onClick={() => window.open(url, '_blank')}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md transition-colors ${colorClass}`}
    >
      {icon} {label}
    </button>
  );
}
