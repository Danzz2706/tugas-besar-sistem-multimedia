import type { Question } from "../components/GenericQuiz";

// Matematika - Bangun Ruang
export const geometryQuiz: Question[] = [
    {
        question: "Bangun ruang yang memiliki selimut berbentuk persegi panjang dan alas serta tutup berbentuk lingkaran adalah?",
        options: ["Tabung", "Kerucut", "Bola", "Limas"],
        correctAnswer: 0,
        explanation: "Tabung memiliki dua sisi berbentuk lingkaran (alas dan tutup) serta selimut berbentuk persegi panjang."
    },
    {
        question: "Jumlah sisi pada bangun kubus adalah...",
        options: ["4", "6", "8", "12"],
        correctAnswer: 1,
        explanation: "Kubus memiliki 6 sisi berbentuk persegi yang sama besar."
    },
    {
        question: "Volume kubus dengan panjang rusuk 5 cm adalah...",
        options: ["25 cm³", "100 cm³", "125 cm³", "150 cm³"],
        correctAnswer: 2,
        explanation: "Volume kubus = s x s x s = 5 x 5 x 5 = 125 cm³."
    },
    {
        question: "Bangun ruang yang tidak memiliki titik sudut adalah...",
        options: ["Kubus", "Balok", "Bola", "Limas Segiempat"],
        correctAnswer: 2,
        explanation: "Bola adalah bangun ruang sisi lengkung yang tidak memiliki titik sudut."
    },
    {
        question: "Rumus volume balok adalah...",
        options: ["s x s x s", "p x l x t", "π x r² x t", "1/3 x luas alas x tinggi"],
        correctAnswer: 1,
        explanation: "Rumus volume balok adalah panjang x lebar x tinggi (p x l x t)."
    },
    {
        question: "Benda berikut yang berbentuk kerucut adalah...",
        options: ["Topi ulang tahun", "Kaleng susu", "Dadu", "Bola basket"],
        correctAnswer: 0,
        explanation: "Topi ulang tahun umumnya berbentuk kerucut."
    },
    {
        question: "Sebuah balok memiliki panjang 10 cm, lebar 5 cm, dan tinggi 2 cm. Berapakah volumenya?",
        options: ["50 cm³", "100 cm³", "20 cm³", "200 cm³"],
        correctAnswer: 1,
        explanation: "Volume = 10 x 5 x 2 = 100 cm³."
    },
    {
        question: "Prisma segitiga memiliki alas berbentuk...",
        options: ["Persegi", "Lingkaran", "Segitiga", "Segilima"],
        correctAnswer: 2,
        explanation: "Sesuai namanya, prisma segitiga memiliki alas dan tutup berbentuk segitiga."
    },
    {
        question: "Berapa jumlah titik sudut pada balok?",
        options: ["6", "8", "10", "12"],
        correctAnswer: 1,
        explanation: "Balok memiliki 8 titik sudut."
    },
    {
        question: "Limas segiempat memiliki sisi alas berbentuk...",
        options: ["Segitiga", "Segiempat", "Lingkaran", "Trapesium"],
        correctAnswer: 1,
        explanation: "Limas segiempat memiliki alas berbentuk segiempat."
    }
];

