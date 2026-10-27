/* ==========================================================================
   TALENTPULSE AI - JOBS & REQUISITIONS VIEW COMPONENT
   ========================================================================== */

const JobsView = {
  render() {
    const jobs = appStore.jobs;
    const canCreate = appStore.roles[appStore.currentRole].permissions.includes("create_job");

    return `
      <div class="view-header">
        <div class="view-title-group">
          <h1>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Open Job Requisitions
            <span class="ai-badge ai-badge-pulse">AI Rubrics Active</span>
          </h1>
          <p>Manage open requisitions, calibrate evaluation rubric weights, and architect job specs using AI.</p>
        </div>
        <div class="view-controls">
          <div class="search-wrapper">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="search-input" id="jobs-search-input" placeholder="Search roles or skills..." />
          </div>
          ${canCreate ? `
            <button class="btn btn-primary" id="btn-create-job-modal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Post Job with AI
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Jobs Grid -->
      <div class="portal-jobs-grid" id="jobs-list-container">
        ${this.renderJobCards(jobs)}
      </div>

      <!-- Create Job Modal -->
      <div class="modal-overlay" id="create-job-modal">
        <div class="modal-window large-modal">
          <div class="modal-header">
            <h2>
              <span class="ai-badge ai-badge-pulse">AI Architect</span>
              Post New Requisition with AI
            </h2>
            <button class="modal-close-btn" id="btn-close-job-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div class="modal-content">
            <!-- AI Prompt Generator Box -->
            <div class="glass-panel" style="padding: 18px; margin-bottom: 20px; border-color: rgba(99, 102, 241, 0.4);">
              <label style="font-weight: 700; color: #a5b4fc; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                AI Job Prompt Assistant
                <span class="form-label-desc">Describe the role in natural language or pick an example</span>
              </label>
              
              <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                <input type="text" class="form-control" id="ai-job-prompt" placeholder="e.g. Senior Distributed Rust Systems Architect for high-throughput streaming database..." value="Senior AI Agent Infrastructure Engineer, multi-agent evaluation, LangGraph, vLLM, remote" />
                <button class="btn btn-primary" id="btn-run-ai-job-gen" style="flex-shrink: 0;">
                  ⚡ Generate with AI
                </button>
              </div>

              <!-- Quick Prompt Pills -->
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="badge badge-neutral quick-prompt-btn" style="cursor: pointer;" data-prompt="Senior AI Agent Infrastructure Engineer, multi-agent evaluation, LangGraph, vLLM, remote">⚡ AI Agent Engineer</button>
                <button class="badge badge-neutral quick-prompt-btn" style="cursor: pointer;" data-prompt="Staff Kubernetes & FinOps Cloud Architect, $220k, hybrid SF">⚡ Cloud FinOps Architect</button>
                <button class="badge badge-neutral quick-prompt-btn" style="cursor: pointer;" data-prompt="Principal Generative UI/UX Designer, Design Tokens, Figma, New York">⚡ Generative UX Designer</button>
              </div>

              <!-- AI Status Output Box -->
              <div id="ai-job-reasoning" style="display: none;" class="ai-reasoning-box">
                <div class="ai-step-item active" id="job-gen-step-1">
                  <div class="ai-step-spinner"></div>
                  Synthesizing core competencies, tech stack, and responsibilities...
                </div>
                <div class="ai-step-item" id="job-gen-step-2">
                  <span>•</span>
                  Calibrating candidate evaluation rubric weights and salary bands...
                </div>
              </div>
            </div>

            <!-- Job Form Fields -->
            <form id="new-job-form">
              <div class="form-row">
                <div class="form-group">
                  <label>Job Title *</label>
                  <input type="text" class="form-control" id="form-job-title" required placeholder="e.g. Staff LLM Engineer" />
                </div>
                <div class="form-group">
                  <label>Department *</label>
                  <select class="form-control" id="form-job-department">
                    <option value="AI Research & Platform">AI Research & Platform</option>
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="Product Design & UX">Product Design & UX</option>
                    <option value="Cloud Platform">Cloud Platform</option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Location & Work Model</label>
                  <input type="text" class="form-control" id="form-job-location" value="San Francisco, CA (Hybrid / Remote)" />
                </div>
                <div class="form-group">
                  <label>Compensation Band</label>
                  <input type="text" class="form-control" id="form-job-salary" value="$190,000 - $240,000 + Equity" />
                </div>
              </div>

              <div class="form-group">
                <label>Role Summary & Mission</label>
                <textarea class="form-control" id="form-job-summary" rows="2"></textarea>
              </div>

              <div class="form-group">
                <label>Key Responsibilities (One per line)</label>
                <textarea class="form-control" id="form-job-responsibilities" rows="3"></textarea>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Required Skills (Comma separated)</label>
                  <input type="text" class="form-control" id="form-job-req-skills" placeholder="Python, PyTorch, Kubernetes" />
                </div>
                <div class="form-group">
                  <label>Preferred Skills (Comma separated)</label>
                  <input type="text" class="form-control" id="form-job-pref-skills" placeholder="vLLM, Triton, Ray" />
                </div>
              </div>

              <!-- Rubric Evaluation Weights -->
              <div class="glass-panel" style="padding: 16px; background: #f8fafc; border: 1px solid var(--border-light); margin-top: 10px;">
                <label style="font-weight: 700; color: #0f172a; margin-bottom: 8px; display: block;">
                  AI Candidate Evaluation Rubric Weights (Total 100%)
                </label>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px;">
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-subtle);">Technical Mastery</label>
                    <input type="number" class="form-control" id="weight-tech" value="40" min="0" max="100" />
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-subtle);">Architecture & Scale</label>
                    <input type="number" class="form-control" id="weight-arch" value="30" min="0" max="100" />
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-subtle);">Problem Solving</label>
                    <input type="number" class="form-control" id="weight-problem" value="15" min="0" max="100" />
                  </div>
                  <div>
                    <label style="font-size: 0.75rem; color: var(--text-subtle);">Culture & Leadership</label>
                    <input type="number" class="form-control" id="weight-culture" value="15" min="0" max="100" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" id="btn-cancel-job-modal">Cancel</button>
            <button class="btn btn-primary" id="btn-submit-publish-job">Publish Requisition</button>
          </div>
        </div>
      </div>
    `;
  },

  renderJobCards(jobs) {
    if (!jobs || jobs.length === 0) {
      return `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-subtle);">No requisitions match your criteria.</div>`;
    }

    return jobs.map(j => {
      const candidatesForJob = appStore.candidates.filter(c => c.jobId === j.id);
      const avgScore = candidatesForJob.length > 0 
        ? Math.round(candidatesForJob.reduce((a, b) => a + b.overallScore, 0) / candidatesForJob.length)
        : null;

      return `
        <div class="portal-job-card glass-panel-interactive" data-job-id="${j.id}">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <span class="badge badge-active">${j.status}</span>
              <span style="font-size: 0.75rem; color: var(--text-subtle);">${j.postedDate}</span>
            </div>
            
            <h3 class="pjc-title">${j.title}</h3>
            
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
              <span>🏢 ${j.department} • 📍 ${j.location}</span>
              <span>💰 <strong style="color: #34d399;">${j.salary}</strong></span>
              <span>👤 Hiring Manager: <strong style="color: #e2e8f0;">${j.hiringManager || "Alex Rivera"}</strong></span>
            </div>

            <p style="font-size: 0.8rem; line-height: 1.5; color: var(--text-muted); margin-bottom: 14px;">
              ${j.summary.slice(0, 140)}...
            </p>

            <div class="pjc-tags">
              ${j.requiredSkills.slice(0, 5).map(s => `<span class="skill-tag">${s}</span>`).join('')}
              ${j.requiredSkills.length > 5 ? `<span class="skill-tag">+${j.requiredSkills.length - 5}</span>` : ''}
            </div>
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 14px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 0.75rem; color: var(--text-muted);">
                <strong style="color: #0f172a; font-size: 0.9rem;">${candidatesForJob.length}</strong> Candidates
              </span>
              ${avgScore ? `
                <span class="score-pill ${avgScore >= 80 ? 'score-high' : 'score-med'}" title="Average Candidate Match Score">
                  Avg ${avgScore}%
                </span>
              ` : ''}
            </div>

            <button class="btn btn-secondary btn-sm btn-view-pipeline-for-job" data-job-id="${j.id}">
              View Pipeline →
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  initListeners() {
    // Open create job modal
    const openBtn = document.getElementById("btn-create-job-modal");
    if (openBtn) {
      openBtn.addEventListener("click", () => this.openCreateJobModal());
    }

    // Close modal
    const closeBtn = document.getElementById("btn-close-job-modal");
    const cancelBtn = document.getElementById("btn-cancel-job-modal");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeCreateJobModal());
    if (cancelBtn) cancelBtn.addEventListener("click", () => this.closeCreateJobModal());

    // Quick prompt pills
    document.querySelectorAll(".quick-prompt-btn").forEach(b => {
      b.addEventListener("click", (e) => {
        const promptInput = document.getElementById("ai-job-prompt");
        if (promptInput) {
          promptInput.value = e.currentTarget.dataset.prompt;
        }
      });
    });

    // Run AI Job Generator
    const runAIBtn = document.getElementById("btn-run-ai-job-gen");
    if (runAIBtn) {
      runAIBtn.addEventListener("click", async () => {
        const promptInput = document.getElementById("ai-job-prompt");
        if (!promptInput || !promptInput.value.trim()) return;

        const reasoningBox = document.getElementById("ai-job-reasoning");
        const step1 = document.getElementById("job-gen-step-1");
        const step2 = document.getElementById("job-gen-step-2");

        if (reasoningBox) reasoningBox.style.display = "block";
        if (step1) step1.className = "ai-step-item active";
        if (step2) step2.className = "ai-step-item";

        runAIBtn.disabled = true;
        runAIBtn.textContent = "Synthesizing...";

        try {
          const generated = await AIEngine.generateJobDescription(promptInput.value);

          if (step1) {
            step1.className = "ai-step-item done";
            step1.innerHTML = "<span>✓</span> Formulated job requirements, competencies, and responsibilities.";
          }
          if (step2) {
            step2.className = "ai-step-item active";
          }

          await new Promise(r => setTimeout(r, 400));
          if (step2) {
            step2.className = "ai-step-item done";
            step2.innerHTML = "<span>✓</span> Calibrated evaluation weights and salary bands.";
          }

          // Populate form
          document.getElementById("form-job-title").value = generated.title;
          document.getElementById("form-job-department").value = generated.department;
          document.getElementById("form-job-location").value = generated.location;
          document.getElementById("form-job-salary").value = generated.salary;
          document.getElementById("form-job-summary").value = generated.summary;
          document.getElementById("form-job-responsibilities").value = generated.responsibilities.join("\n");
          document.getElementById("form-job-req-skills").value = generated.requiredSkills.join(", ");
          document.getElementById("form-job-pref-skills").value = generated.preferredSkills.join(", ");

          if (generated.rubricWeights) {
            document.getElementById("weight-tech").value = generated.rubricWeights.technical;
            document.getElementById("weight-arch").value = generated.rubricWeights.architecture;
            document.getElementById("weight-problem").value = generated.rubricWeights.problemSolving;
            document.getElementById("weight-culture").value = generated.rubricWeights.cultureLeadership;
          }

          App.showToast("AI Requisition Generated", "Job requirements and rubric weights synthesized.", "success");
        } catch (err) {
          console.error(err);
          App.showToast("Error", "Could not generate job description.", "danger");
        } finally {
          runAIBtn.disabled = false;
          runAIBtn.textContent = "⚡ Generate with AI";
        }
      });
    }

    // Submit Publish Job
    const publishBtn = document.getElementById("btn-submit-publish-job");
    if (publishBtn) {
      publishBtn.addEventListener("click", () => {
        const title = document.getElementById("form-job-title").value.trim();
        if (!title) {
          App.showToast("Validation Error", "Please provide a job title.", "warning");
          return;
        }

        const department = document.getElementById("form-job-department").value;
        const location = document.getElementById("form-job-location").value.trim();
        const salary = document.getElementById("form-job-salary").value.trim();
        const summary = document.getElementById("form-job-summary").value.trim();
        const responsibilities = document.getElementById("form-job-responsibilities").value.split("\n").filter(r => r.trim());
        const requiredSkills = document.getElementById("form-job-req-skills").value.split(",").map(s => s.trim()).filter(Boolean);
        const preferredSkills = document.getElementById("form-job-pref-skills").value.split(",").map(s => s.trim()).filter(Boolean);

        const rubricWeights = {
          technical: parseInt(document.getElementById("weight-tech").value) || 35,
          architecture: parseInt(document.getElementById("weight-arch").value) || 35,
          problemSolving: parseInt(document.getElementById("weight-problem").value) || 15,
          cultureLeadership: parseInt(document.getElementById("weight-culture").value) || 15
        };

        const newJob = appStore.addJob({
          title,
          department,
          location,
          type: "Full-Time",
          salary,
          summary: summary || `Join us as a ${title} to drive mission-critical systems and scale.`,
          responsibilities: responsibilities.length > 0 ? responsibilities : ["Drive high-impact technical initiatives.", "Mentor team members and maintain reliability."],
          requiredSkills: requiredSkills.length > 0 ? requiredSkills : ["Software Architecture", "System Design"],
          preferredSkills,
          rubricWeights
        });

        this.closeCreateJobModal();
        App.showToast("Requisition Published", `"${newJob.title}" is now open for candidate evaluations.`, "success");
        
        // Refresh jobs list
        const container = document.getElementById("jobs-list-container");
        if (container) container.innerHTML = this.renderJobCards(appStore.jobs);
      });
    }

    // Search filter
    const searchInput = document.getElementById("jobs-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const q = e.target.value.toLowerCase().trim();
        const filtered = appStore.jobs.filter(j => 
          j.title.toLowerCase().includes(q) || 
          j.department.toLowerCase().includes(q) ||
          j.requiredSkills.some(s => s.toLowerCase().includes(q))
        );
        const container = document.getElementById("jobs-list-container");
        if (container) container.innerHTML = this.renderJobCards(filtered);
      });
    }

    // View pipeline for job click
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-view-pipeline-for-job");
      if (btn) {
        const jobId = btn.dataset.jobId;
        appStore.setFilters({ jobId });
        appStore.setView("pipeline");
      }
    });

    // Re-render when jobs updated
    appStore.subscribe("jobsUpdated", (jobs) => {
      const container = document.getElementById("jobs-list-container");
      if (container) container.innerHTML = this.renderJobCards(jobs);
    });
  },

  openCreateJobModal() {
    const modal = document.getElementById("create-job-modal");
    if (modal) modal.classList.add("active");
  },

  closeCreateJobModal() {
    const modal = document.getElementById("create-job-modal");
    if (modal) modal.classList.remove("active");
  }
};
