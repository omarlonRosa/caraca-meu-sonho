export function Hero() {
  return (
    <section className="relative h-screen flex items-centerjustify-center text-center text-white bg-gradient-to-b from-transparent to-brand-dark/50">
      {/* BG */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero-background.jpg"
          alt="Paisagem de montanhas ao amanhecer" 
          className="w-full h-full object-cover" 
        />
         <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-extrabold font-heading drop-shadow-lg">
          Sua Jornada. Seu Sonho. Nossas Lentes.
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-brand-light max-w-3xl mx-auto drop-shadow-md">
          Viva experiências inesquecíveis enquanto um fotógrafo profissional eterniza cada momento.
        </p>
        <a href="#proximas-experiencias" className="mt-8 inline-block px-10 py-4 bg-brand-primary text-white font-bold rounded-lg text-lg hover:bg-teal-600 transition-colors">
          Ver Expedições
        </a>
      </div>

    </section>
  )
}

