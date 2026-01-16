import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPacoteById, uploadGalleryImages, deleteGalleryImage, type PacoteViagem } from '../../services/api';
import { FaUpload, FaTrash } from 'react-icons/fa';
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

  const carregarDados = async () => {
    if (pacoteId) {
      try {
        const data = await fetchPacoteById(pacoteId);
        setPacote(data);
        setError(null);
      } catch (err) {
        setError("Pacote não encontrado.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    carregarDados();
  }, [pacoteId]);


    const handleDeleteFoto = async (fotoId: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta foto?")) return;
    
    console.log(`🗑️ [Page] Tentando excluir Foto ID: ${fotoId} do Pacote ID: ${pacoteId}`);

    try {
        if (pacoteId) {
            await deleteGalleryImage(pacoteId, fotoId);
            
            if (pacote) {
                setPacote({
                    ...pacote,
                    galeriaFotos: pacote.galeriaFotos?.filter(f => f.id !== fotoId)
                });
            }
            alert("Foto excluída com sucesso!");
        }
    } catch (err: any) { // 'any' para capturar a mensagem de erro detalhada
        console.error("❌ [Page] Erro capturado:", err);
        alert(`Erro ao excluir: ${err.message}`);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pacoteId || !selectedFiles || selectedFiles.length === 0) {
      alert("Por favor, selecione um ou mais arquivos.");
      return;
    }

    setUploading(true);
    setError(null);
    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressionPromises = Array.from(selectedFiles).map(file => imageCompression(file, options));
      const compressedBlobs = await Promise.all(compressionPromises);

      const dataTransfer = new DataTransfer();
      compressedBlobs.forEach((blob: Blob, index: number) => {
        const file = new File([blob], selectedFiles[index].name, { type: blob.type });
        dataTransfer.items.add(file);
      });

      await uploadGalleryImages(pacoteId, dataTransfer.files);
      await carregarDados(); // Recarrega para mostrar as novas fotos
      
      setSelectedFiles(null);
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      alert("Fotos enviadas com sucesso!");
    } catch (err) {
      console.error(err);
      setError("Falha ao enviar as fotos. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  if (loading && !pacote) return <p className="text-center py-10">Carregando...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  if (!pacote) return <p className="text-center py-10">Pacote não encontrado.</p>;

  return (
    <div className="container mx-auto py-12 px-8">
      <Link to="/admin" className="text-brand-primary hover:underline mb-4 block">&larr; Voltar para o Dashboard</Link>
      <h1 className="text-4xl font-heading font-bold mb-2">Gerenciar Galeria</h1>
      <h2 className="text-2xl font-semibold text-brand-gray mb-8">{pacote.titulo}</h2>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md mb-12">
        <h3 className="text-xl font-bold mb-4 dark:text-white">Adicionar Novas Fotos</h3>
        <div className="flex items-center gap-4">
          <input 
            type="file" multiple accept="image/*"
            onChange={(e) => setSelectedFiles(e.target.files)}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-brand-primary hover:file:bg-violet-100 cursor-pointer"
          />
          <button type="submit" disabled={uploading} className="bg-brand-primary hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-400 flex items-center gap-2">
            <FaUpload /> {uploading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
        {selectedFiles && <p className="text-sm text-gray-500 mt-2">{selectedFiles.length} arquivos selecionados.</p>}
      </form>

      <div>
        <h3 className="text-xl font-bold mb-4 dark:text-white">Fotos Atuais ({pacote.galeriaFotos?.length || 0})</h3>
        {pacote.galeriaFotos && pacote.galeriaFotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pacote.galeriaFotos.map((foto: GaleriaFoto) => (
              <div key={foto.id} className="relative rounded-lg overflow-hidden shadow-lg aspect-video group">
                <img 
                  src={foto.imageUrl} 
                  alt={`Foto ${foto.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <button 
                    onClick={() => handleDeleteFoto(foto.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                    title="Excluir foto"
                >
                    <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-50 dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <p className="text-gray-500">Ainda não há fotos na galeria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
