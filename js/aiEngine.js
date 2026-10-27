/* ==========================================================================
   TALENTPULSE AI - INTELLIGENCE & EVALUATION ENGINE
   ========================================================================== */

const AIEngine = {
  /**
   * Generates a complete, structured job description from a brief user prompt
   */
  async generateJobDescription(promptText, department = "Engineering", level = "Senior") {
    // Simulate real AI processing latency for authentic feedback
    await new Promise(r => setTimeout(r, 600));

    const cleanPrompt = promptText.trim();
    const isAI = /ai|ml|llm|deep learning|vision|nlp|agent/i.test(cleanPrompt);
    const isDesign = /design|ux|ui|figma|product designer/i.test(cleanPrompt);
    const isLeadership = /manager|director|lead|head|vp/i.test(cleanPrompt);

    let title = cleanPrompt;
    if (!title.includes(level) && !isLeadership) {
      title = `${level} ${title}`;
    }

    let requiredSkills = [];
    let preferredSkills = [];
    let summary = "";
    let responsibilities = [];
    let salary = "$175,000 - $220,000 + Equity";
    let rubricWeights = { technical: 35, architecture: 35, problemSolving: 15, cultureLeadership: 15 };

    if (isAI) {
      requiredSkills = ["Python", "PyTorch", "vLLM", "Distributed Training", "CUDA", "Kubernetes", "Ray"];
      preferredSkills = ["Triton", "TensorRT-LLM", "FlashAttention", "HuggingFace", "FP8 Quantization"];
      summary = `Lead the engineering and optimization of high-performance ${cleanPrompt} pipelines, model inference architectures, and distributed systems.`;
      responsibilities = [
        `Architect and optimize scalable distributed systems supporting ${cleanPrompt} at production scale.`,
        "Profile GPU memory utilization, throughput latency SLAs, and memory-bandwidth bottlenecks.",
        "Collaborate with cross-functional AI research and product engineering teams to deploy state-of-the-art models."
      ];
      salary = "$210,000 - $265,000 + Equity";
      rubricWeights = { technical: 40, architecture: 30, problemSolving: 15, cultureLeadership: 15 };
    } else if (isDesign) {
      requiredSkills = ["Figma", "Design Systems", "Generative UX", "Design Tokens", "Prototyping", "User Research"];
      preferredSkills = ["HTML/CSS", "Framer", "Information Architecture", "Enterprise SaaS"];
      summary = `Drive end-to-end user experience, interactive prototyping, and system design for next-generation ${cleanPrompt} interfaces.`;
      responsibilities = [
        `Lead user research, journey mapping, and usability benchmarking for ${cleanPrompt}.`,
        "Establish unified design tokens, component accessibility guidelines, and cross-platform libraries.",
        "Partner closely with frontend architects and product managers to ensure pixel-perfect fidelity."
      ];
      salary = "$165,000 - $205,000";
      rubricWeights = { technical: 30, architecture: 30, problemSolving: 25, cultureLeadership: 15 };
    } else if (isLeadership) {
      requiredSkills = ["Team Leadership", "Strategic Planning", "Agile / Scrum", "Hiring & Mentorship", "Distributed Systems", "Incident Management"];
      preferredSkills = ["FinOps", "Executive Communication", "Budget Management", "Multi-region Scale"];
      summary = `Scale, mentor, and empower an elite cross-functional engineering team focused on ${cleanPrompt}.`;
      responsibilities = [
        `Hire, mentor, and develop high-performing engineers across multiple time zones.`,
        "Champion engineering excellence, operational uptime SLAs, and transparent sprint velocity.",
        "Align technical roadmaps with executive product priorities and organizational business OKRs."
      ];
      salary = "$225,000 - $280,000 + Equity";
      rubricWeights = { technical: 25, architecture: 25, problemSolving: 20, cultureLeadership: 30 };
    } else {
      requiredSkills = ["TypeScript", "React", "Node.js", "PostgreSQL", "System Design", "Docker", "AWS"];
      preferredSkills = ["GraphQL", "Redis", "Kafka", "CI/CD", "TailwindCSS"];
      summary = `Architect and implement scalable, resilient full-stack systems supporting ${cleanPrompt}.`;
      responsibilities = [
        `Design and implement mission-critical web applications and microservices for ${cleanPrompt}.`,
        "Drive code reviews, automated CI/CD pipelines, and high-performance database schema tuning.",
        "Partner with UX designers and product managers to deliver rapid, user-centric feature iterations."
      ];
    }

    return {
      title,
      department,
      location: "San Francisco, CA / Remote",
      type: "Full-Time",
      salary,
      summary,
      responsibilities,
      requiredSkills,
      preferredSkills,
      experienceLevel: `${level} (5+ years)`,
      rubricWeights
    };
  },

  /**
   * Evaluates a candidate's resume against a target job requisition
   */
  async evaluateResume(resumeText, targetJob, candidateName = "Candidate") {
    // Simulate real neural processing
    await new Promise(r => setTimeout(r, 750));

    const text = resumeText.toLowerCase();

    // 1. Skill Matching
    const matchedRequired = targetJob.requiredSkills.filter(s => text.includes(s.toLowerCase()));
    const missingRequired = targetJob.requiredSkills.filter(s => !text.includes(s.toLowerCase()));
    const matchedPreferred = (targetJob.preferredSkills || []).filter(s => text.includes(s.toLowerCase()));

    const reqRatio = matchedRequired.length / Math.max(1, targetJob.requiredSkills.length);
    const prefRatio = matchedPreferred.length / Math.max(1, (targetJob.preferredSkills || []).length || 1);

    // 2. Experience & Seniority Extraction
    let experienceYears = 5;
    const yearMatches = text.match(/(\d+)\+?\s*(years|yrs)/g);
    if (yearMatches && yearMatches.length > 0) {
      const numbers = yearMatches.map(m => parseInt(m)).filter(n => !isNaN(n) && n < 30);
      if (numbers.length > 0) experienceYears = Math.max(...numbers);
    }

    // 3. Dimensional Scoring
    const technicalMastery = Math.min(99, Math.round(55 + reqRatio * 38 + prefRatio * 7));
    const architectureScope = Math.min(98, Math.round(50 + Math.min(experienceYears, 10) * 3.5 + (text.includes("architect") || text.includes("distributed") || text.includes("scale") ? 12 : 5)));
    const problemSolving = Math.min(98, Math.round(60 + (text.includes("reduced") || text.includes("increased") || text.includes("optimized") || text.includes("%") ? 25 : 10) + Math.random() * 8));
    const cultureLeadership = Math.min(98, Math.round(60 + (text.includes("mentor") || text.includes("lead") || text.includes("collaborat") ? 22 : 10) + Math.random() * 8));

    // 4. Weighted Composite Score
    const weights = targetJob.rubricWeights || { technical: 35, architecture: 35, problemSolving: 15, cultureLeadership: 15 };
    const totalWeight = weights.technical + weights.architecture + weights.problemSolving + weights.cultureLeadership;

    const overallScore = Math.round(
      (technicalMastery * weights.technical +
       architectureScope * weights.architecture +
       problemSolving * weights.problemSolving +
       cultureLeadership * weights.cultureLeadership) / totalWeight
    );

    let matchTier = "Potential Match";
    if (overallScore >= 90) matchTier = "Top 5% Strong Match";
    else if (overallScore >= 80) matchTier = "Strong Match";
    else if (overallScore < 70) matchTier = "Borderline / Needs Upskilling";

    // 5. Contextual Strengths
    const strengths = [];
    if (matchedRequired.length > 0) {
      strengths.push(`Demonstrated proficiency in core competencies: ${matchedRequired.slice(0, 4).join(", ")}.`);
    }
    if (text.includes("%") || text.includes("reduced") || text.includes("increased")) {
      strengths.push("Resume demonstrates quantifiable business impact, latency reductions, and measurable ROI metrics.");
    } else {
      strengths.push(`Extensive background spanning approximately ${experienceYears}+ years in relevant software environments.`);
    }
    if (matchedPreferred.length > 0) {
      strengths.push(`Bonus alignment with preferred domain tooling: ${matchedPreferred.join(", ")}.`);
    }

    // 6. Contextual Risks / Gaps
    const risks = [];
    if (missingRequired.length > 0) {
      risks.push(`Identified skill gaps in required technologies: ${missingRequired.slice(0, 3).join(", ")}. Probe depth in technical screen.`);
    }
    if (experienceYears < 4) {
      risks.push("Lower cumulative years of experience than standard seniority benchmark for this level.");
    }
    if (risks.length === 0) {
      risks.push("High candidate demand; likelihood of competing counter-offers requires proactive hiring manager engagement.");
    }

    // 7. Dynamic Interview Kit
    const interviewKit = [
      {
        type: "technical",
        category: `Deep Dive: ${matchedRequired[0] || "Architecture"}`,
        question: `How do you diagnose and resolve performance bottlenecks when scaling ${matchedRequired[0] || targetJob.requiredSkills[0]} under heavy concurrent loads?`,
        context: "Validates hands-on engineering depth and debugging methodology.",
        lookFor: "Root cause analysis, profiling tooling, metric-driven benchmarks, architectural trade-offs."
      },
      {
        type: "design",
        category: "System Scalability",
        question: `Walk through how you would architect a fault-tolerant subsystem for our ${targetJob.title} responsibilities, accounting for network partitions and failovers.`,
        context: "Assesses architectural maturity and edge-case anticipation.",
        lookFor: "Idempotency, backpressure management, graceful degradation, observable distributed traces."
      },
      {
        type: "behavioral",
        category: "Execution & Collaboration",
        question: "Describe a project where requirements shifted midway through implementation. How did you adapt the technical plan and communicate with stakeholders?",
        context: "Checks communication, agility, and business empathy.",
        lookFor: "Proactive communication, transparent trade-off analysis, prioritising customer value over sunk costs."
      }
    ];

    // 8. AI Executive Summary
    const summary = `${candidateName} demonstrates a ${overallScore}% fit for ${targetJob.title}. With ${experienceYears}+ years of experience and validated strengths in ${matchedRequired.slice(0, 3).join(", ") || "core disciplines"}, this candidate provides ${overallScore >= 80 ? "compelling immediate capability with minimal ramp-up time" : "promising potential with targeted technical probing recommended"}.`;

    // 9. Structured JSON Schema
    const structuredJson = {
      schemaVersion: "https://talentpulse.ai/schemas/v3/candidate-evaluation.json",
      evaluatedAt: new Date().toISOString(),
      candidateName,
      targetRequisition: {
        id: targetJob.id,
        title: targetJob.title,
        department: targetJob.department
      },
      overallScore,
      matchTier,
      recommendation: overallScore >= 85 ? "Strong Advance" : overallScore >= 72 ? "Advance with Probing" : "Hold / Re-route",
      skillAudit: {
        matchedRequired,
        missingRequired,
        matchedPreferred
      },
      dimensionBreakdown: {
        technicalMastery,
        architectureScope,
        problemSolving,
        cultureLeadership
      },
      strengths,
      risks,
      confidenceScore: 0.94
    };

    return {
      overallScore,
      matchTier,
      summary,
      dimensions: {
        technicalMastery,
        architectureScope,
        problemSolving,
        cultureLeadership
      },
      strengths,
      risks,
      interviewKit,
      skills: [...new Set([...matchedRequired, ...matchedPreferred])],
      experienceYears,
      structuredJson
    };
  },

  /**
   * Generates tailored communication copy for candidates
   */
  generateOutreachEmail(candidate, job, type = "invite") {
    const firstName = candidate.name.split(" ")[0];
    const topSkill = candidate.skills[0] || "technical background";
    const jobTitle = job.title;

    if (type === "invite") {
      return {
        subject: `Interview Invitation: ${jobTitle} at TalentPulse`,
        body: `Hi ${firstName},\n\nWe were tremendously impressed by your background, particularly your deep experience with ${topSkill} and proven engineering impact.\n\nOur hiring team reviewed your AI evaluation scorecard (scoring in our ${candidate.matchTier || "Top Match"} tier) and would love to invite you to an initial conversation with our engineering leadership to discuss the ${jobTitle} role.\n\nCould you let us know your availability over the next few days? We are flexible and excited to connect.\n\nBest regards,\nSarah Jenkins\nLead Technical Talent Partner`
      };
    } else if (type === "offer") {
      return {
        subject: `Offer of Employment: ${jobTitle} - TalentPulse AI`,
        body: `Dear ${firstName},\n\nOn behalf of the entire leadership team, it is our distinct pleasure to extend an offer for the position of ${jobTitle}!\n\nThroughout the evaluation and interview process, your mastery in ${topSkill} and cultural leadership stood out as exactly what our team needs for this next phase of scale.\n\nKey Details:\n- Role: ${jobTitle}\n- Target Compensation: ${job.salary}\n- Location: ${job.location}\n- Equity & Full Benefits: Included in formal agreement\n\nPlease find the attached formal agreement. We would love to celebrate your acceptance and welcome you aboard!\n\nWarm regards,\nAlex Rivera & the TalentPulse Team`
      };
    } else {
      // Respectful rejection with constructive feedback
      return {
        subject: `Update regarding your application for ${jobTitle}`,
        body: `Hi ${firstName},\n\nThank you very much for taking the time to share your background with us for the ${jobTitle} opening.\n\nWhile our team was genuinely impressed by your achievements in ${topSkill}, we have decided to advance other candidates whose specific experience more closely matches our immediate requirements at this time.\n\nWe would love to keep your profile in our active talent network for upcoming openings that align with your trajectory. Thank you again for your interest in TalentPulse, and we wish you continued success.\n\nSincerely,\nTalentPulse Hiring Committee`
      };
    }
  }
};
