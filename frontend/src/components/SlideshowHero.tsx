import { type HeroConfig } from "../services/api";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function SlideshowHero({ config }: { config: HeroConfig }) {
	const handleScrollToDestinations = () => {
    document.getElementById('destinos-destaque')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id="home" className="relative h-screen text-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        navigation 
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {config.slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black opacity-50 z-10" />
              <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl md:text-7xl font-heading font-extrabold drop-shadow-lg">{config.title}</h1>
                <button 
									onClick={handleScrollToDestinations}
									className="mt-8 bg-brand-primary hover:bg-teal-600 text-white font-bold text-lg py-4 px-8 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
                  {config.subtitle}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
