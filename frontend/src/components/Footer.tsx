import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FaWhatsapp />, url: 'https://wa.me/5594981652026?text=Ol%C3%A1%2C%20quero%20agendar%20uma%20experi%C3%AAncia%20de%20viagem%20no%20%22Caraca%2C%20meu%20sonho!%22', label: 'WhatsApp' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/jandersontulio', label: 'Instagram' },
    { icon: <FaFacebook />, url: '#', label: 'Facebook' },
    { icon: <FaTiktok />, url: '#', label: 'Tiktok' },
  ];


  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Sobre', href: '/#about' },
    { name: 'Destinos', href: '/#destaques' },
    { name: 'Contato', href: '/#photographer' },
  ];
  
  return (
    <footer className="bg-brand-dark text-brand-light">
      <div className="container mx-auto px-8 py-12 flex flex-col items-center gap-8">
        
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-brand-gray hover:text-brand-primary transition-colors">
              {link.name}
           </a>
          ))}
        </nav>

        <div className="flex gap-8">
          {socialLinks.map((social) => (
            <a 
              key={social.label}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={social.label}
              className="text-brand-gray hover:text-brand-primary transition-colors text-3xl"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <p className="text-brand-gray text-sm text-center">
          &copy; {currentYear} Caraca, Meu Sonho! por Janderson Tulio. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  );
}
