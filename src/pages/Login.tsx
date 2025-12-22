import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ThemeToggle } from '../components/ThemeToggle';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('student');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const login = useStore((state) => state.login);

    const handleGoogleLogin = async () => {
        try {
            const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
            const { auth } = await import("../lib/firebase");
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            login({
                id: user.uid,
                name: user.displayName || 'User',
                email: user.email || '',
                role: role // Use currently selected role even for Google Login for simplicity
            });

            navigate(role === 'teacher' ? '/teacher-dashboard' : '/dashboard');
        } catch (err: any) {
            console.error("Google Login Error:", err);
            setError(err.message || 'Google Login failed');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const { signInWithEmailAndPassword } = await import("firebase/auth");
            const { auth } = await import("../lib/firebase");

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            login({
                id: user.uid,
                name: user.displayName || 'User',
                email: user.email || '',
                role: role
            });

            navigate(role === 'teacher' ? '/teacher-dashboard' : '/dashboard');

        } catch (err: any) {
            console.error("Login Error:", err);
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else {
                setError(err.message || 'Login failed');
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white transition-colors duration-300">
            {/* Left Side - Image (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-blue-600">
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="Login Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80 flex flex-col justify-center px-12 text-white">
                    <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                        Selamat Datang Kembali di <br />
                        <span className="text-yellow-300">EduConnect!</span>
                    </h2>
                    <p className="text-xl text-blue-100 max-w-md leading-relaxed">
                        Lanjutkan perjalanan belajarmu, akses materi eksklusif, dan raih prestasimu hari ini.
                    </p>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-12 relative animate-fade-in">
                <div className="absolute top-4 right-4">
                    <ThemeToggle />
                </div>

                <div className="w-full max-w-md bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 transition-colors duration-300">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">Welcome Back! 👋</h1>
                        <p className="text-gray-500 dark:text-gray-400">Login untuk melanjutkan belajar.</p>
                    </div>

                    {error && <div className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 p-3 rounded-lg mb-6 text-sm text-center font-medium border border-red-200 dark:border-red-500/20">{error}</div>}

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-600 text-gray-700 dark:text-gray-200 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-3 mb-6 group hover:shadow-md"
                    >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
                            <path fill="currentColor" d="M12 4.36c1.61 0 3.09.56 4.23 1.64l3.18-3.18C17.46 1.05 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign in with Google
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px bg-gray-200 dark:bg-neutral-600 flex-1"></div>
                        <span className="text-sm font-medium text-gray-400 dark:text-gray-500">ATAU LOGIN DENGAN EMAIL</span>
                        <div className="h-px bg-gray-200 dark:bg-neutral-600 flex-1"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Login Sebagai</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${role === 'student' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={role === 'student'}
                                        onChange={() => setRole('student')}
                                        className="hidden"
                                    />
                                    <span className="font-bold text-sm">🎓 Siswa</span>
                                </label>
                                <label className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${role === 'teacher' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="teacher"
                                        checked={role === 'teacher'}
                                        onChange={() => setRole('teacher')}
                                        className="hidden"
                                    />
                                    <span className="font-bold text-sm">👨‍🏫 Guru</span>
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 mt-2">
                            Masuk Sekarang
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
                        Belum punya akun? <Link to="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Daftar disini</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
