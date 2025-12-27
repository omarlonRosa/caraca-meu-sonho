import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { iniciarPagamento } from '../services/api';
import { FileText, QrCode, ArrowRight, AlertCircle } from 'lucide-react'; 

export function CheckoutPage() {
  const location = useLocation();
  const { pacote, reservaId } = location.state || {};
  
  const [formaPagamento, setFormaPagamento] = useState<'BOLETO' | 'PIX'>('PIX');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucessoUrl, setSucessoUrl] = useState('');

  if (!pacote || !reservaId) {
    return <div className="p-8 text-center text-red-500">Erro: Pacote não selecionado. Volte e tente novamente.</div>;
  }

  const handlePagamento = async () => {
    setLoading(true);
    setErro('');

    try {
      const data = await iniciarPagamento({ 
        reservaId: reservaId, 
        formaPagamento: formaPagamento 
      });
      
      setSucessoUrl(data.linkPagamento);
      
      window.location.href = data.linkPagamento;
      
    } catch (err: any) {
      console.error(err);
      setErro('Erro ao gerar cobrança. Verifique se seu CPF está cadastrado no perfil.');
    } finally {
      setLoading(false);
    }
  };

  const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pacote.preco);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm h-fit">
          <img 
            src={pacote.urlFotoPrincipal} 
            alt={pacote.titulo} 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold font-heading mb-2">{pacote.titulo}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{pacote.destino}</p>
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between items-center">
            <span className="font-semibold">Total a pagar:</span>
            <span className="text-2xl font-bold text-brand-primary">{precoFormatado}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
          <h1 className="text-2xl font-heading font-bold mb-6">Como deseja pagar?</h1>

          <div className="space-y-4 mb-8">
            <button
              onClick={() => setFormaPagamento('PIX')}
              className={`w-full flex items-center p-4 rounded-lg border-2 transition-all ${
                formaPagamento === 'PIX' 
                  ? 'border-brand-primary bg-teal-50 dark:bg-teal-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-brand-primary'
              }`}
            >
              <div className="bg-teal-100 p-2 rounded-full mr-4 text-teal-600">
                <QrCode size={24} />
              </div>
              <div className="text-left">
                <span className="block font-bold">Pix</span>
                <span className="text-sm text-gray-500">Aprovação imediata</span>
              </div>
            </button>

            <button
              onClick={() => setFormaPagamento('BOLETO')}
              className={`w-full flex items-center p-4 rounded-lg border-2 transition-all ${
                formaPagamento === 'BOLETO' 
                  ? 'border-brand-primary bg-teal-50 dark:bg-teal-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-brand-primary'
              }`}
            >
              <div className="bg-orange-100 p-2 rounded-full mr-4 text-orange-600">
                <FileText size={24} />
              </div>
              <div className="text-left">
                <span className="block font-bold">Boleto Bancário</span>
                <span className="text-sm text-gray-500">Vencimento em 3 dias</span>
              </div>
            </button>
          </div>

          {erro && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
              <AlertCircle size={20} className="mr-2" />
              {erro}
            </div>
          )}

          {sucessoUrl ? (
             <div className="text-center">
                <p className="text-green-600 font-bold mb-4">Cobrança gerada com sucesso!</p>
                <a 
                  href={sucessoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors"
                >
                  Abrir Pagamento
                </a>
             </div>
          ) : (
            <button
              onClick={handlePagamento}
              disabled={loading}
              className="w-full bg-brand-primary hover:bg-teal-600 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processando...' : (
                <>
                  Pagar com {formaPagamento === 'PIX' ? 'Pix' : 'Boleto'}
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </button>
          )}

          <p className="mt-4 text-center text-xs text-gray-400">
            Ambiente Seguro. Processado por Asaas.
          </p>
        </div>
      </div>
    </div>
  );
}
