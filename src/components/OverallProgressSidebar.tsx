import type { Subject } from '../data/subjects';
import { X, Trophy, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OverallProgressSidebarProps {
    subjects: Subject[];
    completedMaterials: string[];
    onClose?: () => void;
    className?: string;
}

export const OverallProgressSidebar = ({ subjects, completedMaterials, onClose, className = '' }: OverallProgressSidebarProps) => {
    const navigate = useNavigate();

    // Calculate total progress across all subjects
    const totalMaterialsAll = (subjects || []).reduce((acc, subj) => {
        return acc + (subj.modules || []).reduce((mAcc, mod) => mAcc + (mod.materials?.length || 0), 0);
    }, 0);

    const completedCountAll = completedMaterials.length; // Assumes completedMaterials only has valid IDs from these subjects
    // A more robust check would be to filter completedMaterials against all known material IDs

    const overallProgress = totalMaterialsAll > 0 ? Math.round((completedCountAll / totalMaterialsAll) * 100) : 0;

    return (
        <aside className={`w-80 bg-white dark:bg-neutral-800 border-l border-gray-200 dark:border-neutral-700 flex flex-col h-full overflow-y-auto transition-colors duration-300 ${className}`}>
            <div className="p-6 border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center">
                <h2 className="font-bold text-lg dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" /> Statistik Saya
                </h2>
                {onClose && (
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                )}
            </div>

            <div className="p-6 space-y-8">
                {/* Overall Stats Card */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-blue-100 text-sm font-medium mb-2 uppercase tracking-wider">Total Progress</h3>
                        <div className="text-5xl font-bold mb-2">{overallProgress}%</div>
                        <p className="text-blue-100 text-xs">Semangat! Perjalanan masih panjang. 🚀</p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl"></div>
                </div>

                {/* Subject Breakdown */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">Progress Per Pelajaran</h3>
                    {subjects?.map((subject) => {
                        const modules = subject.modules || [];
                        const subjTotal = modules.reduce((acc, mod) => acc + (mod.materials?.length || 0), 0);
                        const subjCompleted = modules.reduce((acc, mod) => {
                            return acc + (mod.materials || []).filter(m => completedMaterials?.includes(m.id)).length;
                        }, 0);
                        const subjProgress = subjTotal > 0 ? Math.round((subjCompleted / subjTotal) * 100) : 0;

                        return (
                            <div
                                key={subject.id}
                                onClick={() => navigate(`/subject/${subject.id}`)}
                                className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700/50 p-3 rounded-xl transition-colors -mx-2"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-sm text-gray-700 dark:text-gray-200">{subject.name}</span>
                                    <span className={`text-xs font-bold ${subjProgress === 100 ? 'text-green-600' : 'text-gray-500'}`}>
                                        {subjProgress}%
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${subjProgress === 100 ? 'bg-green-500' :
                                            subject.id === 'matematika' ? 'bg-orange-500' :
                                                subject.id === 'bahasa-indonesia' ? 'bg-red-500' :
                                                    subject.id === 'ipa' ? 'bg-purple-500' :
                                                        subject.id === 'ips' ? 'bg-green-500' : 'bg-blue-500'
                                            }`}
                                        style={{ width: `${subjProgress}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Achievements / Badges Placeholder */}
                <div className="pt-6 border-t border-gray-100 dark:border-neutral-700">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-500" /> Pencapaian
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="aspect-square rounded-full bg-gray-100 dark:bg-neutral-700 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-help" title="Lencana Terkunci">
                                <span className="text-xs">🏆</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Selesaikan materi untuk buka lencana!</p>
                </div>
            </div>
        </aside>
    );
};
