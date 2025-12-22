import { LandingNavbar } from '../components/LandingNavbar';
import { LandingFooter } from '../components/LandingFooter';
import { Github, Instagram, Linkedin, Code, Palette, Terminal, Database } from 'lucide-react';

export const DevTeamPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white transition-colors duration-300 font-sans flex flex-col relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                    alt="Team Background"
                    className="w-full h-full object-cover opacity-10 dark:opacity-5"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-neutral-900/50 dark:to-neutral-900"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <LandingNavbar />

                <main className="flex-grow container mx-auto px-6 py-20">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6">
                            <Code className="w-4 h-4" /> Meet the Creators
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Tim Pengembang EduConnect</h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Kami adalah mahasiswa berdedikasi yang membangun masa depan pendidikan digital.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Zaidan */}
                        <DeveloperProfileCard
                            name="Zaidan Kamil Munadi"
                            role="Back End Developer"
                            id="103032430014"
                            imageUrl="/src/assets/ZAIDAN.jpg"
                            description="Mahasiswa Telkom University yang berfokus pada pengembangan sistem server yang handal dan aman. Bertanggung jawab atas logika bisnis, database, dan integrasi API EduConnect."
                            skills={["Node.js", "Express", "Firebase", "PostgreSQL", "System Design"]}
                            socials={{
                                github: "https://github.com/Danzz2706",
                                instagram: "https://instagram.com/zaidanmunadi_",
                                linkedin: "https://linkedin.com/in/zaidan-kamil-munadi"
                            }}
                            icon={<Database className="w-6 h-6 text-white" />}
                            color="bg-blue-600"
                        />

                        {/* Cheng Ho */}
                        <DeveloperProfileCard
                            name="Muhammad Cheng Ho Pulungan"
                            role="Front End Developer"
                            id="103032400146"
                            imageUrl="/src/assets/CHENGHO.jpeg"
                            description="Mahasiswa Telkom University dengan passion di bidang UI/UX. Merancang antarmuka pengguna yang intuitif, estetis, dan responsif untuk memberikan pengalaman belajar terbaik."
                            skills={["React", "TypeScript", "Tailwind CSS", "Framer Motion", "UI/UX"]}
                            socials={{
                                github: "https://github.com/nchooo",
                                instagram: "https://instagram.com/mcheng_hop",
                                linkedin: "https://linkedin.com/in/chengho"
                            }}
                            icon={<Palette className="w-6 h-6 text-white" />}
                            color="bg-purple-600"
                        />
                    </div>
                </main>

                <LandingFooter />
            </div>
        </div>
    );
};

const DeveloperProfileCard = ({ name, role, id, imageUrl, description, skills, socials, icon, color }: any) => (
    <div className="bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-neutral-700 flex flex-col">
        {/* Header Banner */}
        <div className={`h-32 ${color} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        </div>

        <div className="px-8 pb-8 flex-grow flex flex-col relative">
            {/* Profile Image */}
            <div className="relative -mt-16 mb-6 self-start">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-neutral-800 shadow-md overflow-hidden bg-white">
                    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                </div>
                <div className={`absolute bottom-1 right-1 p-2 rounded-full ${color} border-2 border-white dark:border-neutral-800 shadow-sm`}>
                    {icon}
                </div>
            </div>

            {/* Info */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{name}</h2>
                <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase text-white ${color} bg-opacity-90`}>
                        {role}
                    </span>
                    <span className="text-sm text-gray-400 font-mono">ID: {id}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Skills */}
            <div className="mb-8 flex-grow">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Socials - Bottom */}
            <div className="pt-6 border-t border-gray-100 dark:border-neutral-700 flex justify-between items-center">
                <span className="text-sm text-gray-400 font-medium">Connect with me</span>
                <div className="flex gap-3">
                    <SocialLink href={socials.github} icon={<Github className="w-5 h-5" />} label="GitHub" />
                    <SocialLink href={socials.instagram} icon={<Instagram className="w-5 h-5" />} label="Instagram" />
                    <SocialLink href={socials.linkedin} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
                </div>
            </div>
        </div>
    </div>
);

const SocialLink = ({ href, icon, label }: { href: string, icon: any, label: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-gray-900 dark:text-gray-400 dark:hover:text-white dark:hover:bg-black transition-all"
        aria-label={label}
    >
        {icon}
    </a>
);