// Bahasa Indonesia - Cerita Fiksi
export const fictionQuiz: Question[] = [
    {
        question: "Tokoh yang berperan sebagai penentang tokoh utama dalam cerita disebut?",
        options: ["Protagonis", "Antagonis", "Tritagonis", "Figuran"],
        correctAnswer: 1,
        explanation: "Antagonis adalah tokoh yang menentang atau menjadi lawan tokoh utama."
    },
    {
        question: "Pesan moral yang ingin disampaikan penulis kepada pembaca disebut...",
        options: ["Tema", "Alur", "Latar", "Amanat"],
        correctAnswer: 3,
        explanation: "Amanat adalah pesan moral atau nasihat yang ingin disampaikan penulis."
    },
    {
        question: "Bagian awal cerita yang mengenalkan tokoh dan latar disebut...",
        options: ["Orientasi", "Komplikasi", "Resolusi", "Koda"],
        correctAnswer: 0,
        explanation: "Orientasi adalah bagian pengenalan cerita."
    },
    {
        question: "Cerita yang berasal dari khayalan penulis dan bukan kejadian nyata disebut cerita...",
        options: ["Nonfiksi", "Fiksi", "Sejarah", "Biografi"],
        correctAnswer: 1,
        explanation: "Fiksi berarti rekaan atau khayalan, bukan kejadian nyata."
    },
    {
        question: "Tempat, waktu, dan suasana terjadinya peristiwa dalam cerita disebut...",
        options: ["Alur", "Latar", "Tema", "Sudut Pandang"],
        correctAnswer: 1,
        explanation: "Latar mencakup tempat, waktu, dan suasana dalam cerita."
    },
    {
        question: "Tokoh yang memiliki watak baik dan menjadi pusat cerita disebut...",
        options: ["Protagonis", "Antagonis", "Figuran", "Tritagonis"],
        correctAnswer: 0,
        explanation: "Protagonis adalah tokoh utama yang biasanya berwatak baik."
    },
    {
        question: "Rangkaian peristiwa yang membentuk sebuah cerita disebut...",
        options: ["Latar", "Alur", "Amanat", "Tema"],
        correctAnswer: 1,
        explanation: "Alur adalah jalinan peristiwa dalam cerita."
    },
    {
        question: "Cerita rakyat 'Malin Kundang' berasal dari daerah...",
        options: ["Jawa Barat", "Sumatera Barat", "Kalimantan Timur", "Sulawesi Selatan"],
        correctAnswer: 1,
        explanation: "Malin Kundang adalah cerita rakyat dari Sumatera Barat."
    },
    {
        question: "Watak tokoh dalam cerita dapat diketahui melalui...",
        options: ["Dialog antartokoh", "Jumlah halaman buku", "Gambar sampul", "Harga buku"],
        correctAnswer: 0,
        explanation: "Watak tokoh bisa tersirat melalui dialog atau tingkah laku dalam cerita."
    },
    {
        question: "Latar waktu 'pada suatu hari yang cerah' menunjukkan...",
        options: ["Pagi atau Siang hari", "Malam hari", "Sore hari", "Subuh"],
        correctAnswer: 0,
        explanation: "Hari yang cerah identik dengan adanya matahari, yaitu pagi atau siang."
    }
];

