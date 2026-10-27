/* ==========================================================================
   TALENTPULSE AI - CANDIDATE CAREER PORTAL COMPONENT
   ========================================================================== */

const CandidatePortalView = {
  render() {
    const jobs = appStore.jobs;

    return `
      <div class="portal-hero">
        <span class="ai-badge ai-badge-pulse" style="margin-bottom: 12px;">Candidate Experience Hub</span>
        <h1>Build What Comes Next.</h1>
        <p style="font-size: 1.05rem; line-height: 1.6; color: var(--text-muted);">
          Explore open engineering and design roles with transparent compensation, verified AI evaluation rubrics, and instant confidential resume match feedback.
        </p>
      </div>

      <!-- Quick AI Readiness Card -->
      <div class="glass-panel" style="max-width: 900px; margin: 0 auto 36px; padding: 24px; border: 1px solid #c7d2fe; background: linear-gradient(135deg, #eef2ff 0%, #f0fdfa 100%); box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="color: #0f172a; font-size: 1.15rem; display: flex; align-items: center; gap: 8px;">
              <span class="ai-badge">Instant AI Match</span>
              Preview Your Resume Fit Before Applying
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
              Run a private, confidential pre-screen to get actionable feedback and see how your skills map to our rubric.
            </p>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-portal-open-check">
            ⚡ Check My Resume Match
          </button>
        </div>
      </div>

      <!-- Open Job Requisitions on Careers Page -->
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
          <h2>Featured Open Requisitions (${jobs.length})</h2>
          <span style="font-size: 0.78rem; color: var(--text-subtle);">All roles support flexible remote / hybrid setups</span>
        </div>

        <div class="portal-jobs-grid">
          ${jobs.map(j => `
            <div class="portal-job-card glass-panel-interactive">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span class="badge badge-active">${j.department}</span>
                  <span style="font-size: 0.75rem; color: var(--text-subtle);">${j.location}</span>
                </div>

                <h3 class="pjc-title">${j.title}</h3>
                
                <div style="font-size: 0.82rem; color: #34d399; font-weight: 600; margin-bottom: 10px;">
                  ${j.salary}
                </div>

                <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
                  ${j.summary}
                </p>

                <div class="pjc-tags">
                  ${j.requiredSkills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
              </div>

              <div style="border-top: 1px solid var(--border-light); padding-top: 14px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.72rem; color: var(--text-subtle);">Experience: ${j.experienceLevel}</span>
                <button class="btn btn-primary btn-sm btn-portal-apply" data-job-id="${j.id}">
                  Apply with AI Match →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Candidate Apply & Match Modal -->
      <div class="modal-overlay" id="portal-apply-modal">
        <div class="modal-window">
          <div class="modal-header">
            <h2>
              <span class="ai-badge ai-badge-pulse">Candidate Portal</span>
              Submit Application & Match Preview
            </h2>
            <button class="modal-close-btn" id="btn-close-portal-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div class="modal-content">
            <div class="form-group">
              <label>Role</label>
              <select class="form-control" id="portal-job-select">
                ${jobs.map(j => `<option value="${j.id}">${j.title} (${j.department})</option>`).join('')}
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Your Name *</label>
                <input type="text" class="form-control" id="portal-cand-name" placeholder="Jordan Lee" value="Jordan Lee" />
              </div>
              <div class="form-group">
                <label>Your Email *</label>
                <input type="email" class="form-control" id="portal-cand-email" placeholder="jordan.lee@example.com" value="jordan.lee@example.com" />
              </div>
            </div>

            <div class="form-group">
              <label>Paste Resume or Key Technical Experience:</label>
              <textarea class="form-control" id="portal-resume-input" rows="6" placeholder="Paste your resume text here to see your AI Match and submit application...">Jordan Lee - Software Engineer | jordan.lee@example.com
EXPERIENCE:
Senior Systems Developer (2022 - Present)
- Built high-concurrency microservices using Python, PyTorch, and distributed Docker clusters.
- Scaled inference endpoints with Kubernetes and Redis caching.</textarea>
            </div>

            <!-- Match Result Box -->
            <div id="portal-match-result" style="display: none; margin-top: 16px;" class="glass-panel">
              <div style="padding: 16px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-md);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <strong style="color: #065f46; font-size: 0.95rem;">AI Match Preview: <span id="portal-score-display">86%</span></strong>
                  <span class="badge badge-active" id="portal-tier-display">Strong Match</span>
                </div>
                <div style="font-size: 0.82rem; color: #1e293b; line-height: 1.5;" id="portal-feedback-display">
                  Your profile strongly aligns with the core requirements. High confidence for technical interview round.
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" id="btn-cancel-portal-modal">Cancel</button>
            <button class="btn btn-secondary" id="btn-portal-preview-eval">⚡ Preview Match</button>
            <button class="btn btn-primary" id="btn-portal-submit-application">Submit Official Application</button>
          </div>
        </div>
      </div>
    `;
  },

  initListeners() {
    const checkBtn = document.getElementById("btn-portal-open-check");
    const modal = document.getElementById("portal-apply-modal");
    const closeBtn = document.getElementById("btn-close-portal-modal");
    const cancelBtn = document.getElementById("btn-cancel-portal-modal");

    if (checkBtn) checkBtn.addEventListener("click", () => modal.classList.add("active"));
    if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    if (cancelBtn) cancelBtn.addEventListener("click", () => modal.classList.remove("active"));

    // Apply button on job card
    document.querySelectorAll(".btn-portal-apply").forEach(b => {
      b.addEventListener("click", (e) => {
        const jobId = e.currentTarget.dataset.jobId;
        const jobSelect = document.getElementById("portal-job-select");
        if (jobSelect) jobSelect.value = jobId;
        if (modal) modal.classList.add("active");
      });
    });

    // Preview Match button
    const previewBtn = document.getElementById("btn-portal-preview-eval");
    if (previewBtn) {
      previewBtn.addEventListener("click", async () => {
        const text = document.getElementById("portal-resume-input").value;
        const jobId = document.getElementById("portal-job-select").value;
        const job = appStore.getJobById(jobId) || appStore.jobs[0];

        previewBtn.disabled = true;
        previewBtn.textContent = "Analyzing Match...";

        try {
          const evalResult = await AIEngine.evaluateResume(text, job, "Candidate");
          const resultBox = document.getElementById("portal-match-result");
          const scoreDisplay = document.getElementById("portal-score-display");
          const tierDisplay = document.getElementById("portal-tier-display");
          const feedbackDisplay = document.getElementById("portal-feedback-display");

          if (resultBox) resultBox.style.display = "block";
          if (scoreDisplay) scoreDisplay.textContent = `${evalResult.overallScore}%`;
          if (tierDisplay) tierDisplay.textContent = evalResult.matchTier;
          if (feedbackDisplay) feedbackDisplay.textContent = evalResult.summary;

          App.showToast("Match Preview Ready", `Your estimated fit is ${evalResult.overallScore}% (${evalResult.matchTier}).`, "success");
        } finally {
          previewBtn.disabled = false;
          previewBtn.textContent = "⚡ Preview Match";
        }
      });
    }

    // Submit Application
    const submitBtn = document.getElementById("btn-portal-submit-application");
    if (submitBtn) {
      submitBtn.addEventListener("click", async () => {
        const name = document.getElementById("portal-cand-name").value.trim() || "Jordan Lee";
        const email = document.getElementById("portal-cand-email").value.trim() || "applicant@example.com";
        const text = document.getElementById("portal-resume-input").value.trim();
        const jobId = document.getElementById("portal-job-select").value;
        const job = appStore.getJobById(jobId) || appStore.jobs[0];

        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";

        try {
          const evalResult = await AIEngine.evaluateResume(text, job, name);

          const newCandidate = appStore.addCandidate({
            name,
            title: "Applicant (" + (evalResult.skills[0] || "Software") + ")",
            email,
            phone: "+1 (555) 012-3948",
            location: "United States",
            jobId,
            stage: "sourced",
            experienceYears: evalResult.experienceYears,
            currentCompany: "Candidate Applicant Pool",
            overallScore: evalResult.overallScore,
            matchTier: evalResult.matchTier,
            skills: evalResult.skills,
            rawResume: text,
            evaluation: evalResult
          });

          if (modal) modal.classList.remove("active");
          App.showToast("Application Received!", `Welcome ${name}! Your application has entered our AI evaluation pipeline.`, "success");
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit Official Application";
        }
      });
    }
  }
};
