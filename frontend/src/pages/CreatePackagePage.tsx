import { useState, type ChangeEvent, type FormEvent } from "react";
import api from "../services/api";
import axios from "axios";
import toast from "react-hot-toast";

export function CreatePackagePage() {

  const[titulo, setTitulo] = useState('');
  const[destino, setDestino] = useState('');
  const[preco, setPreco] = useState<number | ''>('');
  const[urlFoto, setUrlFoto] = useState('');

  const [descricao, setDescricao] = useState('');
  const [dataPartida, setDataPartida] = useState('');
  const [duracaoDias, setDuracaoDias] = useState<number | ''>('');
  const [vagasDisponiveis, setVagasDisponiveis] = useState<number | ''>('');

  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    setIsUploading(true);

    const uploadPromise = new Promise(async (resolve, reject) => {
      try{
        const signatureResponse = await api.get('/admin/uploads/signature');

        const {signature, timestamp, api_key, cloud_name } = signatureResponse.data;


        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', api_key);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
        const uploadResponse = await axios.post(cloudinaryUrl, formData);

        const { public_id, format } = uploadResponse.data;
        const optimizedUrl = `https://res.cloudinary.com/${cloud_name}/image/upload/c_fill,w_600,h_400,q_auto/${public_id}.${format}`;

         setUrlFoto(optimizedUrl);
      setIsUploading(false);
      resolve('Imagem carregada com sucesso!');

      } catch (error) {
        console.error("Erro no upload:", error);
        setIsUploading(false);
        reject('Falha no upload da imagem.');
      }
    });

    toast.promise(uploadPromise, {
      loading: 'Enviando imagem...',
      success: (message) => String(message),
      error: (message) => String(message),
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if(!urlFoto) {
      toast.error("Por favor, aguarde o upload da imagem terminar.");
      return;
    }

    const data = {
      titulo,
      destino,
      preco: Number(preco),
      urlFotoPrincipal: urlFoto,
      descricao,
      dataPartida,
      duracaoDias: Number(duracaoDias),
      vagasDisponiveis: Number(vagasDisponiveis),

    };

    const createPromise = api.post('/pacotes', data);

    await toast.promise(createPromise, {
      loading: 'Salvando pacote ...',
      success: 'Pacote criado com sucesso!',
      error: 'Falha ao criar o pacote. verifique os dados.',
});

  setTitulo('');
  setDestino('');
  setPreco('');
  setUrlFoto('');
  setDescricao('');
  setDataPartida('');
  setDuracaoDias('');
  setVagasDisponiveis('');
}

  return (

  <div className="bg-brand-dark min-h-screen text-brand-light">
      <div className="max-w-4xl mx-auto p-8">
        {/* Cabeçalho */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold font-heading">Painel do Administrador</h1>
          <p className="text-brand-gray mt-2">Adicionar novo pacote de viagem</p>
        </div>
        {/*Fomulário*/}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/*Titulo e destinos*/}
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-brand-gray">Título</label>
              <input type="text" id="titulo" value={titulo}onChange={e => setTitulo(e.target.value)}
              className="mt-1 block w-full rounded-md bg-slate-700 border-transparent focus:border-brand-primary focus:ring-brand-primary" required />
            </div>
            <div>
              <label htmlFor="destino" className="block text-sm font-medium text-brand-gray">Destino</label>
              <input type="text" id="destino" value={destino} onChange={e => setDestino(e.target.value)}
                className="mt-1 block w-full rounded-md bg-slate-700 border-transparent focus:border-brand-primary focus:ring-brand-primary" required />
            </div>
        </div>
            {/*Descrição*/}
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-brand-gray">Descrição</label>
            <textarea id="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} rows={4}
              className="mt-1 block w-full rounded-md bg-slate-700 border-transparent focus:border-brand-primary focus:ring-brand-primary" required />
          </div>

          {/*datas, duracao, vagas, preco*/}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label htmlFor="dataPartida" className="block text-sm font-medium text-brand-gray">Data de Partida</label>
              <input type="date" id="dataPartida" value={dataPartida} onChange={e => setDataPartida(e.target.value)}
                className="mt-1 block w-full rounded-md bg-slate-700 border-transparent focus:border-brand-primary focus:ring-brand-primary" required />
            </div>
            <div>
              <label htmlFor="duracaoDias" className="block text-sm font-medium text-brand-gray">Duração (dias)</label>
              <input type="number" id="duracaoDias" value={duracaoDias} onChange={e => setDuracaoDias(e.target.value === '' ? '' : Number(e.target.value))}
                className="mt-1 block w-full rounded-md bg-slate-700 border-transparent focus:border-brand-primary focus:ring-brand-primary" required />
            </div>
            <div>
              <label htmlFor="vagasDisponiveis" className="block text-sm font-medium text-brand-gray">Vagas</label>
              <input type="number" id="vagasDisponiveis" value={vagasDisponiveis} onChange={e => setVagasDisponiveis(e.target.value === '' ? '' : Number(e.target.value))}
                className="mt-1 block w-full rounded-md bg-slate-700 border-transparent focus:border-brand-primary focus:ring-brand-primary" required />
            </div>
            <div>
              <label htmlFor="preco" className="block text-sm font-medium text-brand-gray">Preço (R$)</label>
              <input type="number" id="preco" value={preco} onChange={e => setPreco(Number(e.target.value === '' ? '' : Number(e.target.value)))} step="0.01"
                className="mt-1 block w-full rounded-md bg-slate-700 border-transparent focus:border-brand-primary focus:ring-brand-primary" required />
            </div>
          </div>

          {/*Foto*/}
          <div>
            <label htmlFor="foto" className="block text-sm font-medium text-brand-gray">Foto Principal</label>
            <input 
              type="file" 
              id="foto" 
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-slate-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-brand-primary file:text-white
                         hover:file:bg-teal-600"
              disabled={isUploading}
            />
 
            {urlFoto && !isUploading && (
              <div className="mt-4">
                <p className="text-sm text-brand-gray">Prévia da imagem:</p>
                <img src={urlFoto} alt="Prévia" className="mt-2 rounded-lg w-full max-w-sm h-auto" />
              </div>
            )}
          </div>

          
          <div className="pt-4">
            <button type="submit"
              className="px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-primary transition-colors duration-300 w-full sm:w-auto disabled:opacity-50"
            disabled={isUploading}
            >
              {isUploading ? 'Enviando imagem...' : 'Salvar Pacote'}
            </button>
          </div>

        </form>
      </div>
  </div>
  );
}
