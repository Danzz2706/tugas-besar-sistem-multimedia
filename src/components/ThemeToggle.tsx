import { Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useStore();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-yellow-400 transition-colors hover:bg-gray-300 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};
