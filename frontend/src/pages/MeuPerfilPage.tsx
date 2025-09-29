import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { uploadProfilePicture } from '../services/api';
import { FaUserCircle } from 'react-icons/fa';

export function MeuPerfilPage() {
  const { user, login } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      const response = await uploadProfilePicture(selectedFile);
      login(response.token); // ATUALIZA O CONTEXTO COM O NOVO TOKEN!
      alert('Foto de perfil atualizada com sucesso!');
      setSelectedFile(null);
    } catch (err) {
      setError('Falha ao enviar a imagem. Tente novamente.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

console.log("DADOS DO USUÁRIO NO CONTEXTO:", user);

  if (!user) return <p>Carregando perfil...</p>

  return (
    <div className="container mx-auto py-12 px-8 max-w-2xl">
      <h1 className="text-4xl font-heading font-bold mb-8">Meu Perfil</h1>
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md flex flex-col items-center">
        {user.fotoPerfilUrl ? (
          <img src={user.fotoPerfilUrl} alt="Foto de perfil" className="h-32 w-32 rounded-full object-cover mb-4" />
        ) : (
          <FaUserCircle size={128} className="text-gray-400 mb-4" />
        )}
        <h2 className="text-2xl font-bold">{user.nome}</h2>
        <p className="text-gray-600 dark:text-gray-400">{user.sub}</p>
        
        <form onSubmit={handleSubmit} className="mt-8 w-full text-center">
          <label className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg cursor-pointer">
            <span>Trocar Foto</span>
            <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
          </label>
          
          {selectedFile && <p className="mt-4 text-sm">Arquivo selecionado: {selectedFile.name}</p>}

          <button type="submit" disabled={!selectedFile || isUploading} className="mt-4 bg-brand-primary text-white font-bold py-2 px-6 rounded-lg disabled:bg-gray-400">
            {isUploading ? 'Enviando...' : 'Salvar Nova Foto'}
          </button>
          
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
