import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { useStore } from '../store/useStore';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('student');
    const navigate = useNavigate();
    const login = useStore((state) => state.login);

    const handleGoogleLogin = async () => {
        try {
            const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
            const { auth } = await import("../lib/firebase");
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (err: any) {
            console.error("Google Login Error:", err);
            setError(err.message || 'Google Login failed');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } = await import("firebase/auth");
            const { auth } = await import("../lib/firebase");

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name
            });

            const { doc, setDoc, getFirestore } = await import("firebase/firestore");
            const dbFirestore = getFirestore();

            await setDoc(doc(dbFirestore, "users", user.uid), {
                name: name,
                email: email,
                role: role,
                createdAt: new Date().toISOString()
            });

            login({
                id: user.uid,
                name: user.displayName || name,
                email: user.email || email,
                role: role
            });

            await sendEmailVerification(user);

            // Show alert or toast that email verification is sent
            alert("Registration successful! Please check your email to verify your account.");

            // Redirect to Login on success
            navigate('/login');

        } catch (err: any) {
            console.error("Registration Error:", err);
            // Improve error messages
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already in use.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError(err.message || 'Registration failed');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white p-4 transition-colors duration-300">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 transition-colors duration-300">
                <h1 className="text-3xl font-bold mb-2 text-center text-green-600 dark:text-green-400">Join Us! 🚀</h1>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-8">Create an account to start learning.</p>

                {error && <div className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 p-3 rounded mb-4 text-sm text-center">{error}</div>}

                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-600 text-gray-700 dark:text-gray-200 font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
                        <path fill="currentColor" d="M12 4.36c1.61 0 3.09.56 4.23 1.64l3.18-3.18C17.46 1.05 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Sign up with Google
                </button>

                <div className="flex items-center gap-2 mb-4">
                    <div className="h-px bg-gray-300 dark:bg-neutral-600 flex-1"></div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
                    <div className="h-px bg-gray-300 dark:bg-neutral-600 flex-1"></div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none transition-colors"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-300 dark:border-neutral-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Daftar Sebagai</label>
                        <div className="flex gap-4">
                            <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${role === 'student' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800'}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={role === 'student'}
                                    onChange={() => setRole('student')}
                                    className="hidden"
                                />
                                <span className="font-medium">Siswa</span>
                            </label>
                            <label className={`flex-1 flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all ${role === 'teacher' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800'}`}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="teacher"
                                    checked={role === 'teacher'}
                                    onChange={() => setRole('teacher')}
                                    className="hidden"
                                />
                                <span className="font-medium">Guru</span>
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg transition-colors mt-2">
                        Register
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
                    Already have an account? <Link to="/login" className="text-green-600 dark:text-green-400 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};
