import 'package:flutter/material.dart';

import '../data/data_laporan.dart';
import '../theme/app_theme.dart';
import '../widgets/keadaan_kosong.dart';
import '../widgets/label_status.dart';
import 'detail_laporan_page.dart';
import 'form_laporan_page.dart';

/// Halaman Beranda (H2 pada sitemap Minggu 3).
///
/// StatefulWidget karena halaman ini harus digambar ulang setelah pengguna
/// kembali dari Form Laporan dengan data baru.
class BerandaPage extends StatefulWidget {
  const BerandaPage({super.key});

  @override
  State<BerandaPage> createState() => _BerandaPageState();
}

class _BerandaPageState extends State<BerandaPage> {
  Future<void> _bukaFormLaporan() async {
    await Navigator.push<void>(
      context,
      MaterialPageRoute<void>(builder: (context) => const FormLaporanPage()),
    );
    if (!mounted) return;
    // Data baru sudah masuk ke daftarLaporan; gambar ulang Beranda.
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final List<Laporan> terbaru =
        daftarLaporan.reversed.take(3).toList(growable: false);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Beranda'),
        actions: const <Widget>[
          Padding(
            padding: EdgeInsets.only(right: jarakSedang),
            child: CircleAvatar(
              backgroundColor: latarHalaman,
              child: Icon(Icons.person, color: maroon),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                _Sapuan(onBuatLaporan: _bukaFormLaporan),
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          Expanded(
                            child: _KartuRingkasan(
                              label: 'Total',
                              nilai: hitungLaporan(),
                              warna: teksUtama,
                            ),
                          ),
                          const SizedBox(width: jarakKecil),
                          Expanded(
                            child: _KartuRingkasan(
                              label: 'Menunggu',
                              nilai: hitungLaporan(status: statusMenunggu),
                              warna: warnaMenunggu,
                            ),
                          ),
                          const SizedBox(width: jarakKecil),
                          Expanded(
                            child: _KartuRingkasan(
                              label: 'Selesai',
                              nilai: hitungLaporan(status: statusSelesai),
                              warna: warnaBerhasil,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: jarakBesar),
                      const Text(
                        'Laporan Terbaru',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: teksUtama,
                        ),
                      ),
                      const SizedBox(height: jarakSedang),
                      if (terbaru.isEmpty)
                        const SizedBox(
                          height: 240,
                          child: KeadaanKosong(
                            ikon: Icons.inbox_outlined,
                            pesan: 'Belum ada laporan',
                            petunjuk:
                                'Tekan tombol Buat Laporan untuk mengirim '
                                'laporan pertama Anda.',
                          ),
                        )
                      else
                        for (final Laporan laporan in terbaru) ...<Widget>[
                          _KartuLaporan(
                            laporan: laporan,
                            onTap: () {
                              Navigator.push<void>(
                                context,
                                MaterialPageRoute<void>(
                                  builder: (context) =>
                                      DetailLaporanPage(laporan: laporan),
                                ),
                              );
                            },
                          ),
                          const SizedBox(height: jarakKecil),
                        ],
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _Sapuan extends StatelessWidget {
  const _Sapuan({required this.onBuatLaporan});

  final VoidCallback onBuatLaporan;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(jarakBesar),
      decoration: const BoxDecoration(
        color: maroon,
        borderRadius: BorderRadius.only(
          bottomLeft: Radius.circular(jarakBesar),
          bottomRight: Radius.circular(jarakBesar),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          const Text(
            'Selamat Datang!',
            style: TextStyle(color: Colors.white70, fontSize: 16),
          ),
          const SizedBox(height: 12),
          const Text(
            'Ada fasilitas yang perlu diperbaiki?',
            style: TextStyle(
              color: Colors.white,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          const Text(
            'Laporkan kendala fasilitas kampus agar tim Sarpras '
            'dapat segera menanganinya.',
            style: TextStyle(color: Colors.white, fontSize: 14),
          ),
          const SizedBox(height: jarakBesar),
          SizedBox(
            height: 52,
            child: FilledButton.icon(
              onPressed: onBuatLaporan,
              icon: const Icon(Icons.add),
              label: const Text('Buat Laporan'),
              style: FilledButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: maroon,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _KartuRingkasan extends StatelessWidget {
  const _KartuRingkasan({
    required this.label,
    required this.nilai,
    required this.warna,
  });

  final String label;
  final int nilai;
  final Color warna;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: jarakSedang),
        child: Column(
          children: <Widget>[
            Text(
              '$nilai',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: warna,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: const TextStyle(fontSize: 12, color: teksSekunder),
            ),
          ],
        ),
      ),
    );
  }
}

class _KartuLaporan extends StatelessWidget {
  const _KartuLaporan({required this.laporan, required this.onTap});

  final Laporan laporan;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(jarakSedang),
          child: Row(
            children: <Widget>[
              const Icon(Icons.report_outlined, color: maroon, size: 28),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      laporan.lokasi,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: teksUtama,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${laporan.kategori} • ${formatTanggal(laporan.tanggal)}',
                      style: const TextStyle(
                        fontSize: 12,
                        color: teksSekunder,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: jarakKecil),
              LabelStatus(status: laporan.status),
            ],
          ),
        ),
      ),
    );
  }
}
