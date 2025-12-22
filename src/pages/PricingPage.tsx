import { LandingNavbar } from '../components/LandingNavbar';
import { LandingFooter } from '../components/LandingFooter';
import { Check, Zap, School } from 'lucide-react';

export const PricingPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 text-gray-900 dark:text-white transition-colors duration-300 font-sans flex flex-col relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
                    alt="Pricing Background"
                    className="w-full h-full object-cover opacity-10 dark:opacity-5"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-neutral-900/50 dark:to-neutral-900"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen animate-fade-in">
                <LandingNavbar />

                <main className="flex-grow">
                    {/* Header */}
                    <div className="bg-gray-50 dark:bg-neutral-800/50 py-20">
                        <div className="container mx-auto px-6 text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                                Investasi Cerdas untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Masa Depan</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Pilih paket belajar yang sesuai dengan kebutuhanmu. Mulai dari gratis hingga paket lengkap untuk sekolah.
                            </p>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="container mx-auto px-6 py-20 -mt-10">
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <PricingCard
                                title="Gratis"
                                price="Rp 0"
                                description="Untuk kamu yang baru ingin mencoba."
                                icon={<Zap className="w-6 h-6 text-yellow-500" />}
                                features={[
                                    "Akses Modul Dasar IPA & IPS",
                                    "1x Kuis per Hari",
                                    "Forum Diskusi Umum",
                                    "Akses Terbatas Profile"
                                ]}
                            />
                            <PricingCard
                                title="Premium"
                                price="Rp 49.000"
                                period="/bulan"
                                description="Paket lengkap untuk juara kelas."
                                icon={<Zap className="w-6 h-6 text-blue-500" />}
                                isPopular
                                features={[
                                    "Akses Semua Modul Pelajaran",
                                    "Unlimited Kuis & Latihan Soal",
                                    "Simulasi 3D Tata Surya & Geometri",
                                    "Sertifikat Digital",
                                    "Laporan Belajar Detail",
                                    "Prioritas Support"
                                ]}
                            />
                            <PricingCard
                                title="Sekolah"
                                price="Hubungi Kami"
                                description="Solusi terintegrasi untuk institusi."
                                icon={<School className="w-6 h-6 text-purple-500" />}
                                features={[
                                    "Dashboard Guru Lengkap",
                                    "Manajemen Siswa & Kelas",
                                    "Upload Modul Kustom",
                                    "Laporan Analitik Kelas",
                                    "Export Nilai & Raport",
                                    "Pelatihan Penggunaan",
                                    "Dedicated Server (Opsional)"
                                ]}
                                buttonText="Hubungi Sales"
                            />
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="container mx-auto px-6 py-20">
                        <h2 className="text-3xl font-bold text-center mb-12">Pertanyaan Umum</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <FaqItem
                                question="Apakah bisa berhenti berlangganan kapan saja?"
                                answer="Ya, Anda bisa membatalkan langganan kapan saja tanpa biaya tambahan. Akses premium akan tetap aktif hingga periode penagihan berakhir."
                            />
                            <FaqItem
                                question="Metode pembayaran apa saja yang tersedia?"
                                answer="Kami menerima transfer bank, e-wallet (GoPay, OVO, Dana), dan kartu kredit. Pembayaran aman dan terverifikasi otomatis."
                            />
                            <FaqItem
                                question="Apakah ada diskon untuk berlangganan tahunan?"
                                answer="Tentu! Anda bisa hemat hingga 20% jika memilih paket pembayaran tahunan (12 bulan sekaligus)."
                            />
                            <FaqItem
                                question="Bagaimana jika saya mengalami kendala teknis?"
                                answer="Tim support kami siap membantu 24/7. Anda bisa menghubungi kami melalui email atau live chat di dashboard."
                            />
                        </div>
                    </div>
                </main>

                <LandingFooter />
            </div>
        </div>
    );
};

const PricingCard = ({ title, price, period = "", description, features, isPopular, icon, buttonText = "Pilih Paket" }: { title: string, price: string, period?: string, description: string, features: string[], isPopular?: boolean, icon: any, buttonText?: string }) => (
    <div className={`relative bg-white dark:bg-neutral-800 rounded-3xl p-8 border hover:-translate-y-2 transition-transform duration-300 flex flex-col ${isPopular ? 'border-blue-500 shadow-2xl shadow-blue-500/10 z-10 scale-105' : 'border-gray-200 dark:border-neutral-700 shadow-xl'}`}>
        {isPopular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                <Zap className="w-3 h-3 fill-white" /> Paling Laris
            </div>
        )}
        <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl ${isPopular ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-neutral-700'}`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-10">{description}</p>
        <div className="flex items-baseline mb-8">
            <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{price}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm font-medium">{period}</span>
        </div>
        <div className="h-px bg-gray-100 dark:bg-neutral-700 mb-8"></div>
        <ul className="space-y-4 mb-8 flex-1">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 text-green-600 dark:text-green-400">
                        <Check className="w-3 h-3" />
                    </div>
                    {feature}
                </li>
            ))}
        </ul>
        <button className={`w-full py-3 rounded-xl font-bold transition-all ${isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30' : 'bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 text-gray-900 dark:text-white'}`}>
            {buttonText}
        </button>
    </div>
);

const FaqItem = ({ question, answer }: { question: string, answer: string }) => (
    <div className="bg-gray-50 dark:bg-neutral-800/30 p-6 rounded-2xl">
        <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{question}</h4>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{answer}</p>
    </div>
);
