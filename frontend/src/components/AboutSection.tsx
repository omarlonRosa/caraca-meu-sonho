import { useState } from "react";
import { BsFillVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

export function AboutSection() {
  const videoUrl = 'https://res.cloudinary.com/djrzoct2q/video/upload/v1756945941/caracameusonho_os2nkj.mp4';

  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section id="about" className="py-20 bg-brand-light dark:bg-brand-dark">
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
        
        {/* Coluna da Imagem */}
        <div className="w-full md:w-1/2 relative">
          <video 
            src={videoUrl}
            className="rounded-lg shadow-2xl w-full aspect-[2/2] object-cover"
            autoPlay 
            loop
            muted={isMuted}  
            playsInline
          />

          <button 
            onClick={toggleMute}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            aria-label="Ativar/Desativar som"
          >
            {isMuted ? <BsVolumeMuteFill size={20} /> : <BsFillVolumeUpFill size={20} />}
          </button>

          </div>

        {/* Coluna do Texto */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-heading font-extrabold text-brand-dark dark:text-brand-light mb-6">
            O que é o Caraca, Meu Sonho?
          </h2>
          <p className="text-gray-600 dark:text-brand-gray text-lg mb-8 leading-relaxed">
            Mais do que uma viagem, uma imersão. O "Caraca, Meu Sonho!" nasceu da paixão de eternizar momentos únicos em lugares extraordinários. Eu, Janderson Tulio, te convido a embarcar em uma experiência onde cada clique conta uma história e cada paisagem se torna uma memória inesquecível. Não é sobre viajar, é sobre viver e ter tudo registrado.
          </p>
          <button className="bg-brand-secondary hover:bg-orange-600 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
            Conheça a proposta
          </button>
        </div>

      </div>
    </section>
  );
}
