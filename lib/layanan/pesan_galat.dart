/// Menerjemahkan kode kesalahan Firebase Authentication menjadi kalimat
/// yang dipahami pengguna.
///
/// Tabel ini mengikuti materi Minggu 9 slide 19. Pesan untuk kredensial
/// sengaja disamakan: "Email atau password salah", bukan "email belum
/// terdaftar". Tujuannya agar orang lain tidak dapat menebak email mana
/// yang punya akun (email enumeration).
///
/// Project Firebase baru mengaktifkan perlindungan enumerasi, sehingga
/// `wrong-password` dan `user-not-found` jarang muncul lagi. Keduanya
/// tetap ditangani di sini untuk project lama.
String pesanDariKode(String? kode) {
  switch (kode) {
    case 'invalid-credential':
    case 'invalid-login-credentials':
    case 'wrong-password':
    case 'user-not-found':
      return 'Email atau password salah';
    case 'invalid-email':
      return 'Format email belum benar';
    case 'email-already-in-use':
      return 'Email sudah terdaftar. Silakan masuk.';
    case 'weak-password':
      return 'Password terlalu lemah, minimal 6 karakter';
    case 'network-request-failed':
      return 'Tidak dapat terhubung. Periksa koneksi internet.';
    case 'operation-not-allowed':
      return 'Login email/password belum diaktifkan';
    case 'too-many-requests':
      return 'Terlalu banyak percobaan. Coba lagi beberapa saat lagi.';
    case 'user-disabled':
      return 'Akun ini dinonaktifkan. Hubungi admin kampus.';
    default:
      return 'Terjadi kesalahan. Silakan coba lagi.';
  }
}
