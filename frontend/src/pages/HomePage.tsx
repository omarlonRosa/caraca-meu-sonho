import { AboutSection } from "../components/AboutSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { PacoteViagemList } from "../components/PacoteViagemList";

export function HomePage() {

  return(
  <>
      <Header/>
      <main>
        <Hero />
        <AboutSection />
        <div id="proximas-experiencias" className="bg-brand-dark py-24 px-4 sm:px-6 lg:px-8">
       <PacoteViagemList />
        </div>
      </main>
      <Footer />
 </>
  )
  
}
