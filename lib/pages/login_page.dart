import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import 'halaman_utama.dart';

/// Halaman Login (H1 pada sitemap Minggu 3).
///
/// Login masih simulasi: setiap NIM dan password yang tidak kosong
/// dianggap berhasil. Firebase Authentication belum dihubungkan.
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController nimController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  bool obscurePassword = true;
  String? errorMessage;

  void login() {
    final String nim = nimController.text.trim();
    final String password = passwordController.text;

    if (nim.isEmpty || password.isEmpty) {
      setState(() {
        errorMessage = 'NIM dan password wajib diisi.';
      });
      return;
    }

    setState(() {
      errorMessage = null;
    });

    Navigator.pushReplacement(
      context,
      MaterialPageRoute<void>(builder: (context) => const HalamanUtama()),
    );
  }

  @override
  void dispose() {
    nimController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(jarakBesar),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 430),
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

                  const SizedBox(height: 42),

                  const Text(
                    'NIM',
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 14,
                      color: teksUtama,
                    ),
                  ),
                  const SizedBox(height: 10),

                  TextField(
                    controller: nimController,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      hintText: 'Masukkan NIM Anda',
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

                  TextField(
                    controller: passwordController,
                    obscureText: obscurePassword,
                    decoration: InputDecoration(
                      hintText: 'Masukkan password Anda',
                      suffixIcon: IconButton(
                        icon: Icon(
                          obscurePassword
                              ? Icons.visibility_outlined
                              : Icons.visibility_off_outlined,
                        ),
                        onPressed: () {
                          setState(() {
                            obscurePassword = !obscurePassword;
                          });
                        },
                      ),
                    ),
                    onSubmitted: (_) => login(),
                  ),

                  if (errorMessage != null) ...<Widget>[
                    const SizedBox(height: jarakSedang),
                    Text(
                      errorMessage!,
                      style: const TextStyle(
                        color: warnaGalat,
                        fontSize: 13,
                      ),
                    ),
                  ],

                  const SizedBox(height: 28),

                  SizedBox(
                    height: 52,
                    child: FilledButton(
                      onPressed: login,
                      child: const Text('Masuk'),
                    ),
                  ),

                  const SizedBox(height: 18),

                  const Text(
                    'Gunakan NIM dan password untuk masuk '
                    'ke portal mahasiswa.',
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
    );
  }
}
