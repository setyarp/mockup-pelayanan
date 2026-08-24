// Single Source of Truth - Mock Data for ASABRI YANDU NG

const SERVICES_DATA = [
  {
    id: "registrasi",
    code: "1",
    title: "Pelayanan Registrasi Klaim Peserta",
    path: ["registrasi"],
    description: "Layanan registrasi bagi peserta baru ASABRI untuk pencatatan kepesertaan, penerbitan Kartu Tanda Peserta ASABRI (KTPA), dan pendataan awal keluarga.",
    requirements: [
      "Fotokopi KTP / Identitas Diri yang berlaku",
      "Fotokopi Surat Keputusan (SK) Pengangkatan Pertama sebagai Prajurit TNI / Anggota POLRI / PNS Kemhan / PNS POLRI",
      "Surat Keterangan Penghasilan (SKP) / Slip Gaji terakhir",
      "Fotokopi Kartu Tanda Anggota (KTA) atau Kartu Pegawai (KARPEG)",
      "Fotokopi Surat Nikah (jika sudah menikah)",
      "Fotokopi Akta Kelahiran Anak (jika memiliki anak)"
    ],
    steps: [
      "Mengisi Formulir Pendaftaran Peserta Baru secara lengkap",
      "Mengunggah dokumen identitas dan SK pengangkatan pertama",
      "Verifikasi data dan kelengkapan dokumen oleh petugas ASABRI",
      "Persetujuan (Approval) kepesertaan oleh administrator",
      "Penerbitan dan pengunduhan Kartu Tanda Peserta ASABRI (KTPA) digital"
    ],
    formFields: [
      { id: "reg_nama", label: "Nama Lengkap Sesuai KTP", type: "text", placeholder: "Contoh: Adm. Wirata Atmaja", required: true },
      { id: "reg_nrp", label: "NRP / NIP / NIK", type: "text", placeholder: "Contoh: 198904211101", required: true },
      { id: "reg_pangkat", label: "Pangkat / Golongan", type: "text", placeholder: "Contoh: Mayor Inf / Golongan III/b", required: true },
      { id: "reg_satker", label: "Satuan Kerja / Instansi", type: "text", placeholder: "Contoh: Kodam Jaya / Polda Metro Jaya", required: true },
      { id: "reg_tmt", label: "TMT Pengangkatan", type: "date", required: true }
    ]
  },
  {
    id: "pensiun_pertama",
    code: "2",
    title: "Pelayanan Pensiun Pertama & e-SKPP",
    path: ["pensiun_pertama"],
    description: "Layanan pengajuan pembayaran pensiun pertama kali bagi militer/PNS yang memasuki masa purnabakti, terintegrasi dengan e-SKPP (Surat Keterangan Penghentian Pembayaran) elektronik.",
    requirements: [
      "Surat Keputusan (SK) Pensiun dari Panglima TNI / Kapolri / KAS / Kepala Badan Kepegawaian Negara",
      "Dokumen e-SKPP (Surat Keterangan Penghentian Pembayaran) asli/digital dari instansi asal",
      "Daftar Susunan Keluarga (DSK) yang disahkan oleh kelurahan/kecamatan",
      "Pasfoto terbaru pemohon (ukuran 3x4)",
      "Fotokopi KTP dan Buku Rekening Bank penerima pensiun"
    ],
    steps: [
      "Memasukkan nomor e-SKPP atau mengunggah file e-SKPP digital",
      "Melengkapi data diri dan susunan keluarga",
      "Mengunggah berkas SK Pensiun dan rekening bank",
      "Proses validasi dan sinkronisasi data dengan sistem instansi asal",
      "Persetujuan nominal pensiun pertama dan jadwal pencairan"
    ],
    formFields: [
      { id: "pen_sk_pensiun", label: "Nomor SK Pensiun", type: "text", placeholder: "Contoh: SKEP/124/III/2026", required: true },
      { id: "pen_no_skpp", label: "Nomor e-SKPP", type: "text", placeholder: "Contoh: SKPP-2026-08972", required: true },
      { id: "pen_tmt_pensiun", label: "TMT Pensiun", type: "date", required: true },
      { id: "pen_bank", label: "Bank Pembayar Pensiun", type: "select", options: ["Bank Mandiri Taspen", "Bank BRI", "Bank BNI", "PT Pos Indonesia", "Bank BJB"], required: true },
      { id: "pen_norek", label: "Nomor Rekening", type: "text", placeholder: "Contoh: 124000876123", required: true }
    ]
  },
  {
    id: "klaim",
    code: "3",
    title: "Peserta Klaim",
    path: ["klaim"],
    description: "Pusat pelayanan klaim jaminan hari tua, jaminan kecelakaan kerja, jaminan kematian, dan tunjangan berkala bagi peserta aktif maupun pensiunan ASABRI.",
    children: [
      {
        id: "klaim_aktif",
        code: "1",
        title: "1. Peserta Klaim Aktif",
        path: ["klaim", "klaim_aktif"],
        description: "Pengajuan klaim asuransi dan jaminan oleh atau untuk peserta ASABRI yang statusnya masih aktif berdinas saat terjadi peristiwa klaim.",
        children: [
          {
            id: "klaim_aktif_pensiun",
            code: "i",
            title: "Pensiun",
            path: ["klaim", "klaim_aktif", "klaim_aktif_pensiun"],
            description: "Klaim manfaat Tabungan Hari Tua (THT) bagi peserta aktif yang diberhentikan dengan hak pensiun.",
            requirements: [
              "Kartu Tanda Peserta ASABRI (KTPA) asli",
              "Surat Keputusan (SK) Pensiun",
              "KTP Pemohon & Buku Rekening Bank",
              "Surat Keterangan Penghentian Pembayaran (SKPP) gaji"
            ],
            steps: ["Pengajuan berkas klaim THT", "Verifikasi masa iuran", "Perhitungan nilai tunai THT", "Transfer ke rekening penerima"]
          },
          {
            id: "klaim_aktif_berhenti_tunjangan",
            code: "ii",
            title: "Berhenti dengan Hak Tunjangan",
            path: ["klaim", "klaim_aktif", "klaim_aktif_berhenti_tunjangan"],
            description: "Klaim manfaat Tabungan Hari Tua (THT) bagi peserta aktif yang berhenti dengan hak tunjangan berkala.",
            requirements: [
              "Kartu Tanda Peserta ASABRI (KTPA) asli",
              "Surat Keputusan Pemberhentian dengan Hak Tunjangan",
              "KTP & Buku Rekening Bank"
            ],
            steps: ["Unggah dokumen klaim", "Verifikasi status kepesertaan", "Perhitungan nominal klaim", "Pemberian dana via bank mitra"]
          },
          {
            id: "klaim_aktif_berhenti_tanpa_pensiun",
            code: "iii",
            title: "Berhenti Tanpa Hak Pensiun",
            path: ["klaim", "klaim_aktif", "klaim_aktif_berhenti_tanpa_pensiun"],
            description: "Pengembalian Nilai Tunai Iuran Pensiun (NTIP) bagi peserta aktif yang berhenti/diberhentikan tanpa hak pensiun/tunjangan.",
            requirements: [
              "Kartu Tanda Peserta ASABRI (KTPA) asli",
              "Surat Keputusan Pemberhentian Tanpa Hak Pensiun",
              "KTP Pemohon",
              "Surat Pengembalian Iuran dari instansi asal"
            ],
            steps: ["Pengajuan klaim NTIP", "Perhitungan akumulasi nilai iuran pokok", "Persetujuan pencairan iuran", "Transfer dana"]
          },
          {
            id: "klaim_aktif_suami_istri_meninggal",
            code: "iv",
            title: "Istri/Suami Meninggal Dunia",
            path: ["klaim", "klaim_aktif", "klaim_aktif_suami_istri_meninggal"],
            description: "Klaim Uang Duka Wafat (UDW) bagi pasangan sah dari peserta aktif yang meninggal dunia.",
            requirements: [
              "Surat Kematian dari Kelurahan/Rumah Sakit asli",
              "Kartu Keluarga (KK) terbaru yang mencantumkan status meninggal",
              "KTP Suami/Istri yang mengajukan klaim",
              "Surat Nikah / Akta Nikah yang disahkan instansi berwenang",
              "Kartu Tanda Peserta ASABRI (KTPA) suami/istri (peserta)"
            ],
            steps: ["Laporan kematian pasangan", "Pengunggahan berkas akta kematian dan surat nikah", "Verifikasi keabsahan data pernikahan", "Pencairan Uang Duka Wafat"]
          },
          {
            id: "klaim_aktif_anak_meninggal",
            code: "v",
            title: "Anak Meninggal Dunia",
            path: ["klaim", "klaim_aktif", "klaim_aktif_anak_meninggal"],
            description: "Klaim santunan kematian anak bagi anak sah dari peserta aktif (maksimal batas umur tunjangan anak).",
            requirements: [
              "Surat Kematian anak dari Kelurahan/Rumah Sakit asli",
              "Kartu Keluarga (KK) orang tua",
              "Akta Kelahiran anak yang bersangkutan",
              "KTP Orang Tua (Peserta ASABRI)",
              "Kartu Tanda Peserta ASABRI (KTPA)"
            ],
            steps: ["Unggah laporan kematian anak", "Verifikasi status tunjangan anak pada daftar gaji/data ASABRI", "Perhitungan santunan kematian", "Pencairan dana"]
          },
          {
            id: "klaim_aktif_meninggal_dinas_aktif",
            code: "vi",
            title: "Meninggal Dunia dalam Dinas Aktif",
            path: ["klaim", "klaim_aktif", "klaim_aktif_meninggal_dinas_aktif"],
            description: "Klaim Jaminan Kematian (JKm) / Santunan Kematian Kerja (SKK) bagi ahli waris dari peserta aktif yang gugur, tewas, atau meninggal dunia biasa dalam dinas aktif.",
            requirements: [
              "Surat Keputusan (SK) Gugur/Tewas dari Panglima TNI/Kapolri/Pejabat Berwenang ATAU Surat Kematian biasa",
              "Surat Keterangan Ahli Waris dari kelurahan/kecamatan",
              "Kartu Tanda Peserta ASABRI (KTPA) almarhum",
              "KTP Ahli Waris & Kartu Keluarga",
              "Surat Nikah (bagi istri/suami) atau Akta Kelahiran (bagi anak)"
            ],
            steps: ["Pemberitahuan kematian dalam dinas", "Klasifikasi penyebab (Gugur/Tewas/Meninggal Biasa)", "Verifikasi berkas ahli waris", "Penetapan nominal JKm/SKK and beasiswa anak", "Pencairan manfaat"]
          },
          {
            id: "klaim_aktif_kecelakaan_kerja",
            code: "vii",
            title: "Kecelakaan Kerja",
            path: ["klaim", "klaim_aktif", "klaim_aktif_kecelakaan_kerja"],
            description: "Layanan penanganan klaim Jaminan Kecelakaan Kerja (JKK) bagi peserta aktif yang mengalami insiden selama menjalankan tugas kedinasan.",
            children: [
              {
                id: "klaim_aktif_kk_dirawat",
                code: "1",
                title: "Dirawat",
                path: ["klaim", "klaim_aktif", "klaim_aktif_kecelakaan_kerja", "klaim_aktif_kk_dirawat"],
                description: "Pelayanan biaya perawatan dan pengobatan rumah sakit akibat Kecelakaan Kerja.",
                children: [
                  {
                    id: "klaim_aktif_kk_dirawat_sembuh",
                    code: "a",
                    title: "Sembuh",
                    path: ["klaim", "klaim_aktif", "klaim_aktif_kecelakaan_kerja", "klaim_aktif_kk_dirawat", "klaim_aktif_kk_dirawat_sembuh"],
                    description: "Penyelesaian klaim penggantian biaya pengobatan (reimbursement) bagi peserta yang telah dinyatakan sembuh total tanpa kecacatan.",
                    requirements: [
                      "Laporan Kronologis Kejadian & Berita Acara Kecelakaan Kerja",
                      "Formulir JKK Tahap I & II (Laporan Dokter)",
                      "Surat Keterangan Dokter yang menyatakan peserta sembuh total",
                      "Kwitansi asli biaya perawatan rumah sakit dan obat-obatan",
                      "Fotokopi KTP & Kartu ASABRI"
                    ],
                    steps: ["Laporan awal kecelakaan kerja", "Unggah kwitansi & diagnosa akhir", "Audit medis oleh tim ASABRI", "Pembayaran penggantian biaya perawatan"]
                  },
                  {
                    id: "klaim_aktif_kk_dirawat_cacat",
                    code: "b",
                    title: "Cacat",
                    path: ["klaim", "klaim_aktif", "klaim_aktif_kecelakaan_kerja", "klaim_aktif_kk_dirawat", "klaim_aktif_kk_dirawat_cacat"],
                    description: "Penetapan tingkat kecacatan (anatomis/fungsi) dan pemberian santunan cacat bagi peserta yang mengalami disabilitas pasca kecelakaan kerja.",
                    children: [
                      {
                        id: "klaim_aktif_kk_dirawat_cacat_bekerja",
                        code: "i",
                        title: "Tetap Bekerja",
                        path: ["klaim", "klaim_aktif", "klaim_aktif_kecelakaan_kerja", "klaim_aktif_kk_dirawat", "klaim_aktif_kk_dirawat_cacat", "klaim_aktif_kk_dirawat_cacat_bekerja"],
                        description: "Santunan cacat bagi peserta yang mengalami kecacatan akibat kecelakaan kerja namun masih dinilai mampu melanjutkan dinas aktif.",
                        requirements: [
                          "Surat Keterangan Cacat dari Dokter Pemeriksa / Rumah Sakit Militer/Polri",
                          "Rekomendasi panitia medis terkait persentase kecacatan",
                          "Surat Pernyataan dari pimpinan instansi bahwa yang bersangkutan tetap dipertahankan bekerja",
                          "KTP & Kartu ASABRI"
                        ],
                        steps: ["Verifikasi tingkat kecacatan anatomis/fungsi", "Perhitungan santunan cacat (Persentase Cacat x Faktor Pengali)", "Penerbitan surat keputusan santunan", "Pencairan dana santunan"]
                      },
                      {
                        id: "klaim_aktif_kk_dirawat_cacat_pensiun",
                        code: "ii",
                        title: "Pensiun",
                        path: ["klaim", "klaim_aktif", "klaim_aktif_kecelakaan_kerja", "klaim_aktif_kk_dirawat", "klaim_aktif_kk_dirawat_cacat", "klaim_aktif_kk_dirawat_cacat_pensiun"],
                        description: "Santunan cacat dan hak pensiun cacat bagi peserta yang mengalami kecacatan akibat kecelakaan kerja sehingga tidak dapat melanjutkan dinas aktif.",
                        requirements: [
                          "Surat Keputusan (SK) Pensiun Cacat dari instansi asal",
                          "Surat Keterangan Cacat dari Dokter yang berwenang",
                          "Laporan Kronologis Kecelakaan Kerja lengkap",
                          "KTP, KK, dan Rekening Bank Ahli Waris/Penerima"
                        ],
                        steps: ["Penerimaan SK Pensiun Cacat", "Penetapan persentase kecacatan total/sebagian", "Penghitungan Santunan Cacat and hak Pensiun Bulanan", "Pencairan dana santunan awal & pembukaan rekening pensiun bulanan"]
                      }
                    ]
                  }
                ]
              },
              {
                id: "klaim_aktif_kk_meninggal",
                code: "2",
                title: "Meninggal Dunia",
                path: ["klaim", "klaim_aktif", "klaim_aktif_kecelakaan_kerja", "klaim_aktif_kk_meninggal"],
                description: "Santunan Kematian Kerja (SKK) and beasiswa bagi ahli waris peserta aktif yang meninggal langsung di tempat kejadian atau dalam perawatan akibat kecelakaan kerja.",
                requirements: [
                  "Laporan Kecelakaan Kerja Tahap I & II",
                  "Surat Kematian dari Rumah Sakit / Berita Acara Kepolisian",
                  "Visum et Repertum atau Rekam Medis Kematian",
                  "Surat Keterangan Ahli Waris resmi",
                  "KTP Ahli Waris and Kartu Keluarga almarhum"
                ],
                steps: ["Verifikasi status kematian akibat dinas/kerja", "Penetapan klaim Santunan Kematian Kerja (SKK)", "Penyaluran dana Uang Duka Tewas dan biaya pemakaman", "Pemberian manfaat Beasiswa Anak bagi ahli waris yang berhak"]
              }
            ]
          }
        ]
      }
    ]
  }
];

