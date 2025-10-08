
export function PhotographerSection() {
	const photographerImageUrl = 'https://res.cloudinary.com/djrzoct2q/image/upload/v1756941408/janderson-tulio_ls3age.png';

	const instagramUrl = "https://www.instagram.com/jandersontulio";

	return (
		<section id="photographer" className="py-20 bg-brand-light dark:bg-slate-900">
			<div className="container mx-auto px-8 text-center max-w-3xl">

				<img 
					src={photographerImageUrl} 
					alt="Foto do fotógrafo Janderson Tulio"
					className="w-48 h-48 rounded-full mx-auto mb-8 shadow-2xl border-4 border-white dark:border-brand-gray"
				/>

				<blockquote className="text-3xl font-heading font-bold text-brand-dark dark:text-brand-light italic mb-4">
					"A melhor memória de uma viagem não é a que guardamos na mente, mas a que podemos reviver através de uma fotografia."
				</blockquote>

				<p className="text-xl text-brand-gray dark:text-slate-400 mb-8">
					— Janderson Tulio
				</p>

				<a 
					href={instagramUrl}
					target="_blank" 
					rel="noopener noreferrer"
					className="bg-brand-primary hover:bg-teal-600 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300">
					Me conheça melhor
				</a>

			</div>
		</section>
	);
}
