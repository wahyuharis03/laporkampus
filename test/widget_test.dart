// Widget test untuk LaporKampus.
//
// Menguji dua perilaku halaman Login sesuai kriteria penerimaan
// user story Minggu 2:
// 1. Menekan "Masuk" dengan kolom kosong menampilkan pesan kesalahan.
// 2. Mengisi NIM dan password lalu menekan "Masuk" membuka Beranda.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:laporkampus/main.dart';

void main() {
  testWidgets('Login dengan kolom kosong menampilkan pesan kesalahan',
      (WidgetTester tester) async {
    await tester.pumpWidget(const LaporKampusApp());

    // Halaman Login tampil lebih dulu.
    expect(find.text('LaporKampus'), findsOneWidget);
    expect(find.text('Masuk'), findsOneWidget);

    await tester.tap(find.text('Masuk'));
    await tester.pump();

    expect(find.text('NIM dan password wajib diisi.'), findsOneWidget);
  });

  testWidgets('Login dengan NIM dan password membuka Beranda',
      (WidgetTester tester) async {
    await tester.pumpWidget(const LaporKampusApp());

    await tester.enterText(
      find.widgetWithText(TextField, 'Masukkan NIM Anda'),
      '23.01.55.0003',
    );
    await tester.enterText(
      find.widgetWithText(TextField, 'Masukkan password Anda'),
      'rahasia',
    );

    await tester.tap(find.text('Masuk'));
    await tester.pumpAndSettle();

    // Beranda tampil setelah login berhasil.
    expect(find.text('Selamat Datang!'), findsOneWidget);
    expect(find.text('Buat Laporan'), findsOneWidget);
    expect(find.text('Laporan Saya'), findsOneWidget);
  });
}
