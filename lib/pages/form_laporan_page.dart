import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../data/data_laporan.dart';
import '../theme/app_theme.dart';

/// Halaman Form Laporan (H3 pada sitemap Minggu 3).
///
/// StatefulWidget karena menyimpan isian yang berubah selama pengguna
/// mengisi form. Aturan validasi diturunkan dari kriteria penerimaan
/// user story Minggu 2, bukan ditebak saat menulis kode.
class FormLaporanPage extends StatefulWidget {
  const FormLaporanPage({super.key});

  @override
  State<FormLaporanPage> createState() => _FormLaporanPageState();
}

class _FormLaporanPageState extends State<FormLaporanPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final TextEditingController _lokasiController = TextEditingController();
  final TextEditingController _tanggalController = TextEditingController();
  final TextEditingController _jumlahController = TextEditingController();
  final TextEditingController _deskripsiController = TextEditingController();

  String? _kategori;
  String? _urgensi;
  DateTime? _tanggal;

  @override
  void dispose() {
    _lokasiController.dispose();
    _tanggalController.dispose();
    _jumlahController.dispose();
    _deskripsiController.dispose();
    super.dispose();
  }

  // ---------- Aturan validasi per kolom ----------

  String? _validasiLokasi(String? nilai) {
    final String teks = (nilai ?? '').trim();
    if (teks.isEmpty) return 'Lokasi fasilitas wajib diisi';
    if (teks.length < 5) return 'Lokasi minimal 5 karakter';
    return null;
  }

  String? _validasiKategori(String? nilai) {
    if (nilai == null || nilai.isEmpty) return 'Kategori wajib dipilih';
    return null;
  }

  String? _validasiUrgensi(String? nilai) {
    if (nilai == null || nilai.isEmpty) return 'Tingkat urgensi wajib dipilih';
    return null;
  }

  String? _validasiTanggal(String? nilai) {
    if (nilai == null || nilai.isEmpty) return 'Tanggal wajib diisi';
    return null;
  }

  String? _validasiJumlah(String? nilai) {
    if (nilai == null || nilai.isEmpty) return 'Jumlah unit wajib diisi';
    final int? jumlah = int.tryParse(nilai);
    if (jumlah == null) return 'Harus berupa angka';
    if (jumlah <= 0) return 'Jumlah unit tidak boleh nol';
    if (jumlah > 50) return 'Maksimal 50 unit per laporan';
    return null;
  }

  String? _validasiDeskripsi(String? nilai) {
    final String teks = (nilai ?? '').trim();
    if (teks.isEmpty) return 'Deskripsi wajib diisi';
    if (teks.length < 15) return 'Deskripsi minimal 15 karakter';
    return null;
  }

  // ---------- Aksi ----------

  Future<void> _pilihTanggal() async {
    final DateTime hariIni = DateTime.now();
    final DateTime? dipilih = await showDatePicker(
      context: context,
      initialDate: _tanggal ?? hariIni,
      firstDate: hariIni.subtract(const Duration(days: 30)),
      lastDate: hariIni,
      helpText: 'Pilih tanggal kejadian',
    );

    if (dipilih == null) return;
    setState(() {
      _tanggal = dipilih;
      _tanggalController.text = formatTanggal(dipilih);
    });
  }

  void _kirim() {
    final ScaffoldMessengerState pesan = ScaffoldMessenger.of(context);
    pesan.hideCurrentSnackBar();

    if (!(_formKey.currentState?.validate() ?? false)) {
      pesan.showSnackBar(
        const SnackBar(
          content: Text('Periksa kembali kolom yang ditandai merah.'),
          backgroundColor: warnaGalat,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    daftarLaporan.add(
      Laporan(
        lokasi: _lokasiController.text.trim(),
        kategori: _kategori!,
        urgensi: _urgensi!,
        tanggal: _tanggal!,
        jumlahUnit: int.parse(_jumlahController.text),
        deskripsi: _deskripsiController.text.trim(),
        status: statusMenunggu,
      ),
    );

    pesan.showSnackBar(
      SnackBar(
        content: Text('Laporan untuk ${_lokasiController.text.trim()} '
            'berhasil dikirim.'),
        backgroundColor: warnaBerhasil,
        behavior: SnackBarBehavior.floating,
      ),
    );

    Navigator.pop(context, true);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Form Laporan')),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 720),
          child: Form(
            key: _formKey,
            autovalidateMode: AutovalidateMode.onUserInteraction,
            child: ListView(
              padding: const EdgeInsets.all(20),
              children: <Widget>[
                const Text(
                  'Isi data kerusakan fasilitas',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: teksUtama,
                  ),
                ),
                const SizedBox(height: jarakKecil),
                const Text(
                  'Kolom bertanda wajib harus diisi. Laporan yang masuk akan '
                  'berstatus Menunggu sampai ditangani tim Sarpras.',
                  style: TextStyle(
                    fontSize: 13,
                    height: 1.5,
                    color: teksSekunder,
                  ),
                ),
                const SizedBox(height: jarakBesar),

                TextFormField(
                  controller: _lokasiController,
                  textInputAction: TextInputAction.next,
                  decoration: const InputDecoration(
                    labelText: 'Lokasi fasilitas *',
                    hintText: 'Contoh: Gedung A - Ruang A201',
                  ),
                  validator: _validasiLokasi,
                ),
                const SizedBox(height: 18),

                DropdownButtonFormField<String>(
                  isExpanded: true,
                  decoration: const InputDecoration(
                    labelText: 'Kategori kerusakan *',
                  ),
                  hint: const Text('Pilih kategori'),
                  items: <DropdownMenuItem<String>>[
                    for (final String kategori in daftarKategori)
                      DropdownMenuItem<String>(
                        value: kategori,
                        child: Text(kategori),
                      ),
                  ],
                  onChanged: (String? nilai) {
                    setState(() => _kategori = nilai);
                  },
                  validator: _validasiKategori,
                ),
                const SizedBox(height: 18),

                DropdownButtonFormField<String>(
                  isExpanded: true,
                  decoration: const InputDecoration(
                    labelText: 'Tingkat urgensi *',
                  ),
                  hint: const Text('Pilih tingkat urgensi'),
                  items: <DropdownMenuItem<String>>[
                    for (final String urgensi in daftarUrgensi)
                      DropdownMenuItem<String>(
                        value: urgensi,
                        child: Text(urgensi),
                      ),
                  ],
                  onChanged: (String? nilai) {
                    setState(() => _urgensi = nilai);
                  },
                  validator: _validasiUrgensi,
                ),
                const SizedBox(height: 18),

                TextFormField(
                  controller: _tanggalController,
                  readOnly: true,
                  onTap: _pilihTanggal,
                  decoration: const InputDecoration(
                    labelText: 'Tanggal kejadian *',
                    hintText: 'Pilih tanggal',
                    suffixIcon: Icon(Icons.event_outlined),
                  ),
                  validator: _validasiTanggal,
                ),
                const SizedBox(height: 18),

                TextFormField(
                  controller: _jumlahController,
                  keyboardType: TextInputType.number,
                  inputFormatters: <TextInputFormatter>[
                    FilteringTextInputFormatter.digitsOnly,
                  ],
                  decoration: const InputDecoration(
                    labelText: 'Jumlah unit rusak *',
                    hintText: 'Contoh: 2',
                    helperText: 'Angka 1 sampai 50',
                  ),
                  validator: _validasiJumlah,
                ),
                const SizedBox(height: 18),

                TextFormField(
                  controller: _deskripsiController,
                  maxLines: 4,
                  maxLength: 200,
                  decoration: const InputDecoration(
                    labelText: 'Deskripsi kerusakan *',
                    hintText: 'Jelaskan kondisi kerusakan secara singkat',
                    alignLabelWithHint: true,
                  ),
                  validator: _validasiDeskripsi,
                ),
                const SizedBox(height: jarakKecil),

                SizedBox(
                  height: 52,
                  child: FilledButton.icon(
                    onPressed: _kirim,
                    icon: const Icon(Icons.send_outlined),
                    label: const Text('Kirim Laporan'),
                  ),
                ),
                const SizedBox(height: jarakKecil),
                SizedBox(
                  height: 48,
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(context),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: maroon,
                      side: const BorderSide(color: maroon),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    child: const Text('Batal'),
                  ),
                ),
                const SizedBox(height: jarakBesar),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
