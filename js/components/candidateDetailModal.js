/* ==========================================================================
   TALENTPULSE AI - CANDIDATE EVALUATION MODAL & INSIGHTS
   ========================================================================== */

const CandidateDetailModal = {
  render() {
    return `
      <div class="modal-overlay" id="candidate-detail-modal">
        <div class="modal-window large-modal" style="max-width: 1100px;">
          <div class="modal-header">
            <h2 id="eval-modal-title">
              <span class="ai-badge ai-badge-pulse">Neural Evaluation Report</span>
              Candidate Insight Scorecard
            </h2>
            <button class="modal-close-btn" id="btn-close-candidate-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div class="modal-content" id="eval-modal-body">
            <!-- Dynamically populated via renderCandidateDetails() -->
          </div>

          <div class="modal-footer" id="eval-modal-footer">
            <!-- Dynamically populated stage actions -->
          </div>
        </div>
      </div>
    `;
  },

  open(candidateId) {
    const candidate = appStore.getCandidateById(candidateId);
    if (!candidate) return;

    appStore.selectedCandidateId = candidateId;
    const body = document.getElementById("eval-modal-body");
    const footer = document.getElementById("eval-modal-footer");
    const modal = document.getElementById("candidate-detail-modal");

    if (body) body.innerHTML = this.renderBodyContent(candidate);
    if (footer) footer.innerHTML = this.renderFooterActions(candidate);
    if (modal) modal.classList.add("active");

    this.initModalInnerListeners(candidate);
  },

  close() {
    const modal = document.getElementById("candidate-detail-modal");
    if (modal) modal.classList.remove("active");
  },

  renderBodyContent(candidate) {
    const job = appStore.getJobById(candidate.jobId) || { title: "General Role", department: "Engineering" };
    const evalData = candidate.evaluation || {};
    const dims = evalData.dimensions || { technicalMastery: 75, architectureScope: 75, problemSolving: 75, cultureLeadership: 75 };
    const score = candidate.overallScore;
    const isCompared = appStore.comparedCandidateIds.includes(candidate.id);

    return `
      <div class="eval-drawer">
        <!-- Left Sidebar: Profile & Scores -->
        <div class="eval-sidebar">
          <div class="eval-profile-card">
            <div class="eval-avatar-lg">${candidate.avatarInitials || "CD"}</div>
            <h3 class="eval-cand-name">${candidate.name}</h3>
            <div class="eval-cand-title">${candidate.title}</div>
            
            <div style="margin-bottom: 12px;">
              <span class="badge ${score >= 85 ? 'badge-active' : score >= 70 ? 'badge-warning' : 'badge-danger'}">
                Stage: ${this.formatStage(candidate.stage)}
              </span>
            </div>

            <div class="eval-meta-list">
              <div class="eval-meta-item">
                <span class="eval-meta-label">Target Role</span>
                <span class="eval-meta-val" style="color: var(--accent-cyan); font-weight: 600;">${job.title}</span>
              </div>
              <div class="eval-meta-item">
                <span class="eval-meta-label">Experience</span>
                <span class="eval-meta-val">${candidate.experienceYears || 5} Years</span>
              </div>
              <div class="eval-meta-item">
                <span class="eval-meta-label">Current / Prev</span>
                <span class="eval-meta-val">${candidate.currentCompany || "Enterprise Corp"}</span>
              </div>
              <div class="eval-meta-item">
                <span class="eval-meta-label">Location</span>
                <span class="eval-meta-val">${candidate.location || "Remote"}</span>
              </div>
              <div class="eval-meta-item">
                <span class="eval-meta-label">Email</span>
                <span class="eval-meta-val" style="font-family: var(--font-mono); font-size: 0.72rem;">${candidate.email || "N/A"}</span>
              </div>
            </div>
          </div>

          <!-- Overall Score Card -->
          <div class="overall-score-panel">
            <div class="eval-score-ring">
              <svg viewBox="0 0 76 76" style="width: 76px; height: 76px; transform: rotate(-90deg);">
                <circle cx="38" cy="38" r="30" class="score-bg-circle" fill="${score >= 85 ? '#ecfdf5' : score >= 70 ? '#fffbeb' : '#fff1f2'}" stroke="#e2e8f0" stroke-width="6"></circle>
                <circle cx="38" cy="38" r="30" stroke="${score >= 85 ? '#059669' : score >= 70 ? '#d97706' : '#e11d48'}"
                  stroke-width="6" stroke-dasharray="188.5" stroke-dashoffset="${188.5 - (188.5 * score) / 100}"
                  stroke-linecap="round" fill="none"></circle>
              </svg>
              <div style="position: absolute; text-align: center; pointer-events: none;">
                <div class="eval-score-number" style="color: ${score >= 85 ? '#047857' : score >= 70 ? '#b45309' : '#be123c'}; font-size: 1.45rem; font-weight: 800;">${score}</div>
              </div>
            </div>
            <div class="eval-score-details">
              <h4>Candidate Fit Score</h4>
              <div class="eval-match-tier">${candidate.matchTier || 'Evaluated Fit'}</div>
              <div style="font-size: 0.72rem; color: var(--text-subtle); margin-top: 4px;">Top ${Math.max(3, 100 - score)}% of applicant pool</div>
            </div>
          </div>

          <!-- Dimensional Metrics Bars -->
          <div class="glass-panel" style="padding: 18px;">
            <h4 style="font-size: 0.82rem; margin-bottom: 14px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">
              Weighted Evaluation Pillars
            </h4>
            <div class="eval-dimension-bars">
              <div class="dimension-row">
                <div class="dimension-header">
                  <span class="dimension-label">Technical Mastery</span>
                  <span class="dimension-val">${dims.technicalMastery}%</span>
                </div>
                <div class="dimension-bar-track">
                  <div class="dimension-bar-fill fill-indigo" style="width: ${dims.technicalMastery}%;"></div>
                </div>
              </div>

              <div class="dimension-row">
                <div class="dimension-header">
                  <span class="dimension-label">Architecture & Scale</span>
                  <span class="dimension-val">${dims.architectureScope}%</span>
                </div>
                <div class="dimension-bar-track">
                  <div class="dimension-bar-fill fill-cyan" style="width: ${dims.architectureScope}%;"></div>
                </div>
              </div>

              <div class="dimension-row">
                <div class="dimension-header">
                  <span class="dimension-label">Problem Solving</span>
                  <span class="dimension-val">${dims.problemSolving}%</span>
                </div>
                <div class="dimension-bar-track">
                  <div class="dimension-bar-fill fill-emerald" style="width: ${dims.problemSolving}%;"></div>
                </div>
              </div>

              <div class="dimension-row">
                <div class="dimension-header">
                  <span class="dimension-label">Culture & Leadership</span>
                  <span class="dimension-val">${dims.cultureLeadership}%</span>
                </div>
                <div class="dimension-bar-track">
                  <div class="dimension-bar-fill fill-violet" style="width: ${dims.cultureLeadership}%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content: Tabs -->
        <div class="eval-main-content">
          <div class="eval-tabs-nav">
            <button class="eval-tab-btn active" data-tab="scorecard">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              AI Scorecard
            </button>
            <button class="eval-tab-btn" data-tab="interview-kit">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Tailored Interview Kit
            </button>
            <button class="eval-tab-btn" data-tab="outreach">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              AI Outreach Drafter
            </button>
            <button class="eval-tab-btn" data-tab="json-schema">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              Structured JSON
            </button>
            <button class="eval-tab-btn" data-tab="resume-text">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>
              Original Resume
            </button>
          </div>

          <!-- TAB 1: AI Scorecard -->
          <div class="eval-tab-panel" id="tab-panel-scorecard">
            <!-- AI Executive Summary -->
            <div class="ai-summary-box">
              <div class="ai-summary-header">
                <span class="ai-summary-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  Autonomous Executive Synthesis
                </span>
                <span class="badge badge-active" style="font-size: 0.65rem;">Confidence 96%</span>
              </div>
              <div class="ai-summary-text">
                "${evalData.summary || 'Candidate demonstrated strong match across required technical criteria and competencies.'}"
              </div>
            </div>

            <!-- Skills Match Cloud -->
            <div style="margin-bottom: 20px;">
              <h4 style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">Extracted Competencies & Skill Verification</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${(candidate.skills || []).map(s => {
                  const isRequired = job.requiredSkills && job.requiredSkills.includes(s);
                  return `<span class="skill-tag ${isRequired ? 'matched' : ''}">
                    ${isRequired ? '✓ ' : ''}${s}
                  </span>`;
                }).join('')}
              </div>
            </div>

            <!-- Strengths vs Risks Grid -->
            <div class="insights-grid">
              <div class="insight-card card-strengths">
                <div class="insight-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Verified Key Strengths
                </div>
                <ul class="insight-list">
                  ${(evalData.strengths || ["Strong technical background", "Relevant industry domain experience"]).map(s => `
                    <li class="insight-item">
                      <span class="insight-bullet" style="color: #34d399;">✓</span>
                      <span>${s}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div class="insight-card card-risks">
                <div class="insight-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  Identified Gaps & Interview Risks
                </div>
                <ul class="insight-list">
                  ${(evalData.risks || ["Verify depth during technical architectural screen."]).map(r => `
                    <li class="insight-item">
                      <span class="insight-bullet" style="color: #fbbf24;">⚠</span>
                      <span>${r}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            ${candidate.hmDecision ? `
              <!-- Existing HM Feedback if submitted -->
              <div class="glass-panel" style="padding: 16px; border-color: #a7f3d0; background: #ecfdf5; margin-top: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: #065f46; font-size: 0.85rem;">Hiring Manager Evaluation (${candidate.hmDecision.reviewer})</strong>
                  <span class="badge badge-active">${candidate.hmDecision.decision.toUpperCase()}</span>
                </div>
                <div style="font-size: 0.82rem; color: #1e293b; line-height: 1.5;">
                  "${candidate.hmDecision.notes || 'No comments provided'}"
                </div>
              </div>
            ` : ''}
          </div>

          <!-- TAB 2: Interview Kit -->
          <div class="eval-tab-panel" id="tab-panel-interview-kit" style="display: none;">
            <div style="margin-bottom: 14px; font-size: 0.82rem; color: var(--text-muted);">
              Tailored interview question kit automatically synthesized to probe this candidate's specific background against the requirements of <strong style="color: #0f172a;">${job.title}</strong>.
            </div>

            <div class="interview-kit-list">
              ${(evalData.interviewKit || []).map((iq, i) => `
                <div class="interview-question-card">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="iq-type-badge iq-type-${iq.type}">Round ${i + 1}: ${iq.category || iq.type}</span>
                    <span style="font-size: 0.72rem; color: var(--text-subtle);">Rubric Signal Guide</span>
                  </div>
                  <div class="iq-question">${iq.question}</div>
                  <div class="iq-context"><strong>Why Ask This:</strong> ${iq.context}</div>
                  <div class="iq-signals">
                    <strong>Signals to Look For:</strong> ${iq.lookFor}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- TAB 3: AI Outreach Drafter -->
          <div class="eval-tab-panel" id="tab-panel-outreach" style="display: none;">
            <div class="outreach-generator-card">
              <div class="outreach-type-tabs">
                <button class="outreach-type-btn active" data-type="invite">Interview Invitation</button>
                <button class="outreach-type-btn" data-type="offer">Offer Proposal</button>
                <button class="outreach-type-btn" data-type="rejection">Constructive Rejection</button>
              </div>

              <div class="glass-panel" style="padding: 16px; background: #f8fafc; border: 1px solid var(--border-light);">
                <label style="font-size: 0.75rem; color: var(--text-subtle); display: block; margin-bottom: 6px;">Subject Line</label>
                <input type="text" class="form-control" id="outreach-subject" style="margin-bottom: 12px; font-weight: 600;" />
                
                <label style="font-size: 0.75rem; color: var(--text-subtle); display: block; margin-bottom: 6px;">Message Body</label>
                <textarea class="form-control" id="outreach-body" rows="9" style="font-family: var(--font-sans); font-size: 0.85rem; line-height: 1.6;"></textarea>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: var(--text-subtle);">Draft populated with candidate's top skill citations</span>
                <div style="display: flex; gap: 10px;">
                  <button class="btn btn-secondary btn-sm" id="btn-copy-outreach">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy Email
                  </button>
                  <button class="btn btn-primary btn-sm" id="btn-send-outreach">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    Send to Candidate
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 4: JSON Schema -->
          <div class="eval-tab-panel" id="tab-panel-json-schema" style="display: none;">
            <div class="json-viewer-container">
              <div class="json-viewer-header">
                <span>ATS SCHEMA: candidate-evaluation.v3.json</span>
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-secondary btn-sm" id="btn-copy-json">Copy JSON</button>
                  <button class="btn btn-secondary btn-sm" id="btn-download-json">Download Report</button>
                </div>
              </div>
              <pre class="json-code-block" id="eval-json-display">${JSON.stringify(evalData.structuredJson || candidate, null, 2)}</pre>
            </div>
          </div>

          <!-- TAB 5: Original Resume -->
          <div class="eval-tab-panel" id="tab-panel-resume-text" style="display: none;">
            <div class="glass-panel" style="padding: 18px; max-height: 420px; overflow-y: auto; background: #ffffff;">
              <pre style="white-space: pre-wrap; font-family: var(--font-sans); font-size: 0.82rem; color: #334155; line-height: 1.6;">${candidate.rawResume || 'No resume file text available for this profile.'}</pre>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderFooterActions(candidate) {
    const isCompared = appStore.comparedCandidateIds.includes(candidate.id);

    return `
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="btn btn-secondary btn-sm" id="btn-toggle-compare" data-id="${candidate.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            ${isCompared ? '✓ Selected in Comparison' : '+ Add to Comparison'}
          </button>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <select class="form-control" id="stage-select-dropdown" style="width: auto; padding: 7px 12px; font-size: 0.8rem;">
            <option value="sourced" ${candidate.stage === 'sourced' ? 'selected' : ''}>Stage: Sourced</option>
            <option value="screening" ${candidate.stage === 'screening' ? 'selected' : ''}>Stage: Screening</option>
            <option value="ai_evaluated" ${candidate.stage === 'ai_evaluated' ? 'selected' : ''}>Stage: AI Evaluated</option>
            <option value="hm_review" ${candidate.stage === 'hm_review' ? 'selected' : ''}>Stage: HM Review</option>
            <option value="interview" ${candidate.stage === 'interview' ? 'selected' : ''}>Stage: Interview</option>
            <option value="offer" ${candidate.stage === 'offer' ? 'selected' : ''}>Stage: Offer</option>
            <option value="hired" ${candidate.stage === 'hired' ? 'selected' : ''}>Stage: Hired</option>
            <option value="rejected" ${candidate.stage === 'rejected' ? 'selected' : ''}>Stage: Rejected</option>
          </select>

          <button class="btn btn-primary btn-sm" id="btn-advance-next-stage">
            Advance Stage →
          </button>
        </div>
      </div>
    `;
  },

  initModalInnerListeners(candidate) {
    const job = appStore.getJobById(candidate.jobId) || appStore.jobs[0];

    // Tab switching
    document.querySelectorAll(".eval-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tab = e.currentTarget.dataset.tab;
        document.querySelectorAll(".eval-tab-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");

        document.querySelectorAll(".eval-tab-panel").forEach(p => p.style.display = "none");
        const activePanel = document.getElementById(`tab-panel-${tab}`);
        if (activePanel) activePanel.style.display = "block";

        if (tab === "outreach") {
          this.loadOutreachContent(candidate, job, "invite");
        }
      });
    });

    // Outreach Type Buttons
    document.querySelectorAll(".outreach-type-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".outreach-type-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        const type = e.currentTarget.dataset.type;
        this.loadOutreachContent(candidate, job, type);
      });
    });

    // Copy Outreach
    const copyOutreachBtn = document.getElementById("btn-copy-outreach");
    if (copyOutreachBtn) {
      copyOutreachBtn.addEventListener("click", () => {
        const body = document.getElementById("outreach-body").value;
        navigator.clipboard.writeText(body);
        App.showToast("Copied to Clipboard", "Personalized outreach draft copied.", "info");
      });
    }

    // Send Outreach
    const sendOutreachBtn = document.getElementById("btn-send-outreach");
    if (sendOutreachBtn) {
      sendOutreachBtn.addEventListener("click", () => {
        App.showToast("Email Dispatched", `Outreach sent to ${candidate.email}`, "success");
      });
    }

    // Copy JSON
    const copyJsonBtn = document.getElementById("btn-copy-json");
    if (copyJsonBtn) {
      copyJsonBtn.addEventListener("click", () => {
        const jsonText = document.getElementById("eval-json-display").textContent;
        navigator.clipboard.writeText(jsonText);
        App.showToast("JSON Copied", "Standardized ATS evaluation payload copied.", "info");
      });
    }

    // Download JSON
    const downloadJsonBtn = document.getElementById("btn-download-json");
    if (downloadJsonBtn) {
      downloadJsonBtn.addEventListener("click", () => {
        const jsonText = document.getElementById("eval-json-display").textContent;
        const blob = new Blob([jsonText], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${candidate.name.replace(/\s+/g, '_')}_evaluation.json`;
        a.click();
        URL.revokeObjectURL(url);
        App.showToast("Report Downloaded", "Structured evaluation JSON downloaded.", "success");
      });
    }

    // Toggle Compare Button
    const compareBtn = document.getElementById("btn-toggle-compare");
    if (compareBtn) {
      compareBtn.addEventListener("click", () => {
        appStore.toggleCompareCandidate(candidate.id);
        const isCompared = appStore.comparedCandidateIds.includes(candidate.id);
        compareBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          ${isCompared ? '✓ Selected in Comparison' : '+ Add to Comparison'}
        `;
        App.showToast("Comparison List", isCompared ? `Added ${candidate.name} to comparison.` : `Removed ${candidate.name} from comparison.`, "info");
      });
    }

    // Change stage dropdown
    const stageDropdown = document.getElementById("stage-select-dropdown");
    if (stageDropdown) {
      stageDropdown.addEventListener("change", (e) => {
        const newStage = e.target.value;
        appStore.updateCandidateStage(candidate.id, newStage);
        App.showToast("Stage Updated", `${candidate.name} moved to ${this.formatStage(newStage)}.`, "success");
      });
    }

    // Advance next stage button
    const advanceBtn = document.getElementById("btn-advance-next-stage");
    if (advanceBtn) {
      advanceBtn.addEventListener("click", () => {
        const stages = ["sourced", "screening", "ai_evaluated", "hm_review", "interview", "offer", "hired"];
        const curIdx = stages.indexOf(candidate.stage);
        if (curIdx >= 0 && curIdx < stages.length - 1) {
          const nextStage = stages[curIdx + 1];
          appStore.updateCandidateStage(candidate.id, nextStage);
          if (stageDropdown) stageDropdown.value = nextStage;
          App.showToast("Advanced Stage", `${candidate.name} advanced to ${this.formatStage(nextStage)}.`, "success");
        } else {
          App.showToast("Completed", `${candidate.name} has reached the terminal hiring stage.`, "info");
        }
      });
    }
  },

  loadOutreachContent(candidate, job, type) {
    const outreach = AIEngine.generateOutreachEmail(candidate, job, type);
    const subInput = document.getElementById("outreach-subject");
    const bodyInput = document.getElementById("outreach-body");
    if (subInput) subInput.value = outreach.subject;
    if (bodyInput) bodyInput.value = outreach.body;
  },

  formatStage(stage) {
    const names = {
      sourced: "Sourced",
      screening: "Screening",
      ai_evaluated: "AI Evaluated",
      hm_review: "HM Review",
      interview: "Interview",
      offer: "Offer Extended",
      hired: "Hired",
      rejected: "Archived / Rejected"
    };
    return names[stage] || stage;
  },

  initListeners() {
    const closeBtn = document.getElementById("btn-close-candidate-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }
  }
};