// MOCK DATA PESERTA (8 records)
const MOCK_PESERTA = [
  {
    nik: "3273120105910003",
    nama: "Ahmad Fauzi",
    noPeserta: "ASB-2024-001234",
    no_ktpa: "ASB-2024-001234",
    pangkat: "Serma",
    golongan_pangkat: "Bintara/Tamtama",
    gaji_pokok_terakhir: 4200000,
    unitKerja: "Kodam III/Siliwangi",
    kesatuan: "Kodam III/Siliwangi",
    statusKepesertaan: "Aktif",
    status_kepesertaan: "Aktif",
    ikut_tppd: true,
    jenis_kelamin: "L",
    tanggal_lahir: "1980-05-12",
    nrp_nip: "3273120105910003",
    pasangan: {
      nik: "3273120105910088",
      nama: "Siti Nurhaliza",
      jugaPesertaASABRI: true
    },
    anak: [
      { nama: "Budi Santoso", usia: 15, status_sekolah: "SMP", menikah: false, bekerja: false, nik: "3273120105910090" },
      { nama: "Ani Fitria", usia: 12, status_sekolah: "SD", menikah: false, bekerja: false, nik: "3273120105910091" }
    ],
    kantor_bayar: { bank: "Bank BNI", jenis_tabungan: "Tabungan", no_rekening: "9876543210" }
  },
  {
    nik: "3273120105910088",
    nama: "Siti Nurhaliza",
    noPeserta: "ASB-2024-001235",
    no_ktpa: "ASB-2024-001235",
    pangkat: "PNS Gol II/c",
    golongan_pangkat: "PNS",
    gaji_pokok_terakhir: 3800000,
    unitKerja: "Kodam III/Siliwangi",
    kesatuan: "Kodam III/Siliwangi",
    statusKepesertaan: "Aktif",
    status_kepesertaan: "Aktif",
    ikut_tppd: false,
    jenis_kelamin: "P",
    tanggal_lahir: "1985-08-25",
    nrp_nip: "3273120105910088",
    pasangan: {
      nik: "3273120105910003",
      nama: "Ahmad Fauzi",
      jugaPesertaASABRI: true
    },
    anak: [
      { nama: "Budi Santoso", usia: 15, status_sekolah: "SMP", menikah: false, bekerja: false, nik: "3273120105910090" },
      { nama: "Ani Fitria", usia: 12, status_sekolah: "SD", menikah: false, bekerja: false, nik: "3273120105910091" }
    ],
    kantor_bayar: { bank: "Bank Mandiri Taspen", jenis_tabungan: "Tabungan", no_rekening: "1122334455" }
  },
  {
    nik: "3171092801890001",
    nama: "Wirata Atmaja",
    noPeserta: "ASB-2015-087211",
    no_ktpa: "ASB-2015-087211",
    pangkat: "Mayor Inf",
    unitKerja: "Kodam Jaya / Mabes AD",
    kesatuan: "Kodam Jaya / Mabes AD",
    statusKepesertaan: "Aktif",
    status_kepesertaan: "Aktif",
    jenis_kelamin: "L",
    tanggal_lahir: "1978-01-28",
    nrp_nip: "3171092801890001",
    pasangan: {
      nik: "3171092801890099",
      nama: "Kartika Sari",
      jugaPesertaASABRI: false
    },
    gaji_pokok_terakhir: 4900000,
    kantor_bayar: { bank: "Bank BRI", jenis_tabungan: "Tabungan", no_rekening: "2233445566" }
  },
  {
    nik: "3273120105910011",
    nama: "Bambang Triyono",
    noPeserta: "ASB-2018-095431",
    no_ktpa: "ASB-2018-095431",
    pangkat: "Letkol Cpl",
    unitKerja: "Pusdiklat / Kodam III",
    kesatuan: "Pusdiklat / Kodam III",
    statusKepesertaan: "Aktif",
    status_kepesertaan: "Aktif",
    jenis_kelamin: "L",
    tanggal_lahir: "1982-11-15",
    nrp_nip: "3273120105910011",
    pasangan: null,
    gaji_pokok_terakhir: 5200000,
    kantor_bayar: { bank: "Bank Mandiri", jenis_tabungan: "Giro", no_rekening: "3344556677" }
  },
  {
    nik: "3578140902940004",
    nama: "Kartika Sari",
    noPeserta: "ASB-2020-112345",
    no_ktpa: "ASB-2020-112345",
    pangkat: "PNS Gol III/a",
    unitKerja: "Polda Jawa Timur",
    kesatuan: "Polda Jawa Timur",
    statusKepesertaan: "Aktif",
    status_kepesertaan: "Aktif",
    jenis_kelamin: "P",
    tanggal_lahir: "1994-09-14",
    nrp_nip: "3578140902940004",
    pasangan: null,
    gaji_pokok_terakhir: 3600000,
    kantor_bayar: { bank: "Bank BJB", jenis_tabungan: "Tabungan", no_rekening: "4455667788" }
  },
  {
    nik: "3374110304620002",
    nama: "Budi Santoso",
    noPeserta: "ASB-1985-004321",
    no_ktpa: "ASB-1985-004321",
    pangkat: "Peltu (Purn)",
    unitKerja: "Kodam IV/Diponegoro",
    kesatuan: "Kodam IV/Diponegoro",
    statusKepesertaan: "Non-Aktif",
    status_kepesertaan: "Non-Aktif",
    jenis_kelamin: "L",
    tanggal_lahir: "1962-11-03",
    nrp_nip: "3374110304620002",
    pasangan: null,
    gaji_pokok_terakhir: 3100000,
    kantor_bayar: { bank: "PT Pos Indonesia", jenis_tabungan: "Tabungan", no_rekening: "5566778899" }
  },
  {
    nik: "3173051212880005",
    nama: "Hendra Wijaya",
    noPeserta: "ASB-2012-054322",
    no_ktpa: "ASB-2012-054322",
    pangkat: "AKP",
    unitKerja: "Polda Metro Jaya",
    kesatuan: "Polda Metro Jaya",
    statusKepesertaan: "Aktif",
    status_kepesertaan: "Aktif",
    jenis_kelamin: "L",
    tanggal_lahir: "1988-12-12",
    nrp_nip: "3173051212880005",
    pasangan: null,
    gaji_pokok_terakhir: 4700000,
    kantor_bayar: { bank: "Bank BNI", jenis_tabungan: "Tabungan", no_rekening: "6677889900" }
  },
  {
    nik: "3515082109650007",
    nama: "Joko Susilo",
    noPeserta: "ASB-1990-008976",
    no_ktpa: "ASB-1990-008976",
    pangkat: "Kolonel Laut",
    unitKerja: "Lantamal V Surabaya",
    kesatuan: "Lantamal V Surabaya",
    statusKepesertaan: "Non-Aktif",
    status_kepesertaan: "Non-Aktif",
    jenis_kelamin: "L",
    tanggal_lahir: "1965-08-21",
    nrp_nip: "3515082109650007",
    pasangan: null,
    gaji_pokok_terakhir: 5800000,
    kantor_bayar: { bank: "Bank Mandiri Taspen", jenis_tabungan: "Tabungan", no_rekening: "7788990011" }
  },
  {
    nik: "3201010101800001",
    nama: "Budi Santoso",
    jenis_kelamin: "L",
    tanggal_lahir: "1980-01-01",
    nrp_nip: "31800101",
    no_ktpa: "KTPA-0001",
    noPeserta: "KTPA-0001",
    pangkat: "Serda",
    angkatan: "TNI AD",
    kesatuan: "TNI Angkatan Darat",
    unitKerja: "TNI Angkatan Darat",
    status_kepesertaan: "Aktif",
    statusKepesertaan: "Aktif",
    tingkat_cacat: "III",
    golongan_cacat: "C",
    gaji_pokok_terakhir: 5500000,
    kantor_bayar: { bank: "Bank BRI", jenis_tabungan: "Tabungan", no_rekening: "1234567890" }
  },
  {
    nik: "3271020202850002",
    nama: "Andi Wijaya",
    jenis_kelamin: "L",
    tanggal_lahir: "1985-02-02",
    nrp_nip: "31850202",
    no_ktpa: "KTPA-0002",
    noPeserta: "KTPA-0002",
    pangkat: "Bripka",
    angkatan: "POLRI",
    kesatuan: "POLRI",
    unitKerja: "POLRI",
    status_kepesertaan: "Aktif",
    statusKepesertaan: "Aktif",
    tingkat_cacat: "II",
    golongan_cacat: "B",
    gaji_pokok_terakhir: 4800000,
    kantor_bayar: { bank: "Bank BNI", jenis_tabungan: "Tabungan", no_rekening: "9876543210" }
  },
  {
    nik: "3578030303900003",
    nama: "Siti Aminah",
    jenis_kelamin: "P",
    tanggal_lahir: "1990-03-03",
    nrp_nip: "31900303",
    no_ktpa: "KTPA-0003",
    noPeserta: "KTPA-0003",
    pangkat: "PNS III/a",
    angkatan: "TNI AL",
    kesatuan: "TNI Angkatan Laut",
    unitKerja: "TNI Angkatan Laut",
    status_kepesertaan: "Aktif",
    statusKepesertaan: "Aktif",
    tingkat_cacat: "II",
    golongan_cacat: "A",
    gaji_pokok_terakhir: 5100000,
    kantor_bayar: { bank: "Bank Mandiri", jenis_tabungan: "Tabungan", no_rekening: "5566778899" }
  },
  {
    nik: "3273010101750006",
    nama: "Ahmad Sobari",
    jenis_kelamin: "L",
    tanggal_lahir: "1975-01-01",
    nrp_nip: "3273010101750006",
    no_ktpa: "KTPA-0004",
    noPeserta: "KTPA-0004",
    pangkat: "Peltu",
    kesatuan: "TNI Angkatan Darat",
    unitKerja: "Kodim 0621/Kab. Bogor",
    status_kepesertaan: "Non-Aktif",
    statusKepesertaan: "Non-Aktif",
    gaji_pokok_terakhir: 4200000,
    kantor_bayar: { bank: "Bank BRI", jenis_tabungan: "Tabungan", no_rekening: "3322110099" }
  },
  {
    nik: "3172021008700004",
    nama: "Herman Wijaya",
    jenis_kelamin: "L",
    tanggal_lahir: "1987-10-10",
    nrp_nip: "3172021008700004",
    no_ktpa: "KTPA-0005",
    noPeserta: "KTPA-0005",
    pangkat: "Mayor Cpl",
    kesatuan: "TNI Angkatan Darat",
    unitKerja: "Paldam Jaya",
    status_kepesertaan: "Aktif",
    statusKepesertaan: "Aktif",
    gaji_pokok_terakhir: 4500000,
    kantor_bayar: { bank: "Bank Mandiri Taspen", jenis_tabungan: "Tabungan", no_rekening: "6655443322" }
  },
  {
    nik: "3201010808900003",
    nama: "Doni Haryono",
    jenis_kelamin: "L",
    tanggal_lahir: "1989-08-08",
    nrp_nip: "3201010808900003",
    no_ktpa: "KTPA-0006",
    noPeserta: "KTPA-0006",
    pangkat: "Pratu",
    kesatuan: "TNI Angkatan Darat",
    unitKerja: "Brigif 17/Kujang",
    status_kepesertaan: "Aktif",
    statusKepesertaan: "Aktif",
    gaji_pokok_terakhir: 3800000,
    kantor_bayar: { bank: "Bank BNI", jenis_tabungan: "Tabungan", no_rekening: "7766554433" }
  }
];

