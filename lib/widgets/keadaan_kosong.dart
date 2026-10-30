import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

/// Keadaan kosong yang dipakai ulang di beberapa halaman.
///
/// Wireframe Minggu 4 mewajibkan minimal satu keadaan kosong terlihat:
/// pengguna baru belum punya data, jadi halaman harus menjelaskan
/// dan mengarahkan, bukan menampilkan area kosong tanpa keterangan.
class KeadaanKosong extends StatelessWidget {
  const KeadaanKosong({
    super.key,
    required this.ikon,
    required this.pesan,
    this.petunjuk,
  });

  final IconData ikon;
  final String pesan;
  final String? petunjuk;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(jarakSedang),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                color: maroon.withValues(alpha: 0.08),
                shape: BoxShape.circle,
              ),
              child: Icon(ikon, size: 30, color: maroon),
            ),
            const SizedBox(height: jarakSedang),
            Text(
              pesan,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.bold,
                color: teksUtama,
              ),
            ),
            if (petunjuk != null) ...<Widget>[
              const SizedBox(height: jarakKecil),
              Text(
                petunjuk!,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 13, color: teksSekunder),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
