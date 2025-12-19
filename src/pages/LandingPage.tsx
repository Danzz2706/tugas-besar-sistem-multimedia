import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { Rocket, BookOpen, Star, Brain } from 'lucide-react';

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 text-gray-900 dark:text-white transition-colors duration-300 font-sans">
            {/* Navbar */}
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">E</div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">EduConnect</span>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link to="/login" className="px-5 py-2 rounded-full font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-white/10 transition-colors">
                        Masuk
                    </Link>
                    <Link to="/register" className="px-5 py-2 rounded-full font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all">
                        Daftar
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="container mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
                <div className="relative mb-8">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                    <Rocket className="w-24 h-24 text-blue-600 dark:text-blue-400 relative z-10" />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Belajar Jadi Lebih <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Seru!</span> 🚀
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-10">
                    Jelajahi Tata Surya, kerjakan kuis menyenangkan, dan pantau prestasimu di satu tempat.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register" className="px-8 py-4 rounded-full font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1">
                        Mulai Petualangan Sekarang
                    </Link>
                </div>
            </header>

            {/* Features */}
            <section className="py-20 bg-gray-50 dark:bg-neutral-800/50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">Fitur Unggulan</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Star className="w-10 h-10 text-amber-500" />}
                            title="Tata Surya 3D"
                            description="Jelajahi planet-planet dengan animasi 3D interaktif yang menakjubkan."
                        />
                        <FeatureCard
                            icon={<Brain className="w-10 h-10 text-purple-500" />}
                            title="Kuis Interaktif"
                            description="Asah otakmu dengan kuis-kuis seru dan dapatkan nilai terbaik."
                        />
                        <FeatureCard
                            icon={<BookOpen className="w-10 h-10 text-green-500" />}
                            title="Modul Lengkap"
                            description="Materi pelajaran yang disusun lengkap dan mudah dipahami."
                        />
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-20 bg-white dark:bg-neutral-900">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">Artikel & Berita</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <BlogCard
                            image="https://images.unsplash.com/photo-1516339901601-2e1b8c49c4a4"
                            title="Cara Belajar Efektif di Era Digital"
                            snippet="Tips dan trik memanfaatkan teknologi untuk meningkatkan prestasi belajar siswa."
                        />
                        <BlogCard
                            image="https://images.unsplash.com/photo-1532094349884-543bc11b234d"
                            title="Mengenal Metode Sains Sederhana"
                            snippet="Eksperimen mudah yang bisa dilakukan di rumah untuk memahami konsep sains."
                        />
                        <BlogCard
                            image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                            title="Pentingnya Pendidikan Karakter"
                            snippet="Membangun moral dan etika siswa sejak dini melalui kegiatan sehari-hari."
                        />
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-gray-50 dark:bg-neutral-800/50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Pilih Paket Belajar</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-16 max-w-2xl mx-auto">Investasi terbaik untuk masa depan buah hati Anda.</p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <PricingCard
                            title="Gratis"
                            price="Rp 0"
                            features={["Akses Modul Dasar", "1x Kuis per Hari", "Forum Diskusi"]}
                        />
                        <PricingCard
                            title="Premium"
                            price="Rp 49.000"
                            period="/bulan"
                            isPopular
                            features={["Akses Semua Modul", "Unlimited Kuis", "Simulasi 3D Tata Surya", "Sertifikat Digital", "Laporan Belajar"]}
                        />
                        <PricingCard
                            title="Sekolah"
                            price="Hubungi Kami"
                            features={["Dashboard Guru", "Manajemen Siswa", "Modul Kustom", "Laporan Kelas", "Dukungan Prioritas"]}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>© 2024 EduConnect. Dibuat dengan ❤️ untuk Siswa Indonesia.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-neutral-700">
        <div className="mb-4 bg-gray-50 dark:bg-neutral-700 w-16 h-16 rounded-2xl flex items-center justify-center">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
        </p>
    </div>
);

const BlogCard = ({ image, title, snippet }: { image: string, title: string, snippet: string }) => (
    <div className="group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-neutral-700">
        <div className="h-48 overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-6">
            <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{snippet}</p>
            <a href="#" className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">Baca Selengkapnya →</a>
        </div>
    </div>
);

const PricingCard = ({ title, price, period = "", features, isPopular }: { title: string, price: string, period?: string, features: string[], isPopular?: boolean }) => (
    <div className={`relative bg-white dark:bg-neutral-800 rounded-3xl p-8 border ${isPopular ? 'border-blue-500 shadow-xl shadow-blue-500/10' : 'border-gray-200 dark:border-neutral-700 shadow-lg'} flex flex-col`}>
        {isPopular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                Paling Laris
            </div>
        )}
        <h3 className="text-lg font-bold text-gray-500 dark:text-gray-400 uppercase mb-4">{title}</h3>
        <div className="flex items-baseline mb-8">
            <span className="text-4xl font-extrabold">{price}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">{period}</span>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    {feature}
                </li>
            ))}
        </ul>
        <button className={`w-full py-3 rounded-xl font-bold transition-all ${isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg focus:ring-4 focus:ring-blue-500/30' : 'bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 text-gray-900 dark:text-white'}`}>
            Pilih Paket
        </button>
    </div>
);