// MOCK DATA FASKES & MITRA
const MOCK_FASKES = [
  // Provider — Faskes kerja sama ASABRI
  { id: "FSK001", nama: "RSUD Bali Mandara", kota: "Denpasar", tipe: "Provider" },
  { id: "FSK002", nama: "RS Polri Kramat Jati", kota: "Jakarta Timur", tipe: "Provider" },
  { id: "FSK003", nama: "RSPAD Gatot Soebroto", kota: "Jakarta Pusat", tipe: "Provider" },
  { id: "FSK004", nama: "RSAL Dr. Ramelan", kota: "Surabaya", tipe: "Provider" },
  { id: "FSK005", nama: "RS TNI AU Halim Perdanakusuma", kota: "Jakarta Timur", tipe: "Provider" },
  { id: "FSK006", nama: "RSUD Dr. Soetomo", kota: "Surabaya", tipe: "Provider" },
  { id: "FSK007", nama: "RS Dustira", kota: "Cimahi", tipe: "Provider" },
  { id: "FSK008", nama: "RSUP Dr. Sardjito", kota: "Yogyakarta", tipe: "Provider" },
  { id: "FSK009", nama: "RS Bhayangkara Tk.I Raden Said Sukanto", kota: "Jakarta Timur", tipe: "Provider" },
  { id: "FSK010", nama: "RSUD Prof. Dr. Margono Soekarjo", kota: "Purwokerto", tipe: "Provider" },

  // Mitra — Faskes tidak kerja sama langsung (via BPJS/asuransi lain)
  { id: "FSK011", nama: "RS Siloam Hospitals", kota: "Jakarta", tipe: "Mitra" },
  { id: "FSK012", nama: "RS Pondok Indah", kota: "Jakarta Selatan", tipe: "Mitra" },
  { id: "FSK013", nama: "RS Medistra", kota: "Jakarta Selatan", tipe: "Mitra" },
  { id: "FSK014", nama: "RS Hermina", kota: "Berbagai Kota", tipe: "Mitra" },
  { id: "FSK015", nama: "RS Mitra Keluarga", kota: "Berbagai Kota", tipe: "Mitra" },
  { id: "FSK016", nama: "RS Premier Bintaro", kota: "Tangerang Selatan", tipe: "Mitra" },
  { id: "FSK017", nama: "RS Omni Hospitals", kota: "Berbagai Kota", tipe: "Mitra" },
  { id: "FSK018", nama: "RS EMC", kota: "Berbagai Kota", tipe: "Mitra" },
];

const MOCK_MITRA = [
  { id: "MTR001", nama: "BPJS Kesehatan" },
  { id: "MTR002", nama: "Jasa Raharja" },
  { id: "MTR003", nama: "Asuransi Sinar Mas" },
  { id: "MTR004", nama: "Asuransi Allianz" },
  { id: "MTR005", nama: "Asuransi Prudential" },
];

// TODO: ganti dengan panggilan API asli
function getPesertaByNik(nik) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const p = MOCK_PESERTA.find(item => item.nik === nik || item.nrp_nip === nik);
      if (p) {
        if (!p.angkatan) {
          if (p.kesatuan) {
            p.angkatan = p.kesatuan;
          } else if (p.unitKerja && p.unitKerja.includes("Polda")) {
            p.angkatan = "POLRI";
          } else if (p.pangkat && p.pangkat.includes("PNS")) {
            p.angkatan = "PNS";
          } else if (p.pangkat && (p.pangkat.includes("Mayor") || p.pangkat.includes("Letkol") || p.pangkat.includes("Serma") || p.pangkat.includes("Peltu"))) {
            p.angkatan = "TNI AD";
          } else {
            p.angkatan = "TNI AD";
          }
        }
        if (!p.pangkat) p.pangkat = "Bintara";
      }
      resolve(p ? JSON.parse(JSON.stringify(p)) : null);
    }, 500); // 500ms delay to simulate async API call
  });
}

function getFaskesList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_FASKES);
    }, 200);
  });
}

function getMitraList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_MITRA);
    }, 200);
  });
}

