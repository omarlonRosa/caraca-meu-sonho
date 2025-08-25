
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {/* adicionar links aqui */}
          <div className="pb-6">
            <a href="#" className="text-sm leading-6 text-brand-gray hover:text-brand-light">Sobre</a>
          </div>
          <div className="pb-6">
            <a href="#" className="text-sm leading-6 text-brand-gray hover:text-brand-light">Viagens</a>
          </div>
          <div className="pb-6">
            <a href="#" className="text-sm leading-6 text-brand-gray hover:text-brand-light">Contato</a>
          </div>
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
            {/* Ícone do Instagram */}
            <a href="https://www.instagram.com/jandersontulio/" target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-brand-light">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm-1.161 1.545a4.873 4.873 0 00-3.962.827 4.873 4.873 0 00-.827 3.962c.045 1.02.057 1.348.057 3.668s-.012 2.648-.057 3.668a4.873 4.873 0 00.827 3.962 4.873 4.873 0 003.962.827c1.02.045 1.348.057 3.668.057s2.648-.012 3.668-.057a4.873 4.873 0 003.962-.827 4.873 4.873 0 00.827-3.962c-.045-1.02-.057-1.348-.057-3.668s.012-2.648.057-3.668a4.873 4.873 0 00-.827-3.962 4.873 4.873 0 00-3.962-.827c-1.02-.045-1.348-.057-3.668-.057s-2.648.012-3.668.057zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.54a3.595 3.595 0 110 7.19 3.595 3.595 0 010-7.19z" clipRule="evenodd" />
                </svg>
            </a>
            {/* outros ícones de redes sociais */}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-brand-gray">
          &copy; {currentYear} Caraca, meu Sonho! Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
