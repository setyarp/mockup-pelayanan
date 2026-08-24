document.addEventListener("DOMContentLoaded", () => {
  // Global States
  let activeTab = "registrasi"; // "registrasi", "pensiun_pertama", "klaim", "komunikasi"
  let activeSubTab = null;      // "klaim_aktif" or "klaim_pensiun"
  let selectedServiceId = null; 
  let treeExpandedStates = {
    "klaim": true,
    "klaim_aktif": true,
    "klaim_pensiun": false
  };

  // DOM Elements
  const sidebar = document.querySelector(".sidebar");
  const menuToggleBtn = document.getElementById("menu-toggle-btn");
  const navBtns = document.querySelectorAll(".nav-btn");
  const subBtns = document.querySelectorAll(".nav-btn-sub");
  const breadcrumbActive = document.getElementById("breadcrumb-active");
  const breadcrumbPath = document.getElementById("breadcrumb-path");
  const mainContentContainer = document.getElementById("main-content-container");
  
  // Search DOM Elements
  const searchInput = document.getElementById("global-search-input");
  const searchDropdown = document.getElementById("global-search-dropdown");
  
  // Interaction DOM Elements
  const roleBtn = document.getElementById("role-badge-btn");
  const roleDropdown = document.getElementById("role-dropdown");
  const notifBtn = document.getElementById("notification-trigger-btn");
  const notifPopover = document.getElementById("notification-popover");
  
  // Toast Notification
  const toast = document.getElementById("toast-notification");
  const toastClose = document.getElementById("toast-close");

  /* ==========================================================================
     INITIALIZATION & SIDEBAR NAVIGATION
     ========================================================================== */
  
  // Initialize App
  function init() {
    setupEventListeners();
    navigateToTab(activeTab);
    buildSearchIndex();
  }

  // Event Listeners Routing
  function setupEventListeners() {
    // Sidebar collapse toggle
    if (menuToggleBtn) {
      menuToggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
      });
    }

    // Sidebar main navigation buttons
    navBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const tabId = btn.getAttribute("data-tab");
        if (tabId) {
          navigateToTab(tabId);
          // On mobile, close sidebar on nav click
          if (window.innerWidth <= 768) {
            sidebar.classList.remove("mobile-open");
          }
        }
      });
    });

    // Sidebar sub-tab buttons click
    subBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const subTabId = btn.getAttribute("data-subtab");
        if (subTabId) {
          navigateToTab("klaim", subTabId);
          // On mobile, close sidebar
          if (window.innerWidth <= 768) {
            sidebar.classList.remove("mobile-open");
          }
        }
      });
    });

    // Toggle dropdown menus
    if (roleBtn && roleDropdown) {
      roleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllPopovers();
        roleDropdown.classList.toggle("active");
      });
    }

    if (notifBtn && notifPopover) {
      notifBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllPopovers();
        notifPopover.classList.toggle("active");
        // Clear count badge on click
        const badge = notifBtn.querySelector(".notification-badge");
        if (badge) badge.style.display = "none";
      });
    }

    // Close popovers on body click
    document.body.addEventListener("click", () => {
      closeAllPopovers();
    });

    // Close toast trigger
    if (toastClose) {
      toastClose.addEventListener("click", () => {
        hideToast();
      });
    }

    // Global Search Event Listeners
    if (searchInput) {
      searchInput.addEventListener("input", handleSearchInput);
      searchInput.addEventListener("focus", handleSearchInput);
      
      // Close search dropdown on click outside
      document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
          searchDropdown.classList.remove("active");
        }
      });
    }
  }

  function closeAllPopovers() {
    if (roleDropdown) roleDropdown.classList.remove("active");
    if (notifPopover) notifPopover.classList.remove("active");
  }

  /* ==========================================================================
     NAVIGATION SYSTEM
     ========================================================================== */
  
  function navigateToTab(tabId, subTabId = null) {
    activeTab = tabId;
    
    // Update active nav button styling for main menu items
    navBtns.forEach(btn => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    const subList = document.getElementById("nav-sub-list-klaim");
    const chevron = document.querySelector("#nav-btn-klaim-root .nav-chevron");

    if (tabId === "klaim") {
      // Expand accordion
      if (subList) subList.classList.add("expanded");
      if (chevron) chevron.classList.add("rotated");

      // Default to "klaim_aktif" if no subTabId is specified
      activeSubTab = subTabId || activeSubTab || "klaim_aktif";

      // Highlight active sub-tab buttons in sidebar
      subBtns.forEach(btn => {
        if (btn.getAttribute("data-subtab") === activeSubTab) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Find sub-tab service metadata
      const rootService = SERVICES_DATA.find(s => s.id === "klaim");
      const subService = rootService.children.find(s => s.id === activeSubTab);
      if (subService) {
        renderSplitExplorer(subService, rootService);
      }
    } else {
      // Collapse accordion
      if (subList) subList.classList.remove("expanded");
      if (chevron) chevron.classList.remove("rotated");
      
      activeSubTab = null;
      subBtns.forEach(btn => btn.classList.remove("active"));

      const rootService = SERVICES_DATA.find(s => s.id === tabId);
      if (rootService) {
        renderFlatDetails(rootService);
      }
    }
  }

  /* ==========================================================================
     FLAT LAYOUT RENDER (No nested tree panel)
     ========================================================================== */
  
  function renderFlatDetails(service) {
    // Update breadcrumb
    breadcrumbPath.innerHTML = `
      <span>Layanan</span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-active">${service.title}</span>
    `;

    // Render layout in container
    mainContentContainer.innerHTML = `
      <div class="details-panel">
        ${getDetailsCardHtml(service)}
      </div>
    `;

    // Setup action forms and checklists
    setupDetailInteractiveElements(service);
  }

  /* ==========================================================================
     SPLIT EXPLORER LAYOUT RENDER (Nested directory tree + details panel)
     ========================================================================== */
  
  function renderSplitExplorer(subService, parentService) {
    // Ensure selectedServiceId belongs to this sub-hierarchy or pick the first leaf node
    if (!selectedServiceId || !findServiceById(selectedServiceId, subService.children)) {
      // Pick first leaf node as default
      const firstLeaf = getFirstLeafNode(subService.children);
      selectedServiceId = firstLeaf ? firstLeaf.id : null;
    }

    // Render split layout frame
    mainContentContainer.innerHTML = `
      <div class="explorer-container">
        <div class="tree-panel">
          <div class="tree-panel-header">
            <span>Daftar Layanan</span>
            <button class="tree-collapse-all" id="tree-collapse-btn">Tutup Semua</button>
          </div>
          <div class="tree-scroller" id="tree-scroller-container">
            <!-- Dynamic Tree Nodes Rendered Here -->
          </div>
        </div>
        <div class="details-panel" id="details-panel-container">
          <!-- Dynamic Service Details Rendered Here -->
        </div>
      </div>
    `;

    // Render tree panel content starting from subService level
    renderTreePanel(subService.children);

    // Render details panel content
    const selectedService = findServiceById(selectedServiceId, subService.children);
    if (selectedService) {
      renderDetailsPanel(selectedService);
      updateBreadcrumbPath(selectedService);
    }

    // Collapse All toggle under this sub-service
    const collapseBtn = document.getElementById("tree-collapse-btn");
    if (collapseBtn) {
      collapseBtn.addEventListener("click", () => {
        // Close all expanded states
        function recurseCollapse(node) {
          treeExpandedStates[node.id] = false;
          if (node.children) {
            node.children.forEach(recurseCollapse);
          }
        }
        subService.children.forEach(recurseCollapse);
        renderTreePanel(subService.children);
      });
    }
  }

  function renderTreePanel(items) {
    const container = document.getElementById("tree-scroller-container");
    if (!container) return;
    container.innerHTML = buildTreeHtml(items, 1);
    setupTreeEventListeners(items);
  }

  // Recursive Tree Generation HTML
  function buildTreeHtml(items, level) {
    let html = "";
    items.forEach(item => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = treeExpandedStates[item.id] === true;
      const isActive = selectedServiceId === item.id;
      
      const chevronIcon = hasChildren 
        ? `<span class="tree-chevron ${isExpanded ? 'expanded' : ''}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></span>`
        : `<span class="tree-chevron"></span>`;
        
      const folderIconHtml = hasChildren 
        ? `<span class="tree-node-icon" style="color: var(--color-primary-light)">📁</span>`
        : `<span class="tree-node-icon" style="color: var(--color-text-light)">📄</span>`;

      html += `
        <div class="tree-node" style="margin-left: ${level > 1 ? 12 : 0}px">
          <div class="tree-node-row ${isActive ? 'active' : ''}" data-id="${item.id}" data-has-children="${hasChildren}">
            ${chevronIcon}
            ${folderIconHtml}
            <span class="tree-node-label" title="${item.title}">${item.title}</span>
          </div>
          ${hasChildren ? `
            <div class="tree-children ${isExpanded ? 'show' : ''}">
              ${buildTreeHtml(item.children, level + 1)}
            </div>
          ` : ''}
        </div>
      `;
    });
    return html;
  }

  function setupTreeEventListeners(items) {
    const rows = document.querySelectorAll(".tree-node-row");
    rows.forEach(row => {
      row.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = row.getAttribute("data-id");
        const hasChildren = row.getAttribute("data-has-children") === "true";
        
        if (hasChildren) {
          // Toggle folder expansion
          treeExpandedStates[id] = !treeExpandedStates[id];
          renderTreePanel(items);
        } else {
          // Leaf node selected, display details
          selectedServiceId = id;
          
          // Reset highlights and set active row
          document.querySelectorAll(".tree-node-row").forEach(r => r.classList.remove("active"));
          row.classList.add("active");
          
          // Render details
          const service = findServiceById(id, items);
          if (service) {
            renderDetailsPanel(service);
            updateBreadcrumbPath(service);
          }
        }
      });
    });
  }

  function renderDetailsPanel(service) {
    const container = document.getElementById("details-panel-container");
    if (!container) return;
    
    container.innerHTML = getDetailsCardHtml(service);
    setupDetailInteractiveElements(service);
  }

  function updateBreadcrumbPath(service) {
    // Generate hierarchical breadcrumb list based on service.path
    let html = `<span>Layanan</span>`;
    let currentData = SERVICES_DATA;
    
    service.path.forEach((pathSeg, idx) => {
      const match = currentData.find(item => item.id === pathSeg || item.path[item.path.length-1] === pathSeg);
      if (match) {
        html += `
          <span class="breadcrumb-separator">/</span>
          <span class="${idx === service.path.length - 1 ? 'breadcrumb-active' : ''}">${match.title}</span>
        `;
        if (match.children) {
          currentData = match.children;
        }
      }
    });
    
    breadcrumbPath.innerHTML = html;
  }

  /* ==========================================================================
     HTML TEMPLATE BUILDERS
     ========================================================================== */
  
  function getDetailsCardHtml(service) {
    // Description Header
    let detailsHtml = `
      <div class="card">
        <h2 class="card-title">
          <span>ℹ️</span> 
          ${service.title}
        </h2>
        <p class="card-subtitle">${service.description || 'Tidak ada deskripsi detail untuk layanan ini.'}</p>
      </div>
    `;

    // Requirements Checklist
    const reqListHtml = service.requirements && service.requirements.length > 0
      ? service.requirements.map((req, index) => `
          <div class="requirement-item" data-index="${index}">
            <div class="requirement-checkbox" id="chk-${service.id}-${index}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span>${req}</span>
          </div>
        `).join("")
      : `<p class="card-subtitle" style="font-style: italic;">Tidak ada persyaratan dokumen yang diwajibkan.</p>`;

    // Timeline Steps
    const stepsHtml = service.steps && service.steps.length > 0
      ? service.steps.map((step, index) => `
          <div class="timeline-item">
            <div class="timeline-node">${index + 1}</div>
            <div class="timeline-content">
              <span class="timeline-title">${step}</span>
            </div>
          </div>
        `).join("")
      : `<p class="card-subtitle" style="font-style: italic;">Alur proses belum ditentukan.</p>`;

    // Interactive Submission Form Fields
    let formFieldsHtml = "";
    if (service.formFields) {
      formFieldsHtml = service.formFields.map(field => {
        if (field.type === "select") {
          return `
            <div class="form-group">
              <label class="form-label" for="${field.id}">${field.label} ${field.required ? '<span style="color:red">*</span>':''}</label>
              <select class="form-control" id="${field.id}" ${field.required ? 'required' : ''}>
                <option value="" disabled selected>-- Pilih Opsi --</option>
                ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join("")}
              </select>
            </div>
          `;
        } else if (field.type === "textarea") {
          return `
            <div class="form-group">
              <label class="form-label" for="${field.id}">${field.label} ${field.required ? '<span style="color:red">*</span>':''}</label>
              <textarea class="form-control" id="${field.id}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}></textarea>
            </div>
          `;
        } else {
          return `
            <div class="form-group">
              <label class="form-label" for="${field.id}">${field.label} ${field.required ? '<span style="color:red">*</span>':''}</label>
              <input class="form-control" type="${field.type}" id="${field.id}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''} />
            </div>
          `;
        }
      }).join("");
    } else {
      // Default common dynamic mock form fields
      formFieldsHtml = `
        <div class="form-group">
          <label class="form-label" for="comm_nama">Nama Lengkap Pemohon <span style="color:red">*</span></label>
          <input class="form-control" type="text" id="comm_nama" placeholder="Contoh: Adm. Wirata Atmaja" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="comm_nrp">NRP / NIP / No. Peserta <span style="color:red">*</span></label>
          <input class="form-control" type="text" id="comm_nrp" placeholder="Contoh: 198904211101" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="comm_hp">Nomor Handphone (Aktif WhatsApp) <span style="color:red">*</span></label>
          <input class="form-control" type="text" id="comm_hp" placeholder="Contoh: 081234567890" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="comm_berkas">Unggah Berkas Pendukung (ZIP/PDF/JPG) <span style="color:red">*</span></label>
          <input class="form-control" type="file" id="comm_berkas" required />
        </div>
      `;
    }

    // Grid panels
    detailsHtml += `
      <div class="grid-2">
        <div class="card">
          <h3 class="card-title" style="font-size: 15px;">📋 Kelengkapan Berkas Persyaratan</h3>
          <p class="card-subtitle" style="margin-bottom: 12px; font-size: 11px;">Silakan periksa dokumen yang telah Anda siapkan:</p>
          <div class="requirements-list">
            ${reqListHtml}
          </div>
        </div>
        
        <div class="card">
          <h3 class="card-title" style="font-size: 15px;">⚙️ Alur Proses Pelayanan</h3>
          <div class="steps-timeline">
            ${stepsHtml}
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title" style="font-size: 15px; margin-bottom: 20px;">⚡ Simulasi Pengajuan Layanan</h3>
        <form id="service-simulation-form" onsubmit="return false;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
            ${formFieldsHtml}
          </div>
          <div class="form-footer">
            <button type="submit" class="btn-submit">
              <span>🚀</span> Kirim Berkas Layanan
            </button>
          </div>
        </form>
      </div>
      
      <div class="details-footer">
        <span>SISTEM INFORMASI PELAYANAN NEXTGEN ASABRI</span>
        <span>KODE_LAYANAN: <strong>${service.id.toUpperCase()}</strong></span>
      </div>
    `;

    return detailsHtml;
  }

  function setupDetailInteractiveElements(service) {
    // Checklist interaction
    const checkBoxes = document.querySelectorAll(".requirement-checkbox");
    checkBoxes.forEach(box => {
      box.addEventListener("click", () => {
        box.classList.toggle("checked");
      });
    });

    // Form submission simulation
    const form = document.getElementById("service-simulation-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Dynamic fields feedback
        let userNRP = "Umum";
        const nrpInput = form.querySelector('input[id*="nrp"]') || form.querySelector('input[id*="nrp"]');
        if (nrpInput && nrpInput.value) {
          userNRP = nrpInput.value;
        }

        // Show Success Toast
        showToast(
          "Pengajuan Berhasil Diproses!",
          `Tanda terima digital telah diterbitkan untuk NRP: ${userNRP}. Status dapat dipantau di menu Notifikasi.`
        );

        // Reset Form
        form.reset();
        
        // Uncheck all boxes
        document.querySelectorAll(".requirement-checkbox").forEach(box => {
          box.classList.remove("checked");
        });
      });
    }
  }

  /* ==========================================================================
     GLOBAL SEARCH SYSTEM (Search index across all service nodes)
     ========================================================================== */
  
  let searchIndex = [];

  function buildSearchIndex() {
    searchIndex = [];
    
    function recurseIndex(items, parentPaths = []) {
      items.forEach(item => {
        const hasChildren = item.children && item.children.length > 0;
        const currentPath = [...parentPaths, item.id];
        
        if (!hasChildren) {
          // Leaf node is searchable
          searchIndex.push({
            id: item.id,
            title: item.title,
            path: currentPath,
            rootTab: currentPath[0],
            displayPath: formatDisplayPath(currentPath)
          });
        } else {
          // Index intermediate categories too to allow broad searches
          searchIndex.push({
            id: item.id,
            title: item.title,
            path: currentPath,
            rootTab: currentPath[0],
            displayPath: formatDisplayPath(currentPath),
            isCategory: true
          });
          recurseIndex(item.children, currentPath);
        }
      });
    }

    recurseIndex(SERVICES_DATA);
  }

  function formatDisplayPath(pathArr) {
    let result = [];
    let currentData = SERVICES_DATA;

    pathArr.forEach(seg => {
      const match = currentData.find(item => item.id === seg || item.path[item.path.length-1] === seg);
      if (match) {
        result.push(match.title.replace(/^[0-9a-zA-Z\.\)\s]*/, "")); // remove numbering prefixes for path cleanliness
        if (match.children) {
          currentData = match.children;
        }
      }
    });

    return result.join(" ➔ ");
  }

  function handleSearchInput(e) {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchDropdown.classList.remove("active");
      return;
    }

    // Filter matches
    const matches = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(query) || item.displayPath.toLowerCase().includes(query);
    }).slice(0, 10); // limit to 10 suggestions

    if (matches.length === 0) {
      searchDropdown.innerHTML = `<div class="search-no-results">Tidak ada layanan ditemukan untuk "${e.target.value}"</div>`;
    } else {
      searchDropdown.innerHTML = matches.map(match => `
        <div class="search-result-item" data-id="${match.id}" data-root="${match.rootTab}">
          <div class="search-result-title">${match.title}</div>
          <div class="search-result-path">${match.displayPath}</div>
        </div>
      `).join("");

      // Add click listeners to suggestions
      const resultItems = searchDropdown.querySelectorAll(".search-result-item");
      resultItems.forEach(item => {
        item.addEventListener("click", () => {
          const serviceId = item.getAttribute("data-id");
          const rootTab = item.getAttribute("data-root");
          
          selectSearchMatch(serviceId, rootTab);
          
          // Clear and close
          searchInput.value = "";
          searchDropdown.classList.remove("active");
        });
      });
    }

    searchDropdown.classList.add("active");
  }

  function selectSearchMatch(serviceId, rootTabId) {
    // Find item details
    const searchItem = searchIndex.find(s => s.id === serviceId);
    if (!searchItem) return;

    // Navigate to root tab
    selectedServiceId = serviceId;
    
    // Set expands for the directory tree
    searchItem.path.forEach(pathSegment => {
      treeExpandedStates[pathSegment] = true;
    });

    if (rootTabId === "klaim") {
      // Find the sub-tab (second level segment, e.g., "klaim_aktif" or "klaim_pensiun")
      const subTabId = searchItem.path[1];
      navigateToTab("klaim", subTabId);
    } else {
      navigateToTab(rootTabId);
    }
  }

  /* ==========================================================================
     TOAST NOTIFICATIONS AND HELPERS
     ========================================================================== */
  
  function showToast(title, message) {
    if (!toast) return;
    const tTitle = toast.querySelector(".toast-title");
    const tMsg = toast.querySelector(".toast-message");
    if (tTitle) tTitle.innerText = title;
    if (tMsg) tMsg.innerText = message;
    
    toast.classList.add("show");
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      hideToast();
    }, 5000);
  }

  function hideToast() {
    if (toast) toast.classList.remove("show");
  }

  // Helper function to search recursively
  function findServiceById(id, items) {
    for (let item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findServiceById(id, item.children);
        if (found) return found;
      }
    }
    return null;
  }

  // Get the first leaf node in a hierarchy
  function getFirstLeafNode(items) {
    if (!items || items.length === 0) return null;
    const first = items[0];
    if (first.children && first.children.length > 0) {
      return getFirstLeafNode(first.children);
    }
    return first;
  }

  // Start initialization
  init();
});
