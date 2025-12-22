import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import app from '../lib/firebase';
import { Menu, X } from 'lucide-react';

export const LandingNavbar = () => {
    const auth = getAuth(app);
    const [user, setUser] = useState(auth.currentUser);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [auth]);

    return (
        <nav className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50 transition-all">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform">E</div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">EduConnect</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? <X className="w-6 h-6 text-gray-800 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-800 dark:text-white" />}
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                    Beranda
                </Link>
                <Link to="/dev-teams" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                    Dev Teams
                </Link>
                <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                    Blog
                </Link>
                <Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                    Harga
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-neutral-700 mx-2"></div>
                <ThemeToggle />

                {user ? (
                    <Link to="/dashboard" className="px-5 py-2 rounded-full font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all">
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="px-5 py-2 rounded-full font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-white/10 transition-colors">
                            Masuk
                        </Link>
                        <Link to="/register" className="px-5 py-2 rounded-full font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all">
                            Daftar
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="w-full md:hidden mt-4 flex flex-col gap-4 pb-4 border-t border-gray-100 dark:border-neutral-800 pt-4 animate-fade-in-down">
                    <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors block py-2">
                        Beranda
                    </Link>
                    <Link to="/dev-teams" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors block py-2">
                        Dev Teams
                    </Link>
                    <Link to="/blog" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors block py-2">
                        Blog
                    </Link>
                    <Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors block py-2">
                        Harga
                    </Link>

                    <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-neutral-800 mt-2 pt-4">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Tema</span>
                        <ThemeToggle />
                    </div>

                    {user ? (
                        <Link to="/dashboard" className="text-center w-full px-5 py-3 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all mt-2">
                            Dashboard
                        </Link>
                    ) : (
                        <div className="flex flex-col gap-3 mt-2">
                            <Link to="/login" className="text-center w-full px-5 py-3 rounded-xl font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/5 transition-colors">
                                Masuk
                            </Link>
                            <Link to="/register" className="text-center w-full px-5 py-3 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all">
                                Daftar
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};
