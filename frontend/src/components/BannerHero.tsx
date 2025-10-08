import { type HeroConfig } from "../services/api";

interface HeroProps {
  config: HeroConfig;
}

export function BannerHero({ config }: HeroProps) {
	const handleScrollToDestinations = () => {
    document.getElementById('destinos-destaque')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${config.mainUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      <div className="relative z-20 text-center px-4">
        <h1 className="text-3xl md:text-7xl font-heading font-extrabold drop-shadow-lg">{config.title}</h1>
        <button 
					onClick={handleScrollToDestinations}
					className="mt-8 bg-brand-primary hover:bg-teal-600 text-white font-bold text-lg py-4 px-8 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
          {config.subtitle}
        </button>
      </div>
    </section>
  );
}
