import { useState, useEffect } from 'react';
import { getActiveHeroConfig, type HeroConfig } from '../services/api';
import { BannerHero } from './BannerHero';
import { VideoHero } from './VideoHero';
import { SlideshowHero } from './SlideshowHero';

export function HeroSection() {
  const [heroConfig, setHeroConfig] = useState<HeroConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getActiveHeroConfig()
      .then(data => {
        setHeroConfig(data);
      })
      .catch(err => {
        setError("Não foi possível carregar o conteúdo principal.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section className="h-screen bg-gray-200 dark:bg-slate-800 flex items-center justify-center">Carregando...</section>;
  }

  if (error || !heroConfig) {
    return <section className="h-screen bg-red-100 flex items-center justify-center text-red-700">{error || "Hero não configurado."}</section>;
  }

  switch (heroConfig.type) {
    case 'BANNER':
      return <BannerHero config={heroConfig} />;
    
    case 'VIDEO':
      return <VideoHero config={heroConfig} />;
    
    case 'SLIDESHOW':
      if (heroConfig.slides && heroConfig.slides.length > 0) {
        return <SlideshowHero config={heroConfig} />;
      }
      return <BannerHero config={{...heroConfig, mainUrl: 'https://res.cloudinary.com/djrzoct2q/image/upload/v1756939987/banner_hero_default_v2_x2k9v0.jpg' }} />;
    
    default:
      return <section className="h-screen bg-red-100 flex items-center justify-center">Tipo de Hero inválido.</section>;
  }
}
