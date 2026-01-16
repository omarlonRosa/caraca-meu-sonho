import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { iniciarPagamento, updateProfile } from '../services/api';
import { FileText, QrCode, ArrowRight, AlertCircle, CreditCard, X } from 'lucide-react'; 

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pacote, reservaId } = location.state || {};
  
  const [formaPagamento, setFormaPagamento] = useState<'BOLETO' | 'PIX' | 'CREDIT_CARD'>('PIX');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucessoLink, setSucessoLink] = useState('');

  const [cpfModalOpen, setCpfModalOpen] = useState(false);
  const [cpfInput, setCpfInput] = useState('');
  const [salvandoCpf, setSalvandoCpf] = useState(false);

  if (!pacote || !reservaId) {
    return <div className="p-8 text-center text-red-500">Erro: Pacote não selecionado. Volte e tente novamente.</div>;
  }

  const handlePagamento = async () => {
    setLoading(true);
    setErro('');
    setSucessoLink('');

    try {
      const reservaAtualizada = await iniciarPagamento({ 
        reservaId: reservaId, 
        formaPagamento: formaPagamento 
      });
      
      let linkParaAbrir = '';

      if (formaPagamento === 'BOLETO') {
        linkParaAbrir = reservaAtualizada.asaasBoletoUrl || '';
      } else {
        linkParaAbrir = reservaAtualizada.asaasInvoiceUrl || reservaAtualizada.asaasBoletoUrl || '';
      }

      if (linkParaAbrir) {
        setSucessoLink(linkParaAbrir);
        window.location.href = linkParaAbrir;
      } else {
        setErro('O Asaas não retornou um link válido. Tente novamente.');
      }
      
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('CPF') || err.message?.includes('customer')) {
         setCpfModalOpen(true);
         setErro('Precisamos do seu CPF para emitir a nota fiscal/cobrança.');
      } else {
         setErro(err.message || 'Erro ao processar pagamento.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSalvarCpf = async () => {
    setSalvandoCpf(true);
    try {
        await updateProfile({ cpf: cpfInput.replace(/\D/g, "") });
        setCpfModalOpen(false);
        setErro('');
        handlePagamento();
    } catch (err) {
        alert("Erro ao salvar CPF. Tente novamente.");
    } finally {
        setSalvandoCpf(false);
    }
  };

  const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pacote.preco);

  return (
    <div className="container mx-auto py-12 px-4 relative">
      
      {cpfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">CPF Necessário</h3>
              <button onClick={() => setCpfModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg mb-4 text-sm">
                <AlertCircle size={20} className="shrink-0" />
                <p>Para emitir cobranças (Pix/Boleto), o Banco Central exige que o pagador tenha um CPF válido vinculado.</p>
              </div>

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Seu CPF
              </label>
              <input 
                type="text" 
                placeholder="000.000.000-00"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-primary outline-none transition"
                value={cpfInput}
                onChange={(e) => setCpfInput(e.target.value)}
              />
            </div>

            <button 
              onClick={handleSalvarCpf} 
              disabled={salvandoCpf || cpfInput.length < 11}
              className="w-full bg-brand-primary hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {salvandoCpf ? 'Salvando...' : 'Salvar e Continuar'}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm h-fit border border-gray-100 dark:border-gray-700">
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

        {/* Opções de Pagamento */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
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
                  ? 'border-brand-primary bg-orange-50 dark:bg-orange-900/20' 
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
            
            <button
              onClick={() => setFormaPagamento('CREDIT_CARD')}
              className={`w-full flex items-center p-4 rounded-lg border-2 transition-all ${
                formaPagamento === 'CREDIT_CARD' 
                  ? 'border-brand-primary bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-brand-primary'
              }`}
            >
              <div className="bg-blue-100 p-2 rounded-full mr-4 text-blue-600">
                <CreditCard size={24} />
              </div>
              <div className="text-left">
                <span className="block font-bold">Cartão de Crédito</span>
                <span className="text-sm text-gray-500">via Asaas Checkout</span>
              </div>
            </button>
          </div>

          {erro && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center text-sm border border-red-100">
              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              {erro}
            </div>
          )}

          {sucessoLink ? (
             <div className="text-center">
                <p className="text-green-600 font-bold mb-4">Cobrança gerada! Redirecionando...</p>
                <a 
                  href={sucessoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors"
                >
                  Clique se não abrir automaticamente
                </a>
                <button onClick={() => navigate('/dashboard')} className="mt-4 text-sm text-gray-500 hover:underline">
                    Ir para meu Painel
                </button>
             </div>
          ) : (
            <button
              onClick={handlePagamento}
              disabled={loading}
              className="w-full bg-brand-primary hover:bg-teal-600 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processando...' : (
                <>
                  Pagar Agora
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
