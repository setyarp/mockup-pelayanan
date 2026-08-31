// =============================================================================
//  ASABRI – DOCUMENT GENERATOR v3.0
//  SP (Surat Pemberitahuan) Pembayaran Manfaat – HTML Print Layout
//  Mengikuti format surat resmi ASABRI:
//    • Kop surat berlogo + tanggal
//    • Blok nomor/sifat/lampiran/hal
//    • Alamat tujuan
//    • Paragraf dasar + rincian pembayaran
//    • Tabel uraian perhitungan
//    • Terbilang
//    • Persyaratan + penutup
//    • Blok tanda tangan
//    • Disclaimer (border merah) 
//    • Footer alamat kantor
// =============================================================================

// ---------------------------------------------------------------------------
// LOGO ASABRI – Base64 inline (tiny SVG placeholder; browser will load the
// real logo from the same-origin path if the <img> src resolves)
// ---------------------------------------------------------------------------
const ASABRI_LOGO_SRC = 'logo-asabri.png'; // relative to HTML file

// ---------------------------------------------------------------------------
// Angka → Terbilang (ID)
// ---------------------------------------------------------------------------
function terbilangID(n) {
  const satuan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan',
    'sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas',
    'tujuh belas', 'delapan belas', 'sembilan belas'];
  const puluhan = ['', '', 'dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh',
    'enam puluh', 'tujuh puluh', 'delapan puluh', 'sembilan puluh'];

  if (n < 0) return 'minus ' + terbilangID(-n);
  if (n === 0) return 'nol';
  if (n < 20) return satuan[n];
  if (n < 100) return puluhan[Math.floor(n / 10)] + (n % 10 ? ' ' + satuan[n % 10] : '');
  if (n < 200) return 'seratus' + (n % 100 ? ' ' + terbilangID(n % 100) : '');
  if (n < 1000) return satuan[Math.floor(n / 100)] + ' ratus' + (n % 100 ? ' ' + terbilangID(n % 100) : '');
  if (n < 2000) return 'seribu' + (n % 1000 ? ' ' + terbilangID(n % 1000) : '');
  if (n < 1000000) return terbilangID(Math.floor(n / 1000)) + ' ribu' + (n % 1000 ? ' ' + terbilangID(n % 1000) : '');
  if (n < 1000000000) return terbilangID(Math.floor(n / 1000000)) + ' juta' + (n % 1000000 ? ' ' + terbilangID(n % 1000000) : '');
  return terbilangID(Math.floor(n / 1000000000)) + ' miliar' + (n % 1000000000 ? ' ' + terbilangID(n % 1000000000) : '');
}

function terbilangRupiah(nominal) {
  const num = typeof nominal === 'string' ? parseInt(nominal.replace(/[^0-9]/g, '')) : Math.round(Number(nominal) || 0);
  if (!num || isNaN(num)) return '# NOL RUPIAH #';
  const words = terbilangID(num).toUpperCase();
  return `# ${words} RUPIAH #`;
}

// ---------------------------------------------------------------------------
// Format helpers
// ---------------------------------------------------------------------------
function fRp(val) {
  const num = typeof val === 'string' ? parseInt(val.replace(/[^0-9]/g, '')) : Math.round(Number(val) || 0);
  if (isNaN(num)) return '0,-';
  return num.toLocaleString('id-ID') + ',-';
}

function todayID() {
  return new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
}

