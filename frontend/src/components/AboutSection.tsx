export function AboutSection() {
  return (
    <section className="bg-slate-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="relative">
            <img
              className="w-full h-64 sm:h-80 lg:h-96 rounded-xl shadow-xl ring-1 ring-gray-400/10 object-cover"
              src="/images/janderson-tulio.png"
              alt="Fotógrafo Janderson Tulio em uma expedição"
            />
          </div>
          <div className="flex flex-col justify-start">
            <div className="text-base leading-7 text-brand-gray">
              <p className="text-base font-semibold leading-7 text-brand-primary">
                Caraca, meu Sonho!
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-light font-heading sm:text-4xl">
                Uma câmera, um roteiro e a vontade de criar memórias.
              </h1>
              <div className="max-w-xl">
                <p className="mt-6">
                  Mais do que uma agência de viagens, o "Caraca, meu Sonho!" é um convite para viver e eternizar. Acreditamos que cada jornada é única e merece ser registrada com um olhar que captura não apenas a paisagem, mas a emoção do momento.
                </p>
                <p className="mt-8">
                  Comandado pelo fotógrafo de aventura Janderson Tulio, nosso propósito é levar você a destinos incríveis e garantir que cada sorriso, cada superação e cada pôr do sol se transforme em uma obra de arte que você poderá reviver para sempre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
