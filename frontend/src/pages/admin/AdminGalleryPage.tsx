import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPacoteById, uploadGalleryImages, type PacoteViagem } from '../../services/api';
import { FaUpload } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';

interface GaleriaFoto {
  id: number;
  imageUrl: string;
}

interface PacoteComGaleria extends PacoteViagem {
  galeriaFotos?: GaleriaFoto[];
}

export function AdminGalleryPage() {
  const { pacoteId } = useParams<{ pacoteId: string }>();
  const [pacote, setPacote] = useState<PacoteComGaleria | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pacoteId) {
      fetchPacoteById(pacoteId)
        .then(data => setPacote(data))
        .catch(() => setError("Pacote não encontrado."))
        .finally(() => setLoading(false));
    }
  }, [pacoteId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pacoteId || !selectedFiles || selectedFiles.length === 0) {
      alert("Por favor, selecione um ou mais arquivos.");
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const options = {
        maxSizeMB: 1, 
        maxWidthOrHeight: 1920, 
        useWebWorker: true,
      };

      console.log(`Comprimindo ${selectedFiles.length} imagens...`);
      const compressionPromises = Array.from(selectedFiles).map(file => imageCompression(file, options));
      const compressedBlobs = await Promise.all(compressionPromises);

      const dataTransfer = new DataTransfer();
	
      compressedBlobs.forEach((blob: Blob, index: number) => {
        const originalFile = selectedFiles[index];
        const file = new File([blob], originalFile.name, { type: blob.type });
        dataTransfer.items.add(file);
      });

      const compressedFileList = dataTransfer.files;

      console.log("Compressão concluída. Enviando para o servidor...");
      const pacoteAtualizado = await uploadGalleryImages(pacoteId, compressedFileList);
      
      setPacote(pacoteAtualizado);
      setSelectedFiles(null);
      alert("Fotos enviadas com sucesso!");
    } catch (err) {
      console.error(err);
      setError("Falha ao enviar as fotos. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p>Carregando informações do pacote...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!pacote) return <p>Pacote não encontrado.</p>;

  return (
    <div className="container mx-auto py-12 px-8">
      <Link to="/admin" className="text-brand-primary hover:underline mb-4 block">&larr; Voltar para o Dashboard</Link>
      <h1 className="text-4xl font-heading font-bold mb-2">Gerenciar Galeria</h1>
      <h2 className="text-2xl font-semibold text-brand-gray mb-8">{pacote.titulo}</h2>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md mb-12">
        <h3 className="text-xl font-bold mb-4">Adicionar Novas Fotos</h3>
        <div className="flex items-center gap-4">
          <input 
            type="file" 
            multiple
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => setSelectedFiles(e.target.files)}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-brand-primary hover:file:bg-violet-100"
          />
          <button type="submit" disabled={uploading} className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-400 flex items-center gap-2">
            <FaUpload />
            {uploading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
        {selectedFiles && <p className="text-sm text-gray-500 mt-2">{selectedFiles.length} arquivo(s) selecionado(s).</p>}
      </form>

      <div>
        <h3 className="text-xl font-bold mb-4">Fotos Atuais na Galeria</h3>
        {pacote.galeriaFotos && pacote.galeriaFotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pacote.galeriaFotos.map((foto: GaleriaFoto) => (
              <div key={foto.id} className="rounded-lg overflow-hidden shadow-lg">
                <img src={foto.imageUrl} alt="Foto da galeria" className="w-full h-40 object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-brand-gray">Ainda não há fotos na galeria para este pacote.</p>
        )}
      </div>
    </div>
  );
}
