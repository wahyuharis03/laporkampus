// Widget test LaporKampus.
//
// Sejak Minggu 9 aplikasi memakai Firebase Authentication. Widget test
// tidak boleh menghubungi Firebase, jadi setiap pengujian mengisi
// LaporKampusApp(halamanAwal: ...) untuk melewati gerbang status login.
// Ini pola yang disebut materi Minggu 9 slide 23.
//
// Aturan penamaan akun (NIM menjadi email) dan tabel pesan kesalahan
// diuji sebagai fungsi murni karena tidak butuh Firebase sama sekali.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:laporkampus/data/data_laporan.dart';
import 'package:laporkampus/layanan/auth_layanan.dart';
import 'package:laporkampus/layanan/pesan_galat.dart';
import 'package:laporkampus/main.dart';
import 'package:laporkampus/pages/halaman_konfigurasi.dart';
import 'package:laporkampus/pages/halaman_utama.dart';
import 'package:laporkampus/pages/login_page.dart';

/// Memakai ukuran layar ponsel supaya navigasi yang diuji adalah
/// NavigationBar, bukan NavigationRail versi layar lebar.
void pakaiLayarPonsel(WidgetTester tester) {
  tester.view.physicalSize = const Size(412, 900);
  tester.view.devicePixelRatio = 1.0;
  addTearDown(tester.view.reset);
}

/// Membuka aplikasi pada halaman tertentu, tanpa menyentuh Firebase.
Future<void> bukaAplikasi(WidgetTester tester, Widget halaman) async {
  pakaiLayarPonsel(tester);
  await tester.pumpWidget(LaporKampusApp(halamanAwal: halaman));
  await tester.pumpAndSettle();
}

/// Membuka Beranda langsung, melewati halaman login.
Future<void> masukKeBeranda(WidgetTester tester) async {
  await bukaAplikasi(tester, const HalamanUtama());
}

Future<void> bukaFormLaporan(WidgetTester tester) async {
  await masukKeBeranda(tester);
  await tester.tap(find.text('Buat Laporan'));
  await tester.pumpAndSettle();
}

/// Mengisi kolom login lalu menekan tombol utama.
Future<void> isiLogin(
  WidgetTester tester, {
  required String identitas,
  required String password,
  String? ulangi,
}) async {
  await tester.enterText(
    find.widgetWithText(TextFormField, 'Masukkan NIM atau email'),
    identitas,
  );
  await tester.enterText(
    find.widgetWithText(TextFormField, 'Minimal 6 karakter'),
    password,
  );
  if (ulangi != null) {
    await tester.enterText(
      find.widgetWithText(TextFormField, 'Ketik ulang password'),
      ulangi,
    );
  }
  await tester.tap(find.byType(FilledButton));
  await tester.pump();
}

