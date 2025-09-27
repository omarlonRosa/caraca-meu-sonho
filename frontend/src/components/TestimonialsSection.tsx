// frontend/web/src/components/TestimonialsSection.tsx
import { FaQuoteLeft } from 'react-icons/fa';

// Dados de exemplo para os depoimentos
const testimonials = [
  {
    quote: "Uma experiência que transcende a fotografia. O Janderson não apenas registra momentos, ele captura a alma da viagem. Inesquecível!",
    authorName: 'Ana Clara',
    authorImage: 'https://picsum.photos/id/237/100/100', // Imagem de placeholder
  },
  {
    quote: "Eu nunca imaginei que voltaria de uma viagem com fotos tão espetaculares. O 'Caraca, Meu Sonho!' elevou meu padrão de como registrar memórias.",
    authorName: 'Marcos Borges',
    authorImage: 'https://picsum.photos/id/1005/100/100',
  },
  {
    quote: "Viajar com um fotógrafo dedicado muda tudo. Pude viver cada segundo sem me preocupar em pegar o celular. O resultado são as fotos mais incríveis da minha vida.",
    authorName: 'Juliana Paiva',
    authorImage: 'https://picsum.photos/id/1011/100/100',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-brand-dark">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-heading font-extrabold text-center mb-16 text-brand-dark dark:text-brand-light">
          O que dizem os nossos viajantes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-brand-light dark:bg-slate-800 p-8 rounded-lg shadow-md flex flex-col">
              <FaQuoteLeft className="text-brand-primary text-3xl mb-4" />
              <p className="text-brand-gray dark:text-slate-300 mb-6 flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center mt-auto">
                <img src={testimonial.authorImage} alt={`Foto de ${testimonial.authorName}`} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold font-heading text-brand-dark dark:text-white">{testimonial.authorName}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
