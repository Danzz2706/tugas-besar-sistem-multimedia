import { useStore } from "../store/useStore";
import { Users, BookOpen, Settings, CheckCircle, Book, BarChart3, Menu, ArrowLeft, Plus, Trash2, User as UserIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import { ProfileDropdown } from "../components/ProfileDropdown";
import { useState } from "react";
import { LogoutModal } from "../components/LogoutModal";
import { useStudents } from "../hooks/useStudents";
import { useSubjects } from "../hooks/useSubjects";
import { useManageContent } from "../hooks/useManageContent";

export const TeacherDashboard = () => {
    const { user, logout } = useStore();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'materials' | 'students' | 'settings'>('dashboard');

    // Hooks
    const { students } = useStudents();
    const { subjects } = useSubjects();
    const { addSubject, deleteSubject, loading: contentLoading } = useManageContent();

    const handleLogoutConfirm = () => {
        logout();
        navigate("/");
    };

    // Calculate Stats
    const totalStudents = students.length;
    const totalCompletedMaterials = students.reduce((acc, s) => acc + (s.completedMaterials?.length || 0), 0);
    const totalQuizzesTaken = students.reduce((acc, s) => acc + (s.studentRecords?.length || 0), 0);
    const avgQuizScore = totalQuizzesTaken > 0
        ? Math.round(students.reduce((acc, s) => acc + (s.studentRecords?.reduce((sAcc, r) => sAcc + (r.score / r.maxScore) * 100, 0) || 0), 0) / totalQuizzesTaken)
        : 0;

    // Handlers for Content
    const handleAddSubject = async () => {
        const name = prompt("Nama Mata Pelajaran Baru:");
        if (!name) return;
        const desc = prompt("Deskripsi:");
        try {
            await addSubject({
                name,
                description: desc || "Mata pelajaran baru",
                iconName: "BookOpen"
            });
            alert("Mata pelajaran berhasil dibuat!");
        } catch (e: any) {
            alert("Gagal membuat: " + e.message);
        }
    };

    const handleDeleteSubject = async (id: string) => {
        if (confirm("Yakin ingin menghapus mata pelajaran ini? Semua data terkait akan hilang.")) {
            await deleteSubject(id);
        }
    }

    return (
        <div className="flex bg-gray-50 dark:bg-neutral-900 min-h-screen font-sans transition-colors duration-300">
            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={handleLogoutConfirm}
            />
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
                    <button
                        onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700'}`}
                    >
                        <BarChart3 className="w-5 h-5" /> Dashboard
                    </button>
                    <button
                        onClick={() => { setActiveTab('materials'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'materials' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700'}`}
                    >
                        <Book className="w-5 h-5" /> Kelola Materi
                    </button>
                    <button
                        onClick={() => { setActiveTab('students'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'students' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700'}`}
                    >
                        <Users className="w-5 h-5" /> Data Siswa
                    </button>
                    <button
                        onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700'}`}
                    >
                        <Settings className="w-5 h-5" /> Pengaturan
                    </button>
                </nav>

                <div className="border-t border-gray-200 dark:border-neutral-700 pt-6">
                    <ProfileDropdown
                        user={user!}
                        onLogout={() => setIsLogoutOpen(true)}
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
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                                {activeTab === 'dashboard' ? 'Dashboard Guru' :
                                    activeTab === 'materials' ? 'Kelola Materi' :
                                        activeTab === 'students' ? 'Data Siswa' : 'Pengaturan'}
                            </h1>
                            <p className="hidden md:block text-gray-500 dark:text-gray-400">
                                {activeTab === 'dashboard' ? 'Ringkasan aktivitas belajar mengajar.' : ''}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <ProfileDropdown
                            user={user!}
                            onLogout={() => setIsLogoutOpen(true)}
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

                {activeTab === 'dashboard' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Siswa</h3>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalStudents}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Materi Selesai (Total)</h3>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalCompletedMaterials}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Rata-rata Nilai Kuis</h3>
                                        <p className="text-2xl font-bold text-gray-800 dark:text-white">{avgQuizScore}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'students' && (
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-gray-200 dark:border-neutral-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-neutral-700/50">
                                    <tr>
                                        <th className="p-4 text-sm font-bold text-gray-500 dark:text-gray-400">Nama Siswa</th>
                                        <th className="p-4 text-sm font-bold text-gray-500 dark:text-gray-400">Email</th>
                                        <th className="p-4 text-sm font-bold text-gray-500 dark:text-gray-400">Materi Selesai</th>
                                        <th className="p-4 text-sm font-bold text-gray-500 dark:text-gray-400">Kuis Selesai</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
                                    {students.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700/30 transition-colors">
                                            <td className="p-4 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                                                    {student.avatar ? <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" /> : <UserIcon className="w-5 h-5" />}
                                                </div>
                                                <span className="font-medium dark:text-white">{student.name}</span>
                                            </td>
                                            <td className="p-4 text-gray-500 dark:text-gray-400">{student.email}</td>
                                            <td className="p-4 dark:text-white">{student.completedMaterials?.length || 0}</td>
                                            <td className="p-4 dark:text-white">{student.studentRecords?.length || 0}</td>
                                        </tr>
                                    ))}
                                    {students.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-gray-500">Belum ada siswa terdaftar.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'materials' && (
                    <div>
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={handleAddSubject}
                                disabled={contentLoading}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-blue-500/30 transition-all"
                            >
                                <Plus className="w-5 h-5" /> Tambah Mata Pelajaran
                            </button>
                        </div>
                        <div className="grid gap-6">
                            {subjects.map(subject => (
                                <div key={subject.id} className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-sm flex justify-between items-start group">
                                    <div>
                                        <h3 className="text-xl font-bold dark:text-white flex items-center gap-2 mb-2">
                                            {subject.name}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 mb-4">{subject.description}</p>
                                        <div className="flex gap-2">
                                            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md font-bold">
                                                {subject.modules?.length || 0} Modul
                                            </span>
                                            {/* We can add total materials count here if we calculate it */}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteSubject(subject.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        title="Hapus Mata Pelajaran"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl border border-gray-200 dark:border-neutral-700 text-center">
                        <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Pengaturan Akun</h3>
                        <p className="text-gray-500 mb-6">Anda dapat mengubah profil anda melalui menu di pojok kanan atas.</p>
                    </div>
                )}

            </main>
        </div>
    );
};
