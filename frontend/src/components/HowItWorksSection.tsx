
import { FaMapMarkedAlt, FaClipboardList, FaRegThumbsUp, FaCameraRetro } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: <FaMapMarkedAlt className="h-10 w-10" />,
    title: '1. Escolha o destino',
    description: 'Navegue por nossas expedições e encontre a aventura que mais fala com você.',
  },
  {
    icon: <FaClipboardList className="h-10 w-10" />,
    title: '2. Entre na fila de espera',
    description: 'Garanta seu lugar na próxima turma. As vagas são limitadas para uma experiência exclusiva.',
  },
  {
    icon: <FaRegThumbsUp className="h-10 w-10" />,
    title: '3. A gente cuida de tudo',
    description: 'Da logística aos detalhes. Sua única preocupação é fazer as malas e se preparar para viver o sonho.',
  },
  {
    icon: <FaCameraRetro className="h-10 w-10" />,
    title: '4. Você viaja com fotógrafo',
    description: 'Viva cada momento intensamente, sabendo que todos os registros serão feitos com um olhar profissional.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 bg-brand-light dark:bg-slate-900">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-4xl font-heading font-extrabold text-brand-dark dark:text-brand-light mb-16">
          Como Funciona a Experiência
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* 3. O restante do código não muda nada! */}
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-brand-primary text-white mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-brand-dark dark:text-brand-light mb-2">
                {step.title}
              </h3>
              <p className="text-brand-gray dark:text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <Link
						to="/destinos"
						className="bg-brand-primary hover:bg-teal-600 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
            Ver todos os destinos
          </Link>
        </div>

      </div>
    </section>
  );
}
