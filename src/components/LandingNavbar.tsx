import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import app from '../lib/firebase';

export const LandingNavbar = () => {
    const auth = getAuth(app);
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [auth]);

    return (
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50 transition-all">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform">E</div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">EduConnect</span>
            </Link>
            <div className="flex items-center gap-4">
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors hidden md:block">
                    Beranda
                </Link>
                <Link to="/dev-teams" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors hidden md:block">
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
        </nav>
    );
};
