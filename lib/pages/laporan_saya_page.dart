import 'package:flutter/material.dart';

import '../data/data_laporan.dart';
import '../theme/app_theme.dart';
import '../widgets/keadaan_kosong.dart';
import '../widgets/label_status.dart';
import 'detail_laporan_page.dart';

/// Halaman Laporan Saya (H4 pada sitemap Minggu 3).
///
/// Menampilkan daftar laporan milik mahasiswa. Filter status dipakai untuk
/// memperlihatkan keadaan kosong: filter yang tidak punya data akan
/// menampilkan pesan penjelasan, bukan area kosong tanpa keterangan.
class LaporanSayaPage extends StatefulWidget {
  const LaporanSayaPage({super.key});

  @override
  State<LaporanSayaPage> createState() => _LaporanSayaPageState();
}

class _LaporanSayaPageState extends State<LaporanSayaPage> {
  String? _filter;

  List<Laporan> get _tampil {
    if (_filter == null) return daftarLaporan;
    return daftarLaporan.where((Laporan l) => l.status == _filter).toList();
  }

  @override
  Widget build(BuildContext context) {
    final List<Laporan> data = _tampil;

    return Scaffold(
      appBar: AppBar(title: const Text('Laporan Saya')),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 720),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              SizedBox(
                height: 56,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 20,
                    vertical: jarakKecil,
                  ),
                  children: <Widget>[
                    _ChipFilter(
                      label: 'Semua',
                      aktif: _filter == null,
                      onTap: () => setState(() => _filter = null),
                    ),
                    for (final String status in daftarStatus)
                      _ChipFilter(
                        label: status,
                        aktif: _filter == status,
                        onTap: () => setState(() => _filter = status),
                      ),
                  ],
                ),
              ),
              Expanded(
                child: data.isEmpty
                    ? KeadaanKosong(
                        ikon: Icons.inbox_outlined,
                        pesan: _filter == null
                            ? 'Belum ada laporan'
                            : 'Tidak ada laporan berstatus $_filter',
                        petunjuk: _filter == null
                            ? 'Laporan yang Anda kirim akan muncul di sini.'
                            : 'Coba pilih filter lain atau kirim laporan baru '
                                'dari halaman Beranda.',
                      )
                    : ListView.separated(
                        padding: const EdgeInsets.fromLTRB(20, 4, 20, 20),
                        itemCount: data.length,
                        separatorBuilder: (_, _) =>
                            const SizedBox(height: jarakKecil),
                        itemBuilder: (BuildContext context, int index) {
                          final Laporan laporan = data[index];
                          return Card(
                            child: InkWell(
                              borderRadius: BorderRadius.circular(12),
                              onTap: () {
                                Navigator.push<void>(
                                  context,
                                  MaterialPageRoute<void>(
                                    builder: (context) =>
                                        DetailLaporanPage(laporan: laporan),
                                  ),
                                );
                              },
                              child: Padding(
                                padding: const EdgeInsets.all(jarakSedang),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: <Widget>[
                                    Row(
                                      children: <Widget>[
                                        Expanded(
                                          child: Text(
                                            laporan.lokasi,
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                            style: const TextStyle(
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
                                              color: teksUtama,
                                            ),
                                          ),
                                        ),
                                        const SizedBox(width: jarakKecil),
                                        LabelStatus(status: laporan.status),
                                      ],
                                    ),
                                    const SizedBox(height: jarakKecil),
                                    Text(
                                      '${laporan.kategori} • '
                                      '${formatTanggal(laporan.tanggal)} • '
                                      '${laporan.jumlahUnit} unit',
                                      style: const TextStyle(
                                        fontSize: 12,
                                        color: teksSekunder,
                                      ),
                                    ),
                                    const SizedBox(height: jarakKecil),
                                    Text(
                                      laporan.deskripsi,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                        fontSize: 13,
                                        height: 1.4,
                                        color: teksSekunder,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        },
                      ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ChipFilter extends StatelessWidget {
  const _ChipFilter({
    required this.label,
    required this.aktif,
    required this.onTap,
  });

  final String label;
  final bool aktif;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: jarakKecil),
      child: ChoiceChip(
        label: Text(label),
        selected: aktif,
        onSelected: (_) => onTap(),
        showCheckmark: false,
        labelStyle: TextStyle(
          fontSize: 13,
          fontWeight: aktif ? FontWeight.bold : FontWeight.normal,
          color: aktif ? Colors.white : teksSekunder,
        ),
        selectedColor: maroon,
        backgroundColor: Colors.white,
        side: BorderSide(color: aktif ? maroon : garisNetral),
      ),
    );
  }
}
