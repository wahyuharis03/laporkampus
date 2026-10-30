import 'package:flutter/material.dart';

import '../data/data_laporan.dart';
import '../theme/app_theme.dart';

/// Chip status laporan.
///
/// Status tidak pernah disampaikan lewat warna saja; teksnya selalu ikut
/// ditampilkan, sesuai aturan gaya Minggu 4.
class LabelStatus extends StatelessWidget {
  const LabelStatus({super.key, required this.status});

  final String status;

  Color get _warna {
    switch (status) {
      case statusSelesai:
        return warnaBerhasil;
      case statusDiproses:
        return maroon;
      default:
        return warnaMenunggu;
    }
  }

  @override
  Widget build(BuildContext context) {
    final Color warna = _warna;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: warna.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: warna.withValues(alpha: 0.35)),
      ),
      child: Text(
        status,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.bold,
          color: warna,
        ),
      ),
    );
  }
}
