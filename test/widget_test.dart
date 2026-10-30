// Widget test LaporKampus.
//
// Menguji perilaku yang menjadi kriteria penerimaan Minggu 2 dan luaran
// Minggu 6-7: validasi login, navigasi ke Beranda, navigasi ke Form Laporan,
// serta validasi form dan penyimpanan data ke list memori.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:laporkampus/data/data_laporan.dart';
import 'package:laporkampus/main.dart';

/// Memakai ukuran layar ponsel supaya navigasi yang diuji adalah
/// NavigationBar, bukan NavigationRail versi layar lebar.
void pakaiLayarPonsel(WidgetTester tester) {
  tester.view.physicalSize = const Size(412, 900);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.reset);
}

/// Masuk ke aplikasi memakai NIM dan password apa pun yang tidak kosong.
Future<void> masukKeBeranda(WidgetTester tester) async {
  pakaiLayarPonsel(tester);
  await tester.pumpWidget(const LaporKampusApp());
  await tester.enterText(
    find.widgetWithText(TextField, 'Masukkan NIM Anda'),
    '23.01.55.0003',
  );
  await tester.enterText(
    find.widgetWithText(TextField, 'Masukkan password Anda'),
    'rahasia',
  );
  await tester.tap(find.widgetWithText(FilledButton, 'Masuk'));
  await tester.pumpAndSettle();
}

Future<void> bukaFormLaporan(WidgetTester tester) async {
  await masukKeBeranda(tester);
  await tester.tap(find.text('Buat Laporan'));
  await tester.pumpAndSettle();
}

void main() {
  setUp(kosongkanDataLaporan);

  testWidgets('Login dengan kolom kosong menampilkan pesan kesalahan',
      (WidgetTester tester) async {
    pakaiLayarPonsel(tester);
    await tester.pumpWidget(const LaporKampusApp());

    expect(find.text('LaporKampus'), findsOneWidget);

    await tester.tap(find.widgetWithText(FilledButton, 'Masuk'));
    await tester.pump();

    expect(find.text('NIM dan password wajib diisi.'), findsOneWidget);
  });

  testWidgets('Login berhasil membuka Beranda dengan NavigationBar',
      (WidgetTester tester) async {
    await masukKeBeranda(tester);

    expect(find.widgetWithText(AppBar, 'Beranda'), findsOneWidget);
    expect(find.byType(NavigationBar), findsOneWidget);
    expect(find.text('Buat Laporan'), findsOneWidget);
    expect(find.text('Laporan Terbaru'), findsOneWidget);
  });

  testWidgets('Tombol Buat Laporan membuka Form Laporan',
      (WidgetTester tester) async {
    await bukaFormLaporan(tester);

    expect(find.widgetWithText(AppBar, 'Form Laporan'), findsOneWidget);
    expect(find.text('Kirim Laporan'), findsOneWidget);
  });

  testWidgets('Kirim form kosong menampilkan pesan kesalahan tiap kolom',
      (WidgetTester tester) async {
    await bukaFormLaporan(tester);

    await tester.tap(find.text('Kirim Laporan'));
    await tester.pumpAndSettle();

    expect(find.text('Lokasi fasilitas wajib diisi'), findsOneWidget);
    expect(find.text('Kategori wajib dipilih'), findsOneWidget);
    expect(find.text('Tingkat urgensi wajib dipilih'), findsOneWidget);
    expect(find.text('Tanggal wajib diisi'), findsOneWidget);
    expect(find.text('Jumlah unit wajib diisi'), findsOneWidget);
    expect(find.text('Deskripsi wajib diisi'), findsOneWidget);
    expect(daftarLaporan, isEmpty);
  });

  testWidgets('Jumlah unit nol ditolak dengan pesan yang jelas',
      (WidgetTester tester) async {
    await bukaFormLaporan(tester);

    await tester.enterText(find.byType(TextFormField).at(2), '0');
    await tester.tap(find.text('Kirim Laporan'));
    await tester.pumpAndSettle();

    expect(find.text('Jumlah unit tidak boleh nol'), findsOneWidget);
  });

  testWidgets('Form valid menyimpan laporan ke daftar di memori',
      (WidgetTester tester) async {
    await bukaFormLaporan(tester);

    await tester.enterText(
      find.byType(TextFormField).at(0),
      'Gedung B - Lab Jaringan',
    );

    await tester.tap(find.byType(DropdownButtonFormField<String>).at(0));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Jaringan & Internet').last);
    await tester.pumpAndSettle();

    await tester.tap(find.byType(DropdownButtonFormField<String>).at(1));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Tinggi').last);
    await tester.pumpAndSettle();

    await tester.tap(find.byType(TextFormField).at(1));
    await tester.pumpAndSettle();
    await tester.tap(find.text('OK'));
    await tester.pumpAndSettle();

    await tester.enterText(find.byType(TextFormField).at(2), '3');
    await tester.enterText(
      find.byType(TextFormField).at(3),
      'Kabel jaringan putus sehingga praktikum di lab terhenti.',
    );

    await tester.tap(find.text('Kirim Laporan'));
    await tester.pumpAndSettle();

    expect(daftarLaporan.length, 1);
    expect(daftarLaporan.last.lokasi, 'Gedung B - Lab Jaringan');
    expect(daftarLaporan.last.status, statusMenunggu);
    expect(find.widgetWithText(AppBar, 'Beranda'), findsOneWidget);
  });
}