// MOCK DATA REGISTRASI KLAIM (15 records)
const MOCK_CLAIMS = [
  {
    noRegistrasi: "REG-2025-00078",
    nik: "3273120105910003",
    namaPeserta: "Ahmad Fauzi",
    jenisKlaim: "JKK",
    manfaatKlaim: "Perawatan",
    sumber: "On the Spot",
    tanggalRegistrasi: "14 Mei 2025",
    status: "Registrasi",
    slaStart: 1747170600000,
    sla: { waktu: "38 menit", status: "mendekati" },
    kantorCabang: "KC Utama Jakarta",
    catatan: "Berkas lengkap.",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "14 Mei 2025 09:15", user: "Staf Utama", aksi: "Registrasi Dibuat", keterangan: "Dokumen klaim diterima langsung" }]
  },
  {
    noRegistrasi: "REG-2025-00079",
    nik: "3171092801890001",
    namaPeserta: "Wirata Atmaja",
    jenisKlaim: "JKK",
    manfaatKlaim: "SCDK",
    sumber: "Klik ASABRI",
    tanggalRegistrasi: "14 Mei 2025",
    status: "Dokumen Diterima",
    slaStart: 1747171800000,
    sla: { waktu: "20 menit", status: "normal" },
    kantorCabang: "KC Utama Jakarta",
    catatan: "Review verifikator",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "14 Mei 2025 09:30", user: "Sistem YANDU", aksi: "Registrasi Dibuat", keterangan: "Pendaftaran online" }]
  },
  {
    noRegistrasi: "REG-2025-00080",
    nik: "3273120105910011",
    namaPeserta: "Bambang Triyono",
    jenisKlaim: "JKm",
    manfaatKlaim: "SKS Bintara/Tamtama",
    sumber: "Ekspedisi/Pos",
    tanggalRegistrasi: "13 Mei 2025",
    status: "Dokumen Terpending",
    slaStart: 1747083600000,
    sla: { waktu: "FREEZE", status: "freeze" },
    kantorCabang: "KC Bandung",
    catatan: "Menunggu dokumen fisik.",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "13 Mei 2025 14:00", user: "Staf Bandung", aksi: "Registrasi Dibuat", keterangan: "Berkas masuk via Pos" }]
  },
  {
    noRegistrasi: "REG-2025-00081",
    nik: "3578140902940004",
    namaPeserta: "Kartika Sari",
    jenisKlaim: "THT",
    manfaatKlaim: "THT_AKTIF",
    sumber: "ASABRI Link",
    tanggalRegistrasi: "14 Mei 2025",
    status: "Kalkulasi Manfaat",
    slaStart: 1747166400000,
    sla: { waktu: "45 menit", status: "normal" },
    kantorCabang: "KC Surabaya",
    catatan: "Menunggu verifikasi lanjutan.",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "14 Mei 2025 08:00", user: "Mitra Link", aksi: "Registrasi Dibuat", keterangan: "Pendaftaran via ASABRI Link" }]
  },
  {
    noRegistrasi: "REG-2025-00082",
    nik: "3374110304620002",
    namaPeserta: "Budi Santoso",
    jenisKlaim: "Pensiun",
    manfaatKlaim: "PP",
    sumber: "On the Spot",
    tanggalRegistrasi: "12 Mei 2025",
    status: "Menunggu Verifikasi",
    slaStart: 1746997200000,
    sla: { waktu: "25 menit", status: "normal" },
    kantorCabang: "KC Utama Jakarta",
    catatan: "Review berkas pensiun pertama.",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "12 Mei 2025 10:00", user: "Staf Utama", aksi: "Registrasi Dibuat", keterangan: "Registrasi offline" }]
  },
  {
    noRegistrasi: "REG-2025-00083",
    nik: "3173051212880005",
    namaPeserta: "Hendra Wijaya",
    jenisKlaim: "Pensiun",
    manfaatKlaim: "PPI",
    sumber: "ASABRI Mobile",
    tanggalRegistrasi: "14 Mei 2025",
    status: "Terverifikasi",
    slaStart: 1747171200000,
    sla: { waktu: "40 menit", status: "normal" },
    kantorCabang: "KC Medan",
    catatan: "Review berkas janda/duda.",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "14 Mei 2025 11:00", user: "Sistem Mobile", aksi: "Registrasi Dibuat", keterangan: "Pendaftaran online" }]
  },
  {
    noRegistrasi: "REG-2025-00084",
    nik: "3515082109650007",
    namaPeserta: "Joko Susilo",
    jenisKlaim: "Pensiun",
    manfaatKlaim: "PPA",
    sumber: "Ekspedisi/Pos",
    tanggalRegistrasi: "11 Mei 2025",
    status: "Menunggu Approval",
    slaStart: 1747000800000,
    sla: { waktu: "50 menit", status: "normal" },
    kantorCabang: "KC Makassar",
    catatan: "Review tunjangan anak.",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "11 Mei 2025 09:00", user: "Staf Makassar", aksi: "Registrasi Dibuat", keterangan: "Berkas fisik masuk" }]
  },
  {
    noRegistrasi: "REG-2025-00085",
    nik: "3273120105910088",
    namaPeserta: "Siti Nurhaliza",
    jenisKlaim: "Pensiun",
    manfaatKlaim: "PPOR",
    sumber: "ASABRI Mobile",
    tanggalRegistrasi: "14 Mei 2025",
    status: "SP Terbit",
    slaStart: 1747173600000,
    sla: { waktu: "10 menit", status: "normal" },
    kantorCabang: "KC Bandung",
    catatan: "Review tunjangan orang tua.",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "14 Mei 2025 14:00", user: "Sistem Mobile", aksi: "Registrasi Dibuat", keterangan: "Pendaftaran via Mobile" }]
  },
  {
    noRegistrasi: "REG-2025-00086",
    nik: "3273010101750006",
    namaPeserta: "Ahmad Sobari",
    jenisKlaim: "Pensiun",
    manfaatKlaim: "UDW_PEMAKAMAN",
    sumber: "Klik ASABRI",
    tanggalRegistrasi: "14 Mei 2025",
    status: "Proses Pembayaran",
    slaStart: 1747174200000,
    sla: { waktu: "36 menit", status: "mendekati" },
    kantorCabang: "KC Utama Jakarta",
    catatan: "Review berkas kematian.",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "14 Mei 2025 14:10", user: "Sistem YANDU", aksi: "Registrasi Dibuat", keterangan: "Pendaftaran online" }]
  },
  {
    noRegistrasi: "REG-2025-00087",
    nik: "3172021008700004",
    namaPeserta: "Herman Wijaya",
    jenisKlaim: "Pensiun",
    manfaatKlaim: "UKP",
    sumber: "ASABRI Link",
    tanggalRegistrasi: "14 Mei 2025",
    status: "Selesai",
    slaStart: 1747177200000,
    sla: { waktu: "58 menit", status: "mendekati" },
    kantorCabang: "KC Surabaya",
    catatan: "Review uang kekurangan pensiun.",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "14 Mei 2025 11:30", user: "Staf Surabaya", aksi: "Registrasi Dibuat", keterangan: "Pencatatan berkas fisik" }]
  },
  {
    noRegistrasi: "REG-2025-00088",
    nik: "3201010808900003",
    namaPeserta: "Doni Haryono",
    jenisKlaim: "Pensiun",
    manfaatKlaim: "NTIP",
    sumber: "Klik ASABRI",
    tanggalRegistrasi: "10 Mei 2025",
    status: "Ditolak",
    slaStart: 1746860400000,
    sla: { waktu: "42 menit", status: "mendekati" },
    kantorCabang: "KC Surabaya",
    catatan: "Review nilai tunai iuran.",
    dokumen: ["KTP.pdf"],
    auditTrail: [{ tanggal: "10 Mei 2025 10:00", user: "Sistem YANDU", aksi: "Registrasi Dibuat", keterangan: "Pendaftaran online" }]
  }
];

