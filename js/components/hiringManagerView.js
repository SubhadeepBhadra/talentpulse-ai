/* ==========================================================================
   TALENTPULSE AI - HIRING MANAGER WORKSPACE COMPONENT
   ========================================================================== */

const HiringManagerView = {
  render() {
    const userRole = appStore.roles.hiring_manager;
    const candidates = appStore.candidates.filter(c => c.stage === "hm_review" || c.stage === "interview" || c.stage === "ai_evaluated");
    const comparedCandidates = appStore.comparedCandidateIds
      .map(id => appStore.getCandidateById(id))
      .filter(Boolean);

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h1>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Hiring Manager Review Hub
            <span class="ai-badge ai-badge-pulse">Shortlist Review</span>
          </h1>
          <p>Review candidate scorecards, calibrate side-by-side trade-offs, and submit official interview decisions.</p>
        </div>

        <div class="view-controls">
          <span style="font-size: 0.78rem; color: var(--text-muted);">
            Logged in as: <strong style="color: #fff;">${userRole.name}</strong> (${userRole.title})
          </span>
        </div>
      </div>

      <!-- Quick Metrics Bar for HM -->
      <div class="glass-panel" style="padding: 18px 24px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; gap: 32px; flex-wrap: wrap;">
          <div>
            <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Awaiting Your Review</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: #0f172a; font-family: var(--font-heading);">${candidates.length} Candidates</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Active Requisitions</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-cyan); font-family: var(--font-heading);">2 Roles</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Avg AI Match of Shortlist</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: #34d399; font-family: var(--font-heading);">91.2%</div>
          </div>
        </div>

        <div>
          <button class="btn btn-secondary btn-sm" id="btn-hm-refresh">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            Refresh Shortlist
          </button>
        </div>
      </div>

      <!-- SIDE-BY-SIDE CANDIDATE COMPARISON MATRIX -->
      <div class="glass-panel" style="margin-bottom: 28px;">
        <div class="panel-header">
          <div class="panel-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Side-by-Side Candidate Comparison Matrix
            <span class="ai-badge">AI Synthesis Verdict</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-subtle);">
            Comparing ${comparedCandidates.length} Selected Candidates
          </div>
        </div>

        <div class="panel-body">
          <!-- AI Synthesis Banner -->
          <div class="ai-summary-box" style="margin-bottom: 20px;">
            <div class="ai-summary-header">
              <span class="ai-summary-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Autonomous Trade-Off Analysis
              </span>
              <span class="badge badge-active">Hiring Verdict</span>
            </div>
            <div class="ai-summary-text" id="comparison-verdict-text">
              ${this.generateComparisonVerdict(comparedCandidates)}
            </div>
          </div>

          <!-- Comparison Cards Grid -->
          <div class="comparison-grid">
            ${comparedCandidates.map(c => this.renderCompareCard(c)).join('')}
          </div>
        </div>
      </div>

      <!-- CANDIDATES AWAITING OFFICIAL HM DECISION -->
      <div class="glass-panel">
        <div class="panel-header">
          <div class="panel-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            Pending Hiring Manager Scorecards & Decisions
          </div>
          <span class="badge badge-neutral">${candidates.length} Profiles</span>
        </div>

        <div class="panel-body">
          <div style="display: flex; flex-direction: column; gap: 18px;">
            ${candidates.map(cand => this.renderHMSingleReviewRow(cand)).join('')}
          </div>
        </div>
      </div>

      <!-- HM Decision Modal -->
      <div class="modal-overlay" id="hm-decision-modal">
        <div class="modal-window">
          <div class="modal-header">
            <h2>Submit Hiring Manager Decision</h2>
            <button class="modal-close-btn" id="btn-close-hm-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div class="modal-content">
            <div id="hm-decision-modal-content">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderCompareCard(cand) {
    const job = appStore.getJobById(cand.jobId) || { title: "Role" };
    const dims = (cand.evaluation && cand.evaluation.dimensions) || { technicalMastery: 80, architectureScope: 80, problemSolving: 80, cultureLeadership: 80 };
    const isRecommended = cand.overallScore >= 92;

    return `
      <div class="compare-card ${isRecommended ? 'recommended' : ''}">
        ${isRecommended ? `<span class="compare-recommendation-badge">★ Top Recommended</span>` : ''}

        <div class="compare-profile-header">
          <div class="eval-avatar-lg" style="width: 48px; height: 48px; font-size: 1.1rem; margin: 0;">${cand.avatarInitials}</div>
          <div>
            <h4 style="font-size: 1rem; color: #0f172a;">${cand.name}</h4>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${cand.title}</div>
            <div style="font-size: 0.72rem; color: var(--accent-primary); font-weight: 600;">${job.title}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid var(--border-light); padding: 10px 14px; border-radius: var(--radius-md);">
          <span style="font-size: 0.8rem; color: var(--text-muted);">AI Match Score</span>
          <span class="score-pill ${cand.overallScore >= 85 ? 'score-high' : 'score-med'}" style="font-size: 0.9rem;">
            ★ ${cand.overallScore}%
          </span>
        </div>

        <!-- Dimensional Progress -->
        <div class="compare-row">
          <span class="compare-row-label">Technical Mastery</span>
          <div class="dimension-bar-track">
            <div class="dimension-bar-fill fill-indigo" style="width: ${dims.technicalMastery}%;"></div>
          </div>
          <div style="font-size: 0.72rem; text-align: right; color: var(--text-subtle);">${dims.technicalMastery}%</div>
        </div>

        <div class="compare-row">
          <span class="compare-row-label">Architecture & Scope</span>
          <div class="dimension-bar-track">
            <div class="dimension-bar-fill fill-cyan" style="width: ${dims.architectureScope}%;"></div>
          </div>
          <div style="font-size: 0.72rem; text-align: right; color: var(--text-subtle);">${dims.architectureScope}%</div>
        </div>

        <!-- Strengths Highlight -->
        <div class="compare-row">
          <span class="compare-row-label">Key Strengths</span>
          <div style="font-size: 0.78rem; color: #334155; line-height: 1.4;">
            ${(cand.evaluation && cand.evaluation.strengths && cand.evaluation.strengths[0]) || "Strong domain competencies."}
          </div>
        </div>

        <!-- Risks Highlight -->
        <div class="compare-row">
          <span class="compare-row-label">Risk / Verification Focus</span>
          <div style="font-size: 0.78rem; color: #b45309; line-height: 1.4;">
            ${(cand.evaluation && cand.evaluation.risks && cand.evaluation.risks[0]) || "Verify technical depth in screen."}
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 10px;">
          <button class="btn btn-secondary btn-sm btn-inspect-candidate" data-id="${cand.id}" style="flex: 1;">
            Full Scorecard
          </button>
          <button class="btn btn-primary btn-sm btn-open-hm-decision" data-id="${cand.id}" style="flex: 1;">
            Decide
          </button>
        </div>
      </div>
    `;
  },

  renderHMSingleReviewRow(cand) {
    const job = appStore.getJobById(cand.jobId) || { title: "Role" };
    const evalData = cand.evaluation || {};

    return `
      <div class="glass-panel" style="padding: 16px 20px; background: #ffffff; border: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 14px; min-width: 240px;">
          <div class="cand-avatar" style="width: 42px; height: 42px; font-size: 0.95rem;">${cand.avatarInitials}</div>
          <div>
            <h4 style="font-size: 0.95rem; color: #0f172a; margin-bottom: 2px;">${cand.name}</h4>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${cand.title} • ${cand.currentCompany || 'Tech Corp'}</div>
            <div style="font-size: 0.72rem; color: var(--accent-primary); font-weight: 600;">${job.title}</div>
          </div>
        </div>

        <!-- Score & Tier -->
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="text-align: right;">
            <div style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: #0f172a;">${cand.overallScore}%</div>
            <div style="font-size: 0.7rem; color: #059669; font-weight: 600;">${cand.matchTier}</div>
          </div>
        </div>

        <!-- Skills Snippet -->
        <div style="display: flex; gap: 5px; flex-wrap: wrap; max-width: 280px;">
          ${(cand.skills || []).slice(0, 3).map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>

        <!-- Decision Status or Action -->
        <div style="display: flex; align-items: center; gap: 10px;">
          ${cand.hmDecision ? `
            <div style="text-align: right;">
              <span class="badge ${cand.hmDecision.decision === 'advance' ? 'badge-active' : cand.hmDecision.decision === 'hold' ? 'badge-warning' : 'badge-danger'}">
                Decided: ${cand.hmDecision.decision.toUpperCase()}
              </span>
              <div style="font-size: 0.7rem; color: var(--text-subtle); margin-top: 2px;">by ${cand.hmDecision.reviewer}</div>
            </div>
          ` : `
            <button class="btn btn-outline-indigo btn-sm btn-inspect-candidate" data-id="${cand.id}">
              Review Kit
            </button>
            <button class="btn btn-primary btn-sm btn-open-hm-decision" data-id="${cand.id}">
              Submit Decision →
            </button>
          `}
        </div>
      </div>
    `;
  },

  generateComparisonVerdict(candidates) {
    if (candidates.length < 2) {
      return "Select at least two candidates in the pipeline to generate an autonomous side-by-side trade-off synthesis.";
    }

    const c1 = candidates[0];
    const c2 = candidates[1];
    
    return `Comparison between ${c1.name} (★${c1.overallScore}%) and ${c2.name} (★${c2.overallScore}%): ${c1.name} offers deeper low-level technical mastery and specialized optimization experience, making them the primary pick for immediate production ownership. Meanwhile, ${c2.name} brings broader cloud platform stability and distributed systems leadership. Recommendation: Advance ${c1.name} to immediate Onsite panel; hold ${c2.name} for secondary platform requisition.`;
  },

  openDecisionModal(candidateId) {
    const cand = appStore.getCandidateById(candidateId);
    if (!cand) return;

    const modal = document.getElementById("hm-decision-modal");
    const content = document.getElementById("hm-decision-modal-content");
    const job = appStore.getJobById(cand.jobId) || { title: "Open Role" };

    if (content) {
      content.innerHTML = `
        <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--border-light);">
          <h3 style="color: #0f172a; font-size: 1.1rem; margin-bottom: 4px;">${cand.name}</h3>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${cand.title} • Applied for <strong style="color: var(--accent-primary);">${job.title}</strong></div>
        </div>

        <!-- Rubric Rating Stars -->
        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="font-size: 0.82rem; font-weight: 600; color: #0f172a;">Technical Depth & Problem Solving</label>
            <select class="form-control" id="hm-rate-tech" style="width: auto; padding: 4px 10px;">
              <option value="5">⭐⭐⭐⭐⭐ 5/5 - Exceptional</option>
              <option value="4" selected>⭐⭐⭐⭐ 4/5 - Strong</option>
              <option value="3">⭐⭐⭐ 3/5 - Meets Expectations</option>
              <option value="2">⭐⭐ 2/5 - Borderline</option>
              <option value="1">⭐ 1/5 - Unsatisfactory</option>
            </select>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="font-size: 0.82rem; font-weight: 600; color: #0f172a;">Communication & Structured Thinking</label>
            <select class="form-control" id="hm-rate-comm" style="width: auto; padding: 4px 10px;">
              <option value="5" selected>⭐⭐⭐⭐⭐ 5/5 - Crisp & Collaborative</option>
              <option value="4">⭐⭐⭐⭐ 4/5 - Good</option>
              <option value="3">⭐⭐⭐ 3/5 - Adequate</option>
              <option value="2">⭐⭐ 2/5 - Needs Improvement</option>
            </select>
          </div>
        </div>

        <!-- Official Recommendation -->
        <div class="form-group">
          <label>Official Hiring Manager Decision *</label>
          <div style="display: flex; gap: 12px; margin-top: 6px;">
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; color: #34d399; font-weight: 600; font-size: 0.85rem;">
              <input type="radio" name="hm_decision_choice" value="advance" checked /> Advance to Interview
            </label>
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; color: #fbbf24; font-weight: 600; font-size: 0.85rem;">
              <input type="radio" name="hm_decision_choice" value="hold" /> Place on Hold
            </label>
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; color: #fb7185; font-weight: 600; font-size: 0.85rem;">
              <input type="radio" name="hm_decision_choice" value="reject" /> Reject Candidate
            </label>
          </div>
        </div>

        <!-- Feedback Notes -->
        <div class="form-group">
          <label>Hiring Manager Notes & Rubric Feedback</label>
          <textarea class="form-control" id="hm-feedback-notes" rows="4" placeholder="Document specific signals from scorecard review and interview justification...">${cand.overallScore >= 85 ? 'Candidate demonstrated exceptional alignment on core technical requirements. Advance immediately to technical onsite loop.' : 'Competent background but check system architecture scalability in next screen.'}</textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
          <button class="btn btn-secondary" id="btn-cancel-hm-submit">Cancel</button>
          <button class="btn btn-primary" id="btn-save-hm-decision" data-cand-id="${cand.id}">Submit Official Decision</button>
        </div>
      `;

      // Cancel button
      document.getElementById("btn-cancel-hm-submit").addEventListener("click", () => {
        modal.classList.remove("active");
      });

      // Submit decision
      document.getElementById("btn-save-hm-decision").addEventListener("click", () => {
        const choice = document.querySelector('input[name="hm_decision_choice"]:checked').value;
        const notes = document.getElementById("hm-feedback-notes").value;
        const ratings = {
          technical: document.getElementById("hm-rate-tech").value,
          communication: document.getElementById("hm-rate-comm").value
        };

        appStore.submitHiringManagerDecision(cand.id, choice, notes, ratings);
        modal.classList.remove("active");
        App.showToast("Decision Logged", `Hiring manager decision saved for ${cand.name}. Stage updated.`, "success");

        // Re-render HM view
        const container = document.getElementById("view-hiring_manager");
        if (container) {
          container.innerHTML = HiringManagerView.render();
          HiringManagerView.initListeners();
        }
      });
    }

    if (modal) modal.classList.add("active");
  },

  initListeners() {
    // Open decision modal buttons
    document.querySelectorAll(".btn-open-hm-decision").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const candId = e.currentTarget.dataset.id;
        this.openDecisionModal(candId);
      });
    });

    // Close modal
    const closeBtn = document.getElementById("btn-close-hm-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        const modal = document.getElementById("hm-decision-modal");
        if (modal) modal.classList.remove("active");
      });
    }

    // Refresh shortlist button
    const refreshBtn = document.getElementById("btn-hm-refresh");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        App.showToast("Shortlist Synchronized", "Refreshed candidate rankings and interview queue.", "info");
      });
    }

    // Subscribe to comparison updates
    appStore.subscribe("comparisonUpdated", () => {
      const container = document.getElementById("view-hiring_manager");
      if (container && appStore.currentView === "hiring_manager") {
        container.innerHTML = HiringManagerView.render();
        HiringManagerView.initListeners();
      }
    });
  }
};
