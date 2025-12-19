import type { Subject } from '../data/subjects';
import { X, Trophy, Target } from 'lucide-react';

interface ProgressSidebarProps {
    subject: Subject;
    completedMaterials: string[];
    onClose?: () => void;
    className?: string;
}

export const ProgressSidebar = ({ subject, completedMaterials, onClose, className = '' }: ProgressSidebarProps) => {
    // Calculate overall progress
    const totalMaterials = subject.modules.reduce((acc, mod) => acc + mod.materials.length, 0);
    const completedCount = completedMaterials.filter(id => {
        // Only count materials that belong to this subject
        return subject.modules.some(mod => mod.materials.some(mat => mat.id === id));
    }).length;

    const overallProgress = totalMaterials > 0 ? Math.round((completedCount / totalMaterials) * 100) : 0;

    return (
        <aside className={`w-80 bg-white dark:bg-neutral-800 border-l border-gray-200 dark:border-neutral-700 flex flex-col h-full overflow-y-auto transition-colors duration-300 ${className}`}>
            <div className="p-6 border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center">
                <h2 className="font-bold text-lg dark:text-white">Statistik Belajar</h2>
                {onClose && (
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                )}
            </div>

            <div className="p-6">
                {/* Overall Progress Circle */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="relative w-32 h-32 mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-gray-100 dark:text-neutral-700"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={351.86}
                                strokeDashoffset={351.86 - (351.86 * overallProgress) / 100}
                                className={`transition-all duration-1000 ease-out ${overallProgress === 100 ? 'text-green-500' : 'text-blue-600'
                                    }`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold dark:text-white">{overallProgress}%</span>
                            <span className="text-xs text-gray-500 uppercase font-semibold">Selesai</span>
                        </div>
                    </div>

                    {overallProgress === 100 && (
                        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full animate-in fade-in slide-in-from-bottom-2">
                            <Trophy className="w-4 h-4" />
                            <span className="font-bold text-sm">Luar Biasa! 🎉</span>
                        </div>
                    )}
                </div>

                {/* Module Breakdown */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Kemajuan Per Modul</h3>
                    {subject.modules.map((module, idx) => {
                        const modTotal = module.materials.length;
                        const modCompleted = module.materials.filter(m => completedMaterials.includes(m.id)).length;
                        const modProgress = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;

                        return (
                            <div key={module.id} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-700 dark:text-gray-200 line-clamp-1 flex-1 pr-2">
                                        {idx + 1}. {module.title}
                                    </span>
                                    <span className={`font-bold ${modProgress === 100 ? 'text-green-600' : 'text-gray-500'}`}>
                                        {modProgress}%
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${modProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
                                            }`}
                                        style={{ width: `${modProgress}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Motivation / Next Goal */}
                <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-900/30">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg shrink-0">
                            <Target className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                        </div>
                        <div>
                            <h4 className="font-bold text-purple-900 dark:text-purple-100 text-sm mb-1">Target Belajar</h4>
                            <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
                                {overallProgress === 100
                                    ? "Kamu telah menyelesaikan semua materi! Siap untuk ujian akhir?"
                                    : "Selesaikan satu materi lagi hari ini untuk menjaga semangat belajarmu!"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
