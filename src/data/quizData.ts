
export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
    explanation: string;
}

export const solarSystemQuiz: QuizQuestion[] = [
    {
        id: 1,
        question: "Planet manakah yang terdekat dengan Matahari?",
        options: ["Venus", "Bumi", "Merkurius", "Mars"],
        correctAnswer: 2,
        explanation: "Merkurius adalah planet yang paling dekat dengan Matahari."
    },
    {
        id: 2,
        question: "Planet terbesar di Tata Surya adalah...",
        options: ["Saturnus", "Jupiter", "Uranus", "Neptunus"],
        correctAnswer: 1,
        explanation: "Jupiter adalah planet terbesar, dengan ukuran yang bisa memuat 1.300 Bumi."
    },
    {
        id: 3,
        question: "Planet manakah yang dikenal sebagai 'Planet Merah'?",
        options: ["Mars", "Venus", "Jupiter", "Saturnus"],
        correctAnswer: 0,
        explanation: "Mars tampak merah karena adanya besi oksida (karat) di permukaannya."
    },
    {
        id: 4,
        question: "Berapa banyak planet di Tata Surya kita?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 1,
        explanation: "Saat ini ada 8 planet yang diakui di Tata Surya (Pluto tidak lagi dianggap planet utama)."
    },
    {
        id: 5,
        question: "Planet manakah yang memiliki cincin paling terlihat?",
        options: ["Jupiter", "Uranus", "Saturnus", "Neptunus"],
        correctAnswer: 2,
        explanation: "Saturnus terkenal dengan sistem cincinnya yang besar, terang, dan indah."
    }
];

export const fractionQuiz: QuizQuestion[] = [
    {
        id: 1,
        question: "Apa arti dari pecahan 1/2?",
        options: ["Satu dari dua bagian sama besar", "Satu dari tiga bagian", "Dua dari satu bagian", "Setengah dari satu"],
        correctAnswer: 0,
        explanation: "1/2 berarti satu bagian dari dua bagian yang sama besar."
    },
    {
        id: 2,
        question: "Manakah yang merupakan pembilang dari pecahan 3/4?",
        options: ["4", "3", "7", "1"],
        correctAnswer: 1,
        explanation: "Pembilang adalah angka di bagian atas pecahan (" + "3" + ")."
    },
    {
        id: 3,
        question: "Manakah yang merupakan penyebut dari pecahan 5/8?",
        options: ["5", "13", "8", "3"],
        correctAnswer: 2,
        explanation: "Penyebut adalah angka di bagian bawah pecahan (" + "8" + ")."
    },
    {
        id: 4,
        question: "Bentuk pecahan dari 'setengah' adalah...",
        options: ["1/4", "1/3", "1/2", "2/1"],
        correctAnswer: 2,
        explanation: "Setengah sama dengan satu dibagi dua (1/2)."
    },
    {
        id: 5,
        question: "Pecahan senilai dengan 2/4 adalah...",
        options: ["1/3", "1/2", "3/4", "2/3"],
        correctAnswer: 1,
        explanation: "2/4 jika disederhanakan (dibagi 2 pada pembilang dan penyebut) menjadi 1/2."
    },
    {
        id: 6,
        question: "Hasil dari 1/5 + 2/5 adalah...",
        options: ["3/10", "3/5", "2/5", "1/5"],
        correctAnswer: 1,
        explanation: "Karena penyebutnya sama (5), kita cukup menjumlahkan pembilangnya: 1 + 2 = 3. Jadi 3/5."
    },
    {
        id: 7,
        question: "Manakah pecahan yang lebih besar: 1/3 atau 1/4?",
        options: ["1/4", "1/3", "Sama besar", "Tidak bisa ditentukan"],
        correctAnswer: 1,
        explanation: "Semakin kecil penyebutnya, semakin besar nilainya (jika pembilang sama). 1 dibagi 3 lebih besar dari 1 dibagi 4."
    },
    {
        id: 8,
        question: "Bentuk desimal dari 1/2 adalah...",
        options: ["0.2", "0.5", "0.1", "0.25"],
        correctAnswer: 1,
        explanation: "1 dibagi 2 adalah 0.5."
    },
    {
        id: 9,
        question: "Jika sebuah pizza dipotong menjadi 8 bagian sama besar, dan kamu memakan 2 potong, berapa bagian yang kamu makan?",
        options: ["2/8", "1/8", "6/8", "8/2"],
        correctAnswer: 0,
        explanation: "Kamu memakan 2 dari total 8 bagian, jadi 2/8."
    },
    {
        id: 10,
        question: "Sederhanakan pecahan 4/8!",
        options: ["2/8", "1/4", "1/2", "4/4"],
        correctAnswer: 2,
        explanation: "4/8 dibagi 4 pada pembilang dan penyebut menjadi 1/2."
    },
    {
        id: 11,
        question: "Hasil dari 3/7 - 1/7 adalah...",
        options: ["2/7", "4/7", "2/14", "2/0"],
        correctAnswer: 0,
        explanation: "Penyebut sama, kurangi pembilang: 3 - 1 = 2. Jadi 2/7."
    },
    {
        id: 12,
        question: "Pecahan 3/2 disebut pecahan...",
        options: ["Biasa", "Campuran", "Murni", "Tidak Biasa (Improper)"],
        correctAnswer: 3,
        explanation: "Karena pembilang (3) lebih besar dari penyebut (2), ini adalah pecahan tidak biasa atau improper fraction."
    },
    {
        id: 13,
        question: "Ubah 1 1/2 menjadi pecahan biasa...",
        options: ["2/2", "3/2", "1/2", "4/2"],
        correctAnswer: 1,
        explanation: "1 dikali 2 tambah 1 = 3. Jadi 3/2."
    },
    {
        id: 14,
        question: "1/4 + 1/4 = ...",
        options: ["2/8", "1/4", "1/2", "2/4"],
        correctAnswer: 2, // 2/4 is usually correct but 1/2 is simpler form. Let's provide 2/4 in options? Wait, 2/4 simplify to 1/2.
        explanation: "1/4 + 1/4 = 2/4. Jika disederhanakan menjadi 1/2."
    },
    {
        id: 15,
        question: "Ibu membeli 1/2 kg gula dan bibi memberinya 1/2 kg lagi. Berapa total gula ibu?",
        options: ["1 kg", "1/4 kg", "2 kg", "1/2 kg"],
        correctAnswer: 0,
        explanation: "1/2 + 1/2 = 2/2 = 1."
    }
];
