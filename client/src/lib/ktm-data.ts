import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const assetBase = import.meta.env.BASE_URL;
const sig1 = `${assetBase}images/signature1.png`;
const sig2 = `${assetBase}images/signature2.png`;
const sig3 = `${assetBase}images/signature3.png`;
const sig4 = `${assetBase}images/signature4.png`;
const sig5 = `${assetBase}images/signature5.png`;
export const cardTemplateBg = `${assetBase}images/card-template.png`;

export const signatureImages = [sig1, sig2, sig3, sig4, sig5];

export interface CardTheme {
  id: string;
  name: string;
  primary: string;
  primaryLight: string;
  gradient: string;
  bannerGradient: string;
  accentColor: string;
  bottomBar: string;
  photoBorder: string;
  photoBg: string;
  statusColor: string;
}

export const cardThemes: CardTheme[] = [
  {
    id: "green",
    name: "Hijau (Default)",
    primary: "#0d9668",
    primaryLight: "#14b8a6",
    gradient: "linear-gradient(135deg, #0d9668 0%, #14b8a6 50%, #0d9668 100%)",
    bannerGradient: "linear-gradient(90deg, #0a7b54 0%, #0d9668 100%)",
    accentColor: "#0d9668",
    bottomBar: "linear-gradient(90deg, #0d9668, #14b8a6, #0d9668)",
    photoBorder: "#0d9668",
    photoBg: "#e0f2f1",
    statusColor: "#0d9668",
  },
  {
    id: "blue",
    name: "Biru",
    primary: "#1d4ed8",
    primaryLight: "#3b82f6",
    gradient: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #1d4ed8 100%)",
    bannerGradient: "linear-gradient(90deg, #1a3fb0 0%, #1d4ed8 100%)",
    accentColor: "#1d4ed8",
    bottomBar: "linear-gradient(90deg, #1d4ed8, #3b82f6, #1d4ed8)",
    photoBorder: "#1d4ed8",
    photoBg: "#dbeafe",
    statusColor: "#1d4ed8",
  },
  {
    id: "red",
    name: "Merah",
    primary: "#b91c1c",
    primaryLight: "#ef4444",
    gradient: "linear-gradient(135deg, #b91c1c 0%, #ef4444 50%, #b91c1c 100%)",
    bannerGradient: "linear-gradient(90deg, #991b1b 0%, #b91c1c 100%)",
    accentColor: "#b91c1c",
    bottomBar: "linear-gradient(90deg, #b91c1c, #ef4444, #b91c1c)",
    photoBorder: "#b91c1c",
    photoBg: "#fee2e2",
    statusColor: "#b91c1c",
  },
  {
    id: "purple",
    name: "Ungu",
    primary: "#7e22ce",
    primaryLight: "#a855f7",
    gradient: "linear-gradient(135deg, #7e22ce 0%, #a855f7 50%, #7e22ce 100%)",
    bannerGradient: "linear-gradient(90deg, #6b21a8 0%, #7e22ce 100%)",
    accentColor: "#7e22ce",
    bottomBar: "linear-gradient(90deg, #7e22ce, #a855f7, #7e22ce)",
    photoBorder: "#7e22ce",
    photoBg: "#f3e8ff",
    statusColor: "#7e22ce",
  },
  {
    id: "orange",
    name: "Oranye",
    primary: "#c2410c",
    primaryLight: "#f97316",
    gradient: "linear-gradient(135deg, #c2410c 0%, #f97316 50%, #c2410c 100%)",
    bannerGradient: "linear-gradient(90deg, #9a3412 0%, #c2410c 100%)",
    accentColor: "#c2410c",
    bottomBar: "linear-gradient(90deg, #c2410c, #f97316, #c2410c)",
    photoBorder: "#c2410c",
    photoBg: "#ffedd5",
    statusColor: "#c2410c",
  },
  {
    id: "navy",
    name: "Navy",
    primary: "#1e3a5f",
    primaryLight: "#2563eb",
    gradient: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #1e3a5f 100%)",
    bannerGradient: "linear-gradient(90deg, #172e4d 0%, #1e3a5f 100%)",
    accentColor: "#1e3a5f",
    bottomBar: "linear-gradient(90deg, #1e3a5f, #2563eb, #1e3a5f)",
    photoBorder: "#1e3a5f",
    photoBg: "#e0e7ff",
    statusColor: "#1e3a5f",
  },
  {
    id: "teal",
    name: "Teal",
    primary: "#0f766e",
    primaryLight: "#2dd4bf",
    gradient: "linear-gradient(135deg, #0f766e 0%, #2dd4bf 50%, #0f766e 100%)",
    bannerGradient: "linear-gradient(90deg, #0d5f58 0%, #0f766e 100%)",
    accentColor: "#0f766e",
    bottomBar: "linear-gradient(90deg, #0f766e, #2dd4bf, #0f766e)",
    photoBorder: "#0f766e",
    photoBg: "#ccfbf1",
    statusColor: "#0f766e",
  },
  {
    id: "pink",
    name: "Pink",
    primary: "#be185d",
    primaryLight: "#ec4899",
    gradient: "linear-gradient(135deg, #be185d 0%, #ec4899 50%, #be185d 100%)",
    bannerGradient: "linear-gradient(90deg, #9d174d 0%, #be185d 100%)",
    accentColor: "#be185d",
    bottomBar: "linear-gradient(90deg, #be185d, #ec4899, #be185d)",
    photoBorder: "#be185d",
    photoBg: "#fce7f3",
    statusColor: "#be185d",
  },
];