// ---------------------------------------------------------------------------
// CORE HTML TEMPLATE – satu fungsi yang digunakan oleh semua jenis SP
// data = {
//   nomor, sifat, lampiran, halProgram,     ← kop
//   namaProgram,                             ← dipakai di body teks
//   tanggal,                                 ← pojok kanan
//   tujuan: { nama, nip, alamat, telp },
//   rincian: {                               ← data pembayaran
//     namaPeserta, namaPenerima, mitraKerja,
//     noRekening, atasNamaRekening, kodeBayar
//   },
//   tabel: [ { no, uraian, jumlah } ],       ← isi tabel (jumlah angka)
//   jumlahPenerimaan,                        ← angka total
//   kakancab: { jabatan, kancab, nama }
// }
// ---------------------------------------------------------------------------
function buildSPHTML(data) {
  const tgl = data.tanggal || todayID();
  const nomor = data.nomor || '-';
  const sifat = data.sifat || 'Biasa';
  const lampiran = data.lampiran || '-';
  const halProgram = data.halProgram || `Surat Pemberitahuan (SP) Pembayaran Manfaat\n${data.namaProgram || ''}`;
  const namaProgram = data.namaProgram || 'PROGRAM';
  const tujuan = data.tujuan || {};
  const rin = data.rincian || {};
  const tabel = data.tabel || [];
  const jumlahPenerimaan = data.jumlahPenerimaan || 0;
  const kakancab = data.kakancab || {};
  const kancab = kakancab.kancab || 'JAKARTA';
  const jabKakancab = kakancab.jabatan || `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${kancab.toUpperCase()}`;
  const namaKakancab = kakancab.nama || '';

  const tabelRows = tabel.map((r, i) => `
    <tr>
      <td style="border:1px solid #000;padding:4px 8px;text-align:center;">${r.no || (i + 1)}</td>
      <td style="border:1px solid #000;padding:4px 8px;">${r.uraian}</td>
      <td style="border:1px solid #000;padding:4px 8px;text-align:right;">${typeof r.jumlah === 'number' ? fRp(r.jumlah) : (r.jumlah || '-')}</td>
    </tr>
  `).join('');

  const halLines = halProgram.split('\n').map((l, i) =>
    i === 0 ? `<span>${l}</span>` : `<span style="padding-left:30px;">${l}</span>`
  ).join('<br>');

  const alamatLines = (tujuan.alamat || '').split('\n').map(l => `<div>${l}</div>`).join('');
  const jabatanLines = jabKakancab.split('\n').map(l => `<div>${l}</div>`).join('');

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>SP – ${namaProgram}</title>
<style>
  @page { size: A4; margin: 20mm 20mm 15mm 25mm; }
  * { box-sizing: border-box; }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 11pt;
    color: #000;
    margin: 0;
    padding: 0;
    background: #fff;
  }
  .page { width: 100%; }

  /* KOP */
  .kop { display: flex; align-items: flex-start; gap: 14px; border-bottom: none; margin-bottom: 20px; }
  .kop img { width: 72px; height: auto; }
  .kop .brand { font-size: 22pt; font-weight: 900; letter-spacing: 2px; color: #003b8e; font-family: Arial, sans-serif; line-height: 1; margin-top: 4px; }
  .kop .brand small { display: block; font-size: 8pt; font-weight: normal; letter-spacing: 0; color: #000; margin-top: 2px; font-family: 'Times New Roman', serif; }

  /* NOMOR SURAT */
  .surat-meta { display: flex; justify-content: space-between; margin-bottom: 16px; }
  .surat-meta table { border-collapse: collapse; }
  .surat-meta td { padding: 1px 4px; vertical-align: top; font-size: 11pt; }
  .surat-meta td.colon { width: 10px; text-align: center; }
  .surat-meta .tgl { font-size: 11pt; white-space: nowrap; }

  /* TUJUAN */
  .tujuan { margin-bottom: 16px; line-height: 1.5; }
  .tujuan .sapaan { margin-bottom: 4px; }

  /* BODY TEXT */
  p { margin: 0 0 12px 0; line-height: 1.6; text-align: justify; }
  ol { margin: 0 0 12px 0; padding-left: 28px; }
  ol li { margin-bottom: 4px; line-height: 1.6; }

  /* RINCIAN LIST */
  .rincian-list { border-collapse: collapse; width: 100%; margin-bottom: 12px; }
  .rincian-list td { padding: 2px 4px; vertical-align: top; font-size: 11pt; }
  .rincian-list td.no { width: 24px; text-align: right; padding-right: 6px; }
  .rincian-list td.colon { width: 12px; text-align: center; }

  /* TABEL PERHITUNGAN */
  .tbl-perhitungan { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
  .tbl-perhitungan thead tr th { border: 1px solid #000; background: #fff; padding: 5px 8px; text-align: center; font-weight: bold; font-size: 11pt; }
  .tbl-perhitungan thead tr th.col-no { width: 40px; }
  .tbl-perhitungan thead tr th.col-jumlah { width: 160px; }
  .tbl-perhitungan .row-total td { border: 1px solid #000; padding: 5px 8px; font-weight: bold; text-align: right; }
  .tbl-perhitungan .row-total td.lbl { text-align: center; font-weight: bold; }

  /* TERBILANG */
  .terbilang { margin-bottom: 20px; font-size: 11pt; font-style: italic; }

  /* SYARAT */
  .syarat-list { margin: 0 0 12px 0; padding-left: 28px; }
  .syarat-list li { margin-bottom: 4px; }

  /* TTD BLOCK */
  .ttd-area { display: flex; justify-content: flex-end; margin: 20px 0 10px 0; }
  .ttd-block { text-align: center; min-width: 220px; }
  .ttd-block .jabatan { font-weight: bold; line-height: 1.5; margin-bottom: 70px; }
  .ttd-block .nama { font-weight: bold; text-decoration: underline; }

  /* DISCLAIMER */
  .disclaimer {
    border: 2px solid #cc0000;
    padding: 10px 14px;
    margin: 10px 0 20px 0;
    font-size: 9.5pt;
    line-height: 1.5;
    text-align: justify;
  }
  .disclaimer .disc-title { font-style: italic; font-weight: bold; text-align: center; margin-bottom: 6px; }

  /* FOOTER */
  .page-footer {
    border-top: 1px solid #000;
    padding-top: 6px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 9pt;
    margin-top: 8px;
  }
  .page-footer .alamat { line-height: 1.5; }
  .page-footer .website { text-align: right; }

  /* DIAGONAL STRIPE (pojok kanan bawah accent) */
  .asabri-stripe {
    position: fixed;
    bottom: 0; right: 0;
    width: 80px; height: 80px;
    background: linear-gradient(135deg, #003b8e 0%, #ffa500 100%);
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    z-index: 0;
  }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .asabri-stripe { display: block; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- KOP SURAT -->
  <div class="kop">
    <img src="${ASABRI_LOGO_SRC}" alt="ASABRI">
    <div>
      <div class="brand">ASABRI</div>
    </div>
  </div>

  <!-- NOMOR & TANGGAL -->
  <div class="surat-meta">
    <table>
      <tr>
        <td>Nomor</td><td class="colon">:</td>
        <td>${nomor}</td>
      </tr>
      <tr>
        <td>Sifat</td><td class="colon">:</td>
        <td>${sifat}</td>
      </tr>
      <tr>
        <td>Lampiran</td><td class="colon">:</td>
        <td>${lampiran}</td>
      </tr>
      <tr>
        <td style="vertical-align:top;">Hal</td><td class="colon" style="vertical-align:top;">:</td>
        <td>${halLines}</td>
      </tr>
    </table>
    <div class="tgl">${tgl}</div>
  </div>

  <!-- TUJUAN -->
  <div class="tujuan">
    <div class="sapaan">Yth. Bapak/Ibu/Sdr/Sdri</div>
    <div><strong>${tujuan.nama || ''}</strong></div>
    <div>${tujuan.nip || ''}</div>
    ${alamatLines}
    <div>Telp./ HP. ${tujuan.telp || ''}</div>
  </div>

  <!-- DASAR -->
  <p>Berdasarkan:</p>
  <ol>
    <li>Pengajuan klaim Manfaat Program ASABRI;</li>
    <li>Perjanjian Kerja Sama (PKS) antara PT ASABRI (Persero) dengan PT Bank Pembangunan Daerah Jawa Barat dan Banten, Tbk., Nomor SPKS/HK.02/05-AS/II/2021 dan Nomor 021/PKS/DIR-INS/2019.</li>
  </ol>

  <!-- PARAGRAF ISI -->
  <p>Sehubungan dasar tersebut di atas, diberitahukan bahwa pengajuan klaim manfaat ${namaProgram} Bapak/Ibu/Sdr/Sdri sudah selesai diproses. Adapun rincian pembayaran sebagai berikut:</p>

  <!-- RINCIAN PEMBAYARAN -->
  <table class="rincian-list">
    <tr>
      <td class="no">1.</td>
      <td>Nama Peserta ASABRI</td>
      <td class="colon">:</td>
      <td>${rin.namaPeserta || ''}</td>
    </tr>
    <tr>
      <td class="no">2.</td>
      <td>Nama Penerima</td>
      <td class="colon">:</td>
      <td>${rin.namaPenerima || ''}</td>
    </tr>
    <tr>
      <td class="no">3.</td>
      <td>Mitra Kerja Pembayaran</td>
      <td class="colon">:</td>
      <td>${rin.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia'}</td>
    </tr>
    <tr>
      <td class="no">4.</td>
      <td>Nomor Rekening</td>
      <td class="colon">:</td>
      <td>Rekening No. <strong>${rin.noRekening || ''}</strong>, Atas nama <strong>${rin.atasNamaRekening || ''}</strong></td>
    </tr>
    <tr>
      <td class="no">5.</td>
      <td>Kode Bayar</td>
      <td class="colon">:</td>
      <td>${rin.kodeBayar || ''}</td>
    </tr>
    <tr>
      <td class="no">6.</td>
      <td>Uraian Perhitungan</td>
      <td class="colon">:</td>
      <td></td>
    </tr>
  </table>

  <!-- TABEL URAIAN PERHITUNGAN -->
  <table class="tbl-perhitungan">
    <thead>
      <tr>
        <th class="col-no">NO</th>
        <th>PROGRAM ${namaProgram.toUpperCase()}</th>
        <th class="col-jumlah">JUMLAH (Rp)</th>
      </tr>
    </thead>
    <tbody>
      ${tabelRows}
    </tbody>
    <tfoot>
      <tr class="row-total">
        <td colspan="2" class="lbl">Jumlah Penerimaan</td>
        <td style="text-align:right;border:1px solid #000;padding:5px 8px;font-weight:bold;">${fRp(jumlahPenerimaan)}</td>
      </tr>
    </tfoot>
  </table>

  <!-- TERBILANG -->
  <div class="terbilang">Terbilang: ${terbilangRupiah(jumlahPenerimaan)}</div>

  <!-- PERSYARATAN -->
  <p>Persyaratan pembayaran klaim:</p>
  <ol class="syarat-list">
    <li>Asli Surat Pemberitahuan (SP);</li>
    <li>Menunjukkan e-KTP asli dan menyerahkan fotokopi e-KTP Tertunjuk.</li>
  </ol>

  <p>Demikian disampaikan, atas perhatiannya diucapkan terima kasih.</p>

  <!-- TTD -->
  <div class="ttd-area">
    <div class="ttd-block">
      <div class="jabatan">${jabatanLines}</div>
      <div class="nama">${namaKakancab}</div>
    </div>
  </div>

  <!-- DISCLAIMER -->
  <div class="disclaimer">
    <div class="disc-title"><em>DISCLAIMER</em></div>
    <p style="margin:0;font-size:9.5pt;">
      Surat Pemberitahuan (SP) berlaku ditanggal yang sama dengan tanggal penerbitan SP.
      Dalam hal SP tidak dicairkan sesuai dengan tanggal penerbitan SP, maka pembayaran
      klaim akan dipindahbukukan ke rekening Tertunjuk pada H+1 hari kerja tanggal
      penerbitan SP.<br>
      Apabila terdapat ketidaksesuaian data, maka SP otomatis dibatalkan.
    </p>
  </div>

  <!-- FOOTER -->
  <div class="page-footer">
    <div class="alamat">
      <strong>PT ASABRI (Persero)</strong><br>
      Jl. Mayjen Sutoyo No. 11, Jakarta Timur, 13630<br>
      DKI JAKARTA , 13630
    </div>
    <div class="alamat" style="text-align:left;">
      P : (021) 8094140<br>
      F : (021) 8094140
    </div>
    <div class="website">www.asabri.co.id</div>
  </div>

</div><!-- end .page -->
<div class="asabri-stripe"></div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// openSPWindow – buka di tab baru + auto print
// ---------------------------------------------------------------------------
function openSPWindow(html) {
  const win = window.open('', '_blank', 'width=900,height=1100');
  if (!win) { alert('Popup diblokir browser. Izinkan popup untuk halaman ini.'); return; }
  win.document.open();
  win.document.write(html);
  win.document.close();
  win.onload = () => {
    setTimeout(() => { try { win.print(); } catch(e) {} }, 400);
  };
}

// ---------------------------------------------------------------------------
// FUNGSI TIAP PROGRAM
// Semua menggunakan buildSPHTML dengan data yang disesuaikan
// ---------------------------------------------------------------------------

// 1. SP THT (Tabungan Hari Tua)
function generateSPTHT(data) {
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa',
    lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nProgram TABUNGAN HARI TUA (THT)',
    namaProgram: 'TABUNGAN HARI TUA (THT)',
    tanggal: data.tanggal || todayID(),
    tujuan: {
      nama: data.nama || '',
      nip: `${data.nrp || ''} / ${data.nip || data.nrp || ''}`,
      alamat: data.alamat || '',
      telp: data.telp || '',
    },
    rincian: {
      namaPeserta: data.nama || '',
      namaPenerima: data.namaPenerima || data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '',
      atasNamaRekening: data.atasNamaRekening || data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}THT`,
    },
    tabel: [
      { uraian: 'Tabungan Asuransi', jumlah: data.tabunganAsuransi || data.nominalBruto || 0 },
      { uraian: 'Jumlah Hak', jumlah: data.jumlahHak || data.nominalBruto || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.jumlahPotongan || data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.jumlahPenerimaan || data.nominalNetto || data.nominalBruto || 0,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 2. SP Pensiun / Jaminan Pensiun (JP)
function generateSPPensiun(data) {
  const penspok = data.penspok || data.nominalPP || 0;
  const potongan = data.potonganHutang || 0;
  const jumlahBersih = data.totalPensiun || data.jumlahBersih || (Number(String(penspok).replace(/[^0-9]/g,'')) - Number(String(potongan).replace(/[^0-9]/g,'')));
  const pembulatan = data.pembulatan || 0;
  const jumlahPenerimaan = data.jumlahPenerimaan || jumlahBersih;

  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa',
    lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nProgram JAMINAN PENSIUN (JP)',
    namaProgram: 'JAMINAN PENSIUN',
    tanggal: data.tanggal || todayID(),
    tujuan: {
      nama: data.nama || '',
      nip: `${data.nrp || ''} / ${data.nip || data.nrp || ''}`,
      alamat: data.alamat || '',
      telp: data.telp || '',
    },
    rincian: {
      namaPeserta: data.nama || '',
      namaPenerima: data.namaPenerima || data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '',
      atasNamaRekening: data.atasNamaRekening || data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}JP`,
    },
    tabel: [
      { uraian: 'Pensiun Pertama', jumlah: penspok },
      { uraian: 'Jumlah Potongan', jumlah: potongan },
      { uraian: 'Jumlah Bersih', jumlah: jumlahBersih },
      { uraian: 'Pembulatan', jumlah: pembulatan },
    ],
    jumlahPenerimaan: jumlahPenerimaan,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 3. SP JKm (Jaminan Kematian)
function generateSPJKm(data) {
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa',
    lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nProgram JAMINAN KEMATIAN (JKm)',
    namaProgram: 'JAMINAN KEMATIAN (JKm)',
    tanggal: data.tanggal || todayID(),
    tujuan: {
      nama: data.namaAhliWaris || data.nama || '',
      nip: data.nrp || '',
      alamat: data.alamat || '',
      telp: data.telp || '',
    },
    rincian: {
      namaPeserta: data.nama || '',
      namaPenerima: data.namaAhliWaris || data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '',
      atasNamaRekening: data.atasNamaRekening || data.namaAhliWaris || data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}JKM`,
    },
    tabel: [
      { uraian: 'Santunan Kematian Sekaligus (SKS)', jumlah: data.nominalSKS || 0 },
      { uraian: 'Uang Duka Wafat (UDW)', jumlah: data.nominalUDW || 0 },
      { uraian: 'Biaya Pemakaman', jumlah: data.biayaPemakaman || 0 },
      { uraian: 'Beasiswa JKm', jumlah: data.beasiswaJKm || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.totalJKm || data.jumlahPenerimaan || 0,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 4. SP JKK (Jaminan Kecelakaan Kerja)
function generateSPJKK(data) {
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa',
    lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nProgram JAMINAN KECELAKAAN KERJA (JKK)',
    namaProgram: 'JAMINAN KECELAKAAN KERJA (JKK)',
    tanggal: data.tanggal || todayID(),
    tujuan: {
      nama: data.nama || '',
      nip: data.nrp || '',
      alamat: data.alamat || '',
      telp: data.telp || '',
    },
    rincian: {
      namaPeserta: data.nama || '',
      namaPenerima: data.namaPenerima || data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '',
      atasNamaRekening: data.atasNamaRekening || data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}JKK`,
    },
    tabel: [
      { uraian: 'Santunan Risiko Kecelakaan Kerja (SRKK)', jumlah: data.nominalSRKK || 0 },
      { uraian: 'Biaya Angkut / Pengobatan', jumlah: data.biayaAngkut || 0 },
      { uraian: 'Beasiswa JKK', jumlah: data.beasiswaJKK || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.totalJKK || data.jumlahPenerimaan || 0,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 5. SP Santunan Cacat
function generateSPSantunanCacat(data) {
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa', lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nProgram SANTUNAN CACAT',
    namaProgram: 'SANTUNAN CACAT',
    tanggal: data.tanggal || todayID(),
    tujuan: { nama: data.nama || '', nip: data.nrp || '', alamat: data.alamat || '', telp: data.telp || '' },
    rincian: {
      namaPeserta: data.nama || '', namaPenerima: data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '', atasNamaRekening: data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}CACAT`,
    },
    tabel: [
      { uraian: `Golongan Cacat: ${data.golonganCacat || '-'} – ${data.tingkatCacat || '-'} (${data.persentaseCacat || '-'})`, jumlah: data.nominalSantunan || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.nominalSantunan || data.jumlahPenerimaan || 0,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 6. SP Tunjangan Cacat
function generateSPTunjanganCacat(data) {
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa', lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nProgram TUNJANGAN CACAT (Bulanan)',
    namaProgram: 'TUNJANGAN CACAT',
    tanggal: data.tanggal || todayID(),
    tujuan: { nama: data.nama || '', nip: data.nrp || '', alamat: data.alamat || '', telp: data.telp || '' },
    rincian: {
      namaPeserta: data.nama || '', namaPenerima: data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '', atasNamaRekening: data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}TC`,
    },
    tabel: [
      { uraian: `Tunjangan Cacat – ${data.golonganCacat || '-'}`, jumlah: data.nominalTunjanganCacat || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.nominalTunjanganCacat || data.jumlahPenerimaan || 0,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 7. SP NTIP (Nilai Tunai Iuran Pensiun)
function generateSPNTIP(data) {
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa', lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nProgram NILAI TUNAI IURAN PENSIUN (NTIP)',
    namaProgram: 'NILAI TUNAI IURAN PENSIUN (NTIP)',
    tanggal: data.tanggal || todayID(),
    tujuan: { nama: data.nama || '', nip: data.nrp || '', alamat: data.alamat || '', telp: data.telp || '' },
    rincian: {
      namaPeserta: data.nama || '', namaPenerima: data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '', atasNamaRekening: data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}NTIP`,
    },
    tabel: [
      { uraian: 'Nilai Tunai Iuran Pensiun', jumlah: data.nominalNTIP || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.nominalNTIP || data.jumlahPenerimaan || 0,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 8. SP Tunjangan Terbatas
function generateSPTunjangan(data) {
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa', lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nProgram TUNJANGAN TERBATAS',
    namaProgram: 'TUNJANGAN TERBATAS',
    tanggal: data.tanggal || todayID(),
    tujuan: { nama: data.nama || '', nip: data.nrp || '', alamat: data.alamat || '', telp: data.telp || '' },
    rincian: {
      namaPeserta: data.nama || '', namaPenerima: data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '', atasNamaRekening: data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}TT`,
    },
    tabel: [
      { uraian: 'Nominal Tunjangan Terbatas', jumlah: data.nominalTunjangan || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.nominalTunjangan || data.jumlahPenerimaan || 0,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 9. SP Alih Status / Tunjangan Yatim-Piatu / Orang Tua
function generateSPAlihStatus(data) {
  const label = data.jenisAlihStatus || 'Tunjangan Alih Status';
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa', lampiran: '-',
    halProgram: `Surat Pemberitahuan (SP) Pembayaran Manfaat\n${label.toUpperCase()}`,
    namaProgram: label.toUpperCase(),
    tanggal: data.tanggal || todayID(),
    tujuan: { nama: data.nama || '', nip: data.nrp || '', alamat: data.alamat || '', telp: data.telp || '' },
    rincian: {
      namaPeserta: data.nama || '', namaPenerima: data.namaPenerima || data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '', atasNamaRekening: data.atasNamaRekening || data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}AS`,
    },
    tabel: [
      { uraian: label, jumlah: data.nominalTunjangan || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.nominalTunjangan || data.jumlahPenerimaan || 0,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 10. SP BPI/S – Bantuan Pemakaman Istri/Suami
function generateSPBPIS(data) {
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa', lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nBANTUAN PEMAKAMAN ISTRI/SUAMI (BPI/S)',
    namaProgram: 'BANTUAN PEMAKAMAN ISTRI/SUAMI (BPI/S)',
    tanggal: data.tanggal || todayID(),
    tujuan: { nama: data.nama || '', nip: data.nrp || '', alamat: data.alamat || '', telp: data.telp || '' },
    rincian: {
      namaPeserta: data.nama || '', namaPenerima: data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '', atasNamaRekening: data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}BPIS`,
    },
    tabel: [
      { uraian: `Bantuan Pemakaman – ${data.namaIstriSuami || '-'}`, jumlah: data.nominalBPIS || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.nominalBPIS || data.jumlahPenerimaan || 0,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 11. SP BPA – Bantuan Pemakaman Anak
function generateSPBPA(data) {
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa', lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nBANTUAN PEMAKAMAN ANAK (BPA)',
    namaProgram: 'BANTUAN PEMAKAMAN ANAK (BPA)',
    tanggal: data.tanggal || todayID(),
    tujuan: { nama: data.nama || '', nip: data.nrp || '', alamat: data.alamat || '', telp: data.telp || '' },
    rincian: {
      namaPeserta: data.nama || '', namaPenerima: data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '', atasNamaRekening: data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}BPA`,
    },
    tabel: [
      { uraian: `Bantuan Pemakaman Anak – ${data.namaAnak || '-'}`, jumlah: data.nominalBPA || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.nominalBPA || data.jumlahPenerimaan || 0,
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// 12. SP BPPP – Bantuan Pemakaman Pensiun Pertama
function generateSPBPPP(data) {
  return buildSPHTML({
    nomor: data.nomorSP || '-',
    sifat: 'Biasa', lampiran: '-',
    halProgram: 'Surat Pemberitahuan (SP) Pembayaran Manfaat\nBANTUAN PEMAKAMAN PENSIUN (BPPP + UDW)',
    namaProgram: 'BANTUAN PEMAKAMAN PENSIUN (BPPP)',
    tanggal: data.tanggal || todayID(),
    tujuan: { nama: data.namaAhliWaris || data.nama || '', nip: data.nrp || '', alamat: data.alamat || '', telp: data.telp || '' },
    rincian: {
      namaPeserta: data.nama || '', namaPenerima: data.namaAhliWaris || data.nama || '',
      mitraKerja: data.mitraKerja || 'Unit Kerja BANK BJB di Seluruh Indonesia',
      noRekening: data.noRekening || data.rekening || '', atasNamaRekening: data.namaAhliWaris || data.nama || '',
      kodeBayar: data.kodeBayar || `${data.nrp || ''}BPPP`,
    },
    tabel: [
      { uraian: 'Bantuan Pemakaman Pensiun (BPPP)', jumlah: data.nominalBPPP || 0 },
      { uraian: 'Uang Duka Wafat (UDW)', jumlah: data.nominalUDW || 0 },
      { uraian: 'Jumlah Potongan', jumlah: data.potonganHutang || 0 },
    ],
    jumlahPenerimaan: data.jumlahPenerimaan || (Number(data.nominalBPPP || 0) + Number(data.nominalUDW || 0)),
    kakancab: {
      kancab: data.kancab || 'JAKARTA',
      jabatan: `KEPALA KANTOR CABANG UTAMA\nPT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}`,
      nama: data.namaKakancab || '',
    },
  });
}

// ---------------------------------------------------------------------------
// Surat Penolakan Klaim (tetap HTML, beda template)
// ---------------------------------------------------------------------------
function generateSuratPenolakan(data) {
  const tgl = data.tanggal || todayID();
  return `<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8">
<title>Surat Penolakan – ${data.noAgenda || ''}</title>
<style>
@page{size:A4;margin:20mm 20mm 15mm 25mm;}
body{font-family:'Times New Roman',Times,serif;font-size:11pt;color:#000;margin:0;padding:0;}
.kop{display:flex;align-items:flex-start;gap:14px;margin-bottom:20px;}
.kop img{width:72px;height:auto;}
.brand{font-size:22pt;font-weight:900;letter-spacing:2px;color:#003b8e;font-family:Arial,sans-serif;}
.surat-meta{display:flex;justify-content:space-between;margin-bottom:16px;}
.surat-meta table{border-collapse:collapse;}
.surat-meta td{padding:1px 4px;vertical-align:top;}
.tujuan{margin-bottom:16px;line-height:1.6;}
p{margin:0 0 12px 0;line-height:1.6;text-align:justify;}
ol{margin:0 0 12px 0;padding-left:28px;}
ol li{margin-bottom:4px;}
.ttd-area{display:flex;justify-content:flex-end;margin:28px 0 16px 0;}
.ttd-block{text-align:center;min-width:220px;}
.ttd-block .jabatan{font-weight:bold;line-height:1.5;margin-bottom:64px;}
.ttd-block .nama{font-weight:bold;text-decoration:underline;}
.page-footer{border-top:1px solid #000;padding-top:6px;display:flex;justify-content:space-between;font-size:9pt;margin-top:16px;}
</style></head><body>
<div class="kop">
  <img src="${ASABRI_LOGO_SRC}" alt="ASABRI">
  <div class="brand">ASABRI</div>
</div>
<div class="surat-meta">
  <table>
    <tr><td>Nomor</td><td>:</td><td>${data.nomorSurat || '-'}</td></tr>
    <tr><td>Sifat</td><td>:</td><td>Biasa</td></tr>
    <tr><td>Lampiran</td><td>:</td><td>-</td></tr>
    <tr><td style="vertical-align:top;">Hal</td><td style="vertical-align:top;">:</td><td>Surat Penolakan Klaim<br>No. Agenda: ${data.noAgenda || '-'}</td></tr>
  </table>
  <div>${tgl}</div>
</div>
<div class="tujuan">
  <div>Yth. Bapak/Ibu/Sdr/Sdri</div>
  <div><strong>${data.nama || ''}</strong></div>
  <div>${data.nrp || ''}</div>
</div>
<p>Berdasarkan hasil evaluasi pengajuan klaim manfaat Program ASABRI dengan No. Agenda <strong>${data.noAgenda || '-'}</strong> atas nama Bapak/Ibu/Sdr/Sdri <strong>${data.nama || ''}</strong>, dengan ini diberitahukan bahwa pengajuan klaim dimaksud <strong>DITOLAK</strong> dengan alasan sebagai berikut:</p>
<ol><li>${data.alasanPenolakan || '-'}</li></ol>
${data.dasarHukum ? `<p>Dasar Hukum: ${data.dasarHukum}</p>` : ''}
<p>Demikian disampaikan, atas perhatiannya diucapkan terima kasih.</p>
<div class="ttd-area">
  <div class="ttd-block">
    <div class="jabatan">KEPALA KANTOR CABANG UTAMA<br>PT ASABRI (PERSERO) ${(data.kancab || 'JAKARTA').toUpperCase()}</div>
    <div class="nama">${data.namaKakancab || ''}</div>
  </div>
</div>
<div class="page-footer">
  <div><strong>PT ASABRI (Persero)</strong><br>Jl. Mayjen Sutoyo No. 11, Jakarta Timur, 13630<br>DKI JAKARTA, 13630</div>
  <div>P : (021) 8094140<br>F : (021) 8094140</div>
  <div>www.asabri.co.id</div>
</div>
</body></html>`;
}

// ---------------------------------------------------------------------------
// SJP – bisa tetap pakai jsPDF karena formatnya berbeda
// (dipertahankan untuk backward-compat)
// ---------------------------------------------------------------------------
const { jsPDF } = window.jspdf || {};

function _oldHeaderASABRI(doc, judul) {
  doc.setFontSize(14); doc.setFont('helvetica','bold');
  doc.text('PT ASABRI (Persero)', 105, 15, { align:'center' });
  doc.setFontSize(11); doc.text(judul, 105, 23, { align:'center' });
  doc.line(10, 27, 200, 27); return 35;
}
function _oldFooter(doc, jabatan, nama) {
  doc.line(10,265,200,265); doc.setFontSize(9);
  doc.text('Dokumen diterbitkan elektronik oleh Sistem YANDU NG', 105, 270, { align:'center' });
  doc.text(jabatan, 160, 250, { align:'center' });
  doc.text(nama, 160, 258, { align:'center' });
}
function _addField(doc, label, value, y) {
  doc.setFont('helvetica','bold'); doc.setFontSize(9);
  doc.text(label, 15, y); doc.setFont('helvetica','normal');
  doc.text(`: ${value || '-'}`, 70, y); return y + 7;
}

function generateSJP(data) {
  if (!jsPDF) { alert('jsPDF belum dimuat.'); return null; }
  const doc = new jsPDF();
  let y = _oldHeaderASABRI(doc, 'SURAT JAMINAN PERAWATAN (SJP)');
  y = _addField(doc, 'Nomor SJP', data.nomorSJP, y);
  y = _addField(doc, 'Tanggal Terbit', data.tanggalTerbit, y);
  y = _addField(doc, 'Berlaku s.d', data.berlakuSd || '30 Hari', y);
  y = _addField(doc, 'Nama', data.nama, y);
  y = _addField(doc, 'NRP/NIP', data.nrp, y);
  y = _addField(doc, 'Pangkat', data.pangkat, y);
  y = _addField(doc, 'Kesatuan', data.kesatuan, y);
  y = _addField(doc, 'Provider/RS', data.provider, y);
  y = _addField(doc, 'Jenis Kejadian', data.jenisKejadian, y);
  y = _addField(doc, 'Diagnosa', data.diagnosa, y);
  y = _addField(doc, 'Kelas Rawat', data.kelasRawat, y);
  _oldFooter(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

function generateSJPP(data) {
  if (!jsPDF) return null;
  const doc = new jsPDF();
  let y = _oldHeaderASABRI(doc, 'SURAT PENOLAKAN JAMINAN PERAWATAN (SJPP)');
  y = _addField(doc, 'Nomor SJPP', data.nomorSJPP, y);
  y = _addField(doc, 'Tanggal', data.tanggal, y);
  y = _addField(doc, 'Nama Peserta', data.nama, y);
  y = _addField(doc, 'NRP/NIP', data.nrp, y);
  y = _addField(doc, 'Provider/RS', data.provider, y);
  y = _addField(doc, 'Jenis Kejadian', data.jenisKejadian, y);
  y += 5; doc.setFont('helvetica','bold'); doc.text('Alasan Penolakan:', 15, y); y += 7;
  doc.setFont('helvetica','normal'); doc.text(data.alasanPenolakan || '-', 15, y); y += 7;
  doc.text('Peserta dialihkan ke jaminan BPJS Kesehatan.', 15, y);
  _oldFooter(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

function generateAnalisaKlaim(data) {
  if (!jsPDF) return null;
  const doc = new jsPDF();
  let y = _oldHeaderASABRI(doc, 'ANALISA KLAIM JKK PERAWATAN');
  y = _addField(doc, 'Nomor Klaim', data.nomorKlaim, y);
  y = _addField(doc, 'Tanggal', data.tanggal, y);
  y = _addField(doc, 'Nama RS', data.namaRS, y);
  y = _addField(doc, 'Nama Peserta', data.namaPeserta, y);
  y = _addField(doc, 'NRP/NIP', data.nrp, y);
  y += 5; doc.setFont('helvetica','bold'); doc.text('Rincian Analisa:', 15, y); y += 7;
  doc.text('Jenis Layanan',15,y); doc.text('Diajukan',95,y); doc.text('Disetujui',135,y); doc.text('Selisih',170,y); y+=5;
  doc.line(15,y,195,y); y+=5; doc.setFont('helvetica','normal');
  (data.rincian || []).forEach(item => {
    doc.text(item.jenisLayanan||'-',15,y); doc.text(String(item.diajukan||'-'),95,y);
    doc.text(String(item.disetujui||'-'),135,y); doc.text(String(item.selisih||'-'),170,y); y+=7;
  });
  doc.line(15,y,195,y); y+=7;
  y = _addField(doc, 'Total Diajukan', data.totalDiajukan, y);
  y = _addField(doc, 'Total Disetujui', data.totalDisetujui, y);
  _oldFooter(doc, 'Verifikator Medis', data.namaVerifikator);
  return doc;
}

function generateSPRestitusi(data) {
  if (!jsPDF) return null;
  const doc = new jsPDF();
  let y = _oldHeaderASABRI(doc, 'SURAT PERINTAH BAYAR – RESTITUSI JKK PERAWATAN');
  y = _addField(doc,'Nomor SP Restitusi', data.nomorSP, y);
  y = _addField(doc,'Tanggal', data.tanggal, y);
  y = _addField(doc,'Nomor Klaim', data.nomorKlaim, y);
  y = _addField(doc,'Nama RS', data.namaRS, y);
  y = _addField(doc,'Bank', data.bank, y);
  y = _addField(doc,'Nomor Rekening', data.noRekening, y);
  y = _addField(doc,'Atas Nama', data.atasNama, y);
  y = _addField(doc,'Total Diajukan', data.totalDiajukan, y);
  y = _addField(doc,'Total Disetujui', data.totalDisetujui, y);
  _oldFooter(doc,'Kabid/Kadiv Layanan', data.namaKabid);
  return doc;
}

function generateRekapRestitusi(data) {
  if (!jsPDF) return null;
  const doc = new jsPDF();
  let y = _oldHeaderASABRI(doc,'REKAP RESTITUSI JKK PERAWATAN');
  y = _addField(doc,'No. SP Restitusi', data.nomorSP, y);
  y = _addField(doc,'Tanggal Terbit', data.tanggalTerbit, y);
  y = _addField(doc,'Nomor Klaim', data.nomorKlaim, y);
  y = _addField(doc,'RS / Provider', data.namaRS, y);
  y = _addField(doc,'Bank', data.bank, y);
  y = _addField(doc,'No. Rekening', data.noRekening, y);
  y = _addField(doc,'Atas Nama', data.atasNama, y);
  y = _addField(doc,'Total Diajukan', data.totalDiajukan, y);
  y = _addField(doc,'Total Disetujui', data.totalDisetujui, y);
  y = _addField(doc,'Selisih', data.selisih, y);
  y = _addField(doc,'Status Pembayaran', data.statusPembayaran || 'Menunggu Keuangan', y);
  _oldFooter(doc,'Kabid/Kadiv Layanan', data.namaKabid||'Kabid Layanan Kancab');
  return doc;
}

function generateMockUploadedDoc(title, detailText) {
  if (!jsPDF) return null;
  const doc = new jsPDF();
  doc.setFontSize(14); doc.setFont('helvetica','bold');
  doc.text('PT ASABRI (Persero) – ARSIP DIGITAL', 105, 20, { align:'center' });
  doc.line(10,25,200,25);
  doc.setFontSize(12); doc.text(title, 15, 40);
  doc.setFontSize(10); doc.setFont('helvetica','normal');
  doc.text('Dokumen ini merupakan salinan digital dari berkas yang diunggah oleh pemohon.', 15, 50);
  doc.text(`Keterangan Berkas: ${detailText}`, 15, 60);
  doc.rect(15,70,180,180);
  doc.setFont('helvetica','bold');
  doc.text('[ DOKUMEN PINDAIAN DIGITAL / SCANNED FILE ]', 105, 160, { align:'center' });
  _oldFooter(doc,'Pusat Data & Kearsipan','YANDU NG System');
  return doc;
}

// ---------------------------------------------------------------------------
// EXPORT – Preview & Download (SP → HTML tab baru; lainnya → jsPDF blob)
// ---------------------------------------------------------------------------
function previewPDF(doc) {
  if (!doc) return;
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
function downloadPDF(doc, filename) {
  if (!doc) return;
  doc.save(`${filename}.pdf`);
}

// HTML-based SP
function previewSPTHT(data)          { openSPWindow(generateSPTHT(data)); }
function previewSPPensiun(data)      { openSPWindow(generateSPPensiun(data)); }
function previewSPJKm(data)          { openSPWindow(generateSPJKm(data)); }
function previewSPJKK(data)          { openSPWindow(generateSPJKK(data)); }
function previewSPSantunanCacat(data){ openSPWindow(generateSPSantunanCacat(data)); }
function previewSPTunjanganCacat(data){ openSPWindow(generateSPTunjanganCacat(data)); }
function previewSPNTIP(data)         { openSPWindow(generateSPNTIP(data)); }
function previewSPTunjangan(data)    { openSPWindow(generateSPTunjangan(data)); }
function previewSPAlihStatus(data)   { openSPWindow(generateSPAlihStatus(data)); }
function previewSPBPIS(data)         { openSPWindow(generateSPBPIS(data)); }
function previewSPBPA(data)          { openSPWindow(generateSPBPA(data)); }
function previewSPBPPP(data)         { openSPWindow(generateSPBPPP(data)); }
function previewSuratPenolakan(data) { openSPWindow(generateSuratPenolakan(data)); }

// Download SP: print dialog → save as PDF (browser native)
function downloadSPTHT(data)          { openSPWindow(generateSPTHT(data)); }
function downloadSPPensiun(data)      { openSPWindow(generateSPPensiun(data)); }
function downloadSPJKm(data)          { openSPWindow(generateSPJKm(data)); }
function downloadSPJKK(data)          { openSPWindow(generateSPJKK(data)); }
function downloadSPSantunanCacat(data){ openSPWindow(generateSPSantunanCacat(data)); }
function downloadSPTunjanganCacat(data){ openSPWindow(generateSPTunjanganCacat(data)); }
function downloadSPNTIP(data)         { openSPWindow(generateSPNTIP(data)); }
function downloadSPTunjangan(data)    { openSPWindow(generateSPTunjangan(data)); }
function downloadSPAlihStatus(data)   { openSPWindow(generateSPAlihStatus(data)); }
function downloadSPBPIS(data)         { openSPWindow(generateSPBPIS(data)); }
function downloadSPBPA(data)          { openSPWindow(generateSPBPA(data)); }
function downloadSPBPPP(data)         { openSPWindow(generateSPBPPP(data)); }
function downloadSuratPenolakan(data) { openSPWindow(generateSuratPenolakan(data)); }

// jsPDF-based (tetap pakai preview blob)
function previewSJP(data)            { previewPDF(generateSJP(data)); }
function previewSJPP(data)           { previewPDF(generateSJPP(data)); }
function previewAnalisaKlaim(data)   { previewPDF(generateAnalisaKlaim(data)); }
function previewSPRestitusi(data)    { previewPDF(generateSPRestitusi(data)); }
function previewRekapRestitusi(data) { previewPDF(generateRekapRestitusi(data)); }
function previewUploadedDoc(t,d)     { previewPDF(generateMockUploadedDoc(t,d)); }
function downloadSJP(data)           { downloadPDF(generateSJP(data), `SJP-${data.nomorSJP}`); }
function downloadSJPP(data)          { downloadPDF(generateSJPP(data), `SJPP-${data.nomorSJPP}`); }
function downloadAnalisaKlaim(data)  { downloadPDF(generateAnalisaKlaim(data), `ANALISA-${data.nomorKlaim}`); }
function downloadSPRestitusi(data)   { downloadPDF(generateSPRestitusi(data), `SP-RES-${data.nomorSP}`); }
function downloadRekapRestitusi(data){ downloadPDF(generateRekapRestitusi(data), `REKAP-RES-${(data.nomorSP||'DOC').replace(/\//g,'-')}`); }
