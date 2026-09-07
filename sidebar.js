/* Sidebar bersama — bentuk visualnya mengikuti Sidebar.tsx di FE:
   latar putih, item datar, item aktif disorot biru muda dengan rel kiri.
   Kelas tampilannya ada di theme.css supaya sama dengan sidebar bawaan
   halaman-halaman yang belum memakai renderSidebar(). */
function renderSidebar(activePage) {
  const currentFilename = window.location.pathname.split('/').pop() || 'index.html';

  const menuItems = [
    { id: 'dashboard', label: '1. Dashboard', icon: 'fas fa-chart-pie', href: 'index.html', subMenu: [] },
    { id: 'registrasi', label: '2. Pelayanan Registrasi Klaim Peserta', icon: 'fas fa-pen-to-square', href: 'registrasi.html', subMenu: [] },
    { id: 'data-peserta', label: '3. Data Peserta', icon: 'fas fa-magnifying-glass', href: 'data-peserta.html', subMenu: [] },
    { id: 'riwayat', label: '4. Riwayat Transaksi Klaim', icon: 'fas fa-clock-rotate-left', href: 'riwayat.html', subMenu: [] },
    { id: 'kejadian', label: '5. Pelayanan Klaim', icon: 'fas fa-file-invoice', href: 'kejadian.html', subMenu: [] },
    {
      id: 'perawatan',
      label: '6. Perawatan JKK',
      icon: 'fas fa-hand-holding-medical',
      href: '#',
      subMenu: [
        {
          label: 'JAMINAN PERAWATAN',
          subMenu: [
            { label: 'Pengajuan Perawatan', href: 'perawatan-jaminan.html?sub=pengajuan' },
            { label: 'Riwayat Pengajuan', href: 'perawatan-jaminan.html?sub=riwayat' }
          ]
        },
        {
          label: 'KLAIM PERAWATAN',
          subMenu: [
            { label: 'Pengajuan Restitusi', href: 'perawatan-restitusi.html?sub=pengajuan' },
            { label: 'Riwayat Restitusi', href: 'perawatan-restitusi.html?sub=riwayat' }
          ]
        },
        {
          label: 'REIMBURSE PERAWATAN',
          subMenu: [
            { label: 'Pengajuan Reimburse', href: 'perawatan-reimburse.html?sub=pengajuan' },
            { label: 'Riwayat Reimburse', href: 'perawatan-reimburse.html?sub=riwayat' }
          ]
        }
      ]
    },
    {
      id: 'komunikasi',
      label: '7. Pelayanan Komunikasi Pelanggan',
      icon: 'fas fa-comments',
      href: '#',
      subMenu: [
        { label: 'Dashboard', href: 'komunikasi-dashboard.html' },
        { label: 'Riwayat Interaksi', href: 'komunikasi-riwayat.html' }
      ]
    }
  ];

  const currentFullUrl = window.location.pathname.split('/').pop() + window.location.search;

  const subLink = (item) => {
    const isCurrent = (item.href === currentFullUrl) || (item.href === currentFilename && !window.location.search);
    const active = isCurrent ? ' active' : '';
    return `
            <a href="${item.href}" class="nav-sublink${active}">
              <span class="dot"></span>
              <span>${item.label}</span>
            </a>`;
  };

  const sidebarHTML = menuItems.map(item => {
    const isActive = activePage === item.id;

    if (item.subMenu.length === 0) {
      return `
          <a href="${item.href}" class="nav-link${isActive ? ' active' : ''}">
            <span class="flex items-center gap-2.5 min-w-0">
              <i class="nav-ico ${item.icon}"></i>
              <span>${item.label}</span>
            </span>
          </a>`;
    }

    const chevron = isActive ? 'fa-chevron-down' : 'fa-chevron-right';
    const subItemsHTML = item.subMenu.map(sub => {
      if (sub.subMenu) {
        return `
            <span class="nav-subhead">${sub.label}</span>${sub.subMenu.map(subLink).join('')}`;
      }
      return subLink(sub);
    }).join('');

    return `
          <div class="space-y-0.5">
            <button type="button" onclick="toggleSidebarAccordion('submenu-${item.id}','chevron-${item.id}')" class="nav-link${isActive ? ' active' : ''}">
              <span class="flex items-center gap-2.5 min-w-0">
                <i class="nav-ico ${item.icon}"></i>
                <span>${item.label}</span>
              </span>
              <i id="chevron-${item.id}" class="nav-chev fas ${chevron}"></i>
            </button>
            <div id="submenu-${item.id}" class="nav-sub space-y-0.5${isActive ? '' : ' hidden'}">${subItemsHTML}
            </div>
          </div>`;
  }).join('');

  const isCollapsed = localStorage.getItem("asabri_sidebar_collapsed") === "true";
  const collapsedClass = isCollapsed ? " w-0 overflow-hidden" : "";

  const containerHTML = `
    <aside id="sidebar-nav" class="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 transition-all duration-300${collapsedClass}">
      <nav class="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p class="nav-section px-2.5 pt-1 pb-2">Menu Layanan</p>${sidebarHTML}
      </nav>
      <div class="sidebar-foot">ASABRI YANDU NG v1.2.0</div>
    </aside>
  `;

  const sidebarContainer = document.getElementById('sidebar');
  if (sidebarContainer) {
    sidebarContainer.className = "h-full flex flex-col flex-shrink-0";
    sidebarContainer.innerHTML = containerHTML;
  }
}

// Buka/tutup grup menu; hanya kelas arah chevron yang ditukar supaya
// halaman yang memakai sidebar bawaannya sendiri tetap ikut gaya yang sama.
function toggleSidebarAccordion(menuId, chevId) {
  const menu = document.getElementById(menuId);
  if (!menu) return;
  const opening = menu.classList.contains('hidden');
  menu.classList.toggle('hidden', !opening);
  const chev = document.getElementById(chevId);
  if (chev) {
    chev.classList.toggle('fa-chevron-down', opening);
    chev.classList.toggle('fa-chevron-right', !opening);
  }
}
