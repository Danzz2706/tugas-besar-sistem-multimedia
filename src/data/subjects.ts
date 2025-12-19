
import { solarSystemQuiz, fractionQuiz } from "./quizData";
import {
    geometryQuiz,
    fictionQuiz,
    animalQuiz,
    plantQuiz,
    geographyQuiz,
    historyQuiz
} from "./quizQuestions";

export interface Material {
    id: string;
    title: string;
    type: 'video' | 'quiz' | 'interactive' | 'text';
    content: string | any[]; // URL for video, quiz ID, or raw text, or Question[]
    description?: string;
    thumbnail?: string;
    duration?: string;
}

export interface Module {
    id: string;
    title: string;
    materials: Material[];
}

export interface Subject {
    id: string;
    name: string;
    description: string;
    iconName: string;
    modules: Module[];
}

export const subjectsData: Record<string, Subject> = {
    "matematika": {
        id: "matematika",
        name: "Matematika",
        description: "Belajar matematika jadi seru dengan video interaktif!",
        iconName: "Calculator",
        modules: [
            {
                id: "mod-1",
                title: "Bilangan Pecahan",
                materials: [
                    {
                        id: "mat-1",
                        title: "Konsep Dasar Pecahan",
                        type: "video",
                        content: "https://youtu.be/JLECRcIUg9s?si=-sZxeRzid4UqVLeZ",
                        description: "Apa itu pecahan? Yuk kita cari tahu lewat potongan pizza!",
                        duration: "5:30"
                    },
                    {
                        id: "mat-2",
                        title: "Penjumlahan Pecahan",
                        type: "video",
                        content: "https://youtu.be/0hPRfqPFtt8?si=yU2ra2xv--q03eoz",
                        description: "Cara mudah menjumlahkan pecahan beda penyebut.",
                        duration: "8:15"
                    },
                    {
                        id: "quiz-1",
                        title: "Kuis Pecahan Dasar",
                        type: "quiz",
                        content: fractionQuiz,
                        description: "Uji pemahamanmu tentang pecahan!",
                        duration: "15 Soal"
                    }
                ]
            },
            {
                id: "mod-2",
                title: "Geometri Seru",
                materials: [
                    { id: "mat-3", title: "Mengenal Bangun Ruang", type: "video", content: "https://youtu.be/mSoKyLJehYM?si=2_kaAmBgaai1c0bt", description: "Persegi, Segitiga, dan Lingkaran di sekitarmu.", duration: "6:00" },
                    { id: "mat-4", title: "Bangun Ruang 3D", type: "interactive", content: "/geometry-explorer", description: "Simulasi bangun ruang interaktif (Kubus, Balok, dll)", duration: "Interactive" },
                    {
                        id: "quiz-geo-1",
                        title: "Kuis Bangun Ruang",
                        type: "quiz",
                        content: geometryQuiz,
                        description: "Seberapa paham kamu tentang bentuk-bentuk 3D?",
                        duration: "10 Soal"
                    }
                ]
            }
        ]
    },
    "bahasa-indonesia": {
        id: "bahasa-indonesia",
        name: "Bahasa Indonesia",
        description: "Petualangan seru di dunia sastra dan cerita.",
        iconName: "BookOpen",
        modules: [
            {
                id: "mod-indo-1",
                title: "Cerita Fiksi",
                materials: [
                    { id: "mat-indo-1", title: "Unsur Cerita Dongeng", type: "video", content: "https://youtu.be/k8Fv_koc9OM?si=vLDEWcQrNpeEAJVg", description: "Siapa itu tokoh protagonis dan antagonis?", duration: "7:20" },
                    { id: "mat-indo-2", title: "Membaca Puisi Indah", type: "video", content: "https://youtu.be/CoA3dBElBYA?si=-mk7R2V8yLhWBI_X", description: "Tips membaca puisi dengan intonasi yang tepat.", duration: "4:45" },
                    {
                        id: "quiz-indo-1",
                        title: "Kuis Cerita & Puisi",
                        type: "quiz",
                        content: fictionQuiz,
                        description: "Uji pemahamanmu tentang unsur cerita dan puisi!",
                        duration: "10 Soal"
                    }
                ]
            }
        ]
    },
    "ipa": {
        id: "ipa",
        name: "Ilmu Pengetahuan Alam",
        description: "Jelajahi alam semesta, hewan menakjubkan, dan tumbuhan unik.",
        iconName: "Rocket",
        modules: [
            {
                id: "mod-ipa-1",
                title: "Tata Surya (Solar System)",
                materials: [
                    {
                        id: "mat-ipa-sol-1",
                        title: "Mengenal Planet Kita",
                        type: "video",
                        content: "https://www.youtube.com/embed/wAr5DARC6rc",
                        description: "Perjalanan keliling planet-planet di tata surya.",
                        duration: "12:00"
                    },
                    {
                        id: "mat-ipa-sol-read-1",
                        title: "Rangkuman: Planet Dalam vs Luar",
                        type: "text",
                        content: "Tata surya kita terdiri dari 8 planet yang mengelilingi Matahari. Planet-planet ini dibagi menjadi dua kelompok: Planet Dalam (Merkurius, Venus, Bumi, Mars) dan Planet Luar (Jupiter, Saturnus, Uranus, Neptunus). \n\nPlanet Dalam berukuran lebih kecil dan tersusun dari batuan. Sedangkan Planet Luar berukuran raksasa dan tersusun dari gas. \n\nTahukah kamu? Jupiter adalah planet terbesar, sedangkan Merkurius adalah yang terkecil!",
                        description: "Bacaan singkat tentang pengelompokan planet.",
                        duration: "3 min baca"
                    },
                    {
                        id: "mat-ipa-sol-2",
                        title: "Simulasi 3D Tata Surya",
                        type: "interactive",
                        content: "/solar-system",
                        description: "Kendalikan pesawatmu dan jelajahi antariksa secara langsung!",
                        duration: "Interactive"
                    },
                    {
                        id: "mat-ipa-sol-quiz-1",
                        title: "Kuis Tata Surya",
                        type: "quiz",
                        content: solarSystemQuiz,
                        description: "Uji pengetahuanmu tentang planet-planet di tata surya!",
                        duration: "5 Soal"
                    },
                    {
                        id: "mat-ipa-sol-ebook-1",
                        title: "E-Book: Menjelajah Angkasa Luar",
                        type: "text",
                        content: "Modul ini berisi materi lengkap tentang Sistem Tata Surya untuk Kelas 6 Tema 9 Subtema 1 (Keteraturan yang Menakjubkan).\n\nDalam modul ini, kamu akan mempelajari:\n1. Matahari sebagai pusat tata surya.\n2. Karakteristik 8 planet (Merkurius hingga Neptunus).\n3. Benda langit lainnya seperti asteroid, komet, dan meteor.\n4. Keteraturan orbit planet dalam mengelilingi Matahari.\n\n[Klik di sini untuk membaca Modul Lengkap (PDF)](https://repositori.kemendikdasmen.go.id/22928/1/691.%20%5BWEB%5D%20Modul%20Siswa%20Kelas%206%20Tema%209%20Subtema%201.pdf)",
                        description: "Modul resmi Kemendikbud: Keteraturan yang Menakjubkan.",
                        duration: "10 min baca"
                    }
                ]
            },
            {
                id: "mod-ipa-2",
                title: "Dunia Hewan",
                materials: [
                    {
                        id: "mat-ipa-ani-1",
                        title: "Penggolongan Hewan",
                        type: "video",
                        content: "https://www.youtube.com/embed/2JfkxMdh1Do",
                        description: "Belajar seru tentang penggolongan hewan berdasarkan makanannya (Herbivora, Karnivora, Omnivora).",
                        duration: "4:35"
                    },
                    {
                        id: "mat-ipa-ani-2",
                        title: "Daur Hidup Hewan",
                        type: "video",
                        content: "https://youtu.be/P7Q9qst71Fc?si=9tv6hAwbDfiN-QY_",
                        description: "Metamorfosis sempurna dari ulat menjadi kupu-kupu cantik.",
                        duration: "Interactive"
                    },
                    {
                        id: "quiz-ipa-ani-1",
                        title: "Kuis Dunia Hewan",
                        type: "quiz",
                        content: animalQuiz,
                        description: "Tes pengetahuanmu tentang hewan dan daur hidupnya.",
                        duration: "10 Soal"
                    }
                ]
            },
            {
                id: "mod-ipa-3",
                title: "Tumbuhan Hijau",
                materials: [
                    {
                        id: "mat-ipa-pla-1",
                        title: "Fotosintesis",
                        type: "video",
                        content: "https://youtu.be/vF8uWdrVorg?si=s7Ia_Hrhbqg5898T",
                        description: "Bagaimana tumbuhan memasak makanannya sendiri?",
                        duration: "6:45"
                    },
                    {
                        id: "mat-ipa-pla-2",
                        title: "Bagian-bagian Bunga",
                        type: "video",
                        content: "https://youtu.be/y0ntFx11xiU?si=Iy5eO6w9HkJUsB9l",
                        description: "Putik, benang sari, dan mahkota bunga.",
                        duration: "4:20"
                    },
                    {
                        id: "quiz-ipa-pla-1",
                        title: "Kuis Tumbuhan Hijau",
                        type: "quiz",
                        content: plantQuiz,
                        description: "Seberapa tahu kamu tentang fotosintesis?",
                        duration: "10 Soal"
                    }
                ]
            }
        ]
    },
    "ips": {
        id: "ips",
        name: "Ilmu Pengetahuan Sosial",
        description: "Keliling dunia dan belajar sejarah masa lalu.",
        iconName: "Globe",
        modules: [
            {
                id: "mod-ips-1",
                title: "Asal Usul Nama dan Julukan Benua di Dunia",
                materials: [
                    { id: "mat-ips-1", title: "Membaca Peta", type: "video", content: "https://youtu.be/DawZV0Y7M7U?si=8uJG6PpyKYtseVwm", description: "Cara asyik membaca peta dan mencari harta karun!", duration: "9:00" },
                    {
                        id: "quiz-ips-geo-1",
                        title: "Kuis Peta & Benua",
                        type: "quiz",
                        content: geographyQuiz,
                        description: "Jelajahi pengetahuanmu tentang peta dunia.",
                        duration: "10 Soal"
                    }
                ]
            },
            {
                id: "mod-ips-2",
                title: "Sejarah Indonesia",
                materials: [
                    { id: "mat-ips-2", title: "Detik-detik Proklamasi", type: "video", content: "https://youtu.be/6bnxpA6b00Y?si=tp8nHFstVqsQbWmF", description: "Kisah menegangkan di balik kemerdekaan Indonesia.", duration: "10:00" },
                    {
                        id: "quiz-ips-his-1",
                        title: "Kuis Sejarah Indonesia",
                        type: "quiz",
                        content: historyQuiz,
                        description: "Ingatkah kamu dengan sejarah kemerdekaan kita?",
                        duration: "10 Soal"
                    }
                ]
            }
        ]
    }
};
