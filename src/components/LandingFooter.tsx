import { MapPin, Mail, Heart } from 'lucide-react';

export const LandingFooter = () => {
    return (
        <footer className="bg-white dark:bg-neutral-900 pt-16 pb-8 border-t border-gray-100 dark:border-neutral-800">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & Description */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">E</div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">EduConnect</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                            Platform belajar interaktif yang membantu siswa Indonesia meraih impian mereka dengan cara yang menyenangkan.
                        </p>
                    </div>

                    {/* Developer Contacts */}
                    <div className="lg:col-span-1">
                        <h4 className="text-lg font-bold mb-6">Hubungi Kami</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                                <div>
                                    <span className="block font-medium text-gray-900 dark:text-white">Zaidan Kamil Munadi</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Back End Developer</span>
                                    <a href="mailto:zaidanmunadi@gmail.com" className="block text-sm text-blue-600 hover:underline mt-1">zaidanmunadi@gmail.com</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-1" />
                                <div>
                                    <span className="block font-medium text-gray-900 dark:text-white">Muhammad Cheng Ho Pulungan</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer</span>
                                    <a href="mailto:nchooo@gmail.com" className="block text-sm text-blue-600 hover:underline mt-1">nchooo@gmail.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Maps */}
                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-red-500" />
                            Lokasi Kami
                        </h4>
                        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-neutral-700 h-64 w-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.307454332906!2d107.66085187587635!3d-6.973006968280654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9adf177bf8d%3A0x437398556f9fa03!2sTelkom%20University!5e0!3m2!1sen!2sid!4v1703225883713!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            Telkom University, Jl. Telekomunikasi No. 1, Terusan Buahbatu - Bojongsoang, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-neutral-800 pt-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center gap-1">
                        © 2025 EduConnect. Dibuat dengan <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> untuk Siswa Indonesia.
                    </p>
                </div>
            </div>
        </footer>
    );
};