export interface UniversityData {
  name: string;
  address: string;
  logoUrl: string | null;
}

export interface StudentData {
  nama: string;
  nim: string;
  tempatLahir: string;
  tanggalLahir: string;
  fakultas: string;
  programStudi: string;
  jenjang: string;
  tahunAkademik: string;
  masaAktif: string;
  dosenWali: string;
  jenisKelamin: string;
  photoUrl: string | null;
  noKartu: string;
  diterbitkan: string;
  signatureIndex: number;
  serialNumber: string;
}

export const defaultUniversity: UniversityData = {
  name: "Universitas Negeri Yogyakarta",
  address: "Jl. Colombo No.1, Karang Malang, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281",
  logoUrl: null,
};

function generateNoKartu(nim: string): string {
  const year = new Date().getFullYear();
  return `KTM-${nim}-${year}`;
}

function generateDiterbitkan(): string {
  const today = new Date();
  const dd = today.getDate().toString().padStart(2, "0");
  const mm = (today.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export const jenjangDurasiTahun: Record<string, number> = {
  D3: 3,
  D4: 4,
  S1: 4,
  S2: 2,
  S3: 4,
};

export const bulanList = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function parseTanggalDDMMYYYY(value: string): Date | null {
  const [dd, mm, yyyy] = value.split("/").map(Number);

  if (!Number.isInteger(dd) || !Number.isInteger(mm) || !Number.isInteger(yyyy)) {
    return null;
  }

  const parsed = new Date(yyyy, mm - 1, dd);
  if (
    parsed.getFullYear() !== yyyy ||
    parsed.getMonth() !== mm - 1 ||
    parsed.getDate() !== dd
  ) {
    return null;
  }

  return parsed;
}

export function calculateMasaAktifByJenjang(jenjang: string, diterbitkan?: string): string {
  const durasiTahun = jenjangDurasiTahun[jenjang] ?? 4;
  const tanggalTerbit = diterbitkan ? parseTanggalDDMMYYYY(diterbitkan) : null;
  const baseDate = tanggalTerbit ?? new Date();

  const tanggalAktif = new Date(baseDate);
  tanggalAktif.setFullYear(tanggalAktif.getFullYear() + durasiTahun);

  const year = tanggalAktif.getFullYear();

  return `${year} – ${year + 4} `; 
}

const defaultDiterbitkan = generateDiterbitkan();
const defaultJenjang = "S1";

export const defaultStudent: StudentData = {
  nama: "Handika Setya",
  nim: "23507130025",
  tempatLahir: "Temanggung",
  tanggalLahir: "10/11/2005",
  fakultas: "Fakultas Matematika dan IPA",
  programStudi: "Pendidikan Fisika",
  jenjang: defaultJenjang,
  tahunAkademik: "2025 – 2029",
  masaAktif: "2025 – 2029",
  dosenWali: "Dra. Susila Kristianingrum, M.Si.",
  jenisKelamin: "Laki-laki",
  photoUrl: null,
  noKartu: generateNoKartu("23507130025"),
  diterbitkan: defaultDiterbitkan,
  signatureIndex: 0,
  serialNumber: "23507130025",
};

export const fakultasList = [
  "Fakultas Ilmu Sosial dan Politik",
  "Fakultas Keguruan dan Ilmu Pendidikan",
  "Fakultas Teknik",
  "Fakultas Ekonomi dan Bisnis",
  "Fakultas Hukum",
  "Fakultas Kedokteran",
  "Fakultas Matematika dan IPA",
  "Fakultas Pertanian",
  "Fakultas Ilmu Budaya",
  "Fakultas Psikologi",
  "Fakultas Ilmu Komunikasi",
  "Fakultas Farmasi",
];

export const jenjangList = ["D3", "D4", "S1", "S2", "S3"];

export const tempatLahirList = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Semarang",
  "Medan",
  "Makassar",
  "Palembang",
  "Denpasar",
  "Malang",
  "Bogor",
  "Tangerang",
  "Bekasi",
  "Depok",
  "Serang",
  "Pandeglang",
  "Solo",
  "Pontianak",
  "Banjarmasin",
  "Manado",
  "Temanggung",
  "Magelang"
];

export const dosenWaliList = [
  "Dr. Dedi Kurniawan, S.T., M.T.",
  "Prof. Dr. Siti Aminah, M.Pd.",
  "Dr. Bambang Susanto, M.Si.",
  "Dr. Rina Wulandari, M.Hum.",
  "Prof. Dr. Ahmad Hidayat, M.Sc.",
  "Dr. Dewi Lestari, S.Pd., M.Ed.",
  "Dr. Agus Prasetyo, M.Eng.",
  "Prof. Dr. Nurul Huda, M.A.",
  "Dra. Susila Kristianingrum, M.Si.",
];

export function generateRandomNIM(): string {
  const year = "2024";
  const random = Math.floor(Math.random() * 9000000 + 1000000).toString();
  return year + random;
}

export function generateRandomStudent(): StudentData {
  const namaLaki = ["Hendra Wijaya", "Andi Prasetyo", "Budi Santoso", "Rizki Ramadhan", "Fajar Nugroho", "Dimas Saputra", "Arif Rahman", "Gilang Pratama", "Handika Setya"];
  const namaPerempuan = ["Nadia Permata", "Siti Nurhaliza", "Dewi Anggraini", "Putri Rahayu", "Anisa Fitri", "Maya Sari", "Rina Kartika", "Dian Puspita"];

  const isLaki = Math.random() > 0.5;
  const names = isLaki ? namaLaki : namaPerempuan;
  const nama = names[Math.floor(Math.random() * names.length)];
  const tempat = tempatLahirList[Math.floor(Math.random() * tempatLahirList.length)];
  const fakultas = fakultasList[Math.floor(Math.random() * fakultasList.length)];
  const jenjang = jenjangList[Math.floor(Math.random() * jenjangList.length)];
  const dosen = dosenWaliList[Math.floor(Math.random() * dosenWaliList.length)];

  const day = Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0');
  const month = Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0');
  const year = Math.floor(Math.random() * 5 + 2002).toString();

  const nim = generateRandomNIM();
  const sigIdx = Math.floor(Math.random() * signatureImages.length);

  const diterbitDay = Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0');
  const diterbitMonth = Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0');
  const diterbitYear = Math.floor(Math.random() * 2 + 2025);
  const diterbitkan = `${diterbitDay}/${diterbitMonth}/${diterbitYear}`;
  const masaAktif = calculateMasaAktifByJenjang(jenjang, diterbitkan);

  return {
    nama,
    nim,
    tempatLahir: tempat,
    tanggalLahir: `${day}/${month}/${year}`,
    fakultas,
    programStudi: "Pendidikan Fisika",
    jenjang,
    tahunAkademik: "2025 – 2029",
    masaAktif,
    dosenWali: dosen,
    jenisKelamin: isLaki ? "Laki-laki" : "Perempuan",
    photoUrl: null,
    noKartu: generateNoKartu(nim),
    diterbitkan,
    signatureIndex: sigIdx,
    serialNumber: nim,
  };
}
