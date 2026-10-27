/* ==========================================================================
   TALENTPULSE AI - SEED DATA & MOCK DATABASE
   ========================================================================== */

const SEED_DATA = {
  roles: {
    recruiter: {
      id: "recruiter",
      name: "Sarah Jenkins",
      title: "Lead Technical Recruiter",
      avatarInitials: "SJ",
      badgeText: "Talent Partner",
      permissions: ["create_job", "upload_resume", "evaluate_ai", "move_stage", "send_outreach", "view_pipeline"],
      description: "Full recruiting workspace: create requisitions, upload & parse candidate resumes, run AI evaluations, and manage pipeline stages."
    },
    hiring_manager: {
      id: "hiring_manager",
      name: "Alex Rivera",
      title: "Director of Engineering (AI & Platform)",
      avatarInitials: "AR",
      badgeText: "Hiring Manager",
      permissions: ["view_shortlist", "view_scorecards", "submit_scorecard", "compare_candidates", "approve_interview"],
      description: "Hiring Manager workspace: review AI evaluation reports, assess interview kits, compare top candidates side-by-side, and submit scorecards."
    },
    executive: {
      id: "executive",
      name: "Elena Vance",
      title: "VP of People & Talent Operations",
      avatarInitials: "EV",
      badgeText: "Executive Leader",
      permissions: ["view_executive_dashboard", "view_roi", "view_audit_metrics", "view_headcount"],
      description: "Executive intelligence dashboard: monitor hiring velocity, time-to-hire savings, pipeline conversion rates, and hiring ROI."
    },
    candidate: {
      id: "candidate",
      name: "Jordan Lee",
      title: "Prospective Candidate",
      avatarInitials: "JL",
      badgeText: "Applicant Portal",
      permissions: ["view_careers", "apply_job", "ai_resume_preview"],
      description: "Candidate Career Portal: explore open requisitions, upload resume, and get instant AI resume readiness & job-match feedback."
    }
  },

  jobs: [
    {
      id: "job-1",
      title: "Staff LLM / AI Infrastructure Engineer",
      department: "AI Research & Platform",
      location: "San Francisco, CA (Hybrid / Remote)",
      type: "Full-Time",
      salary: "$215,000 - $265,000 + Equity",
      status: "Active",
      postedDate: "3 days ago",
      hiringManager: "Alex Rivera",
      summary: "Lead the architecture and optimization of our large language model inference clusters, distributed caching, and GPU acceleration kernels.",
      responsibilities: [
        "Architect and scale multi-node distributed LLM inference engines utilizing vLLM, TensorRT-LLM, and Triton Inference Server.",
        "Profile and optimize memory bandwidth, continuous batching, and custom CUDA / Triton kernels for latency-critical endpoints.",
        "Collaborate with ML research scientists to deploy state-of-the-art foundation models with 99.99% reliability."
      ],
      requiredSkills: ["Python", "PyTorch", "vLLM", "CUDA", "Triton", "Kubernetes", "Distributed Systems", "Ray"],
      preferredSkills: ["TensorRT-LLM", "DeepSpeed", "FP8 Quantization", "FlashAttention"],
      experienceLevel: "Senior / Staff (6+ years)",
      rubricWeights: {
        technical: 40,
        architecture: 30,
        problemSolving: 15,
        cultureLeadership: 15
      }
    },
    {
      id: "job-2",
      title: "Lead Full-Stack Product Architect",
      department: "Core Engineering",
      location: "Remote (US / Canada)",
      type: "Full-Time",
      salary: "$185,000 - $230,000 + Equity",
      status: "Active",
      postedDate: "1 week ago",
      hiringManager: "David Kim",
      summary: "Own end-to-end architecture for our real-time collaborative workspace, high-throughput event processing, and micro-frontend platform.",
      responsibilities: [
        "Design scalable, resilient distributed web systems across TypeScript, React, Node.js, and PostgreSQL.",
        "Lead architectural RFCs and mentor senior engineers in high-performance state synchronization and offline caching.",
        "Ensure enterprise-grade SOC2 compliance, data isolation, and API latency SLAs under 50ms."
      ],
      requiredSkills: ["TypeScript", "React", "Node.js", "PostgreSQL", "System Design", "AWS", "Docker", "GraphQL"],
      preferredSkills: ["Redis", "Kafka", "WebSockets", "Terraform", "Next.js"],
      experienceLevel: "Lead / Principal (7+ years)",
      rubricWeights: {
        technical: 35,
        architecture: 35,
        problemSolving: 15,
        cultureLeadership: 15
      }
    },
    {
      id: "job-3",
      title: "Principal Product Designer (AI & Design Systems)",
      department: "Product Design & UX",
      location: "New York, NY (Hybrid)",
      type: "Full-Time",
      salary: "$175,000 - $215,000",
      status: "Active",
      postedDate: "5 days ago",
      hiringManager: "Maya Lin",
      summary: "Define the next generation of generative AI user experiences, autonomous agent interfaces, and multi-brand design token architectures.",
      responsibilities: [
        "Craft intuitive user paradigms for human-in-the-loop AI workflows, agent monitoring, and real-time inference feedback.",
        "Lead our cross-platform design system in Figma, establishing tokens, accessibility standards, and component libraries.",
        "Conduct rigorous user testing with recruiters, executives, and enterprise buyers to drive product adoption."
      ],
      requiredSkills: ["Figma", "Design Systems", "Generative UX", "Design Tokens", "Prototyping", "User Research"],
      preferredSkills: ["HTML/CSS/JS", "Framer", "Information Architecture", "Enterprise B2B"],
      experienceLevel: "Principal (6+ years)",
      rubricWeights: {
        technical: 35,
        architecture: 30,
        problemSolving: 20,
        cultureLeadership: 15
      }
    },
    {
      id: "job-4",
      title: "Engineering Manager - Cloud Infrastructure",
      department: "Cloud Platform",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-Time",
      salary: "$225,000 - $275,000 + Equity",
      status: "Active",
      postedDate: "2 weeks ago",
      hiringManager: "Alex Rivera",
      summary: "Build and scale an elite team of 8-12 site reliability and platform engineers supporting multi-region Kubernetes clusters.",
      responsibilities: [
        "Mentor, grow, and manage a team of distributed systems and cloud infrastructure engineers.",
        "Drive cloud reliability, 99.99% uptime SLAs, disaster recovery, and infrastructure cost optimization.",
        "Partner closely with product and security leadership to accelerate release cycles safely."
      ],
      requiredSkills: ["Team Leadership", "Kubernetes", "AWS / GCP", "Go", "Terraform", "Incident Management"],
      preferredSkills: ["FinOps", "eBPF", "Kafka", "Multi-tenant Networking"],
      experienceLevel: "Management (4+ yrs mgmt, 8+ yrs tech)",
      rubricWeights: {
        technical: 25,
        architecture: 25,
        problemSolving: 20,
        cultureLeadership: 30
      }
    }
  ],

  candidates: [
    {
      id: "cand-1",
      name: "Dr. Elena Rostova",
      title: "Senior AI Infrastructure Scientist",
      email: "e.rostova@labnexus.ai",
      phone: "+1 (415) 555-0192",
      location: "San Francisco, CA",
      jobId: "job-1",
      stage: "hm_review",
      experienceYears: 7,
      currentCompany: "ScaleAI / Modal Labs",
      education: "Ph.D. in Computer Engineering, Stanford University",
      overallScore: 95,
      matchTier: "Top 5% Strong Match",
      appliedDate: "Oct 22, 2026",
      avatarInitials: "ER",
      skills: ["PyTorch", "vLLM", "CUDA", "Triton", "Kubernetes", "Ray", "Distributed Training", "TensorRT-LLM", "FlashAttention"],
      rawResume: `Dr. Elena Rostova - San Francisco, CA | e.rostova@labnexus.ai
EDUCATION:
- Ph.D. in Computer Engineering, Stanford University (Specialization in Distributed Systems & GPU Accelerators)
- B.S. in Computer Science, UC Berkeley

EXPERIENCE:
Staff AI Infrastructure Engineer @ Modal Labs (2023 - Present)
- Architected distributed inference infrastructure serving 45M+ daily tokens across 128x H100 GPU clusters.
- Wrote custom Triton FP8 matrix multiplication kernels reducing p99 inference latency by 38%.
- Integrated continuous batching and PagedAttention via vLLM, doubling throughput per GPU.

Senior Deep Learning Systems Engineer @ ScaleAI (2020 - 2023)
- Built distributed training pipelines in PyTorch and Ray on 500+ AWS p4de instances with 99.9% uptime.
- Spearheaded GPU cluster autoscaling on Kubernetes with custom KEDA metrics.`,
      evaluation: {
        overallScore: 95,
        matchTier: "Top 5% Strong Match",
        summary: "Exceptional candidate with deep low-level GPU kernel expertise and real-world multi-node LLM scaling experience. Directly contributed to high-throughput inference stacks matching our core infrastructure priorities.",
        dimensions: {
          technicalMastery: 98,
          architectureScope: 94,
          problemSolving: 96,
          cultureLeadership: 90
        },
        strengths: [
          "Hands-on custom Triton FP8 kernel development delivering documented 38% latency reductions.",
          "Production mastery of vLLM PagedAttention and continuous batching across 100+ H100 clusters.",
          "Elite academic foundation (Stanford Ph.D.) combined with fast-paced startup execution at Modal & ScaleAI."
        ],
        risks: [
          "Strong bias towards open-source custom kernel tuning; verify alignment with managed cloud service constraints.",
          "Compensation expectation near top-of-market band."
        ],
        interviewKit: [
          {
            type: "technical",
            category: "CUDA & Memory Bottlenecks",
            question: "How do you profile and optimize kernel memory bandwidth saturation when serving 70B parameter models under high concurrency?",
            context: "Evaluates low-level understanding of GPU memory hierarchy, SRAM vs HBM bandwidth, and KV cache paging.",
            lookFor: "Mentions roofline model analysis, NCU (Nsight Compute) profiling, kernel fusion, and FP8 activation caching."
          },
          {
            type: "design",
            category: "Distributed LLM Serving",
            question: "Walk through designing a multi-region fallback routing system for latency-critical streaming LLM inference with cold-start mitigation.",
            context: "Tests architectural trade-offs between tensor parallelism, pipeline parallelism, and speculative decoding.",
            lookFor: "Considers speculative decoding overhead, prefix caching across cluster nodes, and graceful degradation during GPU preemptions."
          },
          {
            type: "behavioral",
            category: "Cross-Functional Research Alignment",
            question: "Describe a situation where a research scientist's proposed model architecture was too slow or costly to serve in production. How did you resolve it?",
            context: "Assesses collaborative problem solving between engineering rigor and cutting-edge ML research.",
            lookFor: "Constructive collaboration, benchmarking evidence, proposing architectural compromises like quantization or distillation."
          }
        ],
        structuredJson: {
          candidateId: "cand-1",
          candidateName: "Dr. Elena Rostova",
          jobRequisitionId: "job-1",
          matchScore: 95,
          recommendation: "Strong Hire",
          skillsAssessment: {
            requiredMatched: ["Python", "PyTorch", "vLLM", "CUDA", "Triton", "Kubernetes", "Distributed Systems", "Ray"],
            requiredMissing: [],
            preferredMatched: ["TensorRT-LLM", "FlashAttention", "FP8 Quantization"]
          },
          scorecardWeights: {
            technical: 40,
            architecture: 30,
            problemSolving: 15,
            culture: 15
          },
          evaluationVersion: "TalentPulse-v3.4"
        }
      }
    },
    {
      id: "cand-2",
      name: "Marcus Thorne",
      title: "Senior Kubernetes & Platform Engineer",
      email: "m.thorne@cloudops.io",
      phone: "+1 (206) 555-0814",
      location: "Seattle, WA",
      jobId: "job-1",
      stage: "ai_evaluated",
      experienceYears: 6,
      currentCompany: "CoreWeave",
      education: "B.S. in Computer Science, University of Washington",
      overallScore: 84,
      matchTier: "Strong Match",
      appliedDate: "Oct 24, 2026",
      avatarInitials: "MT",
      skills: ["Kubernetes", "Ray", "Python", "Distributed Systems", "Docker", "AWS", "Go", "PyTorch"],
      rawResume: `Marcus Thorne - Seattle, WA | m.thorne@cloudops.io
EXPERIENCE:
Senior Infrastructure Engineer @ CoreWeave (2022 - Present)
- Deployed and maintained large-scale GPU Kubernetes operators managing 2,000+ nodes.
- Built automated health checking and node drain controllers for failing InfiniBand interconnects.
- Reduced cold-start container launch latency by 45% using peer-to-peer image caching.

Cloud Systems Engineer @ Amazon Web Services (2019 - 2022)
- Maintained EC2 UltraCluster automation tooling in Python and Go.
- Implemented telemetry collection across distributed training jobs.`,
      evaluation: {
        overallScore: 84,
        matchTier: "Strong Match",
        summary: "Outstanding GPU cloud platform and Kubernetes infrastructure expertise. Highly proficient in cluster orchestration and InfiniBand reliability, though less focused on deep kernel-level Triton/CUDA development.",
        dimensions: {
          technicalMastery: 82,
          architectureScope: 88,
          problemSolving: 85,
          cultureLeadership: 84
        },
        strengths: [
          "Proven scale managing 2,000+ GPU nodes and automated InfiniBand failure handling.",
          "Extensive Kubernetes operator development and container image distribution optimization.",
          "Solid background in resilient distributed systems from AWS and CoreWeave."
        ],
        risks: [
          "Limited exposure to custom CUDA/Triton kernel writing; more of an infrastructure and orchestration engineer than an inference compiler engineer.",
          "Would require ramp-up time on model quantization and vLLM internals."
        ],
        interviewKit: [
          {
            type: "technical",
            category: "GPU Node Orchestration",
            question: "How do you detect and isolate silent data corruption or flaky GPU links in a large distributed training run?",
            context: "Tests real-world operational resilience in high-density GPU fabrics.",
            lookFor: "Mentions NCCL test suites, DCGM telemetry, proactive node cordon and drain strategies."
          },
          {
            type: "design",
            category: "Inference Cluster Auto-Scaling",
            question: "Design an autoscaling system for bursty LLM inference workloads that balances cold-start latency against expensive idle GPU hours.",
            context: "Evaluates cost vs latency engineering trade-offs.",
            lookFor: "Discusses predictive scheduling, warm pools, model weight caching on NVMe, and spot instance integration."
          },
          {
            type: "behavioral",
            category: "Production Incident Leadership",
            question: "Tell me about a high-severity production outage where multiple nodes failed simultaneously. How did you coordinate the response?",
            context: "Checks incident management and blameless post-mortem culture.",
            lookFor: "Calm communication, rapid mitigation over root cause identification during the fire, thorough RCA action items."
          }
        ],
        structuredJson: {
          candidateId: "cand-2",
          candidateName: "Marcus Thorne",
          jobRequisitionId: "job-1",
          matchScore: 84,
          recommendation: "Hire (Infrastructure Track)",
          skillsAssessment: {
            requiredMatched: ["Python", "Kubernetes", "Ray", "Distributed Systems"],
            requiredMissing: ["CUDA", "Triton"],
            preferredMatched: ["Docker", "InfiniBand", "Go"]
          },
          scorecardWeights: {
            technical: 40,
            architecture: 30,
            problemSolving: 15,
            culture: 15
          },
          evaluationVersion: "TalentPulse-v3.4"
        }
      }
    },
    {
      id: "cand-3",
      name: "Devon Zhang",
      title: "Staff Full-Stack Tech Lead",
      email: "devon.zhang@archtech.dev",
      phone: "+1 (512) 555-0331",
      location: "Austin, TX (Remote)",
      jobId: "job-2",
      stage: "interview",
      experienceYears: 8,
      currentCompany: "Linear / Figma Ecosystem",
      education: "B.S. in Software Engineering, UT Austin",
      overallScore: 93,
      matchTier: "Top 5% Strong Match",
      appliedDate: "Oct 18, 2026",
      avatarInitials: "DZ",
      skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "System Design", "GraphQL", "AWS", "Docker", "Redis", "WebSockets"],
      rawResume: `Devon Zhang - Austin, TX | devon.zhang@archtech.dev
EXPERIENCE:
Staff Software Architect @ Collaborative Cloud (2021 - Present)
- Architected local-first real-time CRDT sync engine supporting 100k concurrent active collaborators.
- Designed GraphQL federated gateway and reduced p95 API response times to 34ms.
- Mentored team of 14 engineers across frontend performance and distributed PostgreSQL schema sharding.

Senior Full-Stack Engineer @ Atlassian (2018 - 2021)
- Spearheaded React frontend migration to modern micro-frontend architecture.
- Built event-driven notification service using Kafka, Node.js, and Redis caching.`,
      evaluation: {
        overallScore: 93,
        matchTier: "Top 5% Strong Match",
        summary: "Phenomenal full-stack product architect with proven experience building real-time collaborative state synchronization engines. Flawless alignment with our TypeScript, React, GraphQL, and distributed backend stack.",
        dimensions: {
          technicalMastery: 95,
          architectureScope: 96,
          problemSolving: 92,
          cultureLeadership: 89
        },
        strengths: [
          "Demonstrated expertise in local-first sync and CRDT algorithms for multi-user collaboration.",
          "Deep mastery of PostgreSQL scaling, connection pooling, and GraphQL query optimization.",
          "Strong record of engineering mentorship and RFC leadership."
        ],
        risks: [
          "Enjoys bleeding-edge frontend tooling; ensure pragmatic adherence to stability and legacy browser support where needed."
        ],
        interviewKit: [
          {
            type: "technical",
            category: "Real-time State Synchronization",
            question: "How would you design conflict resolution for concurrent edits in a canvas document between offline and online clients?",
            context: "Tests real-time distributed state consistency.",
            lookFor: "Contrasts CRDTs vs OT (Operational Transformation), mentions vector clocks, tombstone cleanup, and memory overhead."
          },
          {
            type: "design",
            category: "Federated GraphQL Architecture",
            question: "Design an API gateway layer that aggregates 12 microservices with strict authorization policies and sub-40ms latency.",
            context: "Evaluates microservice integration and security boundary modeling.",
            lookFor: "Data loader caching, batching queries, distributed tracing with OpenTelemetry, and token-based field authorization."
          },
          {
            type: "behavioral",
            category: "Architectural Disagreements",
            question: "Tell me about an architectural RFC you proposed that received pushback from the team. How did you build consensus?",
            context: "Evaluates technical humility, communication, and pragmatic alignment.",
            lookFor: "Listened to counter-arguments, built small POC benchmarks, framed decisions around user impact rather than dogmatism."
          }
        ],
        structuredJson: {
          candidateId: "cand-3",
          candidateName: "Devon Zhang",
          jobRequisitionId: "job-2",
          matchScore: 93,
          recommendation: "Strong Hire",
          skillsAssessment: {
            requiredMatched: ["TypeScript", "React", "Node.js", "PostgreSQL", "System Design", "AWS", "Docker", "GraphQL"],
            requiredMissing: [],
            preferredMatched: ["Redis", "WebSockets"]
          },
          scorecardWeights: {
            technical: 35,
            architecture: 35,
            problemSolving: 15,
            culture: 15
          },
          evaluationVersion: "TalentPulse-v3.4"
        }
      }
    },
    {
      id: "cand-4",
      name: "Aria Montgomery",
      title: "Senior Frontend Engineer",
      email: "aria.mont@devstudio.com",
      phone: "+1 (312) 555-0922",
      location: "Chicago, IL",
      jobId: "job-2",
      stage: "screening",
      experienceYears: 5,
      currentCompany: "Shopify Partner Agency",
      education: "B.A. in Interactive Media, Northwestern University",
      overallScore: 73,
      matchTier: "Potential Match",
      appliedDate: "Oct 25, 2026",
      avatarInitials: "AM",
      skills: ["React", "TypeScript", "Next.js", "CSS/SCSS", "HTML", "REST APIs", "Node.js"],
      rawResume: `Aria Montgomery - Chicago, IL | aria.mont@devstudio.com
EXPERIENCE:
Senior Frontend Developer @ StudioSix (2022 - Present)
- Built 15+ responsive ecommerce storefronts in React, Next.js, and TypeScript.
- Implemented accessible design systems and CSS animation libraries.
- Integrated third-party checkout and inventory REST APIs.

Frontend Developer @ AgencyX (2020 - 2022)
- Developed client portals using React, Redux, and TailwindCSS.`,
      evaluation: {
        overallScore: 73,
        matchTier: "Potential Match",
        summary: "Talented frontend developer with strong visual and UI polish skills. However, the role requires deep distributed backend system design, database sharding, and high-scale architecture which are not evident in her background.",
        dimensions: {
          technicalMastery: 78,
          architectureScope: 62,
          problemSolving: 75,
          cultureLeadership: 76
        },
        strengths: [
          "Strong UI component craftsmanship and accessibility knowledge.",
          "Solid proficiency in React and modern TypeScript frontend workflows."
        ],
        risks: [
          "Missing significant backend architecture experience (PostgreSQL schema design, microservices, GraphQL federation).",
          "Experience is primarily agency/contract ecommerce rather than high-throughput enterprise SaaS."
        ],
        interviewKit: [
          {
            type: "technical",
            category: "Full-Stack Data Modeling",
            question: "How do you design an ACID-compliant transaction model for financial ledger updates across distributed databases?",
            context: "Probes backend depth.",
            lookFor: "Two-phase commits, saga patterns, idempotency keys, handling network timeouts."
          },
          {
            type: "behavioral",
            category: "Stepping into Architecture",
            question: "Tell me about a time you had to learn a complex backend technology rapidly to deliver a critical milestone.",
            context: "Tests growth mindset and adaptability.",
            lookFor: "Self-driven learning, seeking mentorship, asking informed questions, hands-on experimentation."
          }
        ],
        structuredJson: {
          candidateId: "cand-4",
          candidateName: "Aria Montgomery",
          jobRequisitionId: "job-2",
          matchScore: 73,
          recommendation: "Hold / Consider for Senior Frontend Role",
          skillsAssessment: {
            requiredMatched: ["React", "TypeScript", "Node.js"],
            requiredMissing: ["PostgreSQL", "System Design", "AWS", "GraphQL"],
            preferredMatched: ["Next.js"]
          },
          scorecardWeights: {
            technical: 35,
            architecture: 35,
            problemSolving: 15,
            culture: 15
          },
          evaluationVersion: "TalentPulse-v3.4"
        }
      }
    },
    {
      id: "cand-5",
      name: "Chloe Dupont",
      title: "Principal Design Systems Architect",
      email: "chloe.dupont@designlab.fr",
      phone: "+33 6 55 50 18 90",
      location: "New York, NY (Relocating / Visa Ready)",
      jobId: "job-3",
      stage: "offer",
      experienceYears: 7,
      currentCompany: "Datadog / Algolia",
      education: "Master in Interaction Design, ENSCI-Les Ateliers",
      overallScore: 94,
      matchTier: "Top 5% Strong Match",
      appliedDate: "Oct 12, 2026",
      avatarInitials: "CD",
      skills: ["Figma", "Design Systems", "Generative UX", "Design Tokens", "Prototyping", "User Research", "HTML/CSS/JS", "Framer"],
      rawResume: `Chloe Dupont - New York, NY | chloe.dupont@designlab.fr
EXPERIENCE:
Principal Design Systems Lead @ Datadog (2022 - Present)
- Architected enterprise multi-brand design token pipeline adopted by 350+ engineers and 40 designers.
- Designed AI natural-language query interface for log analytics, increasing query discovery by 62%.
- Established WCAG 2.1 AAA accessibility benchmarks across 80+ core UI components.

Senior Product Designer @ Algolia (2019 - 2022)
- Designed instant search UI library and interactive developer documentation.`,
      evaluation: {
        overallScore: 94,
        matchTier: "Top 5% Strong Match",
        summary: "World-class product designer and token architect. Combines rigorous design systems engineering with bleeding-edge generative AI UX patterns. Outstanding cultural and technical fit.",
        dimensions: {
          technicalMastery: 96,
          architectureScope: 95,
          problemSolving: 92,
          cultureLeadership: 93
        },
        strengths: [
          "Engineered enterprise design token pipeline adopted by 350+ engineers at Datadog.",
          "Pioneered generative AI query interfaces with measurable 62% engagement uplift.",
          "Deep technical fluency in Figma Variables, Style Dictionary, and code integration."
        ],
        risks: [
          "Currently in offer stage with competing enterprise SaaS offers; requires swift executive closing."
        ],
        interviewKit: [
          {
            type: "design",
            category: "Generative AI Mental Models",
            question: "How do you design UI feedback states for non-deterministic AI actions where confidence scores vary widely?",
            context: "Tests AI UX fluency.",
            lookFor: "Explainable AI, confidence indicators, progressive disclosure of reasoning, graceful error recovery."
          },
          {
            type: "behavioral",
            category: "Cross-Functional Token Governance",
            question: "How do you govern changes to fundamental color and spacing tokens without breaking live production applications?",
            context: "Tests systems thinking and governance.",
            lookFor: "Semantic versioning of tokens, automated visual regression diffs, cross-functional review committees."
          }
        ],
        structuredJson: {
          candidateId: "cand-5",
          candidateName: "Chloe Dupont",
          jobRequisitionId: "job-3",
          matchScore: 94,
          recommendation: "Strong Hire / Close Immediately",
          skillsAssessment: {
            requiredMatched: ["Figma", "Design Systems", "Generative UX", "Design Tokens", "Prototyping", "User Research"],
            requiredMissing: [],
            preferredMatched: ["HTML/CSS/JS", "Framer", "Information Architecture"]
          },
          scorecardWeights: {
            technical: 35,
            architecture: 30,
            problemSolving: 20,
            culture: 15
          },
          evaluationVersion: "TalentPulse-v3.4"
        }
      }
    },
    {
      id: "cand-6",
      name: "Rachel Vance",
      title: "Senior Engineering Manager",
      email: "rachel.vance@leadops.net",
      phone: "+1 (415) 555-0472",
      location: "San Francisco, CA",
      jobId: "job-4",
      stage: "hm_review",
      experienceYears: 10,
      currentCompany: "Twilio / Segment",
      education: "M.S. in Computer Science, Georgia Tech",
      overallScore: 91,
      matchTier: "Strong Match",
      appliedDate: "Oct 15, 2026",
      avatarInitials: "RV",
      skills: ["Team Leadership", "Kubernetes", "AWS / GCP", "Go", "Terraform", "Incident Management", "FinOps", "Agile"],
      rawResume: `Rachel Vance - San Francisco, CA | rachel.vance@leadops.net
EXPERIENCE:
Engineering Manager, Core Infrastructure @ Segment (2021 - Present)
- Grew team from 4 to 12 engineers across US and Europe with 0% regrettable attrition in 3 years.
- Directed multi-region Kubernetes migration, reducing AWS compute expenditure by $1.8M annually.
- Established blameless on-call culture and reduced mean-time-to-resolution (MTTR) by 42%.

Staff Infrastructure Engineer @ Box (2017 - 2021)
- Led storage tier reliability team; authored Go microservices handling 50k QPS.`,
      evaluation: {
        overallScore: 91,
        matchTier: "Strong Match",
        summary: "Exceptional engineering leader who blends deep technical infrastructure credibility (Go, Kubernetes) with empathetic people leadership and proven financial stewardship ($1.8M FinOps savings).",
        dimensions: {
          technicalMastery: 89,
          architectureScope: 90,
          problemSolving: 92,
          cultureLeadership: 95
        },
        strengths: [
          "Zero regrettable attrition over 3 years while expanding team across multiple time zones.",
          "$1.8M annual cloud cost reduction through disciplined FinOps and Kubernetes bin-packing.",
          "Strong hands-on technical roots in Go and storage systems."
        ],
        risks: [
          "Accustomed to large-scale infrastructure budgets; verify excitement for agile early-stage autonomy."
        ],
        interviewKit: [
          {
            type: "behavioral",
            category: "Performance Coaching & Retention",
            question: "How do you handle an underperforming senior engineer whose work is technically correct but causes friction in team velocity?",
            context: "Evaluates emotional intelligence and clear performance feedback.",
            lookFor: "Direct yet empathetic 1-on-1s, identifying root causes, setting measurable 30-day goals, clear expectations."
          },
          {
            type: "technical",
            category: "FinOps Strategy",
            question: "Walk through your framework for auditing and reducing a multi-million-dollar AWS infrastructure bill without compromising SLA.",
            context: "Tests strategic infrastructure business acumen.",
            lookFor: "Reserved instance planning, rightsizing workloads, identifying unattached EBS volumes, spot fleet utilization."
          }
        ],
        structuredJson: {
          candidateId: "cand-6",
          candidateName: "Rachel Vance",
          jobRequisitionId: "job-4",
          matchScore: 91,
          recommendation: "Strong Hire",
          skillsAssessment: {
            requiredMatched: ["Team Leadership", "Kubernetes", "AWS / GCP", "Go", "Terraform", "Incident Management"],
            requiredMissing: [],
            preferredMatched: ["FinOps"]
          },
          scorecardWeights: {
            technical: 25,
            architecture: 25,
            problemSolving: 20,
            culture: 30
          },
          evaluationVersion: "TalentPulse-v3.4"
        }
      }
    },
    {
      id: "cand-7",
      name: "Siddharth Nair",
      title: "Senior Machine Learning Engineer",
      email: "siddharth.nair@mllabs.io",
      phone: "+1 (408) 555-0839",
      location: "San Jose, CA",
      jobId: "job-1",
      stage: "screening",
      experienceYears: 5,
      currentCompany: "Adobe Sensei",
      education: "M.S. in Data Science, Carnegie Mellon University",
      overallScore: 78,
      matchTier: "Potential Match",
      appliedDate: "Oct 26, 2026",
      avatarInitials: "SN",
      skills: ["Python", "PyTorch", "Distributed Systems", "Docker", "FastAPI", "TensorFlow"],
      rawResume: `Siddharth Nair - San Jose, CA | siddharth.nair@mllabs.io
EXPERIENCE:
Senior ML Engineer @ Adobe (2022 - Present)
- Trained diffusion and transformer models in PyTorch for generative imaging features.
- Built model serving endpoints using FastAPI and TorchServe on AWS EKS.
- Profiled model inference using ONNX Runtime.

ML Engineer @ Research Institute (2020 - 2022)
- Fine-tuned BERT embeddings on proprietary datasets.`,
      evaluation: {
        overallScore: 78,
        matchTier: "Potential Match",
        summary: "Competent applied ML engineer with solid PyTorch and model training background. However, lacks low-level GPU acceleration (CUDA/Triton) and specialized high-throughput LLM inference architectures (vLLM, continuous batching).",
        dimensions: {
          technicalMastery: 76,
          architectureScope: 74,
          problemSolving: 82,
          cultureLeadership: 80
        },
        strengths: [
          "Strong foundation in PyTorch model training, fine-tuning, and ONNX optimization.",
          "Solid academic pedigree from CMU."
        ],
        risks: [
          "No hands-on experience with Triton or custom CUDA kernels.",
          "Has primarily worked with standard TorchServe rather than modern high-throughput LLM engines like vLLM."
        ],
        interviewKit: [
          {
            type: "technical",
            category: "Inference Engine Internals",
            question: "Explain the algorithmic difference between standard autoregressive generation and speculative decoding with draft models.",
            context: "Tests understanding of cutting-edge LLM inference acceleration.",
            lookFor: "Verification cost, acceptance rate criteria, memory trade-offs."
          }
        ],
        structuredJson: {
          candidateId: "cand-7",
          candidateName: "Siddharth Nair",
          jobRequisitionId: "job-1",
          matchScore: 78,
          recommendation: "Hold / Consider for Applied ML",
          skillsAssessment: {
            requiredMatched: ["Python", "PyTorch", "Distributed Systems"],
            requiredMissing: ["vLLM", "CUDA", "Triton", "Ray"],
            preferredMatched: []
          },
          scorecardWeights: {
            technical: 40,
            architecture: 30,
            problemSolving: 15,
            culture: 15
          },
          evaluationVersion: "TalentPulse-v3.4"
        }
      }
    },
    {
      id: "cand-8",
      name: "Kenji Sato",
      title: "Cloud DevOps & Systems Administrator",
      email: "kenji.sato@cloudbridge.jp",
      phone: "+1 (650) 555-0177",
      location: "San Mateo, CA",
      jobId: "job-1",
      stage: "sourced",
      experienceYears: 4,
      currentCompany: "Enterprise Cloud Systems",
      education: "B.S. in Information Systems, San Jose State University",
      overallScore: 62,
      matchTier: "Borderline / Needs Upskilling",
      appliedDate: "Oct 27, 2026",
      avatarInitials: "KS",
      skills: ["Kubernetes", "Docker", "Python", "Linux", "Terraform", "Bash"],
      rawResume: `Kenji Sato - San Mateo, CA | kenji.sato@cloudbridge.jp
EXPERIENCE:
DevOps Engineer @ CloudBridge (2022 - Present)
- Managed general Linux servers, CI/CD pipelines in Jenkins and GitHub Actions.
- Configured Kubernetes deployments and Prometheus alerts.
- Maintained Terraform scripts for AWS VPCs and EC2 instances.`,
      evaluation: {
        overallScore: 62,
        matchTier: "Borderline / Needs Upskilling",
        summary: "General cloud DevOps and systems administration background. Candidate lacks essential machine learning, PyTorch, GPU architecture, and distributed inference skills required for this Staff AI Infrastructure role.",
        dimensions: {
          technicalMastery: 58,
          architectureScope: 65,
          problemSolving: 64,
          cultureLeadership: 68
        },
        strengths: [
          "Good general Linux system administration and CI/CD automation practices.",
          "Solid Terraform infrastructure provisioning experience."
        ],
        risks: [
          "Zero machine learning, PyTorch, or GPU experience.",
          "Substantial skill gap for a Staff-level AI systems role."
        ],
        interviewKit: [
          {
            type: "technical",
            category: "General Systems",
            question: "How do you automate zero-downtime rolling deployments of containerized services on Kubernetes?",
            context: "Tests basic DevOps competency.",
            lookFor: "Readiness probes, liveness probes, pod disruption budgets, rollout strategies."
          }
        ],
        structuredJson: {
          candidateId: "cand-8",
          candidateName: "Kenji Sato",
          jobRequisitionId: "job-1",
          matchScore: 62,
          recommendation: "Reject / Re-route to Corporate IT",
          skillsAssessment: {
            requiredMatched: ["Kubernetes", "Python"],
            requiredMissing: ["PyTorch", "vLLM", "CUDA", "Triton", "Ray"],
            preferredMatched: []
          },
          scorecardWeights: {
            technical: 40,
            architecture: 30,
            problemSolving: 15,
            culture: 15
          },
          evaluationVersion: "TalentPulse-v3.4"
        }
      }
    }
  ],

  executiveStats: {
    avgTimeToHire: 14.2, // days
    prevTimeToHire: 42.0,
    timeSavingsPercent: 66.2,
    screeningHoursSaved: 248, // hours/month
    agencyFeeReduction: 64000, // USD saved
    aiScreenToOfferRate: 68.4, // %
    industryBenchmark: 24.1, // %
    totalCandidatesProcessed: 184,
    activeRequisitions: 4,
    pipelineFunnel: [
      { stage: "Applications Received", count: 184, percentage: 100, color: "#6366f1" },
      { stage: "AI Evaluated & Scored", count: 142, percentage: 77.2, color: "#8b5cf6" },
      { stage: "Hiring Manager Reviewed", count: 46, percentage: 25.0, color: "#06b6d4" },
      { stage: "Technical Interview Kit", count: 22, percentage: 12.0, color: "#38bdf8" },
      { stage: "Final Offer Extended", count: 9, percentage: 4.9, color: "#10b981" },
      { stage: "Offers Accepted", count: 7, percentage: 3.8, color: "#34d399" }
    ],
    skillsDemand: [
      { name: "vLLM & Inference", demand: 94, poolMatch: 42 },
      { name: "CUDA & Triton Kernels", demand: 88, poolMatch: 31 },
      { name: "Distributed Ray & PyTorch", demand: 92, poolMatch: 58 },
      { name: "TypeScript & React", demand: 85, poolMatch: 79 },
      { name: "CRDT / Real-time Sync", demand: 78, poolMatch: 28 },
      { name: "Design Systems & Tokens", demand: 82, poolMatch: 64 },
      { name: "FinOps & Kubernetes", demand: 86, poolMatch: 51 }
    ],
    departmentHealth: [
      { dept: "AI Research", open: 3, hired: 5, target: 8, progress: 62.5 },
      { dept: "Core Engineering", open: 2, hired: 6, target: 8, progress: 75.0 },
      { dept: "Product & UX", open: 1, hired: 3, target: 4, progress: 75.0 },
      { dept: "Cloud Platform", open: 2, hired: 4, target: 6, progress: 66.7 }
    ]
  }
};
