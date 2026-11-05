/**
 * Cetak docs/proposal-uts.html menjadi PDF A4 dengan nomor halaman.
 *
 * Dipakai supaya tata letak PDF bisa diulang: sumbernya HTML, bukan hasil
 * susun tangan. Jalankan dari folder video-uts (butuh playwright-core):
 *
 *   node scripts/cetak-proposal-pdf.js
 *
 * Margin di bawah sama dengan @page pada HTML (17/16/16/16 mm). Nomor halaman
 * ditulis lewat footerTemplate karena Chrome tidak mendukung @page margin-box.
 */
const path = require('path');
const {chromium} = require('playwright-core');

const AKAR = path.resolve(__dirname, '..', '..');
const SUMBER = path.join(AKAR, 'docs', 'proposal-uts.html');
const KELUARAN = path.join(AKAR, 'docs', 'Proposal-UTS-LaporKampus.pdf');

const CHROME =
  process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

(async () => {
  const browser = await chromium.launch({executablePath: CHROME});
  const page = await browser.newPage();

  await page.goto('file:///' + SUMBER.replace(/\\/g, '/'), {waitUntil: 'networkidle'});
  await page.emulateMedia({media: 'print'});

  await page.pdf({
    path: KELUARAN,
    format: 'A4',
    printBackground: true,
    margin: {top: '17mm', bottom: '16mm', left: '16mm', right: '16mm'},
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate:
      '<div style="width:100%;font-family:Georgia,serif;font-size:8pt;color:#8b8b8b;' +
      'padding:0 16mm;display:flex;justify-content:space-between;align-items:center;">' +
      '<span>LaporKampus — Proposal Project UTS</span>' +
      '<span class="pageNumber"></span></div>',
  });

  await browser.close();
  console.log('selesai:', KELUARAN);
})();
