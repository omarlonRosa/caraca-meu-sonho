import { useEffect, useState } from 'react';
import { getAdminHeroConfig, updateAdminHeroConfig, uploadImage, type HeroConfig, type HeroConfigDTO } from '../../services/api';

export function AdminHeroPage() {
  const [config, setConfig] = useState<HeroConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [slideFiles, setSlideFiles] = useState<FileList | null>(null);
	const [videoFile, setVideoFile] = useState<File | null>(null);

  useEffect(() => {
    getAdminHeroConfig()
      .then(data => setConfig(data))
      .catch(() => setError("Não foi possível carregar a configuração do Hero."))
      .finally(() => setLoading(false));
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!config) return;
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    setError(null);

    try {
      let finalDto: HeroConfigDTO = {
        type: config.type,
        title: config.title,
        subtitle: config.subtitle,
      };

	//	let newMainUrl = config.mainUrl;

		 if (config.type === 'BANNER' && bannerFile) {
        const { imageUrl } = await uploadImage(bannerFile, 'image');
        finalDto.mainUrl = imageUrl;
      } else if (config.type === 'VIDEO' && videoFile) {
        alert("Enviando vídeo...");
        const { imageUrl: videoUrl } = await uploadImage(videoFile, 'video');
        finalDto.mainUrl = videoUrl;
      } else {
        finalDto.mainUrl = config.mainUrl;
      }

      if (config.type === 'SLIDESHOW') {
        let finalSlideUrls = config.slides.map(s => s.imageUrl);
        if (slideFiles && slideFiles.length > 0) {
          alert(`Enviando ${slideFiles.length} novas imagens...`);
          const uploadPromises = Array.from(slideFiles).map(file => uploadImage(file, 'image'));
          const uploadResults = await Promise.all(uploadPromises);
          finalSlideUrls = uploadResults.map(result => result.imageUrl);
        }
        finalDto.slideImageUrls = finalSlideUrls;
      }	
      
      await updateAdminHeroConfig(finalDto);
      alert("Configuração do Hero salva com sucesso!");

    } catch (err) {
      console.error(err);
      setError("Falha ao salvar a configuração.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!config) return null;

  return (
    <div className="container mx-auto py-12 px-8">
      <h1 className="text-4xl font-heading font-bold mb-8">Gerenciar Seção Hero</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md space-y-6">
        
        <div>
          <label className="block text-lg font-medium mb-2">Tipo de Hero</label>
          <div className="flex gap-4">
            {(['BANNER', 'VIDEO', 'SLIDESHOW'] as const).map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="type" value={type} checked={config.type === type}
                  onChange={(e) => setConfig({ ...config, type: e.target.value as HeroConfig['type'] })}
                  className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
                />
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Título Principal</label>
          <input type="text" name="title" id="title" value={config.title} onChange={handleFormChange} className="input-style w-full" />
        </div>
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium mb-1">Subtítulo / Texto do Botão</label>
          <input type="text" name="subtitle" id="subtitle" value={config.subtitle} onChange={handleFormChange} className="input-style w-full" />
        </div>

        {config.type === 'BANNER' && (
          <div>
            <label className="block text-sm font-medium mb-1">Imagem do Banner</label>
            <input type="file" onChange={(e) => setBannerFile(e.target.files ? e.target.files[0] : null)} className="input-style w-full" />
            {config.mainUrl && <img src={config.mainUrl} alt="Banner atual" className="mt-4 h-32 rounded-md" />}
          </div>
        )}

				{config.type === 'VIDEO' && (
          <div>
            <label className="block text-sm font-medium mb-1">Arquivo de Vídeo (.mp4, .webm)</label>
            <input type="file" accept="video/mp4,video/webm"
              onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)}
              className="input-style w-full"
            />
            {config.mainUrl && <p className="text-xs mt-2 truncate">URL Atual: {config.mainUrl}</p>}
          </div>
        )}


       
        {config.type === 'SLIDESHOW' && (
          <div>
            <label className="block text-sm font-medium mb-1">Imagens do Slideshow (selecionar várias substitui as atuais)</label>
            <input type="file" multiple onChange={(e) => setSlideFiles(e.target.files)} className="input-style w-full" />
            <div className="mt-4 flex gap-4 overflow-x-auto">
              {config.slides.map(slide => <img key={slide.id} src={slide.imageUrl} alt="Slide" className="h-32 rounded-md" />)}
            </div>
          </div>
        )}
        
        <div className="text-right">
          <button type="submit" disabled={saving} className="bg-brand-primary hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400">
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}
