
import { AboutSection } from '../components/AboutSection';
import { FeaturedDestinations } from '../components/FeaturedDestinations';
import { HeroSection } from '../components/HeroSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { InstagramFeedSection } from '../components/InstagramFeedSection';
import { PhotographerSection } from '../components/PhotographerSection';
import { TestimonialsSection } from '../components/TestimonialsSection';

export function HomePage() {
  
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedDestinations/>
      <HowItWorksSection />
      <TestimonialsSection />
      <PhotographerSection />
      <InstagramFeedSection />
    </>
  )
}