// ============================================================
// DOC_CONFIG — Konfigurasi Dokumen per Manfaat Klaim (Section 3)
// W = Wajib, K = Kondisional
// ============================================================
const DOC_CONFIG = {
  // 3A. JKK — SCDK / SCDB (Santunan Cacat)
  "SCDK": {
    label: "JKK Santunan Cacat Dinas Khusus (SCDK)",
    note: "Berlaku untuk kejadian cacat TMT 1 Juli 2015 ke atas.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP) — diisi lengkap oleh pemohon" },
      { type: "W", label: "FC Legalisir Keputusan Cacat dari Panglima TNI / Kapolri" },
      { type: "W", label: "FC Legalisir Perincian Gaji saat kejadian cacat dari Pekas (DPP Gaji KU-107)" },
      { type: "W", label: "FC e-KTP Pengaju yang masih berlaku" },
      { type: "W", label: "FC Surat Perintah (Sprin) Tugas Operasional / Latihan" },
      { type: "W", label: "FC Kronologis Kejadian (disahkan pejabat berwenang kesatuan)" },
      { type: "W", label: "Foto Kondisi Anggota Badan yang Mengalami Kecacatan Fisik" },
      { type: "K", label: "FC Resume Medis / Keterangan Pendukung Medis (jika dibutuhkan)" },
      { type: "K", label: "Surat Keterangan Dokter Orthese/Prothese (jika butuh alat bantu)" }
    ]
  },
  "SCDB": {
    label: "JKK Santunan Cacat Dinas Biasa (SCDB)",
    note: "Berlaku untuk kejadian cacat TMT 1 Juli 2015 ke atas.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP) — diisi lengkap oleh pemohon" },
      { type: "W", label: "FC Legalisir Keputusan Cacat dari Panglima TNI / Kapolri" },
      { type: "W", label: "FC Legalisir Perincian Gaji saat kejadian cacat dari Pekas (DPP Gaji KU-107)" },
      { type: "W", label: "FC e-KTP Pengaju yang masih berlaku" },
      { type: "W", label: "FC Surat Perintah (Sprin) Tugas" },
      { type: "W", label: "FC Kronologis Kejadian (disahkan pejabat berwenang kesatuan)" },
      { type: "W", label: "Foto Kondisi Anggota Badan yang Mengalami Kecacatan Fisik" },
      { type: "K", label: "FC Resume Medis / Keterangan Pendukung Medis (jika dibutuhkan)" },
      { type: "K", label: "Surat Keterangan Dokter Orthese/Prothese (jika butuh alat bantu)" }
    ]
  },
  // 3B. JKK — SRKK Gugur / Tewas
  "SRKK Gugur": {
    label: "JKK SRKK Gugur",
    note: "Santunan Risiko Kematian Khusus akibat Gugur dalam tugas operasional.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Asli Riwayat Hidup Singkat (RHS)" },
      { type: "W", label: "Asli Surat Keterangan Ahli Waris (Istri/Suami) disahkan Lurah/Kepala Desa ATAU Surat Keterangan Kuasa Ahli Waris (Anak) disahkan Lurah/Kepala Desa" },
      { type: "W", label: "FC Legalisir Keputusan Gugur dari Dan/Kasatker" },
      { type: "W", label: "FC Keputusan Pengangkatan Pertama / CPNS" },
      { type: "W", label: "FC Akta Kematian dari Dukcapil" },
      { type: "W", label: "FC Legalisir Perincian Gaji saat Meninggal dari Pekas (DPP Gaji KU-107)" },
      { type: "W", label: "FC e-KTP Ahli Waris yang masih berlaku" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" },
      { type: "W", label: "FC Legalisir Surat Perintah (Sprin) Tugas" },
      { type: "W", label: "FC Legalisir Kronologis Kejadian" },
      { type: "W", label: "FC Resume Medis / Hasil Pemeriksaan Medis" },
      { type: "K", label: "Asli Surat Keterangan Sekolah/Kuliah (jika ada anak yang masih sekolah)" },
      { type: "K", label: "Form Biaya Pengangkutan + kuitansi bermaterai (jika ada biaya angkut)" }
    ]
  },
  "SRKK Tewas": {
    label: "JKK SRKK Tewas",
    note: "Santunan Risiko Kematian Khusus akibat Tewas dalam tugas dinas.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Asli Riwayat Hidup Singkat (RHS)" },
      { type: "W", label: "Asli Surat Keterangan Ahli Waris (Istri/Suami) disahkan Lurah/Kepala Desa ATAU Surat Keterangan Kuasa Ahli Waris (Anak) disahkan Lurah/Kepala Desa" },
      { type: "W", label: "FC Legalisir Keputusan Tewas dari Dan/Kasatker" },
      { type: "W", label: "FC Keputusan Pengangkatan Pertama / CPNS" },
      { type: "W", label: "FC Akta Kematian dari Dukcapil" },
      { type: "W", label: "FC Legalisir Perincian Gaji saat Meninggal dari Pekas (DPP Gaji KU-107)" },
      { type: "W", label: "FC e-KTP Ahli Waris" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" },
      { type: "W", label: "FC Legalisir Surat Perintah (Sprin) Tugas" },
      { type: "W", label: "FC Legalisir Kronologis Kejadian" },
      { type: "W", label: "FC Resume Medis / Hasil Pemeriksaan Medis" },
      { type: "K", label: "Asli Surat Keterangan Sekolah/Kuliah (jika ada anak yang masih sekolah)" },
      { type: "K", label: "Form Biaya Pengangkutan + kuitansi bermaterai (jika ada biaya angkut)" }
    ]
  },
  // 3C. JKK — Perawatan (via Faskes / SJP)
  "Perawatan": {
    label: "JKK Perawatan (via Faskes / SJP)",
    note: "Biaya perawatan langsung via Surat Jaminan Pelayanan (SJP) dari ASABRI.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "FC e-KTP yang masih berlaku" },
      { type: "W", label: "FC KTA TNI / POLRI" },
      { type: "W", label: "Asli Surat Laporan Kejadian Kecelakaan Kerja dari Dan/Kasatker (Form A dan B)" },
      { type: "W", label: "Asli Kuitansi Tagihan Faskes bermaterai dan stempel Rumah Sakit" },
      { type: "W", label: "Rincian Biaya Pelayanan Rumah Sakit" },
      { type: "W", label: "Rincian Biaya Obat Farmasi" },
      { type: "W", label: "Resume Medis dan Laporan Operasi (jika ada operasi)" },
      { type: "W", label: "Form Laporan Medis Rawat Inap (diisi bagian administrasi RS)" },
      { type: "W", label: "Keterangan Medis Lampiran C1 dan C2 (diisi dokter pemeriksa)" },
      { type: "K", label: "FC Hasil Pemeriksaan Penunjang (Lab, Rontgen, USG, CT Scan, dll)" },
      { type: "K", label: "Surat Keterangan Dokter Orthese/Prothese (jika butuh alat bantu)" },
      { type: "K", label: "Form Biaya Pengangkutan + kuitansi (jika ada biaya pengangkutan)" }
    ]
  },
  // 3D. JKK — Perawatan (via Reimburse)
  "Perawatan Reimburse": {
    label: "JKK Perawatan (via Reimburse)",
    note: "Penggantian biaya perawatan yang telah dibayarkan peserta secara mandiri.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Asli Surat Pengajuan Reimburse (Lampiran D)" },
      { type: "W", label: "FC KTA TNI / POLRI" },
      { type: "W", label: "Surat Keterangan Kronologi Kejadian Kecelakaan Kerja dari Satker / Lapharsus" },
      { type: "W", label: "Asli Kwitansi Pembayaran Rumah Sakit" },
      { type: "W", label: "Rincian Biaya Pelayanan Rumah Sakit" },
      { type: "W", label: "Rincian Biaya Obat Farmasi" },
      { type: "W", label: "Resume Medis / Keterangan Medis dan Laporan Tindakan Operasi" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" },
      { type: "K", label: "Hasil Pemeriksaan Lab atau Radiologi" },
      { type: "K", label: "Surat Jaminan Jasa Raharja (jika kecelakaan lalu lintas ganda)" }
    ]
  },
  // 3E. JKm — SKS / UDW / Beasiswa (Meninggal Biasa Dinas Aktif)
  "SKS Perwira/PNS": {
    label: "JKm — SKS + UDW + Beasiswa (Meninggal Biasa Perwira/PNS)",
    note: "Berlaku untuk peserta yang meninggal dalam status dinas aktif.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Asli Riwayat Hidup Singkat (RHS)" },
      { type: "W", label: "Asli Surat Keterangan Ahli Waris (Istri/Suami) disahkan Lurah/Kepala Desa ATAU Surat Keterangan Kuasa Ahli Waris (Anak) disahkan Lurah/Kepala Desa" },
      { type: "W", label: "FC Legalisir Keputusan Pemberhentian Dengan Hormat karena Meninggal Dunia ATAU FC Legalisir (Usulan) Pemberhentian Dengan Hormat dari Dan/Kasatker ke PDW" },
      { type: "W", label: "FC Keputusan Pengangkatan Pertama / CPNS" },
      { type: "W", label: "FC Akta Kematian dari Dukcapil" },
      { type: "W", label: "FC Legalisir Perincian Gaji saat Meninggal Dunia dari Pekas (DPP Gaji KU-107)" },
      { type: "W", label: "FC e-KTP Ahli Waris yang masih berlaku" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" },
      { type: "K", label: "Asli Surat Keterangan Sekolah/Kuliah (jika ada anak yang masih sekolah)" }
    ]
  },
  "SKS Bintara/Tamtama": {
    label: "JKm — SKS + UDW + Beasiswa (Meninggal Biasa Bintara/Tamtama)",
    note: "Berlaku untuk peserta Bintara/Tamtama yang meninggal dalam status dinas aktif.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Asli Riwayat Hidup Singkat (RHS)" },
      { type: "W", label: "Asli Surat Keterangan Ahli Waris (Istri/Suami) disahkan Lurah/Kepala Desa" },
      { type: "W", label: "FC Legalisir Keputusan Pemberhentian Dengan Hormat karena Meninggal Dunia" },
      { type: "W", label: "FC Keputusan Pengangkatan Pertama / CPNS" },
      { type: "W", label: "FC Akta Kematian dari Dukcapil" },
      { type: "W", label: "FC Legalisir Perincian Gaji saat Meninggal Dunia dari Pekas (DPP Gaji KU-107)" },
      { type: "W", label: "FC e-KTP Ahli Waris" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" },
      { type: "K", label: "Asli Surat Keterangan Sekolah/Kuliah (jika ada anak yang masih sekolah)" }
    ]
  },
  // 3F. JKm — RKNT (Meninggal Tanpa Ahli Waris Utama)
  "RKNT": {
    label: "JKm — RKNT (Meninggal Tanpa Ahli Waris Utama)",
    note: "Manfaat yang diterima hanya SKS + UDW + NTIP (tanpa Pensiun Warakawuri).",
    docs: [
      { type: "W", label: "Semua dokumen persyaratan JKm biasa (SKS + UDW)" },
      { type: "W", label: "Surat keterangan tidak memiliki istri/suami/anak yang terdaftar (dari instansi terkait)" }
    ]
  },
  // 3G. THT — TA (Pensiun Normal)
  "TA": {
    label: "THT — TA (Pensiun Normal / Berhenti dengan Hak Pensiun)",
    note: "Asli Keputusan Pensiun dibawa untuk di-cap emboss saat pengajuan.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Form SP3R (Surat Pernyataan Pembayaran Pensiun melalui Rekening)" },
      { type: "W", label: "Asli Salinan Keputusan Pensiun" },
      { type: "W", label: "FC Keputusan Pengangkatan Pertama / CPNS" },
      { type: "W", label: "Asli SKPP dari KPPN / e-SKPP" },
      { type: "W", label: "Asli Riwayat Hidup Singkat (RHS)" },
      { type: "W", label: "FC e-KTP Pengaju yang masih berlaku" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU" },
      { type: "W", label: "FC NPWP" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" },
      { type: "W", label: "Pas Foto 4x6 sebanyak 2 lembar (Suami dan Istri)" },
      { type: "K", label: "Asli Surat Keterangan Kuliah (jika ada anak usia 21–25 tahun masih kuliah)" },
      { type: "K", label: "Voucher TASPEN atau Surat Keterangan Belum Terima THT dari TASPEN (jika peserta pindahan dari TASPEN)" }
    ]
  },
  // 3H. THT — NTTA (Berhenti Tanpa Hak Pensiun)
  "NTTA": {
    label: "THT — NTTA (Berhenti Tanpa Hak Pensiun)",
    note: "Cantumkan Nomor HP yang bisa dihubungi pada Form Pengajuan.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Asli Surat Pengantar dari Dan/Kasatker (Kesatuan terakhir)" },
      { type: "W", label: "Asli dan FC Legalisir Keputusan Pemberhentian dari Satuan Terakhir" },
      { type: "W", label: "Asli Riwayat Hidup Singkat (RHS)" },
      { type: "W", label: "Asli SKPP dari KPPN / e-SKPP" },
      { type: "W", label: "FC Keputusan Pengangkatan Pertama / CPNS" },
      { type: "W", label: "FC e-KTP Pengaju yang masih berlaku" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" },
      { type: "W", label: "Pas Foto 4x6 sebanyak 2 lembar (saat dinas aktif)" },
      { type: "K", label: "Surat Keterangan Periode Pembayaran Gaji Skorsing dari Juru Bayar (jika peserta berhenti karena skorsing / gaji tidak 100%)" },
      { type: "K", label: "Surat Keterangan dari pejabat berwenang bahwa SKPP tidak bisa diterbitkan (jika SKPP/e-SKPP tidak bisa terbit)" }
    ]
  },
  // 3I. THT — SBPI/S atau SBPA
  "SBPI/S": {
    label: "THT — SBPI/S (Santunan Biaya Pemakaman Istri/Suami)",
    note: "Berlaku untuk kematian istri/suami peserta aktif.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "FC Daftar Susunan Keluarga dari Kesatuan atau KU-1" },
      { type: "W", label: "FC Legalisir Perincian Gaji saat Meninggal dari Pekas (DPP Gaji KU-107)" },
      { type: "W", label: "FC Akta Kematian dari Dukcapil" },
      { type: "W", label: "FC e-KTP Pengaju" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" }
    ]
  },
  "SBPA": {
    label: "THT — SBPA (Santunan Biaya Pemakaman Anak)",
    note: "Berlaku untuk kematian anak peserta aktif yang terdaftar.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "FC Daftar Susunan Keluarga dari Kesatuan atau KU-1" },
      { type: "W", label: "FC Legalisir Perincian Gaji saat Meninggal dari Pekas (DPP Gaji KU-107)" },
      { type: "W", label: "FC Akta Kematian dari Dukcapil" },
      { type: "W", label: "FC e-KTP Pengaju" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" }
    ]
  },
  // 3J. PENSIUN — PP (Pensiun Pertama)
  "PP": {
    label: "Pensiun Pertama (PP) — Peserta Sendiri",
    note: "Asli Keputusan Pensiun dibawa untuk di-cap emboss saat pengajuan.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Form SP3R (Surat Pernyataan Pembayaran Pensiun melalui Rekening)" },
      { type: "W", label: "Asli Salinan Keputusan Pensiun" },
      { type: "W", label: "FC Keputusan Pengangkatan Pertama / CPNS" },
      { type: "W", label: "Asli SKPP dari KPPN / e-SKPP" },
      { type: "W", label: "Asli Riwayat Hidup Singkat (RHS)" },
      { type: "W", label: "FC e-KTP Pengaju yang masih berlaku" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU" },
      { type: "W", label: "FC NPWP" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" },
      { type: "W", label: "Pas Foto 4x6 sebanyak 2 lembar (Suami dan Istri)" },
      { type: "K", label: "Asli Surat Keterangan Kuliah (jika ada anak usia 21–25 tahun masih kuliah)" },
      { type: "K", label: "Voucher TASPEN (jika pindahan dari TASPEN)" }
    ]
  },
  // 3K. PENSIUN — PPI (Warakawuri)
  "PPI": {
    label: "Pensiun Warakawuri / Janda / Duda (PPI)",
    note: "Pemohon harus melampirkan surat keterangan belum menikah lagi.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Form SP3R (Surat Pernyataan Pembayaran Pensiun melalui Rekening)" },
      { type: "W", label: "Asli Surat Keterangan Belum Menikah Lagi / Kejandaan disahkan Lurah/Kepala Desa" },
      { type: "W", label: "Pas Foto 4x6 sebanyak 2 lembar" },
      { type: "K", label: "Asli dan Salinan Keputusan Pensiun (jika peserta meninggal saat dinas aktif)" },
      { type: "K", label: "Asli SKPP dari KPPN / e-SKPP (jika peserta meninggal saat dinas aktif)" },
      { type: "K", label: "Asli Surat Keterangan Kuliah (jika ada anak usia 21–25 tahun masih kuliah)" }
    ]
  },
  // 3L. PENSIUN — PPA (Yatim-Piatu)
  "PPA": {
    label: "Tunjangan Yatim-Piatu (PPA)",
    note: "Anak wajib belum menikah dan belum bekerja serta berusia maks. 21 tahun (25 tahun jika kuliah).",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Form SP3R" },
      { type: "W", label: "Asli Surat Keterangan Belum Menikah dan Belum Bekerja disahkan Lurah/Kepala Desa" },
      { type: "W", label: "FC Akta Kematian dari Dukcapil" },
      { type: "W", label: "Pas Foto 4x6 sebanyak 2 lembar" },
      { type: "K", label: "Asli dan Salinan Keputusan Pensiun (jika peserta meninggal saat dinas aktif)" },
      { type: "K", label: "Asli SKPP / e-SKPP (jika peserta meninggal saat dinas aktif)" },
      { type: "K", label: "Asli Surat Keterangan Kuliah (jika anak kuliah usia 21–25 tahun)" },
      { type: "K", label: "FC Keterangan Pengampu / Perwalian dari Pengadilan (jika anak masih di bawah umur)" }
    ]
  },
  // 3M. PENSIUN — PPOR (Tunjangan Orang Tua)
  "PPOR": {
    label: "Tunjangan Orang Tua (PPOR)",
    note: "Diberikan kepada orang tua kandung peserta yang meninggal tanpa ahli waris.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Form SP3R" },
      { type: "W", label: "Asli dan Salinan Keputusan Pensiun" },
      { type: "W", label: "Asli SKPP dari KPPN" },
      { type: "W", label: "Pas Foto Pengaju 4x6 sebanyak 2 lembar" }
    ]
  },
  // 3N. PENSIUN — UDW & BPPP (Pensiunan Meninggal Dunia)
  "UDW Pens": {
    label: "UDW & BPPP — Pensiunan Meninggal Dunia",
    note: "Penerima Tunjangan Terbatas tidak berhak mendapat BPPP dan UDW.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Form SP3R" },
      { type: "W", label: "Asli Surat Keterangan Ahli Waris (Istri/Suami) disahkan Lurah/Kepala Desa ATAU Surat Keterangan Kuasa Ahli Waris (Anak) disahkan Lurah/Kepala Desa" },
      { type: "W", label: "FC Keputusan Pensiun" },
      { type: "W", label: "FC Akta Kematian dari Dukcapil" },
      { type: "W", label: "FC e-KTP Pengaju" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU / SPPI / FPI" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" },
      { type: "K", label: "FC Bintang Jasa Nararya (jika ada)" }
    ]
  },
  // 3O. PENSIUN — THT SBPI/S atau SBPA (Pemakaman Keluarga Pensiunan)
  "BPPP": {
    label: "Pensiun — BPPP (Biaya Pemakaman Peserta Pensiun)",
    note: "Istri/Suami yang dinikahi SETELAH pensiun tidak berhak SBPI/S. Anak yang lahir SETELAH pensiun tidak berhak SBPA.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Form SP3R" },
      { type: "W", label: "FC Keputusan Pensiun" },
      { type: "W", label: "FC Akta Kematian dari Dukcapil" },
      { type: "W", label: "FC e-KTP Pengaju" },
      { type: "W", label: "FC Kartu Keluarga (KK) Pengaju" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU (kecuali untuk SBPA)" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" }
    ]
  },
  // 3P. PENSIUN — UKP (Uang Kekurangan Pensiun)
  "UKP": {
    label: "Pensiun — UKP (Uang Kekurangan Pensiun)",
    note: "Gunakan Form Pengajuan UKP khusus, bukan FPP biasa.",
    docs: [
      { type: "W", label: "Form Pengajuan UKP (bukan FPP biasa — gunakan form khusus UKP)" },
      { type: "W", label: "Form SP3R" },
      { type: "W", label: "FC Keputusan Pensiun" },
      { type: "W", label: "FC e-KTP Pengaju" },
      { type: "K", label: "FC Keputusan Pensiun dan Tunjangan Cacat + FC Legalisir Skep Cacat (khusus UKP Pembayaran Tunjangan Cacat)" },
      { type: "K", label: "FC KK, FC Sprin Tugas, FC Kronologis Kejadian (khusus UKP Tunjangan Cacat)" }
    ]
  },
  // 3Q. NTIP (Nilai Tunai Iuran Pensiun)
  "NTIP": {
    label: "NTIP — Nilai Tunai Iuran Pensiun",
    note: "Cantumkan Nomor HP yang bisa dihubungi pada Form Pengajuan.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "Asli Surat Pengantar dari Dan/Kasatker (Kesatuan terakhir)" },
      { type: "W", label: "Asli dan FC Legalisir Keputusan Pemberhentian dari Satuan Terakhir" },
      { type: "W", label: "Asli Riwayat Hidup Singkat (RHS)" },
      { type: "W", label: "Asli SKPP dari KPPN / e-SKPP" },
      { type: "W", label: "FC Keputusan Pengangkatan Pertama / CPNS" },
      { type: "W", label: "FC e-KTP Pengaju yang masih berlaku" },
      { type: "W", label: "FC Kartu Keluarga (KK)" },
      { type: "W", label: "FC Surat Nikah / KPI / KPS / KARIS / KARSU" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" },
      { type: "W", label: "Pas Foto 4x6 sebanyak 2 lembar (saat dinas aktif)" },
      { type: "K", label: "Surat Keterangan Periode Gaji Skorsing dari Juru Bayar (jika ada skorsing)" }
    ]
  },
  // IDP — skema lama PP 67
  "IDP": {
    label: "IDP — Iuran Dana Pensiun (Skema PP 67)",
    note: "Skema lama pra PP 102. Sesuai akumulasi iuran skema PP 67.",
    docs: [
      { type: "W", label: "Form Pengajuan Permohonan (FPP)" },
      { type: "W", label: "FC Keputusan Pensiun" },
      { type: "W", label: "FC e-KTP Pengaju yang masih berlaku" },
      { type: "W", label: "FC Buku Rekening Tabungan Pengaju (Mitra Bayar ASABRI)" }
    ]
  },
  // UKP-PK
  "UKP-PK": {
    label: "UKP-PK — Uang Kekurangan Pensiun (Pembayaran Kembali)",
    note: "Gunakan Form Pengajuan UKP khusus.",
    docs: [
      { type: "W", label: "Form Pengajuan UKP-PK (form khusus)" },
      { type: "W", label: "Form SP3R" },
      { type: "W", label: "FC Keputusan Pensiun" },
      { type: "W", label: "FC e-KTP Pengaju" }
    ]
  }
};

