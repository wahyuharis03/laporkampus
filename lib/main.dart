import 'package:flutter/material.dart';

import 'pages/login_page.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const LaporKampusApp());
}

/// Akar aplikasi: tema dan halaman pertama.
///
/// Kode halaman tidak lagi ditulis di file ini. Setiap halaman punya file
/// sendiri di lib/pages/ supaya mudah ditambah dan diperiksa saat UTS.
class LaporKampusApp extends StatelessWidget {
  const LaporKampusApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'LaporKampus',
      theme: buildTemaLaporKampus(),
      home: const LoginPage(),
    );
  }
}
