import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

/// Ditampilkan bila Firebase gagal disiapkan saat aplikasi dibuka.
///
/// Tanpa halaman ini, kegagalan initializeApp hanya menghasilkan layar putih
/// tanpa petunjuk. Isi pesannya sengaja menampilkan langkah perbaikan, bukan
/// hanya kode kesalahan.
class AplikasiBelumDikonfigurasi extends StatelessWidget {
  const AplikasiBelumDikonfigurasi({super.key, required this.pesan});

  final String pesan;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'LaporKampus',
      theme: buildTemaLaporKampus(),
      home: Scaffold(
        backgroundColor: Colors.white,
        body: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(jarakBesar),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 560),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    const Row(
                      children: <Widget>[
                        Icon(Icons.settings_ethernet, color: warnaMenunggu),
                        SizedBox(width: jarakKecil),
                        Expanded(
                          child: Text(
                            'Firebase belum tersambung',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: teksUtama,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: jarakSedang),
                    const Text(
                      'Aplikasi berhenti sebelum halaman login karena project '
                      'Firebase belum dikonfigurasi. Ikuti salah satu jalur '
                      'berikut, lalu jalankan ulang aplikasi.',
                      style: TextStyle(fontSize: 14, color: teksSekunder),
                    ),
                    const SizedBox(height: jarakBesar),
                    const Text(
                      'Jalur utama',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: teksUtama,
                      ),
                    ),
                    const SizedBox(height: jarakKecil),
                    const _BarisKode(
                      'dart pub global activate flutterfire_cli\n'
                      'firebase login\n'
                      'flutterfire configure --platforms=web',
                    ),
                    const SizedBox(height: jarakBesar),
                    const Text(
                      'Jalur cadangan',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: teksUtama,
                      ),
                    ),
                    const SizedBox(height: jarakKecil),
                    const Text(
                      'Buka Firebase Console > Project settings, salin objek '
                      'firebaseConfig, lalu ganti setiap nilai bertanda GANTI '
                      'di lib/firebase_options.dart.',
                      style: TextStyle(fontSize: 13, color: teksSekunder),
                    ),
                    const SizedBox(height: jarakBesar),
                    const Text(
                      'Pesan dari Firebase',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: teksSekunder,
                      ),
                    ),
                    const SizedBox(height: jarakKecil),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: latarHalaman,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: garisNetral),
                      ),
                      child: SelectableText(
                        pesan,
                        style: const TextStyle(
                          fontSize: 12,
                          fontFamily: 'monospace',
                          color: teksSekunder,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _BarisKode extends StatelessWidget {
  const _BarisKode(this.isi);

  final String isi;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: latarHalaman,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: garisNetral),
      ),
      child: SelectableText(
        isi,
        style: const TextStyle(
          fontSize: 12,
          fontFamily: 'monospace',
          color: teksUtama,
          height: 1.6,
        ),
      ),
    );
  }
}
