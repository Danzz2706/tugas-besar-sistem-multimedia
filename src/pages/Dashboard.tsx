import { useStore } from '../store/useStore'
import type { Notification } from '../store/useStore'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { BookOpen, Calculator, Globe, Rocket, Bell, CheckCircle, Clock, Menu, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { SettingsModal } from '../components/SettingsModal';
import { ProfileDropdown } from '../components/ProfileDropdown';
import { useSubjects } from '../hooks/useSubjects';
import { OverallProgressSidebar } from '../components/OverallProgressSidebar';
import { Loader2, Flag, Palette } from 'lucide-react';

import { useFirestoreSync } from '../hooks/useFirestoreSync';
import { seedDatabase } from '../utils/seedFirestore';
import { LogoutModal } from '../components/LogoutModal';

export const Dashboard = () => {
    const { user, logout, notifications, markNotificationRead, completedMaterials } = useStore()
    useFirestoreSync(); // Enable Firestore Sync
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const { subjects, loading } = useSubjects();

    const handleLogoutConfirm = () => {
        logout();
        navigate('/');
    };

    // Protect Route
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user) return null;

    const unreadCount = notifications.filter(n => !n.read).length;

    // Map icon names to components
    const icons: Record<string, any> = {
        Calculator,
        BookOpen,
        Rocket,
        Globe,
        Flag,
        Palette
    };

    const assignments = [
        { title: "PR Matematika - Pecahan", due: "Besok", status: "pending" },
        { title: "Membaca Puisi - Hal 24", due: "Hari ini", status: "done" },
        { title: "Proyek Tata Surya", due: "Minggu Depan", status: "pending" },
    ];

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white overflow-hidden font-sans transition-colors duration-300">
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={handleLogoutConfirm}
            />

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden animate-in fade-in"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700 p-6 flex flex-col z-30 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl text-white">E</div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">EduConnect</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto text-gray-500">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 space-y-4">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Menu</p>
                        <a href="#" className="flex items-center gap-3 bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-medium">
                            <div className="w-5 h-5" /> Dashboard
                        </a>

                    </div>

                    <div className="space-y-4 mt-8">
                        <p className="text-xs font-semibold text-gray-500 uppercase">Tugas Saya</p>
                        {assignments.map((task, i) => (
                            <div key={i} className="bg-white dark:bg-neutral-900/50 p-3 rounded-lg border border-gray-100 dark:border-neutral-700/50 shadow-sm dark:shadow-none">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-medium text-sm line-clamp-1">{task.title}</span>
                                    {task.status === "done" ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-amber-500" />}
                                </div>
                                <span className="text-xs text-gray-500">Deadline: {task.due}</span>
                            </div>
                        ))}
                    </div>
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-neutral-700">
                    <ProfileDropdown
                        user={user}
                        onLogout={() => setIsLogoutOpen(true)}
                        onSettingsClick={() => setIsSettingsOpen(true)}
                        align="bottom-left"
                        trigger={
                            <div className="flex items-center gap-3 mb-4 w-full text-left group hover:bg-gray-50 dark:hover:bg-neutral-800/50 p-2 rounded-xl transition-colors -mx-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-pink-500 to-orange-500 flex items-center justify-center font-bold text-white shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user.name.charAt(0)
                                    )}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-medium text-sm truncate group-hover:text-blue-500 transition-colors">{user.name}</p>
                                    <p className="text-xs text-gray-500">Siswa</p>
                                </div>
                            </div>
                        }
                    />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                {/* Header Mobile */}
                <div className="md:hidden flex justify-between items-center mb-6">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-600 dark:text-gray-300">
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-lg text-blue-600 dark:text-white">EduConnect</span>
                    <ProfileDropdown
                        user={user}
                        onLogout={() => setIsLogoutOpen(true)}
                        onSettingsClick={() => setIsSettingsOpen(true)}
                        align="right"
                        trigger={
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                            </div>
                        }
                    />
                </div>

                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-800 dark:text-white">Selamat Datang, {user.name}! 👋</h1>
                        <p className="text-gray-500 dark:text-gray-400">Siap untuk belajar hari ini?</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={seedDatabase}
                            className="text-xs bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-200 transition-colors"
                        >
                            Seed DB
                        </button>
                        <ThemeToggle />
                        <div className="relative">
                            <button
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                                className="relative p-2 bg-white dark:bg-neutral-800 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors shadow-sm dark:shadow-none border border-gray-200 dark:border-transparent"
                            >
                                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-neutral-800 animate-pulse"></span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {isNotifOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsNotifOpen(false)}></div>
                                    <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-gray-100 dark:border-neutral-700 z-20 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                                        <div className="p-4 border-b border-gray-100 dark:border-neutral-700 flex justify-between items-center">
                                            <h3 className="font-bold">Pemberitahuan</h3>
                                            <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">{unreadCount} Baru</span>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <div className="p-8 text-center text-gray-500">
                                                    <p>Tidak ada pemberitahuan</p>
                                                </div>
                                            ) : (
                                                notifications.map((notif: Notification) => (
                                                    <div
                                                        key={notif.id}
                                                        onClick={() => markNotificationRead(notif.id)}
                                                        className={`p-4 border-b border-gray-50 dark:border-neutral-700/50 hover:bg-gray-50 dark:hover:bg-neutral-700/30 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                                                    >
                                                        <div className="flex gap-3">
                                                            <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${!notif.read ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                                            <div>
                                                                <p className={`text-sm ${!notif.read ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                                                    {notif.message}
                                                                </p>
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    {new Date(notif.date).toLocaleDateString()} • {new Date(notif.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Banner */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 mb-8 relative overflow-hidden text-white shadow-lg">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Quote Hari Ini</h2>
                        <p className="text-indigo-100 max-w-lg">"Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia." - Nelson Mandela</p>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
                </div>

                {/* Subjects Grid */}
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Mata Pelajaran</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-10">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                    ) : (
                        subjects.map((subject) => {
                            const Icon = icons[subject.iconName] || BookOpen;
                            // Dynamic color assignment based on subject ID for consistency or random for fun
                            const colorClass =
                                subject.id === 'matematika' ? 'border-orange-200 dark:border-orange-500/20' :
                                    subject.id === 'bahasa-indonesia' ? 'border-red-200 dark:border-red-500/20' :
                                        subject.id === 'ipa' ? 'border-purple-200 dark:border-purple-500/20' :
                                            subject.id === 'ips' ? 'border-green-200 dark:border-green-500/20' :
                                                'border-blue-200 dark:border-blue-500/20';

                            const bgClass =
                                subject.id === 'matematika' ? 'bg-orange-50 dark:bg-orange-500/10' :
                                    subject.id === 'bahasa-indonesia' ? 'bg-red-50 dark:bg-red-500/10' :
                                        subject.id === 'ipa' ? 'bg-purple-50 dark:bg-purple-500/10' :
                                            subject.id === 'ips' ? 'bg-green-50 dark:bg-green-500/10' :
                                                'bg-blue-50 dark:bg-blue-500/10';

                            return (
                                <Link
                                    key={subject.id}
                                    to={`/subject/${subject.id}`}
                                    className={`block p-6 rounded-2xl border ${colorClass} ${bgClass} hover:scale-[1.02] transition-transform cursor-pointer group shadow-sm dark:shadow-none`}
                                >
                                    <div className="mb-4 bg-white dark:bg-neutral-800 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm">
                                        <Icon className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{subject.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{subject.modules?.length || 0} Modul</p>

                                    <button className="w-full bg-white/50 hover:bg-white/80 dark:bg-black/20 dark:hover:bg-black/30 text-gray-700 dark:text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                        Buka Kelas
                                    </button>
                                </Link>
                            );
                        })
                    )}
                </div>

                {/* Recent Activity */}
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Aktivitas Terbaru</h2>
                <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-gray-200 dark:border-neutral-700 p-6 shadow-sm dark:shadow-none">
                    <div className="space-y-4">
                        {/* Static Notifications removed, using Store Notifications just above in header, here we can show something else or just keep notification history view */}
                        {notifications.slice(0, 3).map((notif) => (
                            <div key={notif.id} className="flex gap-4 items-start pb-4 border-b border-gray-100 dark:border-neutral-700/50 last:border-0 last:pb-0">
                                <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${notif.type === 'success' ? 'bg-green-500' : notif.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{notif.message}</p>
                                    <p className="text-sm text-gray-500">{new Date(notif.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                        {notifications.length === 0 && (
                            <p className="text-gray-500 text-center">Belum ada aktivitas.</p>
                        )}
                    </div>
                </div>
            </main>

            {/* Right Sidebar - Overall Progress (Desktop) */}
            <div className="hidden lg:block h-full border-l border-gray-200 dark:border-neutral-700">
                <OverallProgressSidebar
                    subjects={subjects}
                    completedMaterials={completedMaterials || []}
                    className="w-80"
                />
            </div>
        </div>
    )
}
