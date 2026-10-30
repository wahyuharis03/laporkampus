import 'package:flutter/material.dart';

import '../data/data_laporan.dart';
import '../theme/app_theme.dart';
import '../widgets/label_status.dart';

/// Halaman Detail Laporan (H5, prioritas Should).
///
/// Dibuka dengan Navigator.push dari Beranda atau Laporan Saya,
/// lalu ditutup dengan tombol kembali (Navigator.pop).
class DetailLaporanPage extends StatelessWidget {
  const DetailLaporanPage({super.key, required this.laporan});

  final Laporan laporan;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Detail Laporan')),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 720),
          child: ListView(
            padding: const EdgeInsets.all(20),
            children: <Widget>[
              Row(
                children: <Widget>[
                  Expanded(
                    child: Text(
                      laporan.lokasi,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: teksUtama,
                      ),
                    ),
                  ),
                  const SizedBox(width: jarakKecil),
                  LabelStatus(status: laporan.status),
                ],
              ),
              const SizedBox(height: jarakBesar),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(jarakSedang),
                  child: Column(
                    children: <Widget>[
                      _BarisDetail(
                        label: 'Kategori',
                        nilai: laporan.kategori,
                        ikon: Icons.category_outlined,
                      ),
                      const Divider(height: jarakBesar, color: garisNetral),
                      _BarisDetail(
                        label: 'Tingkat urgensi',
                        nilai: laporan.urgensi,
                        ikon: Icons.priority_high_outlined,
                      ),
                      const Divider(height: jarakBesar, color: garisNetral),
                      _BarisDetail(
                        label: 'Tanggal kejadian',
                        nilai: formatTanggal(laporan.tanggal),
                        ikon: Icons.event_outlined,
                      ),
                      const Divider(height: jarakBesar, color: garisNetral),
                      _BarisDetail(
                        label: 'Jumlah unit rusak',
                        nilai: '${laporan.jumlahUnit} unit',
                        ikon: Icons.numbers_outlined,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: jarakSedang),
              const Text(
                'Deskripsi',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: teksUtama,
                ),
              ),
              const SizedBox(height: jarakKecil),
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(jarakSedang),
                  child: Text(
                    laporan.deskripsi,
                    style: const TextStyle(
                      fontSize: 14,
                      height: 1.5,
                      color: teksUtama,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: jarakBesar),
              Container(
                padding: const EdgeInsets.all(jarakSedang),
                decoration: BoxDecoration(
                  color: maroon.withValues(alpha: 0.06),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Icon(Icons.info_outline, size: 18, color: maroon),
                    SizedBox(width: jarakKecil),
                    Expanded(
                      child: Text(
                        'Data ini masih disimpan di memori aplikasi. '
                        'Setelah aplikasi dijalankan ulang, data kembali '
                        'ke data simulasi awal.',
                        style: TextStyle(
                          fontSize: 12,
                          height: 1.5,
                          color: teksSekunder,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: jarakBesar),
              OutlinedButton.icon(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.arrow_back),
                label: const Text('Kembali'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: maroon,
                  minimumSize: const Size.fromHeight(48),
                  side: const BorderSide(color: maroon),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _BarisDetail extends StatelessWidget {
  const _BarisDetail({
    required this.label,
    required this.nilai,
    required this.ikon,
  });

  final String label;
  final String nilai;
  final IconData ikon;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Icon(ikon, size: 20, color: maroon),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            label,
            style: const TextStyle(fontSize: 13, color: teksSekunder),
          ),
        ),
        Text(
          nilai,
          style: const TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.bold,
            color: teksUtama,
          ),
        ),
      ],
    );
  }
}
