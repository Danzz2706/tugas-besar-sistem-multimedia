import { LandingNavbar } from '../components/LandingNavbar';
import { LandingFooter } from '../components/LandingFooter';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';

export const BlogPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white transition-colors duration-300 font-sans flex flex-col relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop"
                    alt="Blog Background"
                    className="w-full h-full object-cover opacity-10 dark:opacity-5"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-neutral-900/50 dark:to-neutral-900"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen animate-fade-in">
                <LandingNavbar />

                <main className="flex-grow container mx-auto px-6 py-12">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Blog & Artikel</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Wawasan terbaru seputar dunia pendidikan, teknologi, dan tips belajar efektif.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content - Left Column */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Article 1 */}
                            <article id="tips-belajar" className="bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-neutral-700 hover:shadow-md transition-shadow">
                                <img
                                    src="https://www.duniakampus.id/wp-content/uploads/2024/10/Cara-Belajar-Efektif-bagi-Mahasiswa.webp"
                                    alt="Belajar Efektif"
                                    className="w-full h-64 md:h-80 object-cover"
                                />
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 22 Des 2024</span>
                                        <span className="flex items-center gap-1"><User className="w-4 h-4" /> Admin</span>
                                        <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> Tips Belajar</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        5 Strategi Belajar Efektif di Era Digital yang Penuh Distraksi
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                        Di era digital saat ini, tantangan terbesar bagi pelajar bukanlah kurangnya sumber belajar, melainkan banyaknya gangguan (distraksi). Notifikasi media sosial, game online, dan konten hiburan yang tak terbatas seringkali memecah konsentrasi. Berikut adalah 5 strategi ampuh untuk tetap fokus:
                                    </p>
                                    <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                        <p>
                                            <strong>1. Teknik Pomodoro:</strong> Gunakan timer 25 menit untuk belajar fokus, diikuti istirahat 5 menit. Ini membantu otak tetap segar.
                                        </p>
                                        <p>
                                            <strong>2. Kelola Notifikasi:</strong> Matikan notifikasi yang tidak penting saat jam belajar. Gunakan mode "Do Not Disturb" di smartphone Anda.
                                        </p>
                                        <p>
                                            <strong>3. Buat Ruang Belajar Khusus:</strong> Dedikasikan satu sudut di rumah hanya untuk belajar. Hindari belajar di kasur karena otak akan mengasosiasikannya dengan istirahat.
                                        </p>
                                        <p>
                                            <strong>4. Manfaatkan Aplikasi Produktivitas:</strong> Gunakan aplikasi seperti Notion untuk mencatat atau Forest untuk gamifikasi waktu fokus Anda.
                                        </p>
                                        <p>
                                            <strong>5. Tidur yang Cukup:</strong> Jangan remehkan kekuatan tidur. Otak memproses dan menyimpan memori jangka panjang saat kita tidur. Kurang tidur akan menurunkan kemampuan kognitif secara drastis.
                                        </p>
                                    </div>
                                    <button className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                        Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </article>

                            {/* Article 2 */}
                            <article id="sains-sederhana" className="bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-neutral-700 hover:shadow-md transition-shadow">
                                <img
                                    src="https://images.unsplash.com/photo-1532094349884-543bc11b234d"
                                    alt="Sains Sederhana"
                                    className="w-full h-64 md:h-80 object-cover"
                                />
                                <div className="p-8">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> 20 Des 2024</span>
                                        <span className="flex items-center gap-1"><User className="w-4 h-4" /> Tim Sains</span>
                                        <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> Eksperimen</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        Eksperimen Sains Sederhana: Membuat Gunung Berapi di Rumah
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                        Sains tidak harus rumit dan membosankan. Kita bisa mempelajari reaksi kimia dasar dengan bahan-bahan yang ada di dapur. Salah satu eksperimen klasik yang selalu seru adalah membuat simulasi letusan gunung berapi.
                                    </p>
                                    <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Bahan-bahan:</h3>
                                        <ul className="list-disc list-inside ml-4 space-y-1">
                                            <li>Botol plastik bekas</li>
                                            <li>Soda kue (Baking Soda)</li>
                                            <li>Cuka</li>
                                            <li>Pewarna makanan merah</li>
                                            <li>Sabun cuci piring cair</li>
                                            <li>Tanah atau pasir (untuk membentuk gunung)</li>
                                        </ul>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mt-4">Langkah Percobaan:</h3>
                                        <ol className="list-decimal list-inside ml-4 space-y-2">
                                            <li>Bentuk tanah/pasir menyerupai gunung mengelilingi botol plastik.</li>
                                            <li>Masukkan 2 sendok makan soda kue ke dalam botol.</li>
                                            <li>Tambahkan sedikit sabun cair dan pewarna merah.</li>
                                            <li>Tuangkan cuka perlahan ke dalam botol dan... BOOM! Perhatikan "lava" meletus keluar.</li>
                                        </ol>
                                        <p className="mt-4 italic text-sm border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20">
                                            <strong>Penjelasan Ilmiah:</strong> Reaksi antara cuka (asam asetat) dan soda kue (sodium bikarbonat) menghasilkan gas karbon dioksida. Gas ini menekan cairan keluar botol, menciptakan efek letusan.
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Sidebar - Right Column */}
                        <aside className="space-y-8">
                            {/* Search Widget */}
                            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700">
                                <h3 className="font-bold text-lg mb-4">Cari Artikel</h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Ketik kata kunci..."
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-700 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Categories Widget */}
                            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700">
                                <h3 className="font-bold text-lg mb-4">Kategori</h3>
                                <ul className="space-y-2">
                                    <CategoryItem name="Tips Belajar" count={12} />
                                    <CategoryItem name="Sains & Teknologi" count={8} />
                                    <CategoryItem name="Info Edukasi" count={5} />
                                    <CategoryItem name="Motivasi" count={15} />
                                    <CategoryItem name="Parenting" count={6} />
                                </ul>
                            </div>

                            {/* Recent Posts Widget */}
                            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700">
                                <h3 className="font-bold text-lg mb-4">Artikel Populer</h3>
                                <ul className="space-y-4">
                                    <RecentPostItem
                                        title="Pentingnya Pendidikan Karakter Sejak Dini"
                                        date="18 Des 2024"
                                        image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
                                    />
                                    <RecentPostItem
                                        title="Mengenal Tata Surya Kita"
                                        date="15 Des 2024"
                                        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
                                    />
                                    <RecentPostItem
                                        title="Matematika itu Menyenangkan, Lho!"
                                        date="10 Des 2024"
                                        image="https://images.unsplash.com/photo-1509228468518-180dd4864904"
                                    />
                                </ul>
                            </div>
                        </aside>
                    </div>
                </main>

                <LandingFooter />
            </div>
        </div>
    );
};

const CategoryItem = ({ name, count }: { name: string, count: number }) => (
    <li className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700 p-2 rounded-lg transition-colors">
        <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</span>
        <span className="bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-gray-400 text-xs py-1 px-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{count}</span>
    </li>
);

const RecentPostItem = ({ title, date, image }: { title: string, date: string, image: string }) => (
    <li className="flex gap-4 group cursor-pointer">
        <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-1">
                {title}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
        </div>
    </li>
);
