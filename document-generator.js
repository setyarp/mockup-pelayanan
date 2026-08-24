const { jsPDF } = window.jspdf || {};

// ===== HELPER FUNCTIONS =====
function headerASABRI(doc, judulDokumen) {
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PT ASABRI (Persero)', 105, 15, { align: 'center' });
  doc.setFontSize(11);
  doc.text(judulDokumen, 105, 23, { align: 'center' });
  doc.line(10, 27, 200, 27);
  return 35; // return posisi Y selanjutnya
}

function footerASABRI(doc, jabatan, nama) {
  doc.line(10, 265, 200, 265);
  doc.setFontSize(9);
  doc.text('Dokumen ini diterbitkan secara elektronik oleh YANDU NG', 105, 270, { align: 'center' });
  doc.text(`${jabatan}`, 160, 250, { align: 'center' });
  doc.text(`${nama}`, 160, 258, { align: 'center' });
}

function addField(doc, label, value, y) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(`${label}`, 15, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${value || '-'}`, 70, y);
  return y + 7;
}

function previewPDF(doc) {
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}

function downloadPDF(doc, filename) {
  doc.save(`${filename}.pdf`);
}

// ===== 1. SP THT =====
function generateSPTHT(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - TABUNGAN HARI TUA (THT)');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Pangkat', data.pangkat, y);
  y = addField(doc, 'Jenis Manfaat', 'Tabungan Asuransi (TA)', y);
  y = addField(doc, 'Nominal Bruto', data.nominalBruto, y);
  y = addField(doc, 'Potongan Hutang', data.potonganHutang, y);
  y = addField(doc, 'Nominal Netto', data.nominalNetto, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 2. SP PENSIUN =====
function generateSPPensiun(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - PENSIUN PERTAMA');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Pangkat', data.pangkat, y);
  y = addField(doc, 'TMT Pensiun', data.tmtPensiun, y);
  y = addField(doc, 'Nomor SKEP', data.nomorSkep, y);
  y = addField(doc, 'Pensiun Pokok', data.penspok, y);
  y = addField(doc, 'Tunjangan Istri', data.tunjanganIstri, y);
  y = addField(doc, 'Tunjangan Anak', data.tunjanganAnak, y);
  y = addField(doc, 'Potongan Hutang', data.potonganHutang, y);
  y = addField(doc, 'Total Pensiun', data.totalPensiun, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 3. SURAT PENOLAKAN =====
function generateSuratPenolakan(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PENOLAKAN KLAIM');
  y = addField(doc, 'Nomor Surat', data.nomorSurat, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Jenis Kejadian', data.jenisKejadian, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Alasan Penolakan:', 15, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(data.alasanPenolakan || '-', 15, y);
  y += 10;
  doc.text('Dasar Hukum:', 15, y);
  y += 7;
  doc.text(data.dasarHukum || '-', 15, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 4. SJP =====
function generateSJP(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT JAMINAN PERAWATAN (SJP)');
  y = addField(doc, 'Nomor SJP', data.nomorSJP, y);
  y = addField(doc, 'Tanggal Terbit', data.tanggalTerbit, y);
  y = addField(doc, 'Berlaku s.d', data.berlakuSd, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Data Peserta:', 15, y);
  y += 7;
  y = addField(doc, 'Nama', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Pangkat', data.pangkat, y);
  y = addField(doc, 'Kesatuan', data.kesatuan, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Data Perawatan:', 15, y);
  y += 7;
  y = addField(doc, 'Provider/RS', data.provider, y);
  y = addField(doc, 'Jenis Kejadian', data.jenisKejadian, y);
  y = addField(doc, 'Diagnosa', data.diagnosa, y);
  y = addField(doc, 'Kelas Rawat', data.kelasRawat, y);
  y = addField(doc, 'Tgl Mulai Rawat', data.tglMulaiRawat, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 5. SJPP (Surat Penolakan Jaminan) =====
function generateSJPP(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PENOLAKAN JAMINAN PERAWATAN (SJPP)');
  y = addField(doc, 'Nomor SJPP', data.nomorSJPP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Provider/RS', data.provider, y);
  y = addField(doc, 'Jenis Kejadian', data.jenisKejadian, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Alasan Penolakan:', 15, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(data.alasanPenolakan || '-', 15, y);
  y += 10;
  doc.text('Peserta dialihkan ke jaminan BPJS Kesehatan.', 15, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 6. ANALISA KLAIM =====
function generateAnalisaKlaim(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'ANALISA KLAIM JKK PERAWATAN');
  y = addField(doc, 'Nomor Klaim', data.nomorKlaim, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nama RS', data.namaRS, y);
  y = addField(doc, 'Nama Peserta', data.namaPeserta, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Rincian Analisa:', 15, y);
  y += 7;
  // Tabel rincian
  doc.setFont('helvetica', 'bold');
  doc.text('Jenis Layanan', 15, y);
  doc.text('Diajukan', 95, y);
  doc.text('Disetujui', 135, y);
  doc.text('Selisih', 170, y);
  y += 5;
  doc.line(15, y, 195, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  if (data.rincian && data.rincian.length > 0) {
    data.rincian.forEach(item => {
      doc.text(item.jenisLayanan || '-', 15, y);
      doc.text(String(item.diajukan || '-'), 95, y);
      doc.text(String(item.disetujui || '-'), 135, y);
      doc.text(String(item.selisih || '-'), 170, y);
      y += 7;
    });
  } else {
    doc.text('Tidak ada rincian kwitansi', 15, y);
    y += 7;
  }
  doc.line(15, y, 195, y);
  y += 7;
  y = addField(doc, 'Total Diajukan', data.totalDiajukan, y);
  y = addField(doc, 'Total Disetujui', data.totalDisetujui, y);
  y = addField(doc, 'Total Selisih', data.totalSelisih, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Item Tidak Dijamin:', 15, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  if (data.itemTidakDijamin && data.itemTidakDijamin.length > 0) {
    data.itemTidakDijamin.forEach(item => {
      doc.text(`• ${item.nama || '-'}: ${item.alasan || '-'}`, 15, y);
      y += 7;
    });
  } else {
    doc.text('None', 15, y);
    y += 7;
  }
  footerASABRI(doc, 'Verifikator Medis', data.namaVerifikator);
  return doc;
}

// ===== 7. SP RESTITUSI =====
function generateSPRestitusi(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - RESTITUSI JKK PERAWATAN');
  y = addField(doc, 'Nomor SP Restitusi', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Klaim', data.nomorKlaim, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Data RS Pengaju:', 15, y);
  y += 7;
  y = addField(doc, 'Nama RS', data.namaRS, y);
  y = addField(doc, 'Bank', data.bank, y);
  y = addField(doc, 'Nomor Rekening', data.noRekening, y);
  y = addField(doc, 'Atas Nama', data.atasNama, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Rincian Pembayaran:', 15, y);
  y += 7;
  y = addField(doc, 'Total Diajukan', data.totalDiajukan, y);
  y = addField(doc, 'Total Disetujui', data.totalDisetujui, y);
  y = addField(doc, 'Selisih', data.selisih, y);
  y = addField(doc, 'Alasan Selisih', data.alasanSelisih, y);
  footerASABRI(doc, 'Kabid/Kadiv Layanan', data.namaKabid);
  return doc;
}

// ===== 8. MOCK UPLOADED DOCUMENTS PREVIEW =====
function generateMockUploadedDoc(title, detailText) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PT ASABRI (Persero) - ARSIP DIGITAL', 105, 20, { align: 'center' });
  doc.line(10, 25, 200, 25);
  
  doc.setFontSize(12);
  doc.text(title, 15, 40);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Dokumen ini merupakan salinan digital dari berkas yang diunggah oleh pemohon.', 15, 50);
  doc.text(`Keterangan Berkas: ${detailText}`, 15, 60);
  
  // Draw a big box simulating a scanned document page
  doc.rect(15, 70, 180, 180);
  doc.setFont('helvetica', 'bold');
  doc.text('[ DOKUMEN PINDAIAN DIGITAL / SCANNED FILE ]', 105, 160, { align: 'center' });
  
  footerASABRI(doc, 'Pusat Data & Kearsipan', 'YANDU NG System');
  return doc;
}

function previewUploadedDoc(title, detailText) {
  previewPDF(generateMockUploadedDoc(title, detailText));
}

// ===== 9. SP TUNJANGAN TERBATAS =====
function generateSPTunjangan(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - TUNJANGAN TERBATAS');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Nominal Tunjangan', data.nominalTunjangan, y);
  y = addField(doc, 'Berlaku s.d', data.berlakuSd, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 10. SP NTIP =====
function generateSPNTIP(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - NILAI TUNAI IURAN PENSIUN (NTIP)');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'TMT Pemberhentian', data.tmtPemberhentian, y);
  y = addField(doc, 'TMT Gaji Terakhir', data.tmtGajiTerakhir, y);
  y = addField(doc, 'Nominal NTIP', data.nominalNTIP, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 11. SP JKm (Meninggal Dinas Aktif) =====
function generateSPJKm(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - JAMINAN KEMATIAN (JKm)');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Nama Ahli Waris', data.namaAhliWaris, y);
  y = addField(doc, 'SKS', data.nominalSKS, y);
  y = addField(doc, 'UDW', data.nominalUDW, y);
  y = addField(doc, 'Biaya Pemakaman', data.biayaPemakaman || '-', y);
  y = addField(doc, 'Beasiswa JKm', data.beasiswaJKm || '-', y);
  y = addField(doc, 'Total JKm', data.totalJKm, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 12. SP JKK (KK Meninggal) =====
function generateSPJKK(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - JAMINAN KECELAKAAN KERJA (JKK)');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'SRKK', data.nominalSRKK, y);
  y = addField(doc, 'Biaya Angkut', data.biayaAngkut || '-', y);
  y = addField(doc, 'Beasiswa JKK', data.beasiswaJKK || '-', y);
  y = addField(doc, 'Total JKK', data.totalJKK, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 13. SP SANTUNAN CACAT =====
function generateSPSantunanCacat(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - SANTUNAN CACAT');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Golongan Cacat', data.golonganCacat, y);
  y = addField(doc, 'Tingkat Cacat', data.tingkatCacat, y);
  y = addField(doc, 'Persentase Cacat', data.persentaseCacat, y);
  y = addField(doc, 'Nominal Santunan', data.nominalSantunan, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 14. SP TUNJANGAN CACAT =====
function generateSPTunjanganCacat(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - TUNJANGAN CACAT');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Golongan Cacat', data.golonganCacat, y);
  y = addField(doc, 'Nominal Tunjangan Cacat', data.nominalTunjanganCacat, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 15. SP BPI/S (Istri/Suami Meninggal) =====
function generateSPBPIS(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - BANTUAN PEMAKAMAN ISTRI/SUAMI');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Nama Istri/Suami', data.namaIstriSuami, y);
  y = addField(doc, 'Nominal BPI/S', data.nominalBPIS, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 16. SP BPA (Anak Meninggal) =====
function generateSPBPA(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - BANTUAN PEMAKAMAN ANAK');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Nama Anak', data.namaAnak, y);
  y = addField(doc, 'Nominal BPA', data.nominalBPA, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 17. SP BPPP (Pensiun Sendiri Meninggal) =====
function generateSPBPPP(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - BANTUAN PEMAKAMAN PENSIUN PERTAMA');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nomor Agenda', data.noAgenda, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Nominal BPPP', data.nominalBPPP, y);
  y = addField(doc, 'UDW', data.nominalUDW, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 18. SP UDW =====
function generateSPUDW(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'SURAT PERINTAH BAYAR - UANG DUKA WAFAT (UDW)');
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Nama Ahli Waris', data.namaAhliWaris, y);
  y = addField(doc, 'Nominal UDW', data.nominalUDW, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== 19. SP Alih Status =====
function generateSPAlihStatus(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, `SURAT PERINTAH BAYAR - ALIH STATUS ${data.jenisAlihStatus ? data.jenisAlihStatus.toUpperCase() : 'TUNJANGAN'}`);
  y = addField(doc, 'Nomor SP', data.nomorSP, y);
  y = addField(doc, 'Tanggal', data.tanggal, y);
  y = addField(doc, 'Nama Peserta', data.nama, y);
  y = addField(doc, 'NRP/NIP', data.nrp, y);
  y = addField(doc, 'Jenis Alih Status', data.jenisAlihStatus || 'Tunjangan Yatim/Piatu', y);
  y = addField(doc, 'Nominal Tunjangan', data.nominalTunjangan, y);
  y = addField(doc, 'Rekening', data.rekening, y);
  y = addField(doc, 'Mitra Bayar', data.mitraBayar, y);
  footerASABRI(doc, 'Kepala Kantor Cabang', data.namaKakancab);
  return doc;
}

// ===== EXPORT FUNCTIONS =====
// Preview
function previewSPTHT(data) { previewPDF(generateSPTHT(data)); }
function previewSPPensiun(data) { previewPDF(generateSPPensiun(data)); }
function previewSuratPenolakan(data) { previewPDF(generateSuratPenolakan(data)); }
function previewSJP(data) { previewPDF(generateSJP(data)); }
function previewSJPP(data) { previewPDF(generateSJPP(data)); }
function previewAnalisaKlaim(data) { previewPDF(generateAnalisaKlaim(data)); }
function previewSPRestitusi(data) { previewPDF(generateSPRestitusi(data)); }
function previewSPTunjangan(data) { previewPDF(generateSPTunjangan(data)); }
function previewSPNTIP(data) { previewPDF(generateSPNTIP(data)); }
function previewSPJKm(data) { previewPDF(generateSPJKm(data)); }
function previewSPJKK(data) { previewPDF(generateSPJKK(data)); }
function previewSPSantunanCacat(data) { previewPDF(generateSPSantunanCacat(data)); }
function previewSPTunjanganCacat(data) { previewPDF(generateSPTunjanganCacat(data)); }
function previewSPBPIS(data) { previewPDF(generateSPBPIS(data)); }
function previewSPBPA(data) { previewPDF(generateSPBPA(data)); }
function previewSPBPPP(data) { previewPDF(generateSPBPPP(data)); }
function previewSPUDW(data) { previewPDF(generateSPUDW(data)); }
function previewSPAlihStatus(data) { previewPDF(generateSPAlihStatus(data)); }

// Download
function downloadSPTHT(data) { downloadPDF(generateSPTHT(data), `SP-THT-${data.nomorSP}`); }
function downloadSPPensiun(data) { downloadPDF(generateSPPensiun(data), `SP-PEN-${data.nomorSP}`); }
function downloadSuratPenolakan(data) { downloadPDF(generateSuratPenolakan(data), `SP-TOL-${data.nomorSurat}`); }
function downloadSJP(data) { downloadPDF(generateSJP(data), `SJP-${data.nomorSJP}`); }
function downloadSJPP(data) { downloadPDF(generateSJPP(data), `SJPP-${data.nomorSJPP}`); }
function downloadAnalisaKlaim(data) { downloadPDF(generateAnalisaKlaim(data), `ANALISA-${data.nomorKlaim}`); }
function downloadSPRestitusi(data) { downloadPDF(generateSPRestitusi(data), `SP-RES-${data.nomorSP}`); }
function downloadSPTunjangan(data) { downloadPDF(generateSPTunjangan(data), `SP-TUJ-${data.nomorSP}`); }
function downloadSPNTIP(data) { downloadPDF(generateSPNTIP(data), `SP-NTIP-${data.nomorSP}`); }
function downloadSPJKm(data) { downloadPDF(generateSPJKm(data), `SP-JKm-${data.nomorSP}`); }
function downloadSPJKK(data) { downloadPDF(generateSPJKK(data), `SP-JKK-${data.nomorSP}`); }
function downloadSPSantunanCacat(data) { downloadPDF(generateSPSantunanCacat(data), `SP-CACAT-${data.nomorSP}`); }
function downloadSPTunjanganCacat(data) { downloadPDF(generateSPTunjanganCacat(data), `SP-TUJ-CACAT-${data.nomorSP}`); }
function downloadSPBPIS(data) { downloadPDF(generateSPBPIS(data), `SP-BPIS-${data.nomorSP}`); }
function downloadSPBPA(data) { downloadPDF(generateSPBPA(data), `SP-BPA-${data.nomorSP}`); }
function downloadSPBPPP(data) { downloadPDF(generateSPBPPP(data), `SP-BPPP-${data.nomorSP}`); }
function downloadSPUDW(data) { downloadPDF(generateSPUDW(data), `SP-UDW-${data.nomorSP}`); }
function downloadSPAlihStatus(data) { downloadPDF(generateSPAlihStatus(data), `SP-ALIH-${data.nomorSP}`); }

// ===== 20. REKAP RESTITUSI =====
function generateRekapRestitusi(data) {
  const doc = new jsPDF();
  let y = headerASABRI(doc, 'REKAP RESTITUSI JKK PERAWATAN');
  y = addField(doc, 'No. SP Restitusi', data.nomorSP, y);
  y = addField(doc, 'Tanggal Terbit', data.tanggalTerbit, y);
  y = addField(doc, 'Nomor Klaim', data.nomorKlaim, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Data Penerima:', 15, y);
  y += 7;
  y = addField(doc, 'RS / Provider', data.namaRS, y);
  y = addField(doc, 'Bank', data.bank, y);
  y = addField(doc, 'No. Rekening', data.noRekening, y);
  y = addField(doc, 'Atas Nama', data.atasNama, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.text('Rincian Pembayaran:', 15, y);
  y += 7;
  y = addField(doc, 'Total Diajukan', data.totalDiajukan, y);
  y = addField(doc, 'Total Disetujui', data.totalDisetujui, y);
  y = addField(doc, 'Selisih', data.selisih, y);
  y += 5;
  y = addField(doc, 'Status Pembayaran', data.statusPembayaran || 'Menunggu Keuangan', y);
  footerASABRI(doc, 'Kabid/Kadiv Layanan', data.namaKabid || 'Kabid Layanan Kancab');
  return doc;
}

function previewRekapRestitusi(data) { previewPDF(generateRekapRestitusi(data)); }
function downloadRekapRestitusi(data) { downloadPDF(generateRekapRestitusi(data), `REKAP-RES-${(data.nomorSP || 'DOC').replace(/\//g, '-')}`); }
