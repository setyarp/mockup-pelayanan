// =============================================================================
//  PERAWATAN JAMINAN - DOCUMENT BUILDERS (SJP / STJP)
//
//  Layout mengikuti template Word:
//    Surat_Jaminan_Perawatan_SJP.docx
//    Surat_Penolakan_Jaminan_Perawatan_STJP.docx
//
//  Spesifikasi yang diambil dari docx:
//    - Kertas Letter (8.5" x 11"), margin 1" keliling
//    - Font Times New Roman 10pt; judul bold 13pt; footer 8pt
//    - Logo header 1.78" x 0.7"
//    - Ornamen sudut footer sementara dimatikan (asetnya masih di surat-assets.js)
//    - Tabel data tanpa garis, 6 kolom: 20.4% / 2.2% / 26.4% / 24.4% / 2.2% / 24.4%
//    - Tabel footer tanpa garis, 3 kolom: 42.9% / 36.7% / 20.4%
//
//  File ini sengaja dipisah dari perawatan-jaminan.html: template literal di
//  sini berisi markup HTML mentah (komentar, <!DOCTYPE>). Kalau ditulis inline
//  di dalam <script> halaman, parser HTML bisa menutup tag script lebih awal
//  dan sisa kode JS ikut ter-render sebagai teks.
//
//  Bergantung pada global dari perawatan-jaminan.html:
//    selectedItem, listJaminanMaster, getNomorDokumen(), getNamaKakancab()
//  Dan dari surat-assets.js: SURAT_LOGO_SRC
// =============================================================================

const SURAT_FONT = "'Times New Roman', Times, serif";
// Kotak halaman meniru sectPr docx: Letter 8.5" x 11", margin 1" keliling.
// Padding ditaruh di dalam elemen (bukan lewat opsi margin html2pdf) karena
// html2pdf merender container selebar satu halaman penuh lalu menempelkannya
// ke dalam area di dalam margin -- kalau margin diisi, seluruh isi ikut
// mengecil sebesar (lebar halaman - 2*margin)/lebar halaman.
const SURAT_TINGGI_HALAMAN = '11in';
const SURAT_MARGIN_HALAMAN = '1in';

const SURAT_CATATAN_SJP = [
  'Tidak menjamin biaya pemeriksaan dan pengobatan Covid-19, obat mengandung Suplemen, Vitamin/ Multivitamin, dan/atau mengandung herbal .',
  'Bila ditemukan kasus kejadian kecelakaan dan/atau diagnosa penyakit yang termasuk dalam pengecualian program JKK dari hasil verifikasi pengajuan klaim, maka surat jaminan ini dapat dibatalkan.',
  'Biaya rehabilitasi medis, ortosis dan/atau prostesis, penggantian gigi tiruan, dan ambulans dijamin sesuai batasan yang ditetapkan dalam peraturan yang berlaku.'
];

const SURAT_BULAN_PANJANG = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function suratEscape(v) {
  if (v === undefined || v === null || v === '') return '';
  return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function suratTanggalHariIni() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')} ${SURAT_BULAN_PANJANG[d.getMonth()]} ${d.getFullYear()},`;
}

// Nilai sel di-escape, tapi <br> yang sengaja kita sisipkan tetap dipertahankan.
function suratNilai(v) {
  return suratEscape(v).replace(/&lt;br&gt;/g, '<br>');
}

// Satu baris tabel data: label kiri : nilai kiri | label kanan : nilai kanan.
// Kolom kanan dibiarkan kosong kalau labelKanan tidak diisi (mengikuti docx).
function suratBarisData(labelKiri, nilaiKiri, labelKanan, nilaiKanan) {
  const td = 'padding:1.5px 0; vertical-align:top; overflow-wrap:break-word; word-break:break-word;';
  const sel = labelKanan
    ? `<td style="${td} width:24.4%;">${suratEscape(labelKanan)}</td>
        <td style="${td} width:2.2%;">:</td>
        <td style="${td} width:24.4%;">${suratNilai(nilaiKanan)}</td>`
    : `<td style="${td} width:24.4%;"></td>
        <td style="${td} width:2.2%;"></td>
        <td style="${td} width:24.4%;"></td>`;
  return `<tr>
        <td style="${td} width:20.4%;">${suratEscape(labelKiri)}</td>
        <td style="${td} width:2.2%;">:</td>
        <td style="${td} width:26.4%;">${suratNilai(nilaiKiri)}</td>
        ${sel}
      </tr>`;
}

