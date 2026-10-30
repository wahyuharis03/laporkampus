import 'package:flutter/material.dart';

/// Palet dan ukuran dari style guide mini Minggu 4.
/// Palet sengaja dibatasi supaya aplikasi terlihat satu keluarga.
const Color maroon = Color(0xFF800020);
const Color latarHalaman = Color(0xFFF5F6F8);
const Color teksUtama = Color(0xFF25283A);
const Color teksSekunder = Color(0xFF6B7280);
const Color garisNetral = Color(0xFFD9DEE7);
const Color warnaBerhasil = Color(0xFF15803D);
const Color warnaMenunggu = Color(0xFFD97706);
const Color warnaGalat = Color(0xFFDC2626);

/// Jarak mengikuti kelipatan 8 seperti aturan layout Minggu 4.
const double jarakKecil = 8;
const double jarakSedang = 16;
const double jarakBesar = 24;

ThemeData buildTemaLaporKampus() {
  return ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: maroon),
    scaffoldBackgroundColor: latarHalaman,
    fontFamily: 'Arial',
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.white,
      foregroundColor: maroon,
      surfaceTintColor: Colors.white,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: TextStyle(
        color: maroon,
        fontSize: 18,
        fontWeight: FontWeight.bold,
        fontFamily: 'Arial',
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Colors.white,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      labelStyle: const TextStyle(color: teksSekunder, fontSize: 14),
      hintStyle: const TextStyle(color: teksSekunder, fontSize: 14),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: garisNetral),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: garisNetral),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: maroon, width: 1.5),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: warnaGalat),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: warnaGalat, width: 1.5),
      ),
      errorStyle: const TextStyle(color: warnaGalat, fontSize: 12),
    ),
    cardTheme: CardThemeData(
      color: Colors.white,
      elevation: 0,
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: const BorderSide(color: garisNetral),
      ),
    ),
    navigationBarTheme: NavigationBarThemeData(
      backgroundColor: Colors.white,
      indicatorColor: maroon.withValues(alpha: 0.12),
      labelTextStyle: WidgetStateProperty.resolveWith(
        (states) => TextStyle(
          fontSize: 12,
          fontFamily: 'Arial',
          fontWeight: states.contains(WidgetState.selected)
              ? FontWeight.bold
              : FontWeight.normal,
          color: states.contains(WidgetState.selected) ? maroon : teksSekunder,
        ),
      ),
    ),
  );
}