void main() {
  setUp(kosongkanDataLaporan);

  group('Aturan akun', () {
    test('NIM diubah menjadi email Firebase', () {
      expect(
        emailDariIdentitas('23.01.55.0003'),
        '23.01.55.0003@laporkampus.app',
      );
    });

    test('Email yang sudah berbentuk email dipakai apa adanya', () {
      expect(
        emailDariIdentitas('  Wahyu@Contoh.com '),
        'wahyu@contoh.com',
      );
    });

    test('Kode kesalahan kredensial disamakan pesannya', () {
      expect(pesanDariKode('invalid-credential'), 'Email atau password salah');
      expect(pesanDariKode('wrong-password'), 'Email atau password salah');
      expect(pesanDariKode('user-not-found'), 'Email atau password salah');
    });

    test('Kode kesalahan lain punya pesan sendiri', () {
      expect(
        pesanDariKode('email-already-in-use'),
        'Email sudah terdaftar. Silakan masuk.',
      );
      expect(
        pesanDariKode('weak-password'),
        'Password terlalu lemah, minimal 6 karakter',
      );
      expect(
        pesanDariKode('operation-not-allowed'),
        'Login email/password belum diaktifkan',
      );
      expect(
        pesanDariKode('kode-yang-tidak-dikenal'),
        'Terjadi kesalahan. Silakan coba lagi.',
      );
    });
  });

  group('Konfigurasi', () {
    testWidgets('Halaman petunjuk tampil bila Firebase gagal disiapkan',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        const AplikasiBelumDikonfigurasi(pesan: 'invalid-app-id'),
      );
      await tester.pumpAndSettle();

      expect(find.text('Firebase belum tersambung'), findsOneWidget);
      expect(find.textContaining('invalid-app-id'), findsOneWidget);
      expect(find.textContaining('flutterfire configure'), findsOneWidget);
    });
  });

  group('Halaman login', () {
    testWidgets('Tampil saat pengguna belum masuk', (WidgetTester tester) async {
      await bukaAplikasi(tester, const LoginPage());

      expect(find.text('LaporKampus'), findsOneWidget);
      expect(find.widgetWithText(FilledButton, 'Masuk'), findsOneWidget);
      expect(find.text('Belum punya akun? Daftar'), findsOneWidget);
    });

    testWidgets('Kolom kosong menampilkan pesan tiap kolom',
        (WidgetTester tester) async {
      await bukaAplikasi(tester, const LoginPage());

      await tester.tap(find.widgetWithText(FilledButton, 'Masuk'));
      await tester.pump();

      expect(find.text('NIM atau email wajib diisi'), findsOneWidget);
      expect(find.text('Password wajib diisi'), findsOneWidget);
    });

    testWidgets('Email dengan format salah ditolak',
        (WidgetTester tester) async {
      await bukaAplikasi(tester, const LoginPage());

      await isiLogin(
        tester,
        identitas: 'salah@domain',
        password: 'rahasia',
      );

      expect(find.text('Format email belum benar'), findsOneWidget);
    });

    testWidgets('Password kurang dari enam karakter ditolak',
        (WidgetTester tester) async {
      await bukaAplikasi(tester, const LoginPage());

      await isiLogin(
        tester,
        identitas: '23.01.55.0003',
        password: '123',
      );

      expect(find.text('Password minimal 6 karakter'), findsOneWidget);
    });

    testWidgets('Mode daftar memunculkan kolom ulangi password',
        (WidgetTester tester) async {
      await bukaAplikasi(tester, const LoginPage());

      expect(find.text('Ketik ulang password'), findsNothing);

      await tester.tap(find.text('Belum punya akun? Daftar'));
      await tester.pumpAndSettle();

      expect(find.text('Ketik ulang password'), findsOneWidget);
      expect(find.widgetWithText(FilledButton, 'Daftar'), findsOneWidget);
    });

    testWidgets('Ulangi password yang berbeda ditolak',
        (WidgetTester tester) async {
      await bukaAplikasi(tester, const LoginPage());

      await tester.tap(find.text('Belum punya akun? Daftar'));
      await tester.pumpAndSettle();

      await isiLogin(
        tester,
        identitas: '23.01.55.0003',
        password: 'rahasia',
        ulangi: 'rahasia2',
      );

      expect(find.text('Password tidak sama'), findsOneWidget);
    });
  });

  group('Beranda dan form', () {
    testWidgets('Beranda memakai NavigationBar di layar ponsel',
        (WidgetTester tester) async {
      await masukKeBeranda(tester);

      expect(find.widgetWithText(AppBar, 'Beranda'), findsOneWidget);
      expect(find.byType(NavigationBar), findsOneWidget);
      expect(find.text('Buat Laporan'), findsOneWidget);
      expect(find.text('Laporan Terbaru'), findsOneWidget);
    });

    testWidgets('Tombol keluar tersedia di AppBar Beranda',
        (WidgetTester tester) async {
      await masukKeBeranda(tester);

      expect(find.byTooltip('Keluar'), findsOneWidget);
    });

    testWidgets('Layar lebar memakai NavigationRail, bukan NavigationBar',
        (WidgetTester tester) async {
      tester.view.physicalSize = const Size(1280, 800);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.reset);

      await tester.pumpWidget(
        const LaporKampusApp(halamanAwal: HalamanUtama()),
      );
      await tester.pumpAndSettle();

      expect(find.byType(NavigationRail), findsOneWidget);
      expect(find.byType(NavigationBar), findsNothing);
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
  });
}
