function renderSidebar(activePage) {
  const currentFilename = window.location.pathname.split('/').pop() || 'index.html';

  const menuItems = [
    {
      id: 'dashboard',
      label: '1. Dashboard',
      icon: 'fas fa-chart-pie',
      href: 'index.html',
      subMenu: []
    },
    {
      id: 'registrasi',
      label: '2. Pelayanan Registrasi Klaim Peserta',
      icon: 'fas fa-pen-to-square',
      href: 'registrasi.html',
      subMenu: []
    },
    {
      id: 'data-peserta',
      label: '3. Data Peserta',
      icon: 'fas fa-search',
      href: 'data-peserta.html',
      subMenu: []
    },
    {
      id: 'riwayat',
      label: '4. Riwayat Transaksi Klaim',
      icon: 'fas fa-clock-rotate-left',
      href: 'riwayat.html',
      subMenu: []
    },
    {
      id: 'kejadian',
      label: '5. Pelayanan Klaim',
      icon: 'fas fa-file-invoice',
      href: 'kejadian.html',
      subMenu: []
    },
    {
      id: 'perawatan',
      label: '6. Perawatan JKK',
      icon: 'fas fa-hand-holding-medical',
      href: '#',
      subMenu: [
        {
          label: 'Jaminan Perawatan',
          subMenu: [
            { label: 'Pengajuan Baru', href: 'perawatan-jaminan-baru.html' },
            { label: 'Proses Pengajuan', href: 'perawatan-jaminan-proses.html' },
            { label: 'Riwayat Pengajuan Perawatan', href: 'perawatan-jaminan-riwayat.html' }
          ]
        },
        {
          label: 'Restitusi Perawatan',
          subMenu: [
            { label: 'Pengajuan Baru', href: 'perawatan-restitusi-baru.html' },
            { label: 'Proses Restitusi', href: 'perawatan-restitusi-proses.html' },
            { label: 'Riwayat Pengajuan Restitusi', href: 'perawatan-restitusi-riwayat.html' }
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

  const sidebarHTML = menuItems.map(item => {
    const isActive = activePage === item.id;
    
    if (item.subMenu.length === 0) {
      // Top level simple menu item
      const itemClass = isActive
        ? "flex w-full bg-asabri-blue text-white rounded-xl p-3.5 shadow-md flex items-center justify-between font-semibold text-xs border border-asabri-blueDark/10 transition-all"
        : "flex w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-sm flex items-center justify-between font-semibold text-xs text-slate-700 transition-all";
      
      const iconClass = isActive
        ? `${item.icon} text-base text-asabri-gold`
        : `${item.icon} text-base text-asabri-blue`;

      return `
        <a href="${item.href}" class="${itemClass}">
          <div class="flex items-center gap-2.5">
            <i class="${iconClass}"></i>
            <span>${item.label}</span>
          </div>
        </a>
      `;
    } else {
      // Sub-menu accordion
      const accordionOpen = isActive;
      const displayClass = accordionOpen ? "" : "hidden";
      const chevronClass = accordionOpen ? "fas fa-chevron-down text-asabri-blue text-[10px]" : "fas fa-chevron-right text-slate-400 text-[10px]";
      
      const subItemsHTML = item.subMenu.map(sub => {
        // Nested subMenu (e.g. Perawatan JKK sub-groups)
        if (sub.subMenu) {
          const subGroupItemsHTML = sub.subMenu.map(s => {
            const isSubActive = (s.href === currentFilename);
            const subItemClass = isSubActive
              ? "relative pl-8 py-1 text-xs font-semibold text-asabri-blue flex items-center gap-2 transition-colors"
              : "relative pl-8 py-1 text-xs font-medium text-slate-500 hover:text-asabri-blue flex items-center gap-2 transition-colors";
            
            const bulletClass = isSubActive
              ? "absolute left-[12px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-asabri-blue"
              : "absolute left-[12px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300";

            return `
              <a href="${s.href}" class="${subItemClass}">
                <span class="${bulletClass}"></span>
                <span>${s.label}</span>
              </a>
            `;
          }).join('');

          return `
            <div class="space-y-1">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-5 py-1">${sub.label}</span>
              ${subGroupItemsHTML}
            </div>
          `;
        } else {
          // Simple subMenu (e.g. Komunikasi Pelanggan items)
          const isSubActive = (sub.href === currentFilename);
          const subItemClass = isSubActive
            ? "relative pl-5 py-1 text-xs font-semibold text-asabri-blue flex items-center gap-2 transition-colors"
            : "relative pl-5 py-1 text-xs font-medium text-slate-500 hover:text-asabri-blue flex items-center gap-2 transition-colors";
          
          const bulletClass = isSubActive
            ? "absolute left-[0.5px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-asabri-blue"
            : "absolute left-[0.5px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300";

          return `
            <a href="${sub.href}" class="${subItemClass}">
              <span class="${bulletClass}"></span>
              <span>${sub.label}</span>
            </a>
          `;
        }
      }).join('');

      return `
        <div class="space-y-1">
          <button type="button" onclick="toggleSidebarAccordion('submenu-${item.id}','chevron-${item.id}')" class="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-xl p-3.5 shadow-sm flex items-center justify-between font-semibold text-xs text-slate-700 transition-all">
            <div class="flex items-center gap-2.5">
              <i class="${item.icon} text-base text-asabri-blue"></i>
              <span>${item.label}</span>
            </div>
            <i id="chevron-${item.id}" class="${chevronClass} transition-transform duration-200"></i>
          </button>
          <div id="submenu-${item.id}" class="${displayClass} pl-6 py-2 space-y-2 relative">
            <div class="absolute left-[13px] top-0 bottom-2.5 w-px bg-slate-300"></div>
            ${subItemsHTML}
          </div>
        </div>
      `;
    }
  }).join('');

  // Persist sidebar collapsed status
  const isCollapsed = localStorage.getItem("asabri_sidebar_collapsed") === "true";
  const collapsedClass = isCollapsed ? " w-0 overflow-hidden" : "";

  const containerHTML = `
    <aside id="sidebar-nav" class="w-80 h-full bg-asabri-softBlue border-r border-slate-200 flex flex-col flex-shrink-0 transition-all duration-300${collapsedClass}">
      <div class="p-5 border-b border-slate-200 bg-white/50">
        <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Menu Layanan</h2>
      </div>
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        ${sidebarHTML}
      </nav>
      <div class="p-4 border-t border-slate-250 bg-slate-100 text-[10px] text-slate-400 font-mono text-center">ASABRI YANDU NG v1.2.0</div>
    </aside>
  `;

  const sidebarContainer = document.getElementById('sidebar');
  if (sidebarContainer) {
    sidebarContainer.className = "h-full flex flex-col flex-shrink-0";
    sidebarContainer.innerHTML = containerHTML;
  }
}

// Global helper for toggling accordion
function toggleSidebarAccordion(menuId, chevId) {
  const menu = document.getElementById(menuId);
  const chev = document.getElementById(chevId);
  if (!menu || !chev) return;
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    chev.className = 'fas fa-chevron-down text-asabri-blue text-[10px] transition-transform duration-200';
  } else {
    menu.classList.add('hidden');
    chev.className = 'fas fa-chevron-right text-slate-400 text-[10px] transition-transform duration-200';
  }
}
