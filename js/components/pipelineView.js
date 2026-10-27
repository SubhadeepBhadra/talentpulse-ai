/* ==========================================================================
   TALENTPULSE AI - PIPELINE & KANBAN VIEW COMPONENT
   ========================================================================== */

const PipelineView = {
  stages: [
    { id: "sourced", name: "Sourced", color: "#64748b" },
    { id: "screening", name: "Screening", color: "#38bdf8" },
    { id: "ai_evaluated", name: "AI Evaluated", color: "#818cf8" },
    { id: "hm_review", name: "HM Review", color: "#c084fc" },
    { id: "interview", name: "Interview", color: "#fbbf24" },
    { id: "offer", name: "Offer", color: "#34d399" },
    { id: "hired", name: "Hired", color: "#10b981" }
  ],

  render() {
    const candidates = appStore.getFilteredCandidates();
    const jobs = appStore.jobs;
    const viewMode = appStore.filters.pipelineViewMode;

    return `
      <!-- Toolbar & Filters -->
      <div class="pipeline-toolbar">
        <div class="pipeline-filters">
          <!-- Job Filter Dropdown -->
          <select class="form-control" id="pipeline-filter-job" style="width: auto; padding: 7px 12px; font-size: 0.8rem;">
            <option value="all" ${appStore.filters.jobId === 'all' ? 'selected' : ''}>All Requisitions (${appStore.candidates.length} candidates)</option>
            ${jobs.map(j => `
              <option value="${j.id}" ${appStore.filters.jobId === j.id ? 'selected' : ''}>${j.title}</option>
            `).join('')}
          </select>

          <!-- Min AI Match Score Filter -->
          <select class="form-control" id="pipeline-filter-score" style="width: auto; padding: 7px 12px; font-size: 0.8rem;">
            <option value="0" ${appStore.filters.minScore === 0 ? 'selected' : ''}>Match: All Scores</option>
            <option value="70" ${appStore.filters.minScore === 70 ? 'selected' : ''}>Match: 70%+ (Potential+)</option>
            <option value="80" ${appStore.filters.minScore === 80 ? 'selected' : ''}>Match: 80%+ (Strong+)</option>
            <option value="90" ${appStore.filters.minScore === 90 ? 'selected' : ''}>Match: 90%+ (Top 5%)</option>
          </select>

          <!-- Candidate Search Input -->
          <div class="search-wrapper" style="width: 220px;">
            <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="search-input" id="pipeline-search-input" placeholder="Search candidate or skill..." value="${appStore.filters.searchQuery}" style="padding: 7px 10px 7px 32px;" />
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <!-- View Toggle (Kanban vs Table) -->
          <div class="view-toggle-group">
            <button class="view-toggle-btn ${viewMode === 'kanban' ? 'active' : ''}" id="btn-toggle-kanban" title="Kanban Board View">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="11" rx="1"/></svg>
              Kanban
            </button>
            <button class="view-toggle-btn ${viewMode === 'table' ? 'active' : ''}" id="btn-toggle-table" title="Table Grid View">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              Table
            </button>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-open-upload-modal">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Upload Resume
          </button>
        </div>
      </div>

      <!-- Main Stage Viewport -->
      <div id="pipeline-content-area">
        ${viewMode === 'kanban' ? this.renderKanbanBoard(candidates) : this.renderTableView(candidates)}
      </div>

      <!-- Upload Resume & Run AI Modal -->
      <div class="modal-overlay" id="upload-resume-modal">
        <div class="modal-window large-modal">
          <div class="modal-header">
            <h2>
              <span class="ai-badge ai-badge-pulse">Neural Evaluator</span>
              Upload Resume & Run AI Candidate Evaluation
            </h2>
            <button class="modal-close-btn" id="btn-close-upload-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div class="modal-content">
            <!-- Target Job Selector -->
            <div class="form-group">
              <label>Target Job Requisition *</label>
              <select class="form-control" id="upload-target-job">
                ${jobs.map(j => `<option value="${j.id}">${j.title} (${j.department})</option>`).join('')}
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Candidate Full Name</label>
                <input type="text" class="form-control" id="upload-cand-name" placeholder="e.g. Maya Lin" value="Maya Lin" />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" class="form-control" id="upload-cand-email" placeholder="m.lin@example.com" value="m.lin@example.com" />
              </div>
            </div>

            <!-- Pre-loaded Sample Resumes -->
            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.78rem; color: var(--text-muted); display: block; margin-bottom: 6px;">
                💡 Quick Test: Click a pre-built candidate profile to auto-fill realistic resume text:
              </label>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button type="button" class="btn btn-secondary btn-sm sample-resume-btn" data-preset="staff-ai">
                  ⚡ Staff AI / Triton Engineer
                </button>
                <button type="button" class="btn btn-secondary btn-sm sample-resume-btn" data-preset="fullstack-arch">
                  ⚡ Full-Stack Product Architect
                </button>
                <button type="button" class="btn btn-secondary btn-sm sample-resume-btn" data-preset="junior-dev">
                  ⚡ Borderline / Junior Candidate
                </button>
              </div>
            </div>

            <!-- Drag & Drop Zone -->
            <div class="dropzone" id="resume-dropzone">
              <div class="dropzone-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              </div>
              <div class="dropzone-title">Drop candidate resume PDF / DOCX / TXT here</div>
              <div class="dropzone-sub">or click to browse local files</div>
              <input type="file" id="resume-file-input" style="display: none;" accept=".pdf,.doc,.docx,.txt" />
            </div>

            <!-- Resume Text Area -->
            <div class="form-group" style="margin-top: 16px;">
              <label>Or Paste Raw Resume Text Content:</label>
              <textarea class="form-control" id="upload-resume-text" rows="6" placeholder="Paste full resume text here..."></textarea>
            </div>

            <!-- AI Real-time Reasoning Stream Box -->
            <div id="upload-ai-reasoning" style="display: none;" class="ai-reasoning-box">
              <div class="ai-step-item active" id="upload-step-1">
                <div class="ai-step-spinner"></div>
                Extracting work history, education, and domain competencies...
              </div>
              <div class="ai-step-item" id="upload-step-2">
                <span>•</span>
                Running semantic neural match against requisition rubric weights...
              </div>
              <div class="ai-step-item" id="upload-step-3">
                <span>•</span>
                Synthesizing structured candidate scorecard & tailored interview kit...
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" id="btn-cancel-upload-modal">Cancel</button>
            <button class="btn btn-primary" id="btn-run-ai-eval-submit">
              ⚡ Run AI Candidate Evaluation
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderKanbanBoard(candidates) {
    return `
      <div class="kanban-board-container" id="kanban-board">
        ${this.stages.map(stage => {
          const stageCandidates = candidates.filter(c => c.stage === stage.id);
          return `
            <div class="kanban-column" data-stage="${stage.id}">
              <div class="kanban-col-header">
                <div class="kanban-col-title-group">
                  <span class="kanban-stage-dot" style="background: ${stage.color}; box-shadow: 0 0 6px ${stage.color};"></span>
                  <span class="kanban-col-title">${stage.name}</span>
                </div>
                <span class="kanban-count-badge">${stageCandidates.length}</span>
              </div>

              <div class="kanban-card-list" data-stage="${stage.id}">
                ${stageCandidates.map(cand => this.renderCandidateCard(cand)).join('')}
                ${stageCandidates.length === 0 ? `
                  <div style="padding: 24px 12px; text-align: center; color: var(--text-dim); font-size: 0.75rem; border: 1px dashed rgba(255, 255, 255, 0.05); border-radius: var(--radius-md);">
                    Drag candidate here
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderCandidateCard(candidate) {
    const job = appStore.getJobById(candidate.jobId) || { title: "Open Role" };
    const score = candidate.overallScore;
    const scoreClass = score >= 85 ? "score-high" : score >= 70 ? "score-med" : "score-low";

    return `
      <div class="candidate-card" draggable="true" data-id="${candidate.id}">
        <div class="candidate-card-top">
          <div class="candidate-card-profile">
            <div class="cand-avatar">${candidate.avatarInitials}</div>
            <div class="cand-info">
              <h4>${candidate.name}</h4>
              <div class="cand-headline">${candidate.title}</div>
            </div>
          </div>
          <span class="score-pill ${scoreClass}" title="AI Match Score">
            ★ ${score}%
          </span>
        </div>

        <div class="cand-job-target">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6z"/></svg>
          ${job.title}
        </div>

        <div class="cand-skill-chips">
          ${(candidate.skills || []).slice(0, 3).map(s => `<span class="skill-tag">${s}</span>`).join('')}
          ${candidate.skills && candidate.skills.length > 3 ? `<span class="skill-tag">+${candidate.skills.length - 3}</span>` : ''}
        </div>

        <div class="cand-footer">
          <span>${candidate.experienceYears || 5}y exp • ${candidate.location ? candidate.location.split(',')[0] : 'Remote'}</span>
          <div class="cand-card-actions">
            <button class="btn btn-secondary btn-sm btn-inspect-candidate" data-id="${candidate.id}" title="Inspect AI Scorecard">
              AI Scorecard →
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderTableView(candidates) {
    return `
      <div class="pipeline-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Target Role</th>
              <th>AI Fit Score</th>
              <th>Stage</th>
              <th>Experience</th>
              <th>Top Skills</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${candidates.map(c => {
              const job = appStore.getJobById(c.jobId) || { title: "Open Role" };
              const scoreClass = c.overallScore >= 85 ? "score-high" : c.overallScore >= 70 ? "score-med" : "score-low";
              return `
                <tr>
                  <td>
                    <div class="cand-name-cell">
                      <div class="cand-avatar" style="width: 30px; height: 30px; font-size: 0.75rem;">${c.avatarInitials}</div>
                      <div>
                        <strong>${c.name}</strong>
                        <div style="font-size: 0.72rem; color: var(--text-subtle);">${c.title}</div>
                      </div>
                    </div>
                  </td>
                  <td><span style="color: var(--accent-cyan); font-weight: 500;">${job.title}</span></td>
                  <td>
                    <span class="score-pill ${scoreClass}">★ ${c.overallScore}%</span>
                  </td>
                  <td>
                    <span class="badge badge-neutral">${CandidateDetailModal.formatStage(c.stage)}</span>
                  </td>
                  <td>${c.experienceYears || 5} yrs</td>
                  <td>
                    <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                      ${(c.skills || []).slice(0, 2).map(s => `<span class="skill-tag" style="font-size: 0.68rem;">${s}</span>`).join('')}
                    </div>
                  </td>
                  <td style="font-size: 0.75rem; color: var(--text-subtle);">${c.appliedDate}</td>
                  <td>
                    <button class="btn btn-secondary btn-sm btn-inspect-candidate" data-id="${c.id}">
                      Scorecard
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  initListeners() {
    // Open/Close Upload Modal
    const openUploadBtn = document.getElementById("btn-open-upload-modal");
    const closeUploadBtn = document.getElementById("btn-close-upload-modal");
    const cancelUploadBtn = document.getElementById("btn-cancel-upload-modal");

    if (openUploadBtn) openUploadBtn.addEventListener("click", () => this.openUploadResumeModal());
    if (closeUploadBtn) closeUploadBtn.addEventListener("click", () => this.closeUploadResumeModal());
    if (cancelUploadBtn) cancelUploadBtn.addEventListener("click", () => this.closeUploadResumeModal());

    // Filter Listeners
    const jobFilter = document.getElementById("pipeline-filter-job");
    if (jobFilter) {
      jobFilter.addEventListener("change", (e) => {
        appStore.setFilters({ jobId: e.target.value });
      });
    }

    const scoreFilter = document.getElementById("pipeline-filter-score");
    if (scoreFilter) {
      scoreFilter.addEventListener("change", (e) => {
        appStore.setFilters({ minScore: parseInt(e.target.value) || 0 });
      });
    }

    const searchInput = document.getElementById("pipeline-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        appStore.setFilters({ searchQuery: e.target.value });
      });
    }

    // Toggle view buttons
    const kanbanBtn = document.getElementById("btn-toggle-kanban");
    const tableBtn = document.getElementById("btn-toggle-table");
    if (kanbanBtn) {
      kanbanBtn.addEventListener("click", () => appStore.setPipelineViewMode("kanban"));
    }
    if (tableBtn) {
      tableBtn.addEventListener("click", () => appStore.setPipelineViewMode("table"));
    }

    // Inspect Candidate Click
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-inspect-candidate");
      if (btn) {
        const candId = btn.dataset.id;
        CandidateDetailModal.open(candId);
      }
    });

    // Sample Resume Buttons
    document.querySelectorAll(".sample-resume-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const preset = e.currentTarget.dataset.preset;
        this.fillSampleResume(preset);
      });
    });

    // File Dropzone
    const dropzone = document.getElementById("resume-dropzone");
    const fileInput = document.getElementById("resume-file-input");
    if (dropzone && fileInput) {
      dropzone.addEventListener("click", () => fileInput.click());
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      });
      dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          const file = e.dataTransfer.files[0];
          this.handleFileUpload(file);
        }
      });
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleFileUpload(e.target.files[0]);
        }
      });
    }

    // Submit Resume & Run AI Evaluation
    const runEvalBtn = document.getElementById("btn-run-ai-eval-submit");
    if (runEvalBtn) {
      runEvalBtn.addEventListener("click", () => this.handleRunAIEvaluation());
    }

    // Drag and Drop Cards
    this.initDragAndDrop();

    // Subscribe to filter & candidate updates
    appStore.subscribe("filterChanged", () => this.refreshPipelineView());
    appStore.subscribe("candidatesUpdated", () => this.refreshPipelineView());
  },

  handleFileUpload(file) {
    document.getElementById("upload-cand-name").value = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("upload-resume-text").value = e.target.result;
      App.showToast("Resume Loaded", `Loaded content from ${file.name}`, "info");
    };
    reader.readAsText(file);
  },

  fillSampleResume(preset) {
    const nameInput = document.getElementById("upload-cand-name");
    const emailInput = document.getElementById("upload-cand-email");
    const textInput = document.getElementById("upload-resume-text");
    const jobSelect = document.getElementById("upload-target-job");

    if (preset === "staff-ai") {
      nameInput.value = "Maya Lin, Ph.D.";
      emailInput.value = "maya.lin@neuroscale.ai";
      if (jobSelect) jobSelect.value = "job-1";
      textInput.value = `Maya Lin, Ph.D. - San Francisco, CA | maya.lin@neuroscale.ai
EDUCATION:
- Ph.D. in Computer Science, Carnegie Mellon University (GPU Acceleration & Deep Learning)

EXPERIENCE:
Principal ML Systems Engineer @ NeuroScale (2022 - Present)
- Architected high-throughput vLLM inference clusters serving 30,000 requests per minute with p99 latency under 45ms.
- Authored custom Triton FP8 matrix multiplication kernels for H100 clusters, cutting memory bandwidth saturation by 35%.
- Implemented continuous batching and speculative decoding for 70B parameter open-weights models.

Senior PyTorch Engineer @ Anthropic Partner Lab (2019 - 2022)
- Deployed distributed training jobs across 256 Ray cluster nodes on Kubernetes with automated checkpoint recovery.`;
    } else if (preset === "fullstack-arch") {
      nameInput.value = "Carlos Mendes";
      emailInput.value = "carlos.m@nextarch.io";
      if (jobSelect) jobSelect.value = "job-2";
      textInput.value = `Carlos Mendes - New York, NY | carlos.m@nextarch.io
EXPERIENCE:
Lead Distributed Systems Architect @ NextArch (2021 - Present)
- Designed real-time event pipeline in TypeScript, React, and Node.js processing 10M events daily.
- Architected PostgreSQL database partitioning strategy reducing query latency by 55%.
- Built high-performance GraphQL federated gateway across 8 microservices deployed on AWS with Docker.`;
    } else {
      nameInput.value = "Sammy Jenkins";
      emailInput.value = "sammy.j@juniorweb.com";
      if (jobSelect) jobSelect.value = "job-1";
      textInput.value = `Sammy Jenkins - Austin, TX | sammy.j@juniorweb.com
EXPERIENCE:
Junior Web Developer @ LocalDev (2024 - Present)
- Built WordPress landing pages and basic HTML/CSS layouts.
- Wrote basic Python scripts for scraping and data cleanup.`;
    }

    App.showToast("Sample Populated", "Resume sample ready for AI evaluation.", "info");
  },

  async handleRunAIEvaluation() {
    const name = document.getElementById("upload-cand-name").value.trim() || "Candidate";
    const email = document.getElementById("upload-cand-email").value.trim() || "candidate@example.com";
    const resumeText = document.getElementById("upload-resume-text").value.trim();
    const jobId = document.getElementById("upload-target-job").value;
    const targetJob = appStore.getJobById(jobId) || appStore.jobs[0];

    if (!resumeText) {
      App.showToast("Validation Error", "Please provide resume text or upload a file.", "warning");
      return;
    }

    const reasoningBox = document.getElementById("upload-ai-reasoning");
    const step1 = document.getElementById("upload-step-1");
    const step2 = document.getElementById("upload-step-2");
    const step3 = document.getElementById("upload-step-3");
    const submitBtn = document.getElementById("btn-run-ai-eval-submit");

    if (reasoningBox) reasoningBox.style.display = "block";
    submitBtn.disabled = true;
    submitBtn.textContent = "AI Evaluating...";

    try {
      if (step1) step1.className = "ai-step-item active";
      await new Promise(r => setTimeout(r, 400));
      if (step1) {
        step1.className = "ai-step-item done";
        step1.innerHTML = "<span>✓</span> Extracted work history, education, and domain competencies.";
      }

      if (step2) step2.className = "ai-step-item active";
      const evaluation = await AIEngine.evaluateResume(resumeText, targetJob, name);

      if (step2) {
        step2.className = "ai-step-item done";
        step2.innerHTML = "<span>✓</span> Neural semantic match calibrated against rubric weights.";
      }
      if (step3) step3.className = "ai-step-item active";
      await new Promise(r => setTimeout(r, 350));
      if (step3) {
        step3.className = "ai-step-item done";
        step3.innerHTML = "<span>✓</span> Synthesized structured scorecard and tailored interview questions.";
      }

      // Add Candidate to store
      const newCand = appStore.addCandidate({
        name,
        title: evaluation.skills.slice(0, 2).join(" / ") + " Specialist",
        email,
        phone: "+1 (555) 019-8234",
        location: "United States (Evaluated)",
        jobId,
        stage: evaluation.overallScore >= 80 ? "ai_evaluated" : "screening",
        experienceYears: evaluation.experienceYears,
        currentCompany: "Evaluated Profile",
        overallScore: evaluation.overallScore,
        matchTier: evaluation.matchTier,
        skills: evaluation.skills,
        rawResume: resumeText,
        evaluation
      });

      this.closeUploadResumeModal();
      App.showToast("AI Evaluation Complete", `${name} scored ${evaluation.overallScore}% (${evaluation.matchTier}).`, "success");

      // Open their candidate modal immediately
      CandidateDetailModal.open(newCand.id);
    } catch (err) {
      console.error(err);
      App.showToast("Evaluation Error", "Could not complete AI evaluation.", "danger");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "⚡ Run AI Candidate Evaluation";
    }
  },

  initDragAndDrop() {
    // Card drag events
    document.querySelectorAll(".candidate-card").forEach(card => {
      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", card.dataset.id);
        card.classList.add("dragging");
      });
      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
      });
    });

    // Column drop events
    document.querySelectorAll(".kanban-card-list").forEach(col => {
      col.addEventListener("dragover", (e) => {
        e.preventDefault();
        col.closest(".kanban-column").classList.add("drag-over");
      });
      col.addEventListener("dragleave", () => {
        col.closest(".kanban-column").classList.remove("drag-over");
      });
      col.addEventListener("drop", (e) => {
        e.preventDefault();
        col.closest(".kanban-column").classList.remove("drag-over");
        const candidateId = e.dataTransfer.getData("text/plain");
        const newStage = col.dataset.stage;
        if (candidateId && newStage) {
          appStore.updateCandidateStage(candidateId, newStage);
          const cand = appStore.getCandidateById(candidateId);
          App.showToast("Stage Updated", `Moved ${cand ? cand.name : 'Candidate'} to ${CandidateDetailModal.formatStage(newStage)}.`, "info");
        }
      });
    });
  },

  refreshPipelineView() {
    const area = document.getElementById("pipeline-content-area");
    if (!area) return;
    const candidates = appStore.getFilteredCandidates();
    const viewMode = appStore.filters.pipelineViewMode;

    if (viewMode === "kanban") {
      area.innerHTML = this.renderKanbanBoard(candidates);
      this.initDragAndDrop();
    } else {
      area.innerHTML = this.renderTableView(candidates);
    }
  },

  openUploadResumeModal() {
    const modal = document.getElementById("upload-resume-modal");
    if (modal) modal.classList.add("active");
  },

  closeUploadResumeModal() {
    const modal = document.getElementById("upload-resume-modal");
    if (modal) modal.classList.remove("active");
  }
};