// IPA - Dunia Hewan
export const animalQuiz: Question[] = [
    {
        question: "Hewan yang memakan tumbuhan disebut...",
        options: ["Karnivora", "Herbivora", "Omnivora", "Insektivora"],
        correctAnswer: 1,
        explanation: "Herbivora adalah pemakan tumbuhan."
    },
    {
        question: "Kupu-kupu mengalami metamorfosis...",
        options: ["Sempurna", "Tidak Sempurna", "Sebagian", "Sementara"],
        correctAnswer: 0,
        explanation: "Metamorfosis kupu-kupu melalui 4 tahap: telur - larva - pupa - imago (sempurna)."
    },
    {
        question: "Tahapan metamorfosis kupu-kupu yang merugikan petani adalah...",
        options: ["Telur", "Ulat (Larva)", "Kepompong (Pupa)", "Kupu-kupu Dewasa"],
        correctAnswer: 1,
        explanation: "Ulat memakan daun tanaman sehingga merugikan petani."
    },
    {
        question: "Hewan berikut yang termasuk omnivora (pemakan segala) adalah...",
        options: ["Sapi", "Harimau", "Ayam", "Kambing"],
        correctAnswer: 2,
        explanation: "Ayam memakan biji-bijian, cacing, dan serangga."
    },
    {
        question: "Kucing berkembang biak dengan cara...",
        options: ["Bertelur (Ovipar)", "Melahirkan (Vivipar)", "Bertelur melahirkan (Ovovivipar)", "Membelah diri"],
        correctAnswer: 1,
        explanation: "Kucing adalah mamalia yang melahirkan anaknya."
    },
    {
        question: "Hewan yang aktif mencari makan pada malam hari disebut hewan...",
        options: ["Diurnal", "Nokturnal", "Mamalia", "Reptil"],
        correctAnswer: 1,
        explanation: "Nokturnal adalah hewan yang aktif di malam hari."
    },
    {
        question: "Contoh hewan yang mengalami metamorfosis tidak sempurna adalah...",
        options: ["Kupu-kupu", "Nyamuk", "Kecoa", "Lalat"],
        correctAnswer: 2,
        explanation: "Kecoa tidak mengalami fase kepompong (pupa)."
    },
    {
        question: "Komodo adalah hewan endemik yang berasal dari...",
        options: ["Sumatera", "Jawa", "Nusa Tenggara Timur", "Papua"],
        correctAnswer: 2,
        explanation: "Komodo berasal dari Pulau Komodo, NTT."
    },
    {
        question: "Ciri khusus kelelawar adalah memiliki kemampuan...",
        options: ["Mimikri", "Autotomi", "Ekolokasi", "Hibernasi"],
        correctAnswer: 2,
        explanation: "Ekolokasi adalah kemampuan mendeteksi lingkungan dengan pantulan suara."
    },
    {
        question: "Ular berkembang biak dengan cara...",
        options: ["Vivipar", "Ovipar", "Ovovivipar (sebagian jenis)", "Spora"],
        correctAnswer: 2,
        explanation: "Beberapa ular bertelur, namun ada juga yang ovovivipar (bertelur melahirkan)."
    }
];

// IPA - Tumbuhan
export const plantQuiz: Question[] = [
    {
        question: "Proses pembuatan makanan pada tumbuhan hijau dengan bantuan cahaya matahari disebut...",
        options: ["Respirasi", "Fotosintesis", "Adaptasi", "Reproduksi"],
        correctAnswer: 1,
        explanation: "Fotosintesis adalah proses tumbuhan membuat makanan dengan cahaya."
    },
    {
        question: "Zat hijau daun yang berperan penting dalam fotosintesis adalah...",
        options: ["Stomata", "Klorofil", "Xilem", "Floem"],
        correctAnswer: 1,
        explanation: "Klorofil adalah zat hijau daun penangkap cahaya matahari."
    },
    {
        question: "Bagian bunga yang berfungsi sebagai alat kelamin jantan adalah...",
        options: ["Putik", "Benang Sari", "Mahkota", "Kelopak"],
        correctAnswer: 1,
        explanation: "Benang sari adalah alat kelamin jantan, putik adalah betina."
    },
    {
        question: "Tumbuhan kaktus memiliki daun berbentuk duri untun bertujuan...",
        options: ["Mempercepat penguapan", "Mengurangi penguapan", "Menyimpan air", "Menangkap serangga"],
        correctAnswer: 1,
        explanation: "Daun berbentuk duri mengurangi luas permukaan penguapan."
    },
    {
        question: "Tumbuhan yang menyimpan cadangan makanan di akar adalah...",
        options: ["Padi", "Mangga", "Wortel", "Tebu"],
        correctAnswer: 2,
        explanation: "Wortel adalah umbi akar yang menyimpan cadangan makanan."
    },
    {
        question: "Gas yang dihasilkan dari proses fotosintesis dan dibutuhkan manusia untuk bernapas adalah...",
        options: ["Karbondioksida", "Oksigen", "Nitrogen", "Hidrogen"],
        correctAnswer: 1,
        explanation: "Fotosintesis menghasilkan oksigen (O2)."
    },
    {
        question: "Bagian tumbuhan yang berfungsi menyerap air dan zat hara dari tanah adalah...",
        options: ["Batang", "Daun", "Akar", "Bunga"],
        correctAnswer: 2,
        explanation: "Akar berfungsi menyerap air dan mineral dari tanah."
    },
    {
        question: "Tumbuhan teratai hidup di lingkungan...",
        options: ["Kering", "Air", "Lembab", "Gurun"],
        correctAnswer: 1,
        explanation: "Teratai adalah tumbuhan hidrofit (hidup di air)."
    },
    {
        question: "Alat perkembangbiakan vegetatif alami pada bawang merah adalah...",
        options: ["Umbi Lapis", "Umbi Batang", "Tunas", "Geragih"],
        correctAnswer: 0,
        explanation: "Bawang merah berkembang biak dengan umbi lapis."
    },
    {
        question: "Penerima serbuk sari pada proses penyerbukan adalah...",
        options: ["Benang sari", "Putik", "Mahkota", "Bakal biji"],
        correctAnswer: 1,
        explanation: "Penyerbukan adalah jatuhnya serbuk sari ke kepala putik."
    }
];

