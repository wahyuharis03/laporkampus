/// Data simulasi LaporKampus.
///
/// Sebelum Firebase dihubungkan, seluruh data disimpan di list memori.
/// Konsekuensinya: data hilang setiap aplikasi dijalankan ulang.
library;

class Laporan {
  const Laporan({
    required this.lokasi,
    required this.kategori,
    required this.urgensi,
    required this.tanggal,
    required this.jumlahUnit,
    required this.deskripsi,
    required this.status,
  });

  final String lokasi;
  final String kategori;
  final String urgensi;
  final DateTime tanggal;
  final int jumlahUnit;
  final String deskripsi;
  final String status;
}

/// Pilihan dropdown pada form. Dibatasi supaya istilah konsisten.
const List<String> daftarKategori = <String>[
  'Listrik',
  'Air & Sanitasi',
  'Furnitur',
  'Jaringan & Internet',
  'Lainnya',
];

const List<String> daftarUrgensi = <String>[
  'Rendah',
  'Sedang',
  'Tinggi',
];

/// Status yang dipakai di seluruh aplikasi.
const String statusMenunggu = 'Menunggu';
const String statusDiproses = 'Diproses';
const String statusSelesai = 'Selesai';

const List<String> daftarStatus = <String>[
  statusMenunggu,
  statusDiproses,
  statusSelesai,
];

List<Laporan> _dataAwal() => <Laporan>[
      Laporan(
        lokasi: 'Gedung A - Ruang A201',
        kategori: 'Listrik',
        urgensi: 'Tinggi',
        tanggal: DateTime.now().subtract(const Duration(days: 2)),
        jumlahUnit: 4,
        deskripsi:
            'Empat lampu di ruang kuliah mati sejak dua hari lalu sehingga kelas sore menjadi gelap.',
        status: statusMenunggu,
      ),
      Laporan(
        lokasi: 'Perpustakaan - Lantai 2',
        kategori: 'Jaringan & Internet',
        urgensi: 'Sedang',
        tanggal: DateTime.now().subtract(const Duration(days: 5)),
        jumlahUnit: 1,
        deskripsi:
            'Access point di area baca lantai 2 sering terputus sehingga mahasiswa tidak bisa membuka jurnal.',
        status: statusMenunggu,
      ),
      Laporan(
        lokasi: 'Gedung C - Toilet Pria Lantai 1',
        kategori: 'Air & Sanitasi',
        urgensi: 'Tinggi',
        tanggal: DateTime.now().subtract(const Duration(days: 9)),
        jumlahUnit: 2,
        deskripsi:
            'Keran air bocor dan lantai tergenang. Sudah diperbaiki petugas gedung pekan lalu.',
        status: statusSelesai,
      ),
    ];

/// Data awal (simulasi). Tidak `const` karena akan ditambah dari form.
final List<Laporan> daftarLaporan = _dataAwal();

/// Mengosongkan data. Dipakai widget test supaya tiap kasus uji dimulai
/// dari keadaan yang sama.
void kosongkanDataLaporan() {
  daftarLaporan.clear();
}

/// Ringkasan jumlah laporan untuk kartu di Beranda.
/// [status] null berarti menghitung seluruh laporan.
int hitungLaporan({String? status}) {
  if (status == null) return daftarLaporan.length;
  return daftarLaporan.where((l) => l.status == status).length;
}

/// Format tanggal ringkas tanpa paket tambahan, mis. "30 Okt 2026".
String formatTanggal(DateTime tanggal) {
  const namaBulan = <String>[
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
  ];
  return '${tanggal.day} ${namaBulan[tanggal.month - 1]} ${tanggal.year}';
}
