// Konfigurasi Firebase untuk LaporKampus.
//
// JANGAN mengisi nilai di bawah ini dengan tangan kalau masih bisa dihindari.
// Cara yang dianjurkan (materi Minggu 9, slide 12):
//
//   npm install -g firebase-tools
//   dart pub global activate flutterfire_cli
//   firebase login
//   flutterfire configure --platforms=web
//
// Perintah terakhir menimpa file ini dengan nilai dari project Firebase Anda.
//
// Jalur cadangan bila CLI gagal terpasang: buka Firebase Console >
// Project settings, salin objek firebaseConfig, lalu ganti setiap nilai
// bertanda GANTI di bawah.
//
// Isi file ini adalah pengenal project, bukan password. Aman di-commit.

import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart' show kIsWeb;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    throw UnsupportedError(
      'LaporKampus baru dikonfigurasi untuk web. Jalankan '
      'flutterfire configure --platforms=web,android untuk menambah platform.',
    );
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'GANTI-apiKey',
    appId: 'GANTI-appId',
    messagingSenderId: 'GANTI-messagingSenderId',
    projectId: 'GANTI-projectId',
    authDomain: 'GANTI-projectId.firebaseapp.com',
    storageBucket: 'GANTI-projectId.appspot.com',
  );
}
