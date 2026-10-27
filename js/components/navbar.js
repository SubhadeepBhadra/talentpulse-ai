/* ==========================================================================
   TALENTPULSE AI - NAVBAR & ROLE SWITCHER COMPONENT
   ========================================================================== */

const NavbarComponent = {
  render() {
    const currentRole = appStore.roles[appStore.currentRole];
    const currentView = appStore.currentView;

    return `
      <nav class="top-nav" id="top-nav">
        <!-- Brand Section -->
        <div class="brand-section">
          <div class="brand-logo-container">
            <img src="assets/logo.jpg" alt="TalentPulse AI" class="brand-logo-img" onerror="this.src=''; this.parentElement.innerHTML='⚡';" />
          </div>
          <div class="brand-info">
            <div class="brand-title">
              TalentPulse
              <span class="brand-tag">AI Recruiting OS</span>
            </div>
            <div class="brand-subtitle">Autonomous Candidate Evaluation & Hiring Workflows</div>
          </div>
        </div>

        <!-- Middle Navigation Tabs -->
        <div class="nav-tabs" id="nav-tabs">
          <button class="nav-tab-btn ${currentView === 'pipeline' ? 'active' : ''}" data-view="pipeline" id="tab-pipeline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="11" rx="1"/></svg>
            Pipeline
            <span class="nav-tab-badge" id="nav-badge-candidates">${appStore.candidates.length}</span>
          </button>
          
          <button class="nav-tab-btn ${currentView === 'jobs' ? 'active' : ''}" data-view="jobs" id="tab-jobs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Requisitions
            <span class="nav-tab-badge" id="nav-badge-jobs">${appStore.jobs.length}</span>
          </button>

          <button class="nav-tab-btn ${currentView === 'hiring_manager' ? 'active' : ''}" data-view="hiring_manager" id="tab-hm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            HM Review
            <span class="nav-tab-badge" id="nav-badge-hm">3</span>
          </button>

          <button class="nav-tab-btn ${currentView === 'executive' ? 'active' : ''}" data-view="executive" id="tab-executive">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            Executive Dashboard
          </button>

          <button class="nav-tab-btn ${currentView === 'candidate_portal' ? 'active' : ''}" data-view="candidate_portal" id="tab-portal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6z"/></svg>
            Candidate Portal
          </button>
        </div>

        <!-- Header Right Actions & Role Selector -->
        <div class="header-actions">
          <!-- Quick Actions -->
          <button class="btn-primary-action" id="btn-quick-post-job" title="Create Requisition with AI">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Post Job
          </button>

          <button class="btn-secondary-action" id="btn-quick-upload-resume" title="Upload Resume for AI Evaluation">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Evaluate Resume
          </button>

          <!-- Interactive Role Switcher -->
          <div class="role-switcher-card" id="role-switcher-container" title="Switch User Role to test Role-Specific Access">
            <div class="role-avatar" id="current-role-avatar">${currentRole.avatarInitials}</div>
            <div class="role-details">
              <div class="role-name">
                <select class="role-select-native" id="role-select">
                  <option value="recruiter" ${appStore.currentRole === 'recruiter' ? 'selected' : ''}>Sarah Jenkins (Lead Recruiter)</option>
                  <option value="hiring_manager" ${appStore.currentRole === 'hiring_manager' ? 'selected' : ''}>Alex Rivera (Hiring Manager)</option>
                  <option value="executive" ${appStore.currentRole === 'executive' ? 'selected' : ''}>Elena Vance (VP of Talent / Exec)</option>
                  <option value="candidate" ${appStore.currentRole === 'candidate' ? 'selected' : ''}>Jordan Lee (Applicant Portal)</option>
                </select>
              </div>
              <div class="role-badge" id="current-role-badge">${currentRole.badgeText}</div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Role Context Banner -->
      <div class="role-banner" id="role-banner">
        <div class="role-banner-content">
          <span class="role-banner-pill" id="banner-role-pill">${currentRole.name} • ${currentRole.title}</span>
          <span class="role-banner-desc" id="banner-role-desc">${currentRole.description}</span>
        </div>
        <div class="role-banner-tags">
          <span><span class="status-dot"></span> AI Engine Online (v3.4)</span>
          <span>ATS Bi-directional Sync Active</span>
          <span>Fair Hiring Audit: 100% Compliant</span>
        </div>
      </div>
    `;
  },

  initListeners() {
    // Navigation tab switching
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const view = e.currentTarget.dataset.view;
        appStore.setView(view);
      });
    });

    // Role switcher dropdown
    const roleSelect = document.getElementById("role-select");
    if (roleSelect) {
      roleSelect.addEventListener("change", (e) => {
        const newRole = e.target.value;
        appStore.setRole(newRole);
      });
    }

    // Quick action: Post Job
    const postJobBtn = document.getElementById("btn-quick-post-job");
    if (postJobBtn) {
      postJobBtn.addEventListener("click", () => {
        if (typeof JobsView !== "undefined") {
          JobsView.openCreateJobModal();
        }
      });
    }

    // Quick action: Upload Resume
    const uploadResumeBtn = document.getElementById("btn-quick-upload-resume");
    if (uploadResumeBtn) {
      uploadResumeBtn.addEventListener("click", () => {
        if (typeof PipelineView !== "undefined") {
          PipelineView.openUploadResumeModal();
        }
      });
    }

    // Subscribe to state updates
    appStore.subscribe("roleChanged", (role) => {
      const avatar = document.getElementById("current-role-avatar");
      const badge = document.getElementById("current-role-badge");
      const pill = document.getElementById("banner-role-pill");
      const desc = document.getElementById("banner-role-desc");
      const select = document.getElementById("role-select");

      if (avatar) avatar.textContent = role.avatarInitials;
      if (badge) badge.textContent = role.badgeText;
      if (pill) pill.textContent = `${role.name} • ${role.title}`;
      if (desc) desc.textContent = role.description;
      if (select) select.value = role.id;

      // Update button visibility based on permissions
      if (postJobBtn) {
        postJobBtn.style.display = role.permissions.includes("create_job") ? "inline-flex" : "none";
      }
      if (uploadResumeBtn) {
        uploadResumeBtn.style.display = role.permissions.includes("upload_resume") ? "inline-flex" : "none";
      }
    });

    appStore.subscribe("viewChanged", (viewId) => {
      document.querySelectorAll(".nav-tab-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.view === viewId);
      });
    });

    appStore.subscribe("candidatesUpdated", (candidates) => {
      const badge = document.getElementById("nav-badge-candidates");
      if (badge) badge.textContent = candidates.length;
      const hmBadge = document.getElementById("nav-badge-hm");
      if (hmBadge) {
        const hmCount = candidates.filter(c => c.stage === "hm_review" || c.stage === "ai_evaluated").length;
        hmBadge.textContent = hmCount;
      }
    });

    appStore.subscribe("jobsUpdated", (jobs) => {
      const badge = document.getElementById("nav-badge-jobs");
      if (badge) badge.textContent = jobs.length;
    });
  }
};
