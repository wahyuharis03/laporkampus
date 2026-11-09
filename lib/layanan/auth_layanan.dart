import 'package:firebase_auth/firebase_auth.dart';

/// Akhiran email yang dipakai untuk mengubah NIM menjadi email Firebase.
///
/// Firebase Authentication mewajibkan email, sedangkan LaporKampus memakai
/// NIM sejak UTS. Domain ini hanya jembatan; tidak ada surat yang dikirim
/// ke alamat tersebut karena verifikasi email tidak dipakai.
const String domainEmailKampus = 'laporkampus.app';

/// Mengubah identitas yang diketik pengguna menjadi email Firebase.
///
/// Kalau pengguna mengetik email (mengandung `@`), dipakai apa adanya.
/// Kalau mengetik NIM, akhiran [domainEmailKampus] ditambahkan.
/// Contoh: `23.01.55.0003` menjadi `23.01.55.0003@laporkampus.app`.
String emailDariIdentitas(String identitas) {
  final String bersih = identitas.trim().toLowerCase();
  if (bersih.contains('@')) {
    return bersih;
  }
  return '$bersih@$domainEmailKampus';
}

/// Pembungkus tipis di atas Firebase Authentication.
///
/// Halaman tidak memanggil FirebaseAuth langsung supaya aturan penamaan
/// akun hanya ada di satu tempat.
class AuthLayanan {
  const AuthLayanan._();

  static FirebaseAuth get _auth => FirebaseAuth.instance;

  /// Stream status login. Dibaca CekStatusLogin lewat StreamBuilder.
  static Stream<User?> get statusLogin => _auth.authStateChanges();

  /// Pengguna yang sedang masuk, atau null bila belum.
  static User? get penggunaAktif => _auth.currentUser;

  static Future<void> masuk({
    required String identitas,
    required String password,
  }) async {
    await _auth.signInWithEmailAndPassword(
      email: emailDariIdentitas(identitas),
      password: password,
    );
  }

  /// Mendaftar sekaligus langsung masuk; Firebase menangani keduanya.
  static Future<void> daftar({
    required String identitas,
    required String password,
  }) async {
    await _auth.createUserWithEmailAndPassword(
      email: emailDariIdentitas(identitas),
      password: password,
    );
  }

  static Future<void> keluar() => _auth.signOut();
}
