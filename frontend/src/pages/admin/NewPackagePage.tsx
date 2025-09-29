import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPacoteViagem, uploadImage, type NewPackageData } from '../../services/api';
import { PackageForm } from '../../components/PackageForm';

export function NewPackagePage() {
  const [formData, setFormData] = useState<NewPackageData>({
    titulo: '', destino: '', descricao: '', dataPartida: '',
    duracaoDias: 0, preco: 0, vagasDisponiveis: 0,
    urlFotoPrincipal: '', featured: false,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

        if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setSelectedFile(files[0]);
      }
      return;
    }

    const isCheckbox = type === 'checkbox';
    // @ts-ignore
    setFormData(prev => ({
            ...prev, 
            [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
        }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

        if (!selectedFile) {
      alert("Por favor, selecione uma imagem para o pacote.");
      return;
    }

        setIsUploading(true);



    try {

      const uploadResponse = await uploadImage(selectedFile);
      const imageUrl = uploadResponse.imageUrl;


      await createPacoteViagem({
        ...formData,
        urlFotoPrincipal: imageUrl,
        duracaoDias: Number(formData.duracaoDias),
        preco: Number(formData.preco),
        vagasDisponiveis: Number(formData.vagasDisponiveis),
      });

      navigate('/admin');

    } catch (error) {
      console.error("Erro ao criar pacote:", error);
      alert("Falha ao criar pacote.");
    } finally {
      setIsUploading(false);
    }
  };

    if (isUploading) return <p>Enviando imagem e salvando pacote, por favor aguarde...</p>

  return (
    <div className="container mx-auto py-12 px-8">
      <h1 className="text-4xl font-heading font-bold mb-8">Adicionar Novo Pacote</h1>
      <PackageForm 
				formData={formData}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				selectedFile={selectedFile}
			/>
    </div>
  );
}