// IPS - Peta dan Benua
export const geographyQuiz: Question[] = [
    {
        question: "Benua terbesar di dunia adalah...",
        options: ["Afrika", "Amerika", "Asia", "Eropa"],
        correctAnswer: 2,
        explanation: "Asia adalah benua terbesar di dunia."
    },
    {
        question: "Indonesia terletak di antara dua benua, yaitu...",
        options: ["Asia dan Afrika", "Asia dan Australia", "Australia dan Amerika", "Eropa dan Asia"],
        correctAnswer: 1,
        explanation: "Indonesia diapit oleh Benua Asia dan Benua Australia."
    },
    {
        question: "Garis khayal yang membagi bumi menjadi belahan utara dan selatan disebut...",
        options: ["Garis Bujur", "Garis Lintang/Khatulistiwa", "Garis Wallace", "Garis Weber"],
        correctAnswer: 1,
        explanation: "Khatulistiwa (ekuator) membagi bumi menjadi belahan utara dan selatan."
    },
    {
        question: "Arah mata angin yang menunjuk ke atas pada peta biasanya adalah...",
        options: ["Barat", "Timur", "Selatan", "Utara"],
        correctAnswer: 3,
        explanation: "Standar orientasi peta menempatkan utara di bagian atas."
    },
    {
        question: "Simbol segitiga merah pada peta biasanya menunjukkan...",
        options: ["Gunung berapi aktif", "Danau", "Ibukota", "Bandara"],
        correctAnswer: 0,
        explanation: "Segitiga merah adalah simbol standar untuk gunung berapi aktif."
    },
    {
        question: "Samudra terluas di dunia adalah...",
        options: ["Samudra Hindia", "Samudra Atlantik", "Samudra Pasifik", "Samudra Arktik"],
        correctAnswer: 2,
        explanation: "Pasifik adalah samudra terluas."
    },
    {
        question: "Negara tetangga Indonesia yang berbatasan langsung di darat wilayah Kalimantan adalah...",
        options: ["Singapura", "Malaysia", "Thailand", "Filipina"],
        correctAnswer: 1,
        explanation: "Malaysia (Sabah & Sarawak) berbatasan darat dengan Kalimantan."
    },
    {
        question: "Benua yang dijuluki sebagai 'Benua Hitam' adalah...",
        options: ["Asia", "Eropa", "Afrika", "Australia"],
        correctAnswer: 2,
        explanation: "Afrika dulu sering disebut Benua Hitam oleh bangsa Eropa."
    },
    {
        question: "Skala peta 1:1.000.000 artinya 1 cm di peta sama dengan ... di jarak sebenarnya.",
        options: ["1 km", "10 km", "100 km", "1000 km"],
        correctAnswer: 1,
        explanation: "1 cm x 1.000.000 = 1.000.000 cm = 10 km."
    },
    {
        question: "Atlas adalah kumpulan ... yang dibukukan.",
        options: ["Cerita", "Peta", "Foto", "Lagu"],
        correctAnswer: 1,
        explanation: "Atlas adalah buku yang berisi kumpulan peta."
    }
];

