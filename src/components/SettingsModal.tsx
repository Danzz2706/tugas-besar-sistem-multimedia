import { useState, useRef } from 'react';
import { X, Camera, Trophy, Clock, Database } from 'lucide-react';
import { useStore } from '../store/useStore';
import { seedDatabase } from '../utils/seedFirestore';

export const SettingsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { user, updateProfile, studentRecords } = useStore();
    const [name, setName] = useState(user?.name || "");
    const [activeTab, setActiveTab] = useState<'profile' | 'records'>('profile');
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen || !user) return null;

    const handleSaveProfile = () => {
        // Basic sanitization: remove special characters except basic punctuation
        const sanitizedName = name.replace(/[^a-zA-Z0-9\s\.\-]/g, "").trim();

        if (sanitizedName.length < 3) {
            alert("Nama harus minimal 3 karakter");
            return;
        }

        updateProfile(sanitizedName, avatarPreview);
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-neutral-700">
                    <h2 className="text-2xl font-bold dark:text-white">Pengaturan & Profil</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="flex border-b border-gray-100 dark:border-neutral-700">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex-1 py-3 font-medium text-sm transition-colors ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        Profil Saya
                    </button>
                    <button
                        onClick={() => setActiveTab('records')}
                        className={`flex-1 py-3 font-medium text-sm transition-colors ${activeTab === 'records' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                        Riwayat Belajar
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    {activeTab === 'profile' ? (
                        <div className="space-y-6">
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-neutral-700 shadow-lg">
                                        {avatarPreview ? (
                                            <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white">
                                                {name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Klik foto untuk mengganti</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                                    placeholder="Masukkan nama kamu"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full p-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800 text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/30"
                            >
                                Simpan Perubahan
                            </button>

                            {/* Developer Tools / Database Sync */}
                            <div className="pt-6 border-t border-gray-100 dark:border-neutral-700">
                                <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Developer Zone</h3>
                                <button
                                    onClick={async () => {
                                        if (confirm("Upload data pelajaran ke database online? Data lama mungkin tertimpa.")) {
                                            await seedDatabase();
                                        }
                                    }}
                                    className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Database className="w-5 h-5" />
                                    Sync / Upload Database
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {studentRecords.length === 0 ? (
                                <div className="text-center py-10">
                                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-gray-500">Belum ada riwayat</h3>
                                    <p className="text-gray-400">Kerjakan kuis untuk melihat nilaimu di sini!</p>
                                </div>
                            ) : (
                                studentRecords.map((record) => (
                                    <div key={record.id} className="bg-gray-50 dark:bg-neutral-900 p-4 rounded-xl border border-gray-100 dark:border-neutral-700 flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold dark:text-white">{record.quizTitle}</h4>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(record.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                        <div className={`px-4 py-2 rounded-lg font-bold ${record.score === record.maxScore ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                                            record.score > record.maxScore / 2 ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                                                'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                            }`}>
                                            {record.score}/{record.maxScore}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
