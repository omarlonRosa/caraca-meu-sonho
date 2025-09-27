import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useDarkMode } from '../hooks /useDarkMode';

export function ThemeToggle() {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-brand-gray/20 hover:bg-brand-gray/40 text-brand-light backdrop-blur-sm transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <BsFillMoonStarsFill size={20} />
      ) : (
        <BsFillSunFill size={20} />
      )}
    </button>
  );
}
