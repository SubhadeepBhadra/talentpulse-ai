/* ==========================================================================
   TALENTPULSE AI - REACTIVE STATE STORE
   ========================================================================== */

class AppStore {
  constructor() {
    this.currentRole = "recruiter";
    this.currentView = "pipeline";
    this.jobs = JSON.parse(JSON.stringify(SEED_DATA.jobs));
    this.candidates = JSON.parse(JSON.stringify(SEED_DATA.candidates));
    this.roles = SEED_DATA.roles;
    this.executiveStats = JSON.parse(JSON.stringify(SEED_DATA.executiveStats));
    
    // Filters
    this.filters = {
      jobId: "all",
      minScore: 0,
      searchQuery: "",
      pipelineViewMode: "kanban" // 'kanban' | 'table'
    };

    // Active Selection
    this.selectedCandidateId = null;
    this.comparedCandidateIds = ["cand-1", "cand-2"]; // default comparison pair
    this.activeJobId = "job-1";

    // Listeners
    this.listeners = new Map();
  }

  // Subscribe to state change events
  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  notify(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => cb(data));
    }
    // Also notify wildcard
    if (this.listeners.has("*")) {
      this.listeners.get("*").forEach(cb => cb({ event, data }));
    }
  }

  setRole(roleId) {
    if (!this.roles[roleId]) return;
    this.currentRole = roleId;
    
    // Auto-adjust default view according to role
    if (roleId === "hiring_manager") {
      this.currentView = "hiring_manager";
    } else if (roleId === "executive") {
      this.currentView = "executive";
    } else if (roleId === "candidate") {
      this.currentView = "candidate_portal";
    } else {
      this.currentView = "pipeline";
    }
    
    this.notify("roleChanged", this.roles[roleId]);
    this.notify("viewChanged", this.currentView);
  }

  setView(viewId) {
    this.currentView = viewId;
    this.notify("viewChanged", viewId);
  }

  setPipelineViewMode(mode) {
    this.filters.pipelineViewMode = mode;
    this.notify("filterChanged", this.filters);
  }

  setFilters(newFilters) {
    this.filters = { ...this.filters, ...newFilters };
    this.notify("filterChanged", this.filters);
  }

  getFilteredCandidates() {
    return this.candidates.filter(c => {
      // Job filter
      if (this.filters.jobId !== "all" && c.jobId !== this.filters.jobId) {
        return false;
      }
      // Min score
      if (c.overallScore < this.filters.minScore) {
        return false;
      }
      // Search query
      if (this.filters.searchQuery.trim() !== "") {
        const q = this.filters.searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q);
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchSkill = c.skills.some(s => s.toLowerCase().includes(q));
        if (!matchName && !matchTitle && !matchSkill) return false;
      }
      return true;
    });
  }

  getCandidateById(id) {
    return this.candidates.find(c => c.id === id);
  }

  getJobById(id) {
    return this.jobs.find(j => j.id === id);
  }

  updateCandidateStage(candidateId, newStage) {
    const candidate = this.getCandidateById(candidateId);
    if (!candidate) return;
    const oldStage = candidate.stage;
    candidate.stage = newStage;
    this.notify("candidateStageChanged", { candidate, oldStage, newStage });
    this.notify("candidatesUpdated", this.candidates);
  }

  addJob(jobData) {
    const newJob = {
      id: "job-" + (this.jobs.length + 1) + "-" + Date.now().toString(36),
      postedDate: "Just now",
      status: "Active",
      ...jobData
    };
    this.jobs.unshift(newJob);
    this.notify("jobsUpdated", this.jobs);
    return newJob;
  }

  addCandidate(candidateData) {
    const newCand = {
      id: "cand-" + (this.candidates.length + 1) + "-" + Date.now().toString(36),
      appliedDate: "Just now",
      avatarInitials: candidateData.name.split(" ").map(p => p[0]).join("").toUpperCase().slice(0, 2),
      ...candidateData
    };
    this.candidates.unshift(newCand);
    this.notify("candidatesUpdated", this.candidates);
    return newCand;
  }

  submitHiringManagerDecision(candidateId, decision, notes, ratings) {
    const candidate = this.getCandidateById(candidateId);
    if (!candidate) return;
    candidate.hmDecision = {
      decision, // 'advance' | 'hold' | 'reject'
      notes,
      ratings,
      submittedAt: new Date().toLocaleDateString(),
      reviewer: this.roles.hiring_manager.name
    };

    // Auto update stage if advancing
    if (decision === "advance") {
      candidate.stage = "interview";
    } else if (decision === "reject") {
      candidate.stage = "rejected";
    }
    
    this.notify("hmDecisionSubmitted", { candidate, decision });
    this.notify("candidatesUpdated", this.candidates);
  }

  toggleCompareCandidate(candidateId) {
    const idx = this.comparedCandidateIds.indexOf(candidateId);
    if (idx >= 0) {
      if (this.comparedCandidateIds.length > 1) {
        this.comparedCandidateIds.splice(idx, 1);
      }
    } else {
      if (this.comparedCandidateIds.length >= 3) {
        this.comparedCandidateIds.shift(); // keep max 3
      }
      this.comparedCandidateIds.push(candidateId);
    }
    this.notify("comparisonUpdated", this.comparedCandidateIds);
  }
}

// Global Store Instance
const appStore = new AppStore();
