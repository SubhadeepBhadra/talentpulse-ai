/* ==========================================================================
   TALENTPULSE AI - EXECUTIVE & ROI DASHBOARD COMPONENT
   ========================================================================== */

const ExecutiveDashboard = {
  render() {
    const stats = appStore.executiveStats;
    const userRole = appStore.roles.executive;

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h1>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            Executive Talent Intelligence & ROI Dashboard
            <span class="ai-badge ai-badge-pulse">Live Business Value</span>
          </h1>
          <p>Real-time hiring velocity, AI cost savings, talent conversion funnel, and workforce demand metrics.</p>
        </div>

        <div class="view-controls">
          <button class="btn btn-secondary btn-sm" id="btn-export-exec-report">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export Executive PDF / CSV
          </button>
        </div>
      </div>

      <!-- Top KPI Cards Grid -->
      <div class="kpi-grid">
        <!-- KPI 1: Time to Hire -->
        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Average Time-to-Hire</span>
            <div class="kpi-icon-badge kpi-icon-emerald">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-value">${stats.avgTimeToHire} Days</span>
            <span class="kpi-trend positive">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              -${stats.timeSavingsPercent}%
            </span>
          </div>
          <div class="kpi-subtitle">Down from 42 days prior to AI automation</div>
        </div>

        <!-- KPI 2: Recruiter Hours Saved -->
        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Recruiter Hours Saved</span>
            <div class="kpi-icon-badge kpi-icon-indigo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-value">${stats.screeningHoursSaved} hrs</span>
            <span class="kpi-trend positive">/month</span>
          </div>
          <div class="kpi-subtitle">Auto-screening 94% of applicant resumes</div>
        </div>

        <!-- KPI 3: Agency Fee Reduction -->
        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Agency Spend Saved</span>
            <div class="kpi-icon-badge kpi-icon-cyan">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-value">$${(stats.agencyFeeReduction).toLocaleString()}</span>
            <span class="kpi-trend positive">YTD</span>
          </div>
          <div class="kpi-subtitle">Replaced third-party technical headhunters</div>
        </div>

        <!-- KPI 4: Screen to Offer Conversion -->
        <div class="kpi-card">
          <div class="kpi-card-header">
            <span class="kpi-title">Interview-to-Offer Ratio</span>
            <div class="kpi-icon-badge kpi-icon-amber">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-value">${stats.aiScreenToOfferRate}%</span>
            <span class="kpi-trend positive">vs 24.1% avg</span>
          </div>
          <div class="kpi-subtitle">+44.3% higher precision with AI rubrics</div>
        </div>
      </div>

      <!-- 2-Column Analytics Section -->
      <div class="dashboard-grid-2col">
        <!-- Funnel Card -->
        <div class="glass-panel">
          <div class="panel-header">
            <div class="panel-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              End-to-End Talent Pipeline Funnel
            </div>
            <span class="badge badge-active">${stats.totalCandidatesProcessed} Total Applicants</span>
          </div>
          <div class="panel-body">
            <div class="funnel-container">
              ${stats.pipelineFunnel.map(f => `
                <div class="funnel-stage">
                  <div class="funnel-stage-header">
                    <span class="funnel-stage-name">
                      <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${f.color};"></span>
                      ${f.stage}
                    </span>
                    <span class="funnel-stage-count">${f.count} candidates (${f.percentage}%)</span>
                  </div>
                  <div class="funnel-bar-wrapper">
                    <div class="funnel-bar-fill" style="width: ${f.percentage}%; background: linear-gradient(90deg, ${f.color}, ${f.color}dd);"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Skills Scarcity Heatmap -->
        <div class="glass-panel">
          <div class="panel-header">
            <div class="panel-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              Critical Skills Demand vs Talent Pool Match
            </div>
            <span class="ai-badge">Neural Supply Index</span>
          </div>
          <div class="panel-body">
            <div class="skill-demand-grid">
              ${stats.skillsDemand.map(s => `
                <div class="skill-demand-card">
                  <div class="sd-name">${s.name}</div>
                  <div class="sd-demand-level">Requisition Demand: <strong style="color: #0f172a;">${s.demand}%</strong></div>
                  <div style="font-size: 0.68rem; color: var(--text-subtle);">Pool Match: ${s.poolMatch}%</div>
                  <div class="sd-meter-track">
                    <div class="sd-meter-fill" style="width: ${s.demand}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Department Hiring Health & AI Compliance Row -->
      <div class="dashboard-grid-2col">
        <!-- Department Hiring Target Progress -->
        <div class="glass-panel">
          <div class="panel-header">
            <div class="panel-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              Department Headcount Hiring Targets
            </div>
            <span class="badge badge-neutral">Q4 2026 OKRs</span>
          </div>
          <div class="panel-body">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Open Roles</th>
                  <th>Hired</th>
                  <th>Target</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                ${stats.departmentHealth.map(d => `
                  <tr>
                    <td><strong style="color: #0f172a;">${d.dept}</strong></td>
                    <td><span class="badge badge-info">${d.open} open</span></td>
                    <td><strong style="color: #059669;">${d.hired}</strong></td>
                    <td>${d.target}</td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <div class="dimension-bar-track" style="flex: 1; height: 6px;">
                          <div class="dimension-bar-fill fill-emerald" style="width: ${d.progress}%;"></div>
                        </div>
                        <span style="font-size: 0.75rem; font-weight: 700; color: #0f172a;">${d.progress}%</span>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- AI Ethical Compliance & Fair Hiring Audit -->
        <div class="glass-panel">
          <div class="panel-header">
            <div class="panel-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              AI Fair Hiring & Transparency Audit
            </div>
            <span class="badge badge-active">100% Certified</span>
          </div>
          <div class="panel-body">
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-md); padding: 14px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="color: #059669; font-size: 1.1rem;">✓</span>
                  <strong style="color: #065f46; font-size: 0.88rem;">Demographic Blindness Guardrails Active</strong>
                </div>
                <div style="font-size: 0.78rem; color: #1e293b; line-height: 1.4;">
                  Candidate scoring strictly evaluates technical competencies, architectural scope, and verified impact. PII, age, gender, and school status are excluded from model scoring weights.
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #f8fafc; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <span style="font-size: 0.8rem; color: var(--text-muted);">Explainability Index</span>
                <span style="font-weight: 700; color: #4f46e5;">99.4% (All decisions cited)</span>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #f8fafc; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <span style="font-size: 0.8rem; color: var(--text-muted);">Human-In-The-Loop Approval</span>
                <span style="font-weight: 700; color: #059669;">Mandatory for Stage Transitions</span>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #f8fafc; border: 1px solid var(--border-light); border-radius: var(--radius-md);">
                <span style="font-size: 0.8rem; color: var(--text-muted);">Audit Trail Integrity</span>
                <span style="font-weight: 700; color: #0f172a;">Cryptographically Timestamped</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  initListeners() {
    const exportBtn = document.getElementById("btn-export-exec-report");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        App.showToast("Export Ready", "Executive hiring velocity report generated (PDF).", "success");
      });
    }
  }
};
