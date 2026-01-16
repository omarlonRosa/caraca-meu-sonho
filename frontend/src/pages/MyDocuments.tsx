import { useEffect, useState } from 'react';
import { fetchMinhasReservas, type Reserva } from '../services/api';

export function MyDocuments() {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarDocumentos = async () => {
            try {
                const data = await fetchMinhasReservas();
                const comDocs = data.filter(r => 
                    r.urlPassagem || 
                    r.urlHotelVoucher || 
                    r.urlSeguroViagem || 
                    r.asaasBoletoUrl ||
                    (r.urlsOutros && r.urlsOutros.length > 0)
                );
                setReservas(comDocs);
            } catch (err) {
                console.error("Erro ao carregar documentos", err);
            } finally {
                setLoading(false);
            }
        };
        carregarDocumentos();
    }, []);

    return (
        <div className="container mx-auto py-12 px-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Meus Documentos de Viagem</h1>

            {loading ? (
                <p className="text-gray-500">A carregar documentos...</p>
            ) : reservas.length === 0 ? (
                    <div className="bg-gray-100 dark:bg-slate-800 p-8 rounded-xl text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Ainda não tens documentos disponíveis. Eles serão libertados assim que a tua reserva for confirmada.
                        </p>
                    </div>
                ) : (
                        <div className="grid gap-6">
                            {reservas.map((reserva) => (
                                <div key={reserva.id} className="bg-white dark:bg-slate-800 shadow-md rounded-xl p-6 border-l-4 border-brand-primary">
                                    <h2 className="text-xl font-bold mb-4 dark:text-white">{reserva.pacoteViagem.titulo}</h2>
                                    <div className="flex flex-wrap gap-4">
                                        
                                        {reserva.urlPassagem && (
                                            <a href={reserva.urlPassagem} target="_blank" rel="noreferrer" 
                                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                                                ✈️ Passagem Aérea
                                            </a>
                                        )}
                                        {reserva.urlHotelVoucher && (
                                            <a href={reserva.urlHotelVoucher} target="_blank" rel="noreferrer"
                                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                                                🏨 Voucher do Hotel
                                            </a>
                                        )}
                                        {reserva.urlSeguroViagem && (
                                            <a href={reserva.urlSeguroViagem} target="_blank" rel="noreferrer"
                                                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
                                                🛡️ Seguro Viagem
                                            </a>
                                        )}
                                        
                                        {reserva.asaasBoletoUrl && (
                                            <a 
                                                href={reserva.asaasBoletoUrl} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                                            >
                                                📄 Boleto Bancário
                                            </a>
                                        )}

                                        {reserva.urlsOutros && reserva.urlsOutros.map((url, index) => (
                                            <a 
                                                key={index}
                                                href={url} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                                            >
                                                📎 Documento Extra {index + 1}
                                            </a>
                                        ))}

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
        </div>
    );
}
