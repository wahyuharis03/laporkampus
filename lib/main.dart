import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';

import 'firebase_options.dart';
import 'pages/cek_status_login.dart';
import 'pages/halaman_konfigurasi.dart';
import 'theme/app_theme.dart';

/// Titik masuk aplikasi.
///
/// Firebase harus siap sebelum runApp (materi Minggu 9 slide 13):
/// main menjadi async, ensureInitialized dipanggil lebih dulu, lalu
/// initializeApp ditunggu dengan await.
///
/// Urutan itu tidak berubah. Yang ditambahkan hanya penanganan gagal:
/// bila project Firebase belum dikonfigurasi, aplikasi menampilkan
/// petunjuk perbaikan, bukan layar putih.
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  } catch (e) {
    runApp(AplikasiBelumDikonfigurasi(pesan: '$e'));
    return;
  }
  runApp(const LaporKampusApp());
}

/// Akar aplikasi: tema dan halaman pertama.
///
/// Kode halaman tidak ditulis di file ini. Setiap halaman punya file
/// sendiri di lib/pages/ supaya mudah ditambah dan diperiksa.
class LaporKampusApp extends StatelessWidget {
  const LaporKampusApp({super.key, this.halamanAwal});

  /// Halaman pertama aplikasi.
  ///
  /// Bawaannya gerbang status login. Widget test mengisi parameter ini
  /// supaya pengujian tidak perlu menghubungi Firebase (materi Minggu 9
  /// slide 23: "pakai halamanAwal pada test").
  final Widget? halamanAwal;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'LaporKampus',
      theme: buildTemaLaporKampus(),
      home: halamanAwal ?? const CekStatusLogin(),
    );
  }
}
