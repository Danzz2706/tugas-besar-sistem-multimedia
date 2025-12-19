import { useStore } from "../store/useStore";
import { Users, BookOpen, Settings, CheckCircle, Book, BarChart3, Menu, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { useState } from "react";

export const TeacherDashboard = () => {
    const { user, logout } = useStore();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Use store to get actual progress
    const { studentRecords, completedMaterials } = useStore();

    // Calculate completion percentage
    // For demo purposes, let's assume total materials across all 3 subjects is roughly 15
    const totalMaterialsEstimated = 15;
    const progressPercentage = Math.min(100, Math.round((completedMaterials.length / totalMaterialsEstimated) * 100));

    return (
        <div className="flex bg-gray-50 dark:bg-neutral-900 min-h-screen font-sans transition-colors duration-300">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700 p-6 flex flex-col z-30 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex items-center gap-3 mb-10">
                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                        <Book className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">EduTeacher</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto text-gray-500">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-medium">
                        <BarChart3 className="w-5 h-5" /> Dashboard
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-xl font-medium transition-colors">
                        <Book className="w-5 h-5" /> Kelola Materi
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-xl font-medium transition-colors">
                        <Users className="w-5 h-5" /> Data Siswa
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-xl font-medium transition-colors">
                        <Settings className="w-5 h-5" /> Pengaturan
                    </button>
                </nav>

                <div className="border-t border-gray-200 dark:border-neutral-700 pt-6">
                    <ProfileDropdown
                        user={user!}
                        onLogout={handleLogout}
                        align="bottom-left"
                        trigger={
                            <div className="flex items-center gap-3 mb-2 w-full text-left group hover:bg-gray-50 dark:hover:bg-neutral-800/50 p-2 rounded-xl transition-colors -mx-2 cursor-pointer">
                                <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                                    {user?.name?.charAt(0) || "T"}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{user?.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Pengajar</p>
                                </div>
                            </div>
                        }
                    />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto md:ml-64 w-full">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-600 dark:text-gray-300">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Dashboard Guru</h1>
                            <p className="hidden md:block text-gray-500 dark:text-gray-400">Selamat datang, Bu Guru! 👋</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <ProfileDropdown
                            user={user!}
                            onLogout={handleLogout}
                            align="right"
                            trigger={
                                <div className="hidden md:flex items-center gap-2 bg-white dark:bg-neutral-800 px-4 py-2 rounded-full shadow-sm border border-gray-100 dark:border-neutral-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors">
                                    <img
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher"
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full bg-blue-100"
                                    />
                                    <span className="font-bold text-sm text-gray-700 dark:text-gray-200">{user?.name || "Guru"}</span>
                                </div>
                            }
                        />
                        <ThemeToggle />
                    </div>
                </header>

                {/* On Development Banner */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl p-4 mb-8 flex items-center gap-4">
                    <div className="p-2 bg-amber-100 dark:bg-amber-800 rounded-lg text-amber-600 dark:text-amber-400">
                        <Settings className="w-6 h-6 animate-spin-slow" />
                    </div>
                    <div>
                        <h3 className="font-bold text-amber-800 dark:text-amber-200">Mode Pengembang (On Development)</h3>
                        <p className="text-sm text-amber-700 dark:text-amber-300">Fitur pengelolaan materi guru sedang dalam tahap pengembangan.</p>
                    </div>
                </div>

                {/* Quick Stats - Real Data Tracking */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Siswa Aktif</h3>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">1</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-green-500 text-sm">
                            <span className="bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded text-xs font-bold">+100%</span>
                            <span>dari bulan lalu</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Materi Selesai</h3>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{completedMaterials.length}</p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2 mt-2">
                            <div className="bg-purple-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}% ` }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{progressPercentage}% dari total materi</p>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Rata-rata Kuis</h3>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                    {studentRecords.length > 0
                                        ? Math.round(studentRecords.reduce((acc, curr) => acc + (curr.score / curr.maxScore * 100), 0) / studentRecords.length)
                                        : 0}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">Dari {studentRecords.length} kuis yang dikerjakan</p>
                    </div>
                </div>
                {/* Placeholder Content Area */}
                <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-gray-200 dark:border-neutral-700 p-8 text-center py-20">
                    <div className="bg-gray-100 dark:bg-neutral-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Belum ada aktivitas terkini</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">Mulai dengan menambahkan materi baru atau memeriksa hasil kuis siswa.</p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                            Buat Materi Baru
                        </button>
                        <button
                            onClick={async () => {
                                const { seedDatabase } = await import("../utils/seedFirestore");
                                await seedDatabase();
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            isi database (dummy)
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
