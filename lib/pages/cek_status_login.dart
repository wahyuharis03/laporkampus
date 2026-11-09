import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../layanan/auth_layanan.dart';
import '../theme/app_theme.dart';
import 'halaman_utama.dart';
import 'login_page.dart';

/// Gerbang status login (materi Minggu 9 slide 17).
///
/// Halaman ini menjadi `home` aplikasi. Ia mendengarkan authStateChanges()
/// dan memilih halaman yang sesuai, sehingga tidak ada Navigator setelah
/// login berhasil. Efek sampingnya: sesi bertahan saat halaman di-refresh.
class CekStatusLogin extends StatelessWidget {
  const CekStatusLogin({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: AuthLayanan.statusLogin,
      builder: (BuildContext context, AsyncSnapshot<User?> snapshot) {
        // Keadaan menunggu: stream belum mengirim nilai pertama.
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            backgroundColor: Colors.white,
            body: Center(
              child: CircularProgressIndicator(color: maroon),
            ),
          );
        }

        if (snapshot.hasData) {
          return const HalamanUtama();
        }

        return const LoginPage();
      },
    );
  }
}