// ============================================================
// FIELD_CONFIG — Konfigurasi Field Pendukung per Manfaat (Section 4)
// ============================================================
const FIELD_CONFIG = {
  // 4A. JKK Santunan Cacat (SCDK / SCDB)
  "SCDK": {
    title: "Data Pendukung JKK Santunan Cacat Dinas Khusus (SCDK)",
    fields: [
      { id: "s4-tgl-cacat", type: "date", label: "Tanggal Kejadian Cacat", required: true },
      { id: "s4-no-sprin", type: "text", label: "Nomor Sprin Tugas", required: true, placeholder: "Cth: SPRIN/123/IV/2024" },
      { id: "s4-gol-cacat", type: "select", label: "Golongan Cacat", required: true,
        options: ["-- Pilih Golongan --", "A — Cacat Ringan", "B — Cacat Sedang", "C — Cacat Berat / Permanen"] },
      { id: "s4-tkt-cacat", type: "select", label: "Tingkat Cacat", required: true,
        options: ["-- Pilih Tingkat --", "I — Dapat Bekerja Biasa", "II — Sebagian Cacat", "III — Cacat Total"] },
      { id: "s4-pct-fungsi", type: "number", label: "Persentase Gangguan Fungsi (%)", required: true, placeholder: "0–100", min: 0, max: 100 },
      { id: "s4-bagian-cacat", type: "text", label: "Bagian Tubuh yang Cacat", required: true, placeholder: "Cth: Tangan kanan, kaki kiri" },
      { id: "s4-alat-bantu", type: "radio", label: "Butuh Alat Orthese / Prothese?", required: true,
        options: ["Ya", "Tidak"],
        conditional: [
          { condition: "Ya", fields: [
            { id: "s4-nama-alat", type: "text", label: "Nama Alat", placeholder: "Cth: Kaki palsu / Kursi roda" },
            { id: "s4-harga-alat", type: "text", label: "Harga Alat (Rp)", placeholder: "Cth: 15.000.000" }
          ]}
        ]
      },
      { id: "s4-masih-kerja", type: "select", label: "Masih Bisa Bekerja?", required: true,
        options: ["-- Pilih Status --", "Bekerja biasa", "Bekerja ringan", "Tidak bisa bekerja"] }
    ]
  },
  "SCDB": {
    title: "Data Pendukung JKK Santunan Cacat Dinas Biasa (SCDB)",
    fields: [
      { id: "s4-tgl-cacat", type: "date", label: "Tanggal Kejadian Cacat", required: true },
      { id: "s4-no-sprin", type: "text", label: "Nomor Sprin Tugas", required: true, placeholder: "Cth: SPRIN/123/IV/2024" },
      { id: "s4-gol-cacat", type: "select", label: "Golongan Cacat", required: true,
        options: ["-- Pilih Golongan --", "A — Cacat Ringan", "B — Cacat Sedang", "C — Cacat Berat / Permanen"] },
      { id: "s4-tkt-cacat", type: "select", label: "Tingkat Cacat", required: true,
        options: ["-- Pilih Tingkat --", "I — Dapat Bekerja Biasa", "II — Sebagian Cacat", "III — Cacat Total"] },
      { id: "s4-pct-fungsi", type: "number", label: "Persentase Gangguan Fungsi (%)", required: true, placeholder: "0–100", min: 0, max: 100 },
      { id: "s4-bagian-cacat", type: "text", label: "Bagian Tubuh yang Cacat", required: true, placeholder: "Cth: Tangan kanan, kaki kiri" },
      { id: "s4-alat-bantu", type: "radio", label: "Butuh Alat Orthese / Prothese?", required: true,
        options: ["Ya", "Tidak"],
        conditional: [
          { condition: "Ya", fields: [
            { id: "s4-nama-alat", type: "text", label: "Nama Alat" },
            { id: "s4-harga-alat", type: "text", label: "Harga Alat (Rp)" }
          ]}
        ]
      },
      { id: "s4-masih-kerja", type: "select", label: "Masih Bisa Bekerja?", required: true,
        options: ["-- Pilih Status --", "Bekerja biasa", "Bekerja ringan", "Tidak bisa bekerja"] }
    ]
  },
  // 4B. JKK SRKK Gugur / Tewas
  "SRKK Gugur": {
    title: "Data Pendukung JKK SRKK Gugur",
    fields: [
      { id: "s4-jenis-srkk", type: "static", label: "Jenis SRKK", value: "Gugur" },
      { id: "s4-tgl-meninggal", type: "date", label: "Tanggal Meninggal", required: true },
      { id: "s4-tempat-kejadian", type: "text", label: "Tempat Kejadian", required: true, placeholder: "Cth: Perbatasan Papua" },
      { id: "s4-no-sprin", type: "text", label: "Nomor Sprin Tugas", required: true },
      { id: "s4-biaya-angkut", type: "radio", label: "Ada Biaya Pengangkutan?", required: true,
        options: ["Ya", "Tidak"],
        conditional: [
          { condition: "Ya", fields: [
            { id: "s4-jenis-angkut", type: "select", label: "Jenis Angkutan", options: ["-- Pilih --", "Darat", "Udara", "Laut"] },
            { id: "s4-tujuan-angkut", type: "text", label: "Tujuan Pengangkutan" },
            { id: "s4-biaya-rp", type: "text", label: "Biaya Angkutan (Rp)", placeholder: "Maks. Rp 8.500.000" }
          ]}
        ]
      },
      { id: "s4-jml-anak-bsw", type: "select", label: "Jumlah Anak Berhak Beasiswa", required: true,
        options: ["0 — Tidak Ada", "1 — Satu Anak", "2 — Dua Anak (Maks)"] },
      { id: "s4-beasiswa-tpb", type: "radio", label: "Beasiswa Dialihkan ke TPB (Taspen Proteksi Beasiswa)?",
        options: ["Ya", "Tidak"] }
    ]
  },
  "SRKK Tewas": {
    title: "Data Pendukung JKK SRKK Tewas",
    fields: [
      { id: "s4-jenis-srkk", type: "static", label: "Jenis SRKK", value: "Tewas" },
      { id: "s4-tgl-meninggal", type: "date", label: "Tanggal Meninggal", required: true },
      { id: "s4-tempat-kejadian", type: "text", label: "Tempat Kejadian", required: true },
      { id: "s4-no-sprin", type: "text", label: "Nomor Sprin Tugas", required: true },
      { id: "s4-biaya-angkut", type: "radio", label: "Ada Biaya Pengangkutan?",
        options: ["Ya", "Tidak"],
        conditional: [
          { condition: "Ya", fields: [
            { id: "s4-jenis-angkut", type: "select", label: "Jenis Angkutan", options: ["-- Pilih --", "Darat", "Udara", "Laut"] },
            { id: "s4-biaya-rp", type: "text", label: "Biaya Angkutan (Rp)", placeholder: "Maks. Rp 8.500.000" }
          ]}
        ]
      },
      { id: "s4-jml-anak-bsw", type: "select", label: "Jumlah Anak Berhak Beasiswa",
        options: ["0 — Tidak Ada", "1 — Satu Anak", "2 — Dua Anak (Maks)"] },
      { id: "s4-beasiswa-tpb", type: "radio", label: "Beasiswa Dialihkan ke TPB?",
        options: ["Ya", "Tidak"] }
    ]
  },
  // 4C. JKK Perawatan
  "Perawatan": {
    title: "Data Pendukung JKK Perawatan",
    fields: [
      { id: "s4-nama-rs", type: "text", label: "Nama RS / Faskes", required: true, placeholder: "Cth: RSPAD Gatot Soebroto" },
      { id: "s4-tgl-masuk", type: "date", label: "Tanggal Masuk RS", required: true },
      { id: "s4-tgl-keluar", type: "date", label: "Tanggal Keluar RS (kosongkan jika masih dirawat)" },
      { id: "s4-diagnosa", type: "text", label: "Diagnosa Utama", required: true },
      { id: "s4-operasi", type: "radio", label: "Ada Tindakan Operasi?", options: ["Ya", "Tidak"],
        conditional: [
          { condition: "Ya", fields: [
            { id: "s4-jenis-op", type: "text", label: "Jenis Operasi" }
          ]}
        ]
      },
      { id: "s4-kelas-kamar", type: "select", label: "Kelas Kamar yang Ditempati",
        options: ["-- Pilih Kelas --", "Kelas 3", "Kelas 2", "Kelas 1", "VIP", "VVIP"] },
      { id: "s4-alasan-naik-kelas", type: "select", label: "Alasan Naik Kelas (jika naik kelas)",
        options: ["-- Tidak Naik Kelas --", "Kamar hak tidak tersedia", "Kamar penuh", "Atas permintaan sendiri"] },
      { id: "s4-mekanisme", type: "select", label: "Mekanisme Klaim", required: true,
        options: ["-- Pilih Mekanisme --", "SJP (Surat Jaminan Pelayanan)", "Reimburse"] },
      { id: "s4-total-tagihan", type: "text", label: "Total Tagihan RS (Rp)", required: true, placeholder: "Cth: 25.000.000" },
      { id: "s4-alat-bantu", type: "radio", label: "Butuh Alat Orthese / Prothese?", options: ["Ya", "Tidak"],
        conditional: [
          { condition: "Ya", fields: [
            { id: "s4-nama-alat", type: "text", label: "Nama Alat" },
            { id: "s4-harga-alat", type: "text", label: "Harga Alat (Rp)" }
          ]}
        ]
      }
    ]
  },
  "Perawatan Reimburse": {
    title: "Data Pendukung JKK Perawatan (Reimburse)",
    fields: [
      { id: "s4-nama-rs", type: "text", label: "Nama RS / Faskes", required: true },
      { id: "s4-tgl-masuk", type: "date", label: "Tanggal Masuk RS", required: true },
      { id: "s4-tgl-keluar", type: "date", label: "Tanggal Keluar RS" },
      { id: "s4-diagnosa", type: "text", label: "Diagnosa Utama", required: true },
      { id: "s4-total-tagihan", type: "text", label: "Total Tagihan RS (Rp)", required: true }
    ]
  },
  // 4D. JKm (Semua Manfaat)
  "SKS Perwira/PNS": {
    title: "Data Pendukung JKm — Meninggal Dinas Aktif (Perwira/PNS)",
    fields: [
      { id: "s4-tgl-meninggal", type: "date", label: "Tanggal Meninggal Dunia", required: true },
      { id: "s4-tempat-meninggal", type: "text", label: "Tempat Meninggal", required: true },
      { id: "s4-penyebab", type: "text", label: "Penyebab Kematian", required: true },
      { id: "s4-ahli-waris", type: "radio", label: "Ada Ahli Waris Utama (Istri/Suami/Anak)?", required: true,
        options: ["Ya", "Tidak"] },
      { id: "s4-jml-anak-bsw", type: "select", label: "Jumlah Anak Berhak Beasiswa",
        options: ["0 — Tidak Ada", "1 — Satu Anak", "2 — Dua Anak (Maks)"] },
      { id: "s4-beasiswa-tpb", type: "radio", label: "Beasiswa Dialihkan ke TPB?",
        options: ["Ya", "Tidak"] }
    ]
  },
  "SKS Bintara/Tamtama": {
    title: "Data Pendukung JKm — Meninggal Dinas Aktif (Bintara/Tamtama)",
    fields: [
      { id: "s4-tgl-meninggal", type: "date", label: "Tanggal Meninggal Dunia", required: true },
      { id: "s4-tempat-meninggal", type: "text", label: "Tempat Meninggal", required: true },
      { id: "s4-penyebab", type: "text", label: "Penyebab Kematian", required: true },
      { id: "s4-ahli-waris", type: "radio", label: "Ada Ahli Waris Utama (Istri/Suami/Anak)?", required: true,
        options: ["Ya", "Tidak"] },
      { id: "s4-jml-anak-bsw", type: "select", label: "Jumlah Anak Berhak Beasiswa",
        options: ["0 — Tidak Ada", "1 — Satu Anak", "2 — Dua Anak (Maks)"] },
      { id: "s4-beasiswa-tpb", type: "radio", label: "Beasiswa Dialihkan ke TPB?",
        options: ["Ya", "Tidak"] }
    ]
  },
  "RKNT": {
    title: "Data Pendukung JKm — RKNT (Tanpa Ahli Waris Utama)",
    fields: [
      { id: "s4-tgl-meninggal", type: "date", label: "Tanggal Meninggal Dunia", required: true },
      { id: "s4-tempat-meninggal", type: "text", label: "Tempat Meninggal", required: true },
      { id: "s4-penyebab", type: "text", label: "Penyebab Kematian", required: true }
    ]
  },
  // 4E. THT — TA / NTTA
  "TA": {
    title: "Data Pendukung THT — TA (Pensiun Normal)",
    fields: [
      { id: "s4-tmt-pensiun", type: "date", label: "TMT Pensiun / Terhitung Mulai Tanggal Pensiun", required: true },
      { id: "s4-pindahan-taspen", type: "radio", label: "Pindahan dari TASPEN?", options: ["Ya", "Tidak"] },
      { id: "s4-skorsing", type: "radio", label: "Ada Periode Gaji Skorsing?", options: ["Ya", "Tidak"],
        conditional: [
          { condition: "Ya", fields: [
            { id: "s4-tgl-skorsing-mulai", type: "date", label: "Tanggal Mulai Skorsing" },
            { id: "s4-tgl-skorsing-selesai", type: "date", label: "Tanggal Selesai Skorsing" },
            { id: "s4-pct-gaji-skorsing", type: "number", label: "Persentase Gaji Skorsing (%)", min: 0, max: 100 }
          ]}
        ]
      }
    ]
  },
  "NTTA": {
    title: "Data Pendukung THT — NTTA (Berhenti Tanpa Hak Pensiun)",
    fields: [
      { id: "s4-tmt-berhenti", type: "date", label: "TMT Berhenti", required: true },
      { id: "s4-jenis-berhenti", type: "select", label: "Jenis Pemberhentian", required: true,
        options: ["-- Pilih Jenis --", "Mengundurkan Diri", "Pemberhentian Dengan Hormat", "Pemberhentian Tidak Dengan Hormat"] },
      { id: "s4-skorsing", type: "radio", label: "Ada Periode Gaji Skorsing?", options: ["Ya", "Tidak"] }
    ]
  },
  // 4F. PENSIUN — PP
  "PP": {
    title: "Data Pendukung Pensiun Pertama (PP)",
    fields: [
      { id: "s4-tmt-pensiun", type: "date", label: "TMT Pensiun (Terhitung Mulai Tanggal)", required: true },
      { id: "s4-sumber-data", type: "select", label: "Sumber Data", required: true,
        options: ["-- Pilih --", "Input KANCAB", "Metadata Kemenkeu (e-SKPP)"] },
      { id: "s4-no-pensiun", type: "text", label: "Nomor Pensiun (auto-generate atau dari Kemenkeu)", placeholder: "Auto-generate sistem" },
      { id: "s4-pensiun-lain", type: "radio", label: "Menerima Pensiun dari Instansi Lain?", options: ["Ya", "Tidak"] }
    ]
  },
  // 4G. PENSIUN — PPI
  "PPI": {
    title: "Data Pendukung Pensiun Warakawuri / PPI",
    fields: [
      { id: "s4-tgl-meninggal-pensiunan", type: "date", label: "Tanggal Meninggal Pensiunan", required: true },
      { id: "s4-status-nikah-lagi", type: "radio", label: "Status Pernikahan Kembali", required: true,
        options: ["Belum menikah lagi", "Sudah menikah lagi"] }
    ]
  },
  // 4H. PENSIUN — PPA
  "PPA": {
    title: "Data Pendukung Tunjangan Yatim-Piatu (PPA)",
    fields: [
      { id: "s4-status-nikah-anak", type: "radio", label: "Status Pernikahan Anak", required: true,
        options: ["Belum menikah", "Sudah menikah"] },
      { id: "s4-status-kerja-anak", type: "radio", label: "Status Pekerjaan Anak", required: true,
        options: ["Belum bekerja", "Sudah bekerja di Pemerintah"] },
      { id: "s4-tgl-lahir-anak", type: "date", label: "Tanggal Lahir Anak", required: true },
      { id: "s4-di-bawah-umur", type: "radio", label: "Anak Masih di Bawah Umur (< 17 tahun)?", options: ["Ya", "Tidak"],
        conditional: [
          { condition: "Ya", fields: [
            { id: "s4-nama-wali", type: "text", label: "Nama Pengampu / Wali" }
          ]}
        ]
      }
    ]
  },
  // 4I. NTIP
  "NTIP": {
    title: "Data Pendukung NTIP (Nilai Tunai Iuran Pensiun)",
    fields: [
      { id: "s4-jenis-pember", type: "select", label: "Jenis Pemberhentian", required: true,
        options: ["-- Pilih Jenis --", "Dengan Hormat", "Tidak Dengan Hormat"] },
      { id: "s4-tgl-berhenti", type: "date", label: "Tanggal Berhenti / TMT Berhenti", required: true },
      { id: "s4-alasan-berhenti", type: "text", label: "Alasan Berhenti", required: true },
      { id: "s4-skorsing", type: "radio", label: "Ada Periode Gaji Skorsing?", options: ["Ya", "Tidak"] }
    ]
  },
  // Fallback / Generic
  "UDW Pens": { title: "Data Pendukung UDW & BPPP Pensiunan", fields: [
    { id: "s4-tgl-meninggal", type: "date", label: "Tanggal Meninggal Pensiunan", required: true },
    { id: "s4-penyebab", type: "text", label: "Penyebab Kematian", required: true }
  ]},
  "BPPP": { title: "Data Pendukung BPPP", fields: [
    { id: "s4-tgl-meninggal", type: "date", label: "Tanggal Meninggal Anggota Keluarga", required: true },
    { id: "s4-hub-keluarga", type: "select", label: "Hubungan dengan Peserta",
      options: ["-- Pilih --", "Istri", "Suami", "Anak"] }
  ]},
  "PPOR": { title: "Data Pendukung Tunjangan Orang Tua (PPOR)", fields: [
    { id: "s4-tmt-pensiun", type: "date", label: "TMT Pensiun Peserta", required: true }
  ]},
  "UKP": { title: "Data Pendukung UKP", fields: [
    { id: "s4-jenis-ukp", type: "select", label: "Jenis UKP", required: true,
      options: ["-- Pilih Jenis --", "UKP Biasa (Dapem tidak terbit)", "UKP Tunjangan Cacat", "UKP Pembayaran Kembali"] }
  ]},
  "UKP-PK": { title: "Data Pendukung UKP-PK", fields: [
    { id: "s4-periode-rapel", type: "text", label: "Periode Rapel / Kekurangan", required: true, placeholder: "Cth: Jan 2024 – Jun 2024" }
  ]},
  "IDP": { title: "Data Pendukung IDP (Skema PP 67)", fields: [
    { id: "s4-tmt-berhenti", type: "date", label: "TMT Berhenti / Pensiun", required: true }
  ]},
  "SBPI/S": { title: "Data Pendukung SBPI/S", fields: [
    { id: "s4-tgl-meninggal", type: "date", label: "Tanggal Meninggal Istri/Suami", required: true },
    { id: "s4-tgl-nikah", type: "date", label: "Tanggal Pernikahan (verifikasi hak SBPI/S)" }
  ]},
  "SBPA": { title: "Data Pendukung SBPA", fields: [
    { id: "s4-tgl-meninggal", type: "date", label: "Tanggal Meninggal Anak", required: true },
    { id: "s4-tgl-lahir-anak", type: "date", label: "Tanggal Lahir Anak (verifikasi hak SBPA)" }
  ]}
};

