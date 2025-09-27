
export function HeroSection() {
  const videoUrl = 'https://res.cloudinary.com/djrzoct2q/video/upload/v1756939513/video_hero_e6accx.mp4';

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Vídeo de Fundo */}
      <video
        className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-0"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline // Essencial para o autoplay funcionar em dispositivos iOS
      />
      
      {/* Overlay Escuro para Legibilidade */}
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Conteúdo Centralizado */}
      <div className="relative z-20 text-center px-4">
        <h1 className="text-3xl text-center md:text-7xl font-heading font-extrabold drop-shadow-lg">
          Viaje com o fotógrafo dos seus sonhos.
        </h1>
        <button className="mt-8 bg-brand-primary hover:bg-teal-600 text-white font-bold text-lg py-4 px-8 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
          Quero viver essa experiência
        </button>
      </div>
    </section>
  );
}
