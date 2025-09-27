// frontend/web/src/components/InstagramFeedSection.tsx
import { FaInstagram } from 'react-icons/fa';

const mockInstagramPosts = [
  {
    id: 1,
    imageUrl: 'https://res.cloudinary.com/djrzoct2q/image/upload/v1756936617/hero-background_sgxllf.jpg',
    postUrl: 'https://www.instagram.com/jandersontulio',   },
  {
    id: 2,
    imageUrl: 'https://res.cloudinary.com/djrzoct2q/image/upload/v1756936615/IMG_4778_zzjj91.jpg',
    postUrl: 'https://www.instagram.com/jandersontulio',
  },
  {
    id: 3,
    imageUrl: 'https://res.cloudinary.com/djrzoct2q/image/upload/v1756941408/janderson-tulio_ls3age.png',
    postUrl: 'https://www.instagram.com/jandersontulio',
  },
  {
    id: 4,
    imageUrl: 'https://res.cloudinary.com/djrzoct2q/image/upload/v1756936615/IMG_4122_qdkopb.jpg',
    postUrl: 'https://www.instagram.com/jandersontulio',
  },
];

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/jandersontulio'; // Coloque aqui o link do seu perfil

export function InstagramFeedSection() {
  return (
    <section id="instagram-feed" className="py-20 bg-brand-light dark:bg-brand-dark">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-4xl font-heading font-extrabold text-brand-dark dark:text-brand-light mb-4">
          Nossas Aventuras no Instagram
        </h2>
        <p className="text-brand-gray mb-12">Siga @jandersontulio</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockInstagramPosts.map((post) => (
            <a 
              key={post.id} 
              href={post.postUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden rounded-lg"
            >
              <img 
                src={post.imageUrl} 
                alt="Post do Instagram" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaInstagram className="text-white text-4xl" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-brand-secondary hover:bg-orange-600 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Acompanhe em tempo real
          </a>
        </div>
      </div>
    </section>
  );
}