// ============================================================
// BENEFIT_CALC_CONFIG — Formula Estimasi Manfaat (Section 5)
// ============================================================
const BENEFIT_CALC_CONFIG = {
  "SCDK": {
    type: "cacat-calculator",
    label: "JKK Santunan Cacat",
    components: ["Santunan Cacat (Gaji Pokok × Faktor Cacat)"],
    note: "Faktor cacat sesuai tabel Kepres / PP. Perhitungan final dilakukan Div. Aktuaria."
  },
  "SCDB": {
    type: "cacat-calculator",
    label: "JKK Santunan Cacat Biasa",
    components: ["Santunan Cacat (Gaji Pokok × Faktor Cacat)"],
    note: "Faktor cacat sesuai tabel Kepres / PP."
  },
  "SRKK Gugur": {
    type: "fixed",
    label: "JKK SRKK Gugur",
    components: [
      { label: "SRKK Gugur (Flat)", nilai: 450000000 },
      { label: "Biaya Angkut (at cost, maks)", nilai: 8500000, kondisional: true },
      { label: "Beasiswa per Anak (maks 2 anak)", nilai: 30000000, perAnak: true }
    ],
    note: "Biaya angkut dan beasiswa bersifat kondisional sesuai data Section 4."
  },
  "SRKK Tewas": {
    type: "fixed",
    label: "JKK SRKK Tewas",
    components: [
      { label: "SRKK Tewas (Flat)", nilai: 350000000 },
      { label: "Biaya Angkut (at cost, maks)", nilai: 8500000, kondisional: true },
      { label: "Beasiswa per Anak (maks 2 anak)", nilai: 30000000, perAnak: true }
    ]
  },
  "Perawatan": {
    type: "tagihan",
    label: "JKK Perawatan",
    components: [{ label: "Biaya Perawatan RS (at cost)", nilai: 0, fromField: "s4-total-tagihan" }],
    note: "Naik kelas atas permintaan sendiri → selisih biaya ditanggung peserta."
  },
  "Perawatan Reimburse": {
    type: "tagihan",
    label: "JKK Perawatan (Reimburse)",
    components: [{ label: "Reimburse Biaya RS (at cost)", nilai: 0, fromField: "s4-total-tagihan" }]
  },
  "SKS Perwira/PNS": {
    type: "jkm-perwira",
    label: "JKm Perwira/PNS",
    components: [
      { label: "NTTA (Akumulasi Iuran THT 3.25%)", nilai: 0, fromDB: true },
      { label: "SKS Perwira/PNS (Flat)", nilai: 30000000 },
      { label: "UDW (3 × Gaji Pokok)", nilai: 0, fromGaji: 3 },
      { label: "Beasiswa per Anak (maks 2 anak)", nilai: 15000000, perAnak: true, kondisional: true }
    ]
  },
  "SKS Bintara/Tamtama": {
    type: "jkm-bintara",
    label: "JKm Bintara/Tamtama",
    components: [
      { label: "NTTA (Akumulasi Iuran THT 3.25%)", nilai: 0, fromDB: true },
      { label: "SKS Bintara/Tamtama (Flat)", nilai: 27500000 },
      { label: "UDW (3 × Gaji Pokok)", nilai: 0, fromGaji: 3 },
      { label: "Beasiswa per Anak (maks 2 anak)", nilai: 15000000, perAnak: true, kondisional: true }
    ]
  },
  "RKNT": {
    type: "rknt",
    label: "JKm RKNT",
    components: [
      { label: "SKS (sesuai golongan)", nilai: 0, fromGolongan: true },
      { label: "UDW (3 × Gaji Pokok)", nilai: 0, fromGaji: 3 },
      { label: "NTIP (Akumulasi Iuran Pensiun 4.75%)", nilai: 0, fromDB: true }
    ],
    note: "Tanpa Pensiun Warakawuri."
  },
  "TA": { type: "aktuaria", label: "THT — Tabungan Asuransi (TA)", note: "Formula aktuaria detail di Div. Aktuaria." },
  "NTTA": { type: "aktuaria", label: "THT — Nilai Tunai Tabungan Asuransi (NTTA)", note: "Nilai lebih rendah dari TA." },
  "SBPI/S": { type: "fixed-flat", label: "THT — SBPI/S", components: [{ label: "Santunan SBPI/S (Flat)", nilai: 4000000 }] },
  "SBPA": { type: "fixed-flat", label: "THT — SBPA", components: [{ label: "Santunan SBPA (Flat)", nilai: 3000000 }] },
  "BPPP": { type: "fixed-flat", label: "Pensiun BPPP", components: [{ label: "Biaya Pemakaman Pensiunan (Flat)", nilai: 5000000 }] },
  "PP": { type: "aktuaria", label: "Pensiun Pertama (PP)", note: "Formula aktuaria berdasarkan pangkat, masa kerja, dan gaji pokok." },
  "PPI": { type: "aktuaria", label: "Pensiun Warakawuri (PPI)", note: "Dihitung berdasarkan pensiun peserta." },
  "PPA": { type: "aktuaria", label: "Tunjangan Yatim-Piatu (PPA)", note: "Dihitung berdasarkan pensiun orang tua." },
  "PPOR": { type: "aktuaria", label: "Tunjangan Orang Tua (PPOR)", note: "Dihitung berdasarkan regulasi pensiun." },
  "UDW Pens": { type: "aktuaria", label: "UDW Pensiunan", note: "Nominal sesuai regulasi pensiun pensiunan." },
  "UKP": { type: "aktuaria", label: "UKP — Uang Kekurangan Pensiun", note: "Dihitung dari selisih yang belum dibayarkan." },
  "UKP-PK": { type: "aktuaria", label: "UKP-PK — Uang Kekurangan Pensiun (Pembayaran Kembali)", note: "Sesuai perhitungan rapel." },
  "NTIP": { type: "ntip", label: "NTIP — Nilai Tunai Iuran Pensiun", note: "Akumulasi iuran pensiun 4.75% × masa kerja." },
  "IDP": { type: "aktuaria", label: "IDP — Skema PP 67", note: "Sesuai akumulasi iuran skema PP 67." }
};