// ---------------------------------------------------------------------------
// Badan surat. Dipakai bersama oleh modal preview dan file PDF, supaya apa yang
// dilihat di layar persis sama dengan yang terunduh.
// ---------------------------------------------------------------------------
function buildSuratBodyHtml(item, isSpjp, docNo, kakancabNama) {
  const alasanPenolakan = sessionStorage.getItem('catatan_kancab_jaminan')
    || item.dasarPenolakan
    || 'Tidak memenuhi kriteria kelayakan JKK.';

  const judul = isSpjp
    ? 'SURAT PENOLAKAN JAMINAN PERAWATAN (STJP)'
    : 'SURAT JAMINAN PERAWATAN (SJP)';
  const pembuka = isSpjp
    ? 'PT ASABRI (Persero) menyatakan bahwa tidak menjamin biaya perawatan Peserta ASABRI di bawah ini'
    : 'PT ASABRI (Persero) menyatakan bahwa menjamin biaya perawatan Peserta ASABRI di bawah ini';

  // Digabung tapi dipatahkan sendiri: kalau dibiarkan satu baris, string ini
  // lebih lebar dari kolomnya dan menabrak kolom kanan.
  const ktpaNrp = `${item.ktpa || '-'}/<br>${item.nrpNip || '-'}`;

  const baris = isSpjp
    ? [
        ['Nomor STJP', docNo, 'Nama RS', item.provider],
        ['Tanggal Pengajuan', item.tglPengajuan, 'Alamat', item.alamatRs],
        ['No. KTPA/NRP/NIP', ktpaNrp, 'No. Telepon', item.telpRs],
        ['Nama', item.namaPeserta, 'Dasar Penolakan', alasanPenolakan],
        ['Tanggal Lahir', item.tglLahir, '', ''],
        ['Jenis Kelamin', item.jenisKelamin, '', ''],
        ['Pangkat', item.pangkat, '', ''],
        ['Kesatuan', item.kesatuan, '', ''],
        ['Unit Organisasi', item.UNOR, '', ''],
        ['No. Telepon', item.noTelp, '', '']
      ]
    : [
        ['Nomor SJP', docNo, 'Provider', item.provider],
        ['Tanggal Pengajuan', item.tglPengajuan, 'Tanggal Mulai Rawat', item.tglMulaiRawat],
        ['KTPA/NRP/NIP', ktpaNrp, 'Diagnosa', item.diagnosa],
        ['Nama', item.namaPeserta, '', ''],
        ['Tanggal Lahir', item.tglLahir, 'Periode Jaminan', item.periodeJaminan],
        ['Jenis Kelamin', item.jenisKelamin, 'COB', item.cob],
        ['Pangkat', item.pangkat, 'SJP ke', item.sjpKe],
        ['Kesatuan', item.kesatuan, 'Jenis Rawat Saat Ini', item.jenisRawatSaatIni],
        ['Unit Organisasi', item.UNOR, '', ''],
        ['No Telepon', item.noTelp, '', '']
      ];

  const tabelData = baris.map(b => suratBarisData(b[0], b[1], b[2], b[3])).join('\n');

  // Catatan hanya ada di template SJP, tidak di STJP.
  // Nomor ditulis sebagai teks di kolom sendiri, bukan lewat marker <ol>/<li>:
  // html2canvas tidak merender marker daftar, jadi di PDF nomornya akan hilang.
  const catatanBaris = SURAT_CATATAN_SJP.map((c, i) => `
          <tr>
            <td style="width:0.3in; vertical-align:top; padding:1px 0;">${i + 1}.</td>
            <td style="vertical-align:top; padding:1px 0; text-align:justify;">${suratEscape(c)}</td>
          </tr>`).join('');

  const catatan = isSpjp ? '' : `
      <div style="margin-top:22px;">
        <div>Catatan :</div>
        <table style="width:100%; margin-top:2px; border-collapse:collapse; table-layout:fixed;">
          <tbody>${catatanBaris}
          </tbody>
        </table>
      </div>`;

  return `
    <div style="width:100%; box-sizing:border-box; min-height:${SURAT_TINGGI_HALAMAN};
                padding:${SURAT_MARGIN_HALAMAN}; background:#ffffff; color:#000000;
                font-family:${SURAT_FONT}; font-size:10pt; line-height:1.45;
                display:flex; flex-direction:column;">

      <div>
      <div>
        <img src="${SURAT_LOGO_SRC}" alt="ASABRI" style="width:1.78in; height:0.7in;">
      </div>

      <div style="text-align:center; margin-top:26px;">
        <span style="font-size:13pt; font-weight:bold;">${suratEscape(judul)}</span>
      </div>

      <div style="margin-top:26px; text-align:justify;">${suratEscape(pembuka)}</div>

      <table style="width:100%; margin-top:12px; border-collapse:collapse; table-layout:fixed;">
        <tbody>
        ${tabelData}
        </tbody>
      </table>
      ${catatan}

      <div style="margin-top:34px; text-align:right;">
        <div>${suratEscape(suratTanggalHariIni())}</div>
        <div>PT ASABRI (PERSERO)</div>
        <div>Kepala Kantor Cabang${isSpjp ? '' : ' .....'}</div>
        <div style="height:0.85in;"></div>
        <div>${suratEscape(kakancabNama || '(Nama Kepala Kantor Cabang)')}</div>
      </div>

      </div>

      <div style="margin-top:auto; padding-top:0.5in;">
      <table style="width:100%; border-collapse:collapse; font-size:8pt;">
        <tbody>
          <tr>
            <td style="width:42.9%; vertical-align:top;">
              PT ASABRI (Persero)<br>Jl. Mayjen Sutoyo No. 11 Jakarta 13630
            </td>
            <td style="width:36.7%; vertical-align:top;">
              P: 021 8 094 140<br>F: 021 8 012 313
            </td>
            <td style="width:20.4%; vertical-align:top;">asabri@asabri.co.id</td>
          </tr>
        </tbody>
      </table>

      </div>
    </div>`;
}

