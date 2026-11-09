import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../layanan/auth_layanan.dart';
import '../layanan/pesan_galat.dart';
import '../theme/app_theme.dart';

/// Halaman Login (H1 pada sitemap Minggu 3).
///
/// Satu halaman, dua mode: Masuk dan Daftar (materi Minggu 9 slide 14).
/// Pola form dari Minggu 7 dipakai lagi: `GlobalKey<FormState>` dan validator.
///
/// Penting: halaman ini TIDAK memanggil Navigator setelah berhasil masuk.
/// Perpindahan halaman diurus CekStatusLogin lewat authStateChanges().
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey<FormState> _kunciForm = GlobalKey<FormState>();
  final TextEditingController _identitas = TextEditingController();
  final TextEditingController _password = TextEditingController();
  final TextEditingController _ulangi = TextEditingController();

  bool _modeDaftar = false;
  bool _sedangProses = false;
  bool _lihatPassword = false;
  String? _pesanGalat;

  @override
  void dispose() {
    _identitas.dispose();
    _password.dispose();
    _ulangi.dispose();
    super.dispose();
  }

  String? _validasiIdentitas(String? nilai) {
    final String isi = (nilai ?? '').trim();
    if (isi.isEmpty) {
      return 'NIM atau email wajib diisi';
    }
    if (isi.contains('@')) {
      final bool sah = RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(isi);
      return sah ? null : 'Format email belum benar';
    }
    if (isi.length < 6) {
      return 'NIM minimal 6 karakter';
    }
    return null;
  }

  String? _validasiPassword(String? nilai) {
    final String isi = nilai ?? '';
    if (isi.isEmpty) {
      return 'Password wajib diisi';
    }
    if (isi.length < 6) {
      return 'Password minimal 6 karakter';
    }
    return null;
  }

  String? _validasiUlangi(String? nilai) {
    if (!_modeDaftar) {
      return null;
    }
    if ((nilai ?? '').isEmpty) {
      return 'Ulangi password wajib diisi';
    }
    if (nilai != _password.text) {
      return 'Password tidak sama';
    }
    return null;
  }

  Future<void> _kirim() async {
    setState(() => _pesanGalat = null);

    if (!(_kunciForm.currentState?.validate() ?? false)) {
      return;
    }

    setState(() => _sedangProses = true);
    try {
      if (_modeDaftar) {
        await AuthLayanan.daftar(
          identitas: _identitas.text,
          password: _password.text,
        );
      } else {
        await AuthLayanan.masuk(
          identitas: _identitas.text,
          password: _password.text,
        );
      }
      // Tidak ada Navigator di sini: CekStatusLogin yang memindahkan halaman.
    } on FirebaseAuthException catch (e) {
      if (!mounted) return;
      setState(() => _pesanGalat = pesanDariKode(e.code));
    } finally {
      if (mounted) {
        setState(() => _sedangProses = false);
      }
    }
  }

  void _gantiMode() {
    setState(() {
      _modeDaftar = !_modeDaftar;
      _pesanGalat = null;
      _ulangi.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    final String labelTombol = _modeDaftar ? 'Daftar' : 'Masuk';

    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(jarakBesar),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 430),
              child: Form(
                key: _kunciForm,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: <Widget>[
                    const SizedBox(height: jarakBesar),

                    const Center(
                      child: Column(
                        children: <Widget>[
                          CircleAvatar(
                            radius: 34,
                            backgroundColor: maroon,
                            child: Icon(
                              Icons.account_balance_outlined,
                              color: Colors.white,
                              size: 36,
                            ),
                          ),
                          SizedBox(height: 18),
                          Text(
                            'LaporKampus',
                            style: TextStyle(
                              fontSize: 27,
                              fontWeight: FontWeight.bold,
                              color: teksUtama,
                            ),
                          ),
                          SizedBox(height: jarakKecil),
                          Text(
                            'Laporkan kerusakan fasilitas kampus '
                            'dengan mudah.',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 13,
                              color: teksSekunder,
                            ),
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 32),

                    Text(
                      _modeDaftar ? 'Buat akun baru' : 'Masuk ke akun Anda',
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: teksUtama,
                      ),
                    ),

                    const SizedBox(height: 22),

                    const Text(
                      'NIM atau email',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                        color: teksUtama,
                      ),
                    ),
                    const SizedBox(height: 10),

                    TextFormField(
                      controller: _identitas,
                      keyboardType: TextInputType.emailAddress,
                      textInputAction: TextInputAction.next,
                      autocorrect: false,
                      validator: _validasiIdentitas,
                      decoration: const InputDecoration(
                        hintText: 'Masukkan NIM atau email',
                      ),
                    ),

                    const SizedBox(height: 22),

                    const Text(
                      'Password',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14,
                        color: teksUtama,
                      ),
                    ),
                    const SizedBox(height: 10),

                    TextFormField(
                      controller: _password,
                      obscureText: !_lihatPassword,
                      textInputAction: _modeDaftar
                          ? TextInputAction.next
                          : TextInputAction.done,
                      validator: _validasiPassword,
                      onFieldSubmitted: (_) {
                        if (!_modeDaftar) {
                          _kirim();
                        }
                      },
                      decoration: InputDecoration(
                        hintText: 'Minimal 6 karakter',
                        suffixIcon: IconButton(
                          tooltip: _lihatPassword
                              ? 'Sembunyikan password'
                              : 'Tampilkan password',
                          icon: Icon(
                            _lihatPassword
                                ? Icons.visibility_off_outlined
                                : Icons.visibility_outlined,
                          ),
                          onPressed: () {
                            setState(() => _lihatPassword = !_lihatPassword);
                          },
                        ),
                      ),
                    ),

                    if (_modeDaftar) ...<Widget>[
                      const SizedBox(height: 22),
                      const Text(
                        'Ulangi password',
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          fontSize: 14,
                          color: teksUtama,
                        ),
                      ),
                      const SizedBox(height: 10),
                      TextFormField(
                        controller: _ulangi,
                        obscureText: !_lihatPassword,
                        textInputAction: TextInputAction.done,
                        validator: _validasiUlangi,
                        onFieldSubmitted: (_) => _kirim(),
                        decoration: const InputDecoration(
                          hintText: 'Ketik ulang password',
                        ),
                      ),
                    ],

                    if (_pesanGalat != null) ...<Widget>[
                      const SizedBox(height: jarakSedang),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          const Icon(
                            Icons.error_outline,
                            size: 18,
                            color: warnaGalat,
                          ),
                          const SizedBox(width: jarakKecil),
                          Expanded(
                            child: Text(
                              _pesanGalat!,
                              style: const TextStyle(
                                color: warnaGalat,
                                fontSize: 13,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],

                    const SizedBox(height: 26),

                    SizedBox(
                      height: 52,
                      child: FilledButton(
                        onPressed: _sedangProses ? null : _kirim,
                        child: _sedangProses
                            ? const SizedBox(
                                width: 22,
                                height: 22,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2.4,
                                  color: Colors.white,
                                ),
                              )
                            : Text(labelTombol),
                      ),
                    ),

                    const SizedBox(height: jarakKecil),

                    TextButton(
                      onPressed: _sedangProses ? null : _gantiMode,
                      child: Text(
                        _modeDaftar
                            ? 'Sudah punya akun? Masuk'
                            : 'Belum punya akun? Daftar',
                      ),
                    ),

                    const Text(
                      'Gunakan NIM dan password kampus Anda.',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 12,
                        color: teksSekunder,
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
