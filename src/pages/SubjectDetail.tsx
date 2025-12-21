
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { type Material } from '../data/subjects';
import { ArrowLeft, BookOpen, PlayCircle, FileText, ChevronRight, Calculator, Globe, Rocket, Flag, Palette, Loader2, AlertCircle, Menu } from 'lucide-react';
import { useState } from 'react';
import { GenericQuiz } from '../components/GenericQuiz';
import { useSubject } from '../hooks/useSubjects';

import { ProgressSidebar } from '../components/ProgressSidebar';

const iconMap: Record<string, any> = {
    "Calculator": Calculator,
    "BookOpen": BookOpen,
    "Globe": Globe,
    "Rocket": Rocket,
    "Flag": Flag,
    "Palette": Palette
};

const getEmbedUrl = (url: string) => {
    if (!url) return '';
    try {
        let videoId = '';
        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1]?.split('?')[0];
        } else if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1]?.split('&')[0];
        } else if (url.includes('youtube.com/embed/')) {
            return url;
        }

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    } catch (e) {
        return url;
    }
};

export const SubjectDetail = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const { subject, loading, error } = useSubject(subjectId);
    const [activeMaterial, setActiveMaterial] = useState<Material | null>(null);
    const { completedMaterials, markMaterialComplete, studentRecords } = useStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProgressOpen, setIsProgressOpen] = useState(false);

    // Helper to check if a material is locked
    const isMaterialLocked = (moduleIndex: number, materialIndex: number) => {
        if (!subject) return true;

        // First material of the first module is always unlocked
        if (moduleIndex === 0 && materialIndex === 0) return false;

        // If it's the first material of a module, check if the last material of previous module is done
        if (materialIndex === 0) {
            const prevModule = subject.modules[moduleIndex - 1];
            const prevMaterial = prevModule.materials[prevModule.materials.length - 1];
            return !completedMaterials.includes(prevMaterial.id);
        }

        // Otherwise check the immediately preceding material in the same module
        const prevMaterial = subject.modules[moduleIndex].materials[materialIndex - 1];
        return !completedMaterials.includes(prevMaterial.id);
    };

    const markCurrentMaterialAsDone = () => {
        if (activeMaterial) {
            markMaterialComplete(activeMaterial.id);
        }
    };

    const goToNextMaterial = () => {
        if (!activeMaterial) return;

        // Find current indices
        let currentModuleIdx = -1;
        let currentMatIdx = -1;

        subject?.modules.forEach((mod, mIdx) => {
            mod.materials.forEach((mat, matIdx) => {
                if (mat.id === activeMaterial.id) {
                    currentModuleIdx = mIdx;
                    currentMatIdx = matIdx;
                }
            });
        });

        if (currentModuleIdx !== -1 && currentMatIdx !== -1) {
            // Try next material in same module
            const nextMatSameModule = subject?.modules[currentModuleIdx].materials[currentMatIdx + 1];
            if (nextMatSameModule) {
                setActiveMaterial(nextMatSameModule);
                return;
            }

            // Try first material of next module
            const nextModule = subject?.modules[currentModuleIdx + 1];
            if (nextModule && nextModule.materials.length > 0) {
                setActiveMaterial(nextModule.materials[0]);
            }
        }
    };

    const handleMaterialComplete = () => {
        markCurrentMaterialAsDone();
        goToNextMaterial();
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                <p>Memuat materi...</p>
            </div>
        );
    }

    if (error || !subject) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Mata Pelajaran Tidak Ditemukan</h1>
                <p className="text-gray-500 mb-6">Mungkin data belum tersedia atau terjadi kesalahan.</p>
                <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:underline">Kembali ke Dashboard</button>
            </div>
        );
    }

    const Icon = iconMap[subject.iconName] || BookOpen;

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
            {/* Sidebar / Module List - Desktop */}
            <aside className="hidden md:flex w-80 bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-700 flex-col h-full overflow-y-auto transition-colors duration-300">
                <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Kembali
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                            <Icon className="w-6 h-6" />
                        </div>
                        <h1 className="font-bold text-xl">{subject.name}</h1>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{subject.description}</p>
                </div>

                <div className="p-4 space-y-6">
                    {subject.modules.map((module, moduleIdx) => (
                        <div key={module.id}>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">{module.title}</h3>
                            <div className="space-y-1">
                                {module.materials.map((material, materialIdx) => {
                                    const isLocked = isMaterialLocked(moduleIdx, materialIdx);
                                    const isCompleted = completedMaterials.includes(material.id);
                                    const isActive = activeMaterial?.id === material.id;

                                    return (
                                        <button
                                            key={material.id}
                                            onClick={() => !isLocked && setActiveMaterial(material)}
                                            disabled={isLocked}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                                : isLocked
                                                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-neutral-800' // Locked style
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700'
                                                }`}
                                        >
                                            {isLocked ? (
                                                <div className="w-4 h-4 flex items-center justify-center">🔒</div>
                                            ) : isCompleted ? (
                                                <div className="w-4 h-4 flex items-center justify-center text-green-500">✅</div>
                                            ) : (
                                                material.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />
                                            )}

                                            <span className="flex-1 text-left line-clamp-1">{material.title}</span>
                                            {isActive && <ChevronRight className="w-4 h-4" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Mobile Left Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-neutral-800 shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
                        <div className="p-6 border-b border-gray-200 dark:border-neutral-700">
                            <button onClick={() => setIsSidebarOpen(false)} className="absolute right-4 top-4 p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Kembali
                            </button>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-400">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h1 className="font-bold text-xl">{subject.name}</h1>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{subject.description}</p>
                        </div>
                        <div className="p-4 space-y-6 overflow-y-auto flex-1">
                            {subject.modules.map((module, moduleIdx) => (
                                <div key={module.id}>
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-2">{module.title}</h3>
                                    <div className="space-y-1">
                                        {module.materials.map((material, materialIdx) => {
                                            const isLocked = isMaterialLocked(moduleIdx, materialIdx);
                                            const isCompleted = completedMaterials.includes(material.id);
                                            const isActive = activeMaterial?.id === material.id;

                                            return (
                                                <button
                                                    key={material.id}
                                                    onClick={() => {
                                                        if (!isLocked) {
                                                            setActiveMaterial(material);
                                                            setIsSidebarOpen(false);
                                                        }
                                                    }}
                                                    disabled={isLocked}
                                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                                        : isLocked
                                                            ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed bg-gray-50 dark:bg-neutral-800' // Locked style
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700'
                                                        }`}
                                                >
                                                    {isLocked ? (
                                                        <div className="w-4 h-4 flex items-center justify-center">🔒</div>
                                                    ) : isCompleted ? (
                                                        <div className="w-4 h-4 flex items-center justify-center text-green-500">✅</div>
                                                    ) : (
                                                        material.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />
                                                    )}

                                                    <span className="flex-1 text-left line-clamp-1">{material.title}</span>
                                                    {isActive && <ChevronRight className="w-4 h-4" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative w-full">
                {/* Mobile Header Toggle */}
                <div className="flex justify-between items-center md:hidden mb-6">
                    <button onClick={() => setIsSidebarOpen(true)} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Menu className="w-6 h-6" />
                        <span className="font-bold">Daftar Materi</span>
                    </button>
                    <button onClick={() => setIsProgressOpen(true)} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                        <span className="text-sm">Progress</span>
                    </button>
                </div>

                {activeMaterial ? (
                    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${activeMaterial.type === 'video' ? 'bg-red-100 text-red-600' :
                                    activeMaterial.type === 'interactive' ? 'bg-purple-100 text-purple-600' :
                                        activeMaterial.type === 'text' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    {activeMaterial.type}
                                </span>
                                <h2 className="text-3xl font-bold">{activeMaterial.title}</h2>
                            </div>

                            {/* Completion Button (Only for non-quiz, quiz handles it internally) */}
                            {activeMaterial.type !== 'quiz' && (
                                <button
                                    onClick={handleMaterialComplete}
                                    className={`px-6 py-2 rounded-lg font-bold transition-all transform hover:scale-105 ${completedMaterials.includes(activeMaterial.id)
                                        ? 'bg-green-100 text-green-700 cursor-default'
                                        : 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-green-500/30'
                                        }`}
                                >
                                    {completedMaterials.includes(activeMaterial.id) ? '✅ Sudah Selesai' : 'Tandai Selesai & Lanjut →'}
                                </button>
                            )}
                        </div>

                        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-neutral-700 shadow-sm min-h-[500px]">
                            {activeMaterial.type === 'video' ? (
                                <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6 shadow-lg">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={getEmbedUrl(activeMaterial.content as string)}
                                        title={activeMaterial.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ) : activeMaterial.type === 'interactive' ? (
                                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6 shadow-lg relative flex flex-col items-center justify-center text-center p-6">
                                    <Rocket className="w-16 h-16 text-blue-500 mb-4 animate-bounce" />
                                    <h3 className="text-2xl font-bold text-white mb-2">Simulasi Interaktif</h3>
                                    <p className="text-gray-400 mb-6 max-w-md">Materi ini memuat simulasi 3D yang berat. Untuk pengalaman terbaik, silakan buka dalam mode layar penuh.</p>
                                    <button
                                        onClick={() => navigate(activeMaterial.content as string)}
                                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                                    >
                                        <PlayCircle className="w-5 h-5" />
                                        Mulai Simulasi
                                    </button>
                                </div>
                            ) : activeMaterial.type === 'text' ? (
                                <div className="mb-8">
                                    <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-xl border border-amber-100 dark:border-amber-900/30 shadow-sm">
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-amber-200 dark:border-amber-800/30">
                                            <div className="bg-amber-100 dark:bg-amber-800 p-2 rounded-lg">
                                                <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-amber-900 dark:text-amber-100 text-lg">Modul Bacaan</h3>
                                                <p className="text-sm text-amber-700 dark:text-amber-300">Estimasi waktu: {activeMaterial.duration || "5 menit"}</p>
                                            </div>
                                        </div>
                                        <div className="prose dark:prose-invert max-w-none">
                                            <div className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                                                {activeMaterial.content as string}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : activeMaterial.type === 'quiz' ? (
                                <GenericQuiz
                                    quizTitle={activeMaterial.title}
                                    questions={typeof activeMaterial.content === 'string' ? [] : activeMaterial.content}
                                    initialResult={studentRecords.find(r => r.quizTitle === activeMaterial.title)}
                                    onClose={() => {
                                        goToNextMaterial();
                                    }}
                                    onComplete={() => {
                                        markCurrentMaterialAsDone();
                                    }}
                                />
                            ) : activeMaterial.type === 'pdf' ? (
                                <div className="h-[800px] bg-gray-100 dark:bg-neutral-900 rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-700">
                                    <iframe
                                        src={activeMaterial.content as string}
                                        className="w-full h-full"
                                        title="PDF Viewer"
                                    />
                                </div>
                            ) : null}

                            <div className="prose dark:prose-invert max-w-none mt-8">
                                <h3 className="text-xl font-bold mb-2">Deskripsi Materi</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                    {activeMaterial.description || (typeof activeMaterial.content === 'string' && activeMaterial.type !== 'pdf' ? activeMaterial.content : '')}
                                </p>

                                {activeMaterial.type === 'video' && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start gap-3">
                                        <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                                            <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-1">Tonton Videonya!</h4>
                                            <p className="text-sm text-blue-600 dark:text-blue-300">Simak penjelasan lengkap di video ini dan jangan lupa catat poin pentingnya ya!</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                        <div className="bg-gray-100 dark:bg-neutral-800 p-6 rounded-full mb-4">
                            <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Pilih Materi Belajar</h2>
                        <p className="max-w-md">Silakan pilih salah satu materi dari daftar di sebelah kiri untuk mulai belajar. Materi harus diselesaikan secara berurutan ya!</p>
                    </div>
                )}
            </main>

            {/* Right Sidebar - Progress (Desktop) */}
            <div className="hidden lg:block h-full">
                <ProgressSidebar subject={subject} completedMaterials={completedMaterials} />
            </div>

            {/* Mobile Progress Sidebar (Drawer/Overlay) */}
            {isProgressOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsProgressOpen(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-neutral-800 shadow-2xl animate-in slide-in-from-right duration-300">
                        <ProgressSidebar
                            subject={subject}
                            completedMaterials={completedMaterials}
                            onClose={() => setIsProgressOpen(false)}
                            className="bg-transparent border-0 w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
