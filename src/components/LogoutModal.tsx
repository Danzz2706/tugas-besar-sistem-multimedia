import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl w-full max-w-sm shadow-2xl p-6 transform scale-100 transition-transform">
                <div className="flex justify-between items-center mb-6">
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                        <LogOut className="w-6 h-6" />
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Konfirmasi Keluar</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Apakah Anda yakin ingin keluar dari aplikasi? Anda harus login kembali untuk mengakses akun Anda.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 px-4 bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-red-500/30"
                    >
                        Ya, Keluar
                    </button>
                </div>
            </div>
        </div>
    );
};