// IPS - Sejarah Indonesia
export const historyQuiz: Question[] = [
    {
        question: "Teks Proklamasi Kemerdekaan Indonesia dibacakan oleh...",
        options: ["Moh. Hatta", "Ir. Soekarno", "Sayuti Melik", "Soepomo"],
        correctAnswer: 1,
        explanation: "Ir. Soekarno membacakan teks proklamasi didampingi Moh. Hatta."
    },
    {
        question: "Kemerdekaan Indonesia diproklamasikan pada tanggal...",
        options: ["17 Agustus 1945", "18 Agustus 1945", "28 Oktober 1928", "20 Mei 1908"],
        correctAnswer: 0,
        explanation: "17 Agustus 1945 adalah hari kemerdekaan RI."
    },
    {
        question: "Bendera Merah Putih yang dikibarkan saat proklamasi dijahit oleh...",
        options: ["Fatmawati", "R.A. Kartini", "Megawati", "Cut Nyak Dien"],
        correctAnswer: 0,
        explanation: "Ibu Fatmawati menjahit bendera pusaka Merah Putih."
    },
    {
        question: "Tokoh yang mengetik naskah proklamasi adalah...",
        options: ["Sukarni", "Sayuti Melik", "Ahmad Soebardjo", "Laksamana Maeda"],
        correctAnswer: 1,
        explanation: "Sayuti Melik mengetik naskah proklamasi setelah ditulis tangan."
    },
    {
        question: "Lagu kebangsaan Indonesia Raya diciptakan oleh...",
        options: ["W.R. Supratman", "Ismail Marzuki", "Cornel Simanjuntak", "H. Mutahar"],
        correctAnswer: 0,
        explanation: "W.R. Supratman adalah pencipta lagu Indonesia Raya."
    },
    {
        question: "Peristiwa Rengasdengklok terjadi karena perbedaan pendapat antara golongan muda dan golongan tua mengenai...",
        options: ["Waktu proklamasi", "Tempat proklamasi", "Pemimpin negara", "Isi teks proklamasi"],
        correctAnswer: 0,
        explanation: "Desakan golongan muda agar proklamasi segera dilakukan tanpa menunggu Jepang."
    },
    {
        question: "BPUPKI adalah singkatan dari...",
        options: ["Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan Indonesia", "Badan Persiapan Kemerdekaan Indonesia", "Badan Perancang Undang-Undang", "Badan Pengawas Kemerdekaan"],
        correctAnswer: 0,
        explanation: "BPUPKI = Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan Indonesia."
    },
    {
        question: "Sumpah Pemuda diikrarkan pada tanggal...",
        options: ["17 Agustus", "10 November", "28 Oktober", "2 Mei"],
        correctAnswer: 2,
        explanation: "Sumpah Pemuda terjadi pada 28 Oktober 1928."
    },
    {
        question: "Pahlawan yang mendapat julukan 'Ayam Jantan dari Timur' adalah...",
        options: ["Pangeran Diponegoro", "Sultan Hasanuddin", "Pattimura", "Imam Bonjol"],
        correctAnswer: 1,
        explanation: "Sultan Hasanuddin dari Gowa-Tallo dijuluki Ayam Jantan dari Timur."
    },
    {
        question: "Kerajaan Hindu tertua di Indonesia adalah...",
        options: ["Majapahit", "Tarumanegara", "Kutai", "Sriwijaya"],
        correctAnswer: 2,
        explanation: "Kutai di Kalimantan Timur adalah kerajaan Hindu tertua."
    }
];
