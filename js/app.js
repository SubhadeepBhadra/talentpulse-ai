/* ==========================================================================
   TALENTPULSE AI - ROOT APPLICATION CONTROLLER
   ========================================================================== */

const App = {
  init() {
    this.mountLayout();
    this.initGlobalListeners();
    this.switchView(appStore.currentView);
  },

  mountLayout() {
    const appEl = document.getElementById("app");
    if (!appEl) return;

    appEl.innerHTML = `
      <!-- Top Navigation & Role Banner -->
      <div id="navbar-root">
        ${NavbarComponent.render()}
      </div>

      <!-- Main Viewport -->
      <main class="main-viewport">
        <section id="view-pipeline" class="view-container">
          ${PipelineView.render()}
        </section>

        <section id="view-jobs" class="view-container">
          ${JobsView.render()}
        </section>

        <section id="view-hiring_manager" class="view-container">
          ${HiringManagerView.render()}
        </section>

        <section id="view-executive" class="view-container">
          ${ExecutiveDashboard.render()}
        </section>

        <section id="view-candidate_portal" class="view-container">
          ${CandidatePortalView.render()}
        </section>
      </main>

      <!-- Global Candidate Detail Modal -->
      ${CandidateDetailModal.render()}

      <!-- Global Toast Container -->
      <div id="toast-container"></div>
    `;

    // Initialize component listeners
    NavbarComponent.initListeners();
    PipelineView.initListeners();
    JobsView.initListeners();
    HiringManagerView.initListeners();
    ExecutiveDashboard.initListeners();
    CandidatePortalView.initListeners();
    CandidateDetailModal.initListeners();
  },

  initGlobalListeners() {
    // Listen for state view change
    appStore.subscribe("viewChanged", (viewId) => {
      this.switchView(viewId);
    });

    // Close modals on Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));
      }
    });

    // Close modal when clicking on overlay background
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        e.target.classList.remove("active");
      }
    });
  },

  switchView(viewId) {
    document.querySelectorAll(".view-container").forEach(c => {
      c.classList.remove("active-view");
    });

    const target = document.getElementById(`view-${viewId}`);
    if (target) {
      target.classList.add("active-view");

      // Dynamic re-render if necessary for fresh state
      if (viewId === "pipeline") {
        PipelineView.refreshPipelineView();
      } else if (viewId === "hiring_manager") {
        target.innerHTML = HiringManagerView.render();
        HiringManagerView.initListeners();
      } else if (viewId === "jobs") {
        target.innerHTML = JobsView.render();
        JobsView.initListeners();
      } else if (viewId === "executive") {
        target.innerHTML = ExecutiveDashboard.render();
        ExecutiveDashboard.initListeners();
      } else if (viewId === "candidate_portal") {
        target.innerHTML = CandidatePortalView.render();
        CandidatePortalView.initListeners();
      }
    }
  },

  showToast(title, message, type = "info", duration = 3800) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'danger') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else if (type === 'warning') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
    } else {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
      <button class="toast-close" title="Close">&times;</button>
    `;

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      setTimeout(() => toast.remove(), 250);
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(40px)';
        setTimeout(() => toast.remove(), 250);
      }
    }, duration);
  }
};

// Auto boot on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