// ---------------------------------------------------------------------------
// Dokumen HTML utuh (untuk unduh PDF / jendela cetak).
// Semua style inline, tidak menarik CSS dari CDN, supaya hasil render tidak
// bergantung pada jaringan dan tidak bergeser saat di-snapshot html2canvas.
// ---------------------------------------------------------------------------
function buildStandaloneDocHtml(item, isSpjp, docNo, kakancabNama) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>${suratEscape(docNo)}</title>
<style>
  @page { size: Letter; margin: 0; }
  html, body { margin:0; padding:0; background:#ffffff; }
  body { font-family:${SURAT_FONT}; font-size:10pt; color:#000000; }
  table { border-collapse:collapse; }
  ol { margin:0; }
</style>
</head>
<body>
${buildSuratBodyHtml(item, isSpjp, docNo, kakancabNama)}
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Modal preview di halaman.
// ---------------------------------------------------------------------------
function previewSuratOfficial(tipe) {
  const item = selectedItem || listJaminanMaster[0];
  const isSpjp = (tipe === 'SPJP');
  const docNo = getNomorDokumen(item, isSpjp);
  const kakancabNama = getNamaKakancab();

  const modalTitle = isSpjp
    ? 'Preview Surat Penolakan Jaminan Perawatan (STJP)'
    : 'Preview Surat Jaminan Perawatan (SJP)';

  const htmlContent = `
    <div style="background:#ffffff; box-shadow:0 1px 3px rgba(15,23,42,.18);">
      ${buildSuratBodyHtml(item, isSpjp, docNo, kakancabNama)}
    </div>`;

  document.getElementById('modal-doc-official-title').innerText = modalTitle;
  document.getElementById('modal-doc-official-body').innerHTML = htmlContent;
  document.getElementById('modal-doc-official').classList.remove('hidden');
}
