import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import 'beranda_page.dart';
import 'laporan_saya_page.dart';

/// Kerangka navigasi utama (StatefulWidget karena menyimpan menu aktif).
///
/// Mobile: NavigationBar di bawah. Lebar >= 600 px: NavigationRail di kiri,
/// mengikuti rancangan navigasi Minggu 3 yang menetapkan menu yang sama
/// untuk ponsel dan web.
class HalamanUtama extends StatefulWidget {
  const HalamanUtama({super.key});

  @override
  State<HalamanUtama> createState() => _HalamanUtamaState();
}

class _HalamanUtamaState extends State<HalamanUtama> {
  int _indeks = 0;

  /// Dua tujuan utama sesuai rancangan navigasi Minggu 3:
  /// Beranda lalu Laporan Saya, dengan urutan yang sama di mobile dan web.
  static const List<Widget> _halaman = <Widget>[
    BerandaPage(),
    LaporanSayaPage(),
  ];

  static const List<NavigationDestination> _tujuan = <NavigationDestination>[
    NavigationDestination(
      icon: Icon(Icons.home_outlined),
      selectedIcon: Icon(Icons.home),
      label: 'Beranda',
    ),
    NavigationDestination(
      icon: Icon(Icons.assignment_outlined),
      selectedIcon: Icon(Icons.assignment),
      label: 'Laporan Saya',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final bool layarLebar = MediaQuery.sizeOf(context).width >= 600;

    if (layarLebar) {
      return Scaffold(
        body: Row(
          children: <Widget>[
            NavigationRail(
              backgroundColor: Colors.white,
              selectedIndex: _indeks,
              onDestinationSelected: (int indeks) {
                setState(() => _indeks = indeks);
              },
              labelType: NavigationRailLabelType.all,
              leading: const Padding(
                padding: EdgeInsets.symmetric(vertical: jarakSedang),
                child: CircleAvatar(
                  radius: 20,
                  backgroundColor: maroon,
                  child: Icon(
                    Icons.account_balance_outlined,
                    color: Colors.white,
                    size: 20,
                  ),
                ),
              ),
              destinations: const <NavigationRailDestination>[
                NavigationRailDestination(
                  icon: Icon(Icons.home_outlined),
                  selectedIcon: Icon(Icons.home),
                  label: Text('Beranda'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.assignment_outlined),
                  selectedIcon: Icon(Icons.assignment),
                  label: Text('Laporan Saya'),
                ),
              ],
            ),
            const VerticalDivider(width: 1, color: garisNetral),
            Expanded(child: _halaman[_indeks]),
          ],
        ),
      );
    }

    return Scaffold(
      body: _halaman[_indeks],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _indeks,
        onDestinationSelected: (int indeks) {
          setState(() => _indeks = indeks);
        },
        destinations: _tujuan,
      ),
    );
  }
}
