import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleLogout = () => {
		logout();
		setIsMenuOpen(false); 
		setIsDropdownOpen(false);
		navigate('/'); 
	};

	const profileLink = user?.roles.includes('ROLE_ADMIN') ? '/admin' : '/dashboard';

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef]);

	const handleNavigateAndScroll = (href: string) => {
		setIsMenuOpen(false);
		const isAnchorLink = href.startsWith('/#');
		
		if (isAnchorLink) {
			const sectionId = href.substring(2);
			
			if (location.pathname === '/') {
				document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
			} else {
				navigate('/');
				setTimeout(() => {
					document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
				}, 100);
			}
		} else {
			navigate(href);
		}
	};

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'Destinos', href: '/destinos' },
		{ name: 'Sobre', href: '/#about' },
		{ name: 'Contato', href: '/#contact' },
	];

	const renderNavLink = (link: { name: string, href: string }, mobile = false) => {
		const isAnchorLink = link.href.startsWith('/#');
		const mobileClasses = "text-2xl text-brand-gray hover:text-white transition-colors";
		const desktopClasses = "text-brand-gray hover:text-white transition-colors";
		const currentClasses = mobile ? mobileClasses : desktopClasses;

		if (isAnchorLink) {
			return (
				<button 
					key={link.name}
					onClick={() => handleNavigateAndScroll(link.href)}
					className={currentClasses}
				>
					{link.name}
				</button>
			);
		}
		
		return (
			<Link
				key={link.name}
				to={link.href}
				onClick={() => setIsMenuOpen(false)} 
				className={currentClasses}
			>
				{link.name}
			</Link>
		);
	};

	return (
		<header className="bg-brand-dark/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
			<div className="container mx-auto px-8 py-4 flex justify-between items-center">

				<Link to="/" className="text-2xl font-heading font-bold text-white">
					Caraca, Meu Sonho!
				</Link>

				{/* Navegação para Desktop */}
				<nav className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => renderNavLink(link))}
					<ThemeToggle />
					{user ? (
						<div className="relative" ref={dropdownRef}>
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className="flex items-center gap-3 text-brand-gray hover:text-white transition-colors"
							>
								{user.fotoPerfilUrl ? (
									<img src={user.fotoPerfilUrl} alt={`Foto de ${user.nome}`} className="h-8 w-8 rounded-full object-cover" />
								) : (
									<FaUserCircle size={28} />
								)}
								Olá, {user.sub.split('@')[0]}
							</button>
							{isDropdownOpen && (
								<div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50">
									<Link
										to={profileLink}
										onClick={() => setIsDropdownOpen(false)}
										className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
									>
										Meu Dashboard
									</Link>
									<Link
										to="/meu-perfil"
										onClick={() => setIsDropdownOpen(false)}
										className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
									>
										Meu Perfil
									</Link>
									<button
										onClick={handleLogout}
										className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-slate-700"
									>
										Logout
									</button>
								</div>
							)}
						</div>
					) : (
						<Link to="/login" className="bg-brand-primary hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
							Login
						</Link>
					)}
				</nav>

				{/* Ícone do Menu Hambúrguer */}
				<div className="md:hidden flex items-center gap-4">
					<ThemeToggle />
					<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
						{isMenuOpen ? <AiOutlineClose className="h-6 w-6 text-white" /> : <AiOutlineMenu className="h-6 w-6 text-white" />}
					</button>
				</div>
			</div>

			{/* Div do Menu Móvel */}
			{isMenuOpen && (
				<div className="md:hidden absolute top-0 left-0 w-full h-screen bg-brand-dark flex flex-col items-center justify-center gap-8 animate-fade-in-down">
					{navLinks.map((link) => renderNavLink(link, true))}
					<div className="border-t border-brand-gray/20 w-1/2 my-4"></div>
					{user ? (
						<>
							<Link
								to={profileLink}
								onClick={() => setIsMenuOpen(false)}
								className="text-2xl text-brand-gray hover:text-white transition-colors"
							>
								Meu Dashboard
							</Link>
                            <Link
								to="/meu-perfil"
								onClick={() => setIsMenuOpen(false)}
								className="text-2xl text-brand-gray hover:text-white transition-colors"
							>
								Meu Perfil
							</Link>
							<button
								onClick={handleLogout}
								className="text-2xl text-red-500 hover:text-red-400 transition-colors"
							>
								Logout
							</button>
						</>
					) : (
						<Link
							to="/login"
							onClick={() => setIsMenuOpen(false)}
							className="bg-brand-primary hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-xl"
						>
							Login
						</Link>
					)}
				</div>
			)}
		</header>
	);
}
