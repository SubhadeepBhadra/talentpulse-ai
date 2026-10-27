import streamlit as st
import json
import os
import re
from io import BytesIO
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
import streamlit.components.v1 as components

# ==============================================================================
# 1. PAGE CONFIGURATION & ENTERPRISE LIGHT STYLING
# ==============================================================================
st.set_page_config(
    page_title="TalentPulse AI — Autonomous Recruiting Platform",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for Streamlit components
st.markdown("""
<style>
    /* Clean Enterprise Light Palette */
    .stApp {
        background-color: #f8fafc;
        color: #0f172a;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
    }
    
    /* Header & Titles */
    h1, h2, h3, h4 {
        color: #0f172a !important;
        font-weight: 700 !important;
    }
    
    /* Card Container */
    .tp-card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        margin-bottom: 20px;
    }
    
    /* Custom Badges */
    .tp-badge-primary {
        background: #eef2ff;
        color: #4f46e5;
        border: 1px solid #c7d2fe;
        padding: 3px 10px;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 700;
        display: inline-block;
    }
    
    .tp-badge-success {
        background: #ecfdf5;
        color: #059669;
        border: 1px solid #a7f3d0;
        padding: 3px 10px;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 700;
        display: inline-block;
    }

    /* Score Pill */
    .tp-score-pill {
        font-size: 1.15rem;
        font-weight: 800;
        padding: 4px 12px;
        border-radius: 9999px;
        display: inline-block;
    }
    .tp-score-high {
        background: #ecfdf5;
        color: #047857;
        border: 1px solid #a7f3d0;
    }
    .tp-score-med {
        background: #fffbeb;
        color: #b45309;
        border: 1px solid #fde68a;
    }
</style>
""", unsafe_allow_html=True)


# ==============================================================================
# 2. SEED DATA & MOCK DATABASE
# ==============================================================================
SEED_JOBS = [
    {
        "id": "job-1",
        "title": "Staff LLM / AI Infrastructure Engineer",
        "department": "AI Research & Platform",
        "location": "San Francisco, CA (Hybrid / Remote)",
        "salary": "$215,000 - $265,000 + Equity",
        "experience": "Senior / Staff (6+ years)",
        "required_skills": ["Python", "PyTorch", "vLLM", "CUDA", "Triton", "Kubernetes", "Ray", "Distributed Systems"],
        "preferred_skills": ["TensorRT-LLM", "FlashAttention", "FP8 Quantization", "DeepSpeed"],
        "summary": "Lead the architecture and optimization of our multi-node LLM inference clusters, custom CUDA/Triton kernels, and continuous batching engines.",
        "weights": {"technical": 40, "architecture": 30, "problem_solving": 15, "culture": 15}
    },
    {
        "id": "job-2",
        "title": "Lead Full-Stack Product Architect",
        "department": "Core Engineering",
        "location": "Remote (US / Canada)",
        "salary": "$185,000 - $230,000 + Equity",
        "experience": "Lead / Principal (7+ years)",
        "required_skills": ["TypeScript", "React", "Node.js", "PostgreSQL", "System Design", "AWS", "Docker", "GraphQL"],
        "preferred_skills": ["Redis", "Kafka", "WebSockets", "Terraform", "Next.js"],
        "summary": "Own end-to-end architecture for our real-time collaborative workspace, high-throughput event processing, and micro-frontend platform.",
        "weights": {"technical": 35, "architecture": 35, "problem_solving": 15, "culture": 15}
    },
    {
        "id": "job-3",
        "title": "Principal Product Designer (AI & Design Systems)",
        "department": "Product Design & UX",
        "location": "New York, NY (Hybrid)",
        "salary": "$175,000 - $215,000",
        "experience": "Principal (6+ years)",
        "required_skills": ["Figma", "Design Systems", "Generative UX", "Design Tokens", "Prototyping", "User Research"],
        "preferred_skills": ["HTML/CSS/JS", "Framer", "Information Architecture"],
        "summary": "Define generative AI user paradigms, autonomous agent interfaces, and multi-brand design token architectures.",
        "weights": {"technical": 35, "architecture": 30, "problem_solving": 20, "culture": 15}
    },
    {
        "id": "job-4",
        "title": "Engineering Manager - Cloud Infrastructure",
        "department": "Cloud Platform",
        "location": "San Francisco, CA (Hybrid)",
        "salary": "$225,000 - $275,000 + Equity",
        "experience": "Management (4+ yrs mgmt, 8+ yrs tech)",
        "required_skills": ["Team Leadership", "Kubernetes", "AWS / GCP", "Go", "Terraform", "Incident Management"],
        "preferred_skills": ["FinOps", "eBPF", "Kafka"],
        "summary": "Scale and mentor an elite team of distributed systems engineers supporting multi-region Kubernetes clusters with 99.99% uptime.",
        "weights": {"technical": 25, "architecture": 25, "problem_solving": 20, "culture": 30}
    }
]

SAMPLE_CANDIDATES = [
    {
        "id": "cand-1",
        "name": "Dr. Elena Rostova",
        "title": "Senior AI Infrastructure Scientist",
        "role": "Staff LLM / AI Infrastructure Engineer",
        "score": 95,
        "match_tier": "Top 5% Strong Match",
        "company": "ScaleAI / Modal Labs",
        "education": "Ph.D. in Computer Engineering, Stanford University",
        "skills": ["PyTorch", "vLLM", "CUDA", "Triton", "Kubernetes", "Ray", "Distributed Training"],
        "strengths": [
            "Authored custom Triton FP8 matrix multiplication kernels reducing p99 latency by 38%.",
            "Production mastery of vLLM PagedAttention and continuous batching across 128x H100 clusters.",
            "Stanford Ph.D. with deep low-level memory bandwidth profiling expertise."
        ],
        "risks": [
            "Strong preference for custom bare-metal kernel tuning over managed cloud primitives.",
            "Compensation target near top of band."
        ]
    },
    {
        "id": "cand-2",
        "name": "Marcus Thorne",
        "title": "Senior Kubernetes & Platform Engineer",
        "role": "Staff LLM / AI Infrastructure Engineer",
        "score": 84,
        "match_tier": "Strong Match",
        "company": "CoreWeave",
        "education": "B.S. in Computer Science, University of Washington",
        "skills": ["Kubernetes", "Ray", "Python", "Distributed Systems", "Docker", "AWS", "Go"],
        "strengths": [
            "Managed 2,000+ GPU nodes and automated InfiniBand failure detection controllers.",
            "Strong Kubernetes operator development and container image caching.",
            "Proven track record of high-availability cloud cluster operations."
        ],
        "risks": [
            "Limited exposure to custom CUDA/Triton kernel writing.",
            "Would need ramp-up time on quantized LLM inference engines."
        ]
    },
    {
        "id": "cand-3",
        "name": "Devon Zhang",
        "title": "Staff Full-Stack Tech Lead",
        "role": "Lead Full-Stack Product Architect",
        "score": 93,
        "match_tier": "Top 5% Strong Match",
        "company": "Linear / Figma Ecosystem",
        "education": "B.S. in Software Engineering, UT Austin",
        "skills": ["TypeScript", "React", "Node.js", "PostgreSQL", "System Design", "GraphQL", "AWS"],
        "strengths": [
            "Architected local-first real-time CRDT sync engine supporting 100k concurrent active collaborators.",
            "Designed GraphQL federated gateway cutting p95 latency to 34ms.",
            "Strong history of engineering mentorship and architectural RFC leadership."
        ],
        "risks": [
            "Strong affinity for bleeding-edge web tooling; verify adherence to backward compatibility requirements."
        ]
    }
]


# ==============================================================================
# 3. AI EVALUATION HELPER FUNCTIONS
# ==============================================================================
def extract_text_from_file(uploaded_file):
    """Extract text from PDF, DOCX, or plain text upload"""
    filename = uploaded_file.name.lower()
    try:
        if filename.endswith(".pdf"):
            import pypdf
            reader = pypdf.PdfReader(uploaded_file)
            text = "\n".join([page.extract_text() or "" for page in reader.pages])
            return text
        elif filename.endswith(".docx"):
            import docx
            doc = docx.Document(uploaded_file)
            return "\n".join([p.text for p in doc.paragraphs])
        else:
            return uploaded_file.read().decode("utf-8", errors="ignore")
    except Exception as e:
        st.warning(f"Note: Standard text extraction used ({e})")
        return uploaded_file.read().decode("utf-8", errors="ignore")


def evaluate_candidate(resume_text, job, candidate_name="Candidate"):
    """Evaluates candidate resume against target job requirements"""
    text = resume_text.lower()
    
    # Required skills matching
    matched_req = [s for s in job["required_skills"] if s.lower() in text]
    missing_req = [s for s in job["required_skills"] if s.lower() not in text]
    matched_pref = [s for s in job.get("preferred_skills", []) if s.lower() in text]
    
    req_ratio = len(matched_req) / max(1, len(job["required_skills"]))
    pref_ratio = len(matched_pref) / max(1, len(job.get("preferred_skills", [])))
    
    # Calculate dimensional scores
    tech_score = min(99, int(55 + req_ratio * 38 + pref_ratio * 7))
    arch_score = min(98, int(60 + (12 if any(w in text for w in ["scale", "architect", "distributed", "cluster"]) else 5) + len(matched_req) * 3))
    problem_score = min(98, int(65 + (20 if any(w in text for w in ["reduced", "increased", "optimized", "%", "ms"]) else 8)))
    culture_score = min(98, int(65 + (20 if any(w in text for w in ["mentor", "lead", "collaborat", "spearhead"]) else 10)))
    
    weights = job["weights"]
    total_weight = sum(weights.values())
    overall = int((tech_score * weights["technical"] +
                   arch_score * weights["architecture"] +
                   problem_score * weights["problem_solving"] +
                   culture_score * weights["culture"]) / total_weight)
    
    tier = "Top 5% Strong Match" if overall >= 90 else "Strong Match" if overall >= 80 else "Potential Match"
    
    strengths = []
    if matched_req:
        strengths.append(f"Demonstrated fluency in core competencies: {', '.join(matched_req[:4])}.")
    if any(w in text for w in ["reduced", "increased", "%", "latency"]):
        strengths.append("Resume documents verifiable engineering achievements with quantifiable business impact.")
    else:
        strengths.append("Demonstrates solid engineering domain experience across relevant production environments.")
    if matched_pref:
        strengths.append(f"Bonus alignment with preferred tooling: {', '.join(matched_pref)}.")
        
    risks = []
    if missing_req:
        risks.append(f"Identified skill gaps in required technologies: {', '.join(missing_req[:3])}. Probe depth during technical screen.")
    else:
        risks.append("High market demand profile; likelihood of competing counter-offers requires swift hiring committee turnaround.")
        
    # Interview questions
    interview_kit = [
        {
            "round": "Round 1: Technical Deep-Dive",
            "question": f"How do you profile and diagnose performance bottlenecks when scaling {matched_req[0] if matched_req else job['required_skills'][0]} under high concurrency?",
            "signals": "Root cause analysis, profiling toolchain usage (e.g., Nsight, eBPF, flamegraphs), metric-driven optimization."
        },
        {
            "round": "Round 2: System Architecture",
            "question": f"Walk through how you would architect a fault-tolerant subsystem for our {job['title']} stack with high availability and graceful degradation.",
            "signals": "Considers backpressure management, distributed state consistency, failovers, and idempotency."
        },
        {
            "round": "Round 3: Behavioral & Collaboration",
            "question": "Describe a project where critical technical requirements shifted midway through implementation. How did you align the team and communicate trade-offs?",
            "signals": "Transparent stakeholder communication, data-driven prioritization, prioritizing customer value over sunk costs."
        }
    ]
    
    structured_json = {
        "$schema": "https://talentpulse.ai/schemas/v3/candidate-evaluation.json",
        "candidateName": candidate_name,
        "targetRequisition": job["title"],
        "overallScore": overall,
        "matchTier": tier,
        "dimensionBreakdown": {
            "technicalMastery": tech_score,
            "architectureScope": arch_score,
            "problemSolving": problem_score,
            "cultureLeadership": culture_score
        },
        "skillAudit": {
            "matchedRequired": matched_req,
            "missingRequired": missing_req,
            "matchedPreferred": matched_pref
        },
        "recommendation": "Strong Hire" if overall >= 85 else "Advance with Probing" if overall >= 72 else "Hold / Re-route"
    }
    
    return {
        "overall": overall,
        "tier": tier,
        "dimensions": {"Technical Mastery": tech_score, "Architecture & Scope": arch_score, "Problem Solving": problem_score, "Culture & Leadership": culture_score},
        "strengths": strengths,
        "risks": risks,
        "matched_req": matched_req,
        "missing_req": missing_req,
        "interview_kit": interview_kit,
        "json": structured_json
    }


# ==============================================================================
# 4. SIDEBAR NAVIGATION & ROLE SWITCHER
# ==============================================================================
with st.sidebar:
    st.image("assets/logo.jpg", width=80)
    st.title("TalentPulse AI")
    st.caption("Autonomous Recruiting & Candidate Evaluation OS")
    
    st.markdown("---")
    
    # Active Role Persona
    role = st.selectbox(
        "Current Workspace Persona",
        [
            "Lead Technical Recruiter (Sarah Jenkins)",
            "Director of Engineering / HM (Alex Rivera)",
            "VP of Talent / Executive (Elena Vance)",
            "Applicant Portal (Jordan Lee)"
        ]
    )
    
    st.markdown("---")
    
    # Navigation View
    nav_view = st.radio(
        "Navigation Hub",
        [
            "🚀 Full Interactive Platform (Live Web OS)",
            "📄 AI Resume Evaluation Studio",
            "👥 Hiring Manager & Candidate Comparison",
            "📈 Executive ROI & Funnel Dashboard",
            "💼 Requisitions Catalog"
        ]
    )
    
    st.markdown("---")
    st.markdown("""
    **Deployment Links:**
    - [GitHub Repo](https://github.com/SubhadeepBhadra/talentpulse-ai)
    - [Local Web Server](http://localhost:5173)
    """)
    st.caption("v3.4 Production • Streamlit Cloud Ready")


# ==============================================================================
# 5. VIEW ROUTING & CONTENT RENDERING
# ==============================================================================

# --- VIEW 1: Full Interactive Platform (Live Web OS) ---
if nav_view == "🚀 Full Interactive Platform (Live Web OS)":
    st.markdown("""
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
                <h1 style="margin-bottom: 2px;">TalentPulse AI — Live Web Platform</h1>
                <p style="color: #64748b; font-size: 0.9rem;">
                    Full interactive recruiting OS with 7-stage drag-and-drop Kanban, AI scorecard drawers, and role-based permissions.
                </p>
            </div>
            <a href="http://localhost:5173" target="_blank" style="background: #4f46e5; color: white; padding: 8px 16px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.85rem;">
                Open in Full Window ↗
            </a>
        </div>
    """, unsafe_allow_html=True)
    
    # Embed the running local server iframe
    try:
        components.iframe("http://localhost:5173", height=900, scrolling=True)
    except Exception as e:
        st.warning("Ensure the local server is running at http://localhost:5173 to render the live embedded view.")


# --- VIEW 2: AI Resume Evaluation Studio (Native Streamlit) ---
elif nav_view == "📄 AI Resume Evaluation Studio":
    st.markdown("<h1>📄 AI Candidate Evaluation Studio</h1>", unsafe_allow_html=True)
    st.caption("Upload candidate resumes (PDF, DOCX, TXT) to generate multi-dimensional match scores and interview kits.")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown("### 1. Select Requisition")
        target_job_title = st.selectbox("Open Requisitions", [j["title"] for j in SEED_JOBS])
        target_job = next(j for j in SEED_JOBS if j["title"] == target_job_title)
        
        st.markdown(f"""
            <div class="tp-card">
                <div style="font-size: 0.8rem; color: #64748b;">Department: {target_job['department']} • {target_job['location']}</div>
                <div style="font-size: 0.95rem; font-weight: 700; color: #059669; margin-top: 4px;">{target_job['salary']}</div>
                <p style="font-size: 0.85rem; color: #475569; margin-top: 8px;">{target_job['summary']}</p>
                <div style="margin-top: 8px;">
                    {' '.join([f'<span class="tp-badge-primary">{s}</span>' for s in target_job['required_skills'][:5]])}
                </div>
            </div>
        """, unsafe_allow_html=True)
        
        st.markdown("### 2. Candidate Information")
        candidate_name = st.text_input("Candidate Full Name", value="Elena Rostova")
        candidate_email = st.text_input("Candidate Email", value="e.rostova@example.com")
        
        st.markdown("### 3. Upload Resume")
        uploaded_file = st.file_uploader("Upload PDF, DOCX, or TXT", type=["pdf", "docx", "txt"])
        
        st.markdown("**Or load sample profile:**")
        sample_choice = st.radio("Pre-built Candidate Profiles", ["None", "Staff AI Engineer (Elena Rostova)", "Full-Stack Architect (Devon Zhang)"], horizontal=True)
        
        raw_text = ""
        if sample_choice == "Staff AI Engineer (Elena Rostova)":
            raw_text = """Dr. Elena Rostova - San Francisco, CA
Ph.D. in Computer Engineering, Stanford University
Staff AI Infrastructure Engineer @ Modal Labs (2023 - Present)
- Architected distributed inference infrastructure serving 45M+ daily tokens across 128x H100 clusters.
- Wrote custom Triton FP8 matrix multiplication kernels reducing p99 latency by 38%.
- Integrated continuous batching and PagedAttention via vLLM, doubling throughput per GPU.
Skills: PyTorch, vLLM, CUDA, Triton, Kubernetes, Ray, Distributed Systems, FlashAttention"""
        elif sample_choice == "Full-Stack Architect (Devon Zhang)":
            raw_text = """Devon Zhang - Austin, TX
Staff Software Architect @ Collaborative Cloud (2021 - Present)
- Architected local-first real-time CRDT sync engine supporting 100k concurrent active collaborators.
- Designed GraphQL federated gateway reducing p95 API response times to 34ms.
- Scaled PostgreSQL database sharding and connection pooling.
Skills: TypeScript, React, Node.js, PostgreSQL, System Design, GraphQL, AWS, Docker, Redis"""
        elif uploaded_file is not None:
            raw_text = extract_text_from_file(uploaded_file)
            
        resume_input = st.text_area("Resume Content:", value=raw_text, height=180)
        
        run_btn = st.button("⚡ Run Autonomous Evaluation", type="primary", use_container_width=True)

    with col2:
        st.markdown("### 4. AI Structured Scorecard")
        if run_btn and resume_input:
            with st.spinner("Analyzing semantic fit across technical pillars and generating interview kit..."):
                eval_result = evaluate_candidate(resume_input, target_job, candidate_name)
                
                score = eval_result["overall"]
                tier = eval_result["tier"]
                pill_class = "tp-score-high" if score >= 85 else "tp-score-med"
                
                st.markdown(f"""
                    <div class="tp-card" style="border-left: 5px solid #4f46e5;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h3 style="margin-bottom: 2px;">{candidate_name}</h3>
                                <div style="font-size: 0.8rem; color: #64748b;">Target Role: {target_job['title']}</div>
                            </div>
                            <div class="tp-score-pill {pill_class}">
                                ★ {score}% Fit Score
                            </div>
                        </div>
                        <div style="font-size: 0.8rem; font-weight: 700; color: #4f46e5; text-transform: uppercase; margin-top: 4px;">
                            {tier}
                        </div>
                    </div>
                """, unsafe_allow_html=True)
                
                # Dimensional Progress Bars
                st.markdown("#### Weighted Pillars")
                for dim_name, dim_val in eval_result["dimensions"].items():
                    col_d1, col_d2 = st.columns([3, 1])
                    with col_d1:
                        st.progress(dim_val / 100, text=dim_name)
                    with col_d2:
                        st.markdown(f"**{dim_val}%**")
                
                # Strengths vs Risks
                col_s1, col_s2 = st.columns(2)
                with col_s1:
                    st.success("**Verified Strengths**\n" + "\n".join([f"- {s}" for s in eval_result["strengths"]]))
                with col_s2:
                    st.warning("**Risk Factors / Verification**\n" + "\n".join([f"- {r}" for r in eval_result["risks"]]))
                
                # Tailored Interview Questions
                with st.expander("🎯 Tailored Interview Question Kit", expanded=True):
                    for iq in eval_result["interview_kit"]:
                        st.markdown(f"**{iq['round']}**")
                        st.markdown(f"> *{iq['question']}*")
                        st.caption(f"**Signals to look for:** {iq['signals']}")
                        st.markdown("---")
                
                # ATS Structured Output Export
                st.markdown("#### ATS Standardized JSON Payload")
                st.json(eval_result["json"])
                
                json_str = json.dumps(eval_result["json"], indent=2)
                st.download_button(
                    "⬇️ Download Structured Evaluation JSON",
                    data=json_str,
                    file_name=f"{candidate_name.replace(' ', '_')}_evaluation.json",
                    mime="application/json",
                    use_container_width=True
                )
        else:
            st.info("Upload a candidate resume or pick a pre-built profile on the left, then click '⚡ Run Autonomous Evaluation'.")


# --- VIEW 3: Hiring Manager & Candidate Comparison ---
elif nav_view == "👥 Hiring Manager & Candidate Comparison":
    st.markdown("<h1>👥 Hiring Manager Comparison Matrix</h1>", unsafe_allow_html=True)
    st.caption("Compare shortlisted candidates side-by-side with autonomous trade-off analysis and rubric grading.")
    
    st.markdown("""
        <div class="tp-card" style="background: linear-gradient(135deg, #eef2ff 0%, #f0fdfa 100%); border-color: #c7d2fe;">
            <div style="font-weight: 700; color: #4338ca; text-transform: uppercase; font-size: 0.78rem;">Autonomous Trade-Off Analysis</div>
            <div style="font-size: 0.92rem; color: #1e293b; margin-top: 6px; line-height: 1.6;">
                <strong>Hiring Verdict:</strong> Dr. Elena Rostova (★95%) offers specialized low-level kernel performance (Triton/vLLM), making her the priority choice for immediate production inference scaling. Marcus Thorne (★84%) provides broader cluster reliability and orchestration. <em>Recommendation: Advance Elena to final panel; maintain Marcus in platform pipeline.</em>
            </div>
        </div>
    """, unsafe_allow_html=True)
    
    # Comparison Cards
    cols = st.columns(len(SAMPLE_CANDIDATES))
    for i, cand in enumerate(SAMPLE_CANDIDATES):
        with cols[i]:
            pill_class = "tp-score-high" if cand["score"] >= 90 else "tp-score-med"
            st.markdown(f"""
                <div class="tp-card">
                    <h4>{cand['name']}</h4>
                    <div style="font-size: 0.8rem; color: #64748b;">{cand['title']}</div>
                    <div style="font-size: 0.75rem; color: #4f46e5; font-weight: 600; margin-bottom: 10px;">{cand['role']}</div>
                    <div class="tp-score-pill {pill_class}" style="margin-bottom: 12px;">★ {cand['score']}%</div>
                    <p style="font-size: 0.78rem; color: #334155; line-height: 1.4;">
                        <strong>Key Strength:</strong> {cand['strengths'][0]}
                    </p>
                    <p style="font-size: 0.78rem; color: #b45309; line-height: 1.4;">
                        <strong>Risk Focus:</strong> {cand['risks'][0]}
                    </p>
                </div>
            """, unsafe_allow_html=True)
            
    # Hiring Manager Scorecard Grading Form
    st.markdown("### 📝 Submit Hiring Manager Scorecard")
    with st.form("hm_scorecard_form"):
        selected_cand = st.selectbox("Candidate to Evaluate", [c["name"] for c in SAMPLE_CANDIDATES])
        
        col_r1, col_r2 = st.columns(2)
        with col_r1:
            tech_rating = st.slider("Technical Depth & Problem Solving", 1, 5, 4)
        with col_r2:
            comm_rating = st.slider("Communication & Cultural Add", 1, 5, 5)
            
        decision = st.radio("Official Hiring Manager Decision", ["Advance to Onsite Interview", "Hold in Pipeline", "Reject Candidate"], horizontal=True)
        notes = st.text_area("Hiring Manager Feedback & Debrief Notes", "Candidate demonstrated exceptional depth on inference optimization during screen. Highly recommended for final loop.")
        
        submitted = st.form_submit_button("Submit Official Decision", type="primary")
        if submitted:
            st.success(f"Scorecard logged for {selected_cand}! Decision '{decision}' recorded.")


# --- VIEW 4: Executive ROI & Funnel Dashboard ---
elif nav_view == "📈 Executive ROI & Funnel Dashboard":
    st.markdown("<h1>📈 Executive Talent Intelligence & ROI Dashboard</h1>", unsafe_allow_html=True)
    st.caption("Real-time recruiting velocity, cost avoidance, pipeline conversion rates, and workforce capacity analytics.")
    
    # 4 Top KPI Cards
    kpi1, kpi2, kpi3, kpi4 = st.columns(4)
    with kpi1:
        st.metric("Avg Time-to-Hire", "14.2 Days", delta="-66.2% time saved", delta_color="normal")
    with kpi2:
        st.metric("Recruiter Hours Saved", "248 hrs/mo", delta="+94% auto-screened", delta_color="normal")
    with kpi3:
        st.metric("Agency Spend Avoided", "$64,000", delta="YTD internal sourcing", delta_color="normal")
    with kpi4:
        st.metric("Screen-to-Offer Ratio", "68.4%", delta="+44.3% vs 24.1% avg", delta_color="normal")
        
    st.markdown("---")
    
    chart_col1, chart_col2 = st.columns(2)
    
    # Funnel Chart with Plotly
    with chart_col1:
        st.markdown("### Talent Pipeline Conversion Funnel")
        stages = ["Applications", "AI Evaluated", "HM Reviewed", "Interview Kit", "Offer Extended", "Offers Accepted"]
        values = [184, 142, 46, 22, 9, 7]
        
        fig_funnel = go.Figure(go.Funnel(
            y=stages,
            x=values,
            textinfo="value+percent initial",
            marker={"color": ["#4f46e5", "#6366f1", "#8b5cf6", "#0284c7", "#10b981", "#059669"]}
        ))
        fig_funnel.update_layout(margin=dict(l=20, r=20, t=20, b=20), height=380, plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig_funnel, use_container_width=True)
        
    # Skills Demand Matrix with Plotly
    with chart_col2:
        st.markdown("### Critical Skills Demand vs Talent Pool Match")
        skills_data = pd.DataFrame({
            "Skill": ["vLLM & Inference", "Distributed PyTorch", "CUDA / Triton", "TypeScript / React", "Design Tokens", "FinOps / K8s"],
            "Requisition Demand": [94, 92, 88, 85, 82, 86],
            "Applicant Pool Supply": [42, 58, 31, 79, 64, 51]
        })
        
        fig_skills = px.bar(
            skills_data,
            x="Skill",
            y=["Requisition Demand", "Applicant Pool Supply"],
            barmode="group",
            color_discrete_sequence=["#4f46e5", "#0284c7"]
        )
        fig_skills.update_layout(margin=dict(l=20, r=20, t=20, b=20), height=380, plot_bgcolor="rgba(0,0,0,0)", paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig_skills, use_container_width=True)

    # Department Health Table & Fair Hiring Audit
    t_col1, t_col2 = st.columns(2)
    with t_col1:
        st.markdown("### Department Headcount Hiring Targets")
        dept_df = pd.DataFrame({
            "Department": ["AI Research & Platform", "Core Engineering", "Product Design & UX", "Cloud Platform"],
            "Open Roles": [3, 2, 1, 2],
            "Hired": [5, 6, 3, 4],
            "Q4 Target": [8, 8, 4, 6],
            "Progress": ["62.5%", "75.0%", "75.0%", "66.7%"]
        })
        st.dataframe(dept_df, use_container_width=True)
        
    with t_col2:
        st.markdown("### AI Fair Hiring & Transparency Audit")
        st.markdown("""
            <div class="tp-card" style="background: #ecfdf5; border-color: #a7f3d0;">
                <div style="font-weight: 700; color: #065f46; font-size: 0.95rem;">✓ 100% Certified Demographic Blindness Guardrails</div>
                <p style="font-size: 0.8rem; color: #1e293b; margin-top: 6px; line-height: 1.5;">
                    Candidate scoring strictly evaluates technical competencies, architectural scope, and verified impact. PII, age, gender, and school pedigree are strictly excluded from scoring weights.
                </p>
                <div style="font-size: 0.75rem; color: #047857; font-weight: 600; margin-top: 8px;">
                    Explainability Index: 99.4% • Human-In-The-Loop Approval: Mandatory
                </div>
            </div>
        """, unsafe_allow_html=True)


# --- VIEW 5: Requisitions Catalog ---
elif nav_view == "💼 Requisitions Catalog":
    st.markdown("<h1>💼 Open Job Requisitions Catalog</h1>", unsafe_allow_html=True)
    st.caption("Active job listings, calibrated rubric evaluation weights, and compensation bands.")
    
    for job in SEED_JOBS:
        with st.expander(f"📌 {job['title']} — {job['department']} ({job['salary']})", expanded=False):
            st.markdown(f"**Location:** {job['location']} • **Experience:** {job['experience']}")
            st.markdown(f"**Mission:** {job['summary']}")
            st.markdown(f"**Required Skills:** {', '.join(job['required_skills'])}")
            st.markdown(f"**Preferred Skills:** {', '.join(job.get('preferred_skills', []))}")
            st.markdown(f"**Evaluation Weights:** Technical: {job['weights']['technical']}% • Architecture: {job['weights']['architecture']}% • Problem Solving: {job['weights']['problem_solving']}% • Culture: {job['weights']['culture']}%")
