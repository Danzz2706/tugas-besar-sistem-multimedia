import { Link } from 'react-router-dom';
import { Rocket, BookOpen, Star, Brain } from 'lucide-react';
import { LandingNavbar } from '../components/LandingNavbar';
import { LandingFooter } from '../components/LandingFooter';
// import { Chatbot } from '../components/Chatbot';

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 text-gray-900 dark:text-white transition-colors duration-300 font-sans relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
                    alt="Education Background"
                    className="w-full h-full object-cover opacity-10 dark:opacity-5"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white dark:from-neutral-900/80 dark:via-neutral-900/50 dark:to-neutral-900"></div>
            </div>

            <div className="relative z-10 animate-fade-in">
                <LandingNavbar />

                {/* Hero Section */}
                <header className="container mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
                    <div className="relative mb-8">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                        <Rocket className="w-24 h-24 text-blue-600 dark:text-blue-400 relative z-10" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">BELAJAR JADI LEBIH SERU!</span> 🚀
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-10">
                        Belajar dengan pengalaman yang menyenangkan,kerjakan kuis menyenangkan, dan pantau prestasimu di satu tempat.
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
                <section className="py-20 bg-gray-50 dark:bg-neutral-800/50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-16">Artikel & Berita</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <BlogCard
                                image="https://www.duniakampus.id/wp-content/uploads/2024/10/Cara-Belajar-Efektif-bagi-Mahasiswa.webp"
                                title="Cara Belajar Efektif di Era Digital"
                                snippet="Tips dan trik memanfaatkan teknologi untuk meningkatkan prestasi belajar siswa."
                                link="/blog#tips-belajar"
                            />
                            <BlogCard
                                image="https://images.unsplash.com/photo-1532094349884-543bc11b234d"
                                title="Mengenal Metode Sains Sederhana"
                                snippet="Eksperimen mudah yang bisa dilakukan di rumah untuk memahami konsep sains."
                                link="/blog#sains-sederhana"
                            />
                            <BlogCard
                                image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                                title="Pentingnya Pendidikan Karakter"
                                snippet="Membangun moral dan etika siswa sejak dini melalui kegiatan sehari-hari."
                                link="/blog"
                            />
                        </div>
                    </div>
                </section>

                <LandingFooter />
            </div>
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

const BlogCard = ({ image, title, snippet, link }: { image: string, title: string, snippet: string, link: string }) => (
    <div className="group bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-neutral-700">
        <div className="h-48 overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-6">
            <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{snippet}</p>
            <Link to={link || '#'} className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">Baca Selengkapnya →</Link>
        </div>
    </div>
);

