import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Garanta que 'uploadImage' está sendo importado
import { fetchPacoteById, updatePacoteViagem, uploadImage, type NewPackageData } from '../../services/api';
import { PackageForm } from '../../components/PackageForm';

export function EditPackagePage() {
  const [formData, setFormData] = useState<NewPackageData | null>(null);
  // --- NOVOS ESTADOS ADICIONADOS ---
  // Estado para guardar o novo arquivo de imagem selecionado pelo usuário
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Estado para mostrar uma mensagem de "carregando" durante o upload
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    fetchPacoteById(id)
      .then(data => {
        const dataFormatada = data.dataPartida ? data.dataPartida.split('T')[0] : '';
        setFormData({ ...data, dataPartida: dataFormatada });
      })
      .catch(err => console.error("Falha ao buscar pacote:", err));
  }, [id]);

  // --- FUNÇÃO `handleChange` ATUALIZADA ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Lógica para capturar o arquivo de imagem
    if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setSelectedFile(files[0]);
      }
      return; // Encerra a função aqui para não atualizar o formData com o arquivo
    }

    const isCheckbox = type === 'checkbox';
    // @ts-ignore
    setFormData(prev => prev ? { ...prev, [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value } : null);
  };

  // --- FUNÇÃO `handleSubmit` ATUALIZADA ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !formData) return;
    
    setIsUploading(true);
    let imageUrl = formData.urlFotoPrincipal; // Por padrão, mantém a imagem antiga

    try {
      // Se o usuário selecionou um novo arquivo, faz o upload dele primeiro
      if (selectedFile) {
        console.log("Novo arquivo selecionado. Fazendo upload...");
        const uploadResponse = await uploadImage(selectedFile);
        imageUrl = uploadResponse.imageUrl; // Atualiza a URL da imagem para a nova
        console.log("Upload concluído. Nova URL:", imageUrl);
      }

      // Envia os dados para atualizar o pacote, usando a imagem nova ou mantendo a antiga
      await updatePacoteViagem(id, {
        ...formData,
        urlFotoPrincipal: imageUrl, // A URL é definida aqui
        duracaoDias: Number(formData.duracaoDias),
        preco: Number(formData.preco),
        vagasDisponiveis: Number(formData.vagasDisponiveis),
      });

      navigate('/admin');
    } catch (error) {
      console.error("Erro ao atualizar pacote:", error);
      alert("Falha ao atualizar pacote.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!formData) return <p>Carregando dados do pacote...</p>;
  if (isUploading) return <p>Salvando alterações, por favor aguarde...</p>;

  return (
    <div className="container mx-auto py-12 px-8">
      <h1 className="text-4xl font-heading font-bold mb-8">Editar Pacote: {formData.titulo}</h1>
      <PackageForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} isEditing={true} />
    </div>
  );
}
