/**
 * Core Interactive & Security-Hardened Controller for khanhtq29vn.github.io
 * - Zero DOM-XSS (strictly uses createElement + textContent instead of innerHTML)
 * - Anti-scraper base64 email assembly
 * - Native browser history (popstate) & URL hash deep-linking
 * - Respectful Collaborator & Citation hover cards
 */

(() => {
  "use strict";

  const VIEWS = ["overview", "publications", "systems", "teaching", "honors", "blog"];

  const COLLAB_DATA = {
    pinanek: {
      name: "Ngo Duc Hoang Son",
      handle: "github.com/pinanek (@pinanek)",
      avatar: "https://github.com/pinanek.png?size=96",
      role: "Co-Creator & Core Systems Architect · ContextCraft",
      highlight:
        "Architected the Rust + Rayon + PyO3 core migration (#34: 7.21s on 30,018 files), 35-language pipeline (#19), and BM25F ranking (#23).",
    },
    tyza66: {
      name: "@tyza66",
      handle: "github.com/tyza66",
      avatar: "https://github.com/tyza66.png?size=96",
      role: "Open-Source Community Contributor · ContextCraft",
      highlight:
        "First external community contributor; implemented the --encoding / -enc tokenizer CLI flag (#17) for o200k_base & cl100k_base.",
    },
    binh: {
      name: "Assoc. Prof. Binh Thanh Nguyen",
      handle: "Head of Computer Science Dept., VNUHCM-US",
      avatar: "",
      role: "Principal Investigator · AISIA Research Lab",
      highlight:
        "Research supervisor & co-author on VietCheckMed (AAAI 2026) and medical regulatory AI systems.",
    },
    lizi: {
      name: "Prof. Lizi Liao",
      handle: "Singapore Management University (SMU)",
      avatar: "",
      role: "Senior Research Collaborator · Conversational & Multimodal AI",
      highlight:
        "Co-author on MM-RegCheck (ACM MM 2026) and VietCheckMed Engine (ACM CIKM 2026), supported by NRF Singapore (AISG-NMLP-2024-002).",
    },
    kiet: {
      name: "Dr. Kiet Van Nguyen",
      handle: "Dean, Faculty of ISE, VNUHCM-UIT",
      avatar: "",
      role: "Thesis Advisor & Principal Co-Author",
      highlight:
        "Advisor on ViFactCheck (AAAI'25 Oral), Open-ViTabQA (KBS'25 Q1), ViHOS (EACL'23 Oral), and PhoBERT-CNN (NCA'22 Q1).",
    },
  };

  const CITE_DATA = {
    vietcheckmed: {
      venue: "AAAI 2026 · Co-First Author",
      title: "VietCheckMed: Explainable Regulatory Compliance Checking for Medical Advertisements",
      authors: "N. T. Tam*, T. T. Hoa*, Khanh Quoc Tran*, B. T. Nguyen",
      impact: "Deployed at HCMC Department of Health · Pending Patent",
    },
    mmregcheck: {
      venue: "ACM Multimedia (MM 2026) · Accepted (In Press, CORE A*)",
      title:
        "MM-RegCheck: Training-Free Causal-Aware Multimodal Reasoning for Regulatory Evasion Detection",
      authors:
        "T. Nguyen*, H.-A. Vo*, T. P. Le, K. A. Ta, Khanh Tran, et al., L. Liao, B. Nguyen",
      impact:
        "Co-led TF-BEAR framework, full experimental design & rebuttal · Supported by NRF Singapore",
    },
    vietcheckmed_cikm: {
      venue: "ACM CIKM 2026 · Accepted (In Press, CORE A)",
      title:
        "VietCheckMed: A Scalable Retrieval-Augmented Engine for Zero-Day Regulatory Oversight",
      authors:
        "T. Nguyen*, Khanh Quoc Tran, A. Vo, K. Ta, T. Le, et al., L. Liao, B. Nguyen",
      impact:
        "Co-led KaaS architecture & Pareto evaluation ($0.0004/sample) · Live at vietcheckmed.org",
    },
    vifactcheck: {
      venue: "AAAI 2025 · Oral Presentation",
      title: "ViFactCheck: A New Benchmark Dataset and Methods for Multi-Domain News Fact-Checking in Vietnamese",
      authors: "T. T. Hoa, T. Q. Duy, Khanh Quoc Tran, K. V. Nguyen",
      impact: "Vietnam's largest multi-domain news fact-checking benchmark",
    },
    openvitabqa: {
      venue: "Knowledge-Based Systems 2025 · SCIE Q1 (IF: 8.8)",
      title: "Open-ViTabQA: A novel benchmark for Vietnamese question answering on open domain Wikipedia table",
      authors: "D. H. Dao, N. T. K. Huynh, Khanh Quoc Tran, K. V. Nguyen",
      impact: "5,000+ dataset downloads on Hugging Face (BIF metric)",
    },
    vihos: {
      venue: "EACL 2023 · Oral Presentation",
      title: "ViHOS: Hate Speech Spans Detection for Vietnamese",
      authors: "P. G. Hoang, C. D. Luu, Khanh Quoc Tran, et al.",
      impact: "First span-level Explainable AI (XAI) hate speech dataset for Vietnamese",
    },
    phobertcnn: {
      venue: "Neural Computing & Applications 2022 · First Author SCIE Q1 (IF: 6.0)",
      title: "Vietnamese Hate and Offensive Detection using PhoBERT-CNN and Social Media Streaming Data",
      authors: "Khanh Quoc Tran, A. T. Nguyen, P. G. Hoang, et al.",
      impact: "Awarded VNU-HCMC President's Certificate of Merit · 30% lower overhead",
    },
    contextcraft: {
      venue: "Open-Source System · Rust + PyO3 + Tree-sitter",
      title: "ContextCraft (contextcraft-ai): AST-Aware, PageRank-Ranked Codebase Compressor",
      authors: "Khanh Quoc Tran, Ngo Duc Hoang Son (@pinanek), @tyza66",
      impact: "Compiles 30,018 files (home-assistant/core) in 7.214 seconds (17.59× speedup)",
    },
  };

  const BUDGET_SIM_DATA = {
    "8k": {
      summary: "Compiled: 7,991 / 8,000 tokens (99.9% utilization · 14.99× compression · 869.0 ms)",
      counts: "FULL: 5 | SKEL: 15 | SIGS: 9 | TREE: 229",
      rows: [
        { path: "contextcraft/ast/__init__.py", pr: "13.7%", tier: "FULL", tok: "553 / 553", note: "Compact hub → 100% kept" },
        { path: "contextcraft/languages/structural.py", pr: "6.9%", tier: "SKEL", tok: "389 / 2,523", note: "Large hub → SKEL saves 84.6% tokens" },
        { path: "contextcraft/models.py", pr: "5.0%", tier: "SIGS", tok: "355 / 1,581", note: "Fits contracts in tight 8k budget" },
        { path: "contextcraft/languages/base.py", pr: "5.0%", tier: "SKEL", tok: "550 / 998", note: "Preserves base classes & docstrings" },
        { path: "pyproject.toml", pr: "3.9%", tier: "FULL", tok: "1,128 / 1,128", note: "Project manifest priority" },
      ],
    },
    "12k": {
      summary: "Compiled: 11,991 / 12,000 tokens (99.9% utilization · 9.99× compression · 892.1 ms)",
      counts: "FULL: 10 | SKEL: 20 | SIGS: 10 | TREE: 218",
      rows: [
        { path: "contextcraft/ast/__init__.py", pr: "13.7%", tier: "FULL", tok: "553 / 553", note: "Compact hub → 100% kept" },
        { path: "contextcraft/languages/structural.py", pr: "6.9%", tier: "SKEL", tok: "389 / 2,523", note: "Still SKEL! Avoids God-Object bloat" },
        { path: "contextcraft/models.py", pr: "5.0%", tier: "FULL", tok: "1,581 / 1,581", note: "Upgraded SIGS → FULL with +4k budget!" },
        { path: "contextcraft/languages/base.py", pr: "5.0%", tier: "SKEL", tok: "550 / 998", note: "Preserves base classes & docstrings" },
        { path: "pyproject.toml", pr: "3.9%", tier: "FULL", tok: "1,128 / 1,128", note: "Project manifest priority" },
      ],
    },
  };

  const AST_TIERS = {
    FULL: {
      label: "contextcraft/languages/structural.py [FULL — 2,523 tokens]",
      badge: "100% implementation retained (u = 1.00)",
      code: `import hmac
from contextcraft.ast import ByteRange, ParsedAst, Symbol

class StructuralSkeletonBuilder(SkeletonBuilder):
    """Surgically elides function bodies in reverse byte order."""

    def build(self, parsed: ParsedAst) -> str:
        if parsed.has_errors:
            return parsed.source.decode("utf-8")
        replacements = sorted(
            self._replacements(parsed),
            key=lambda edit: (edit[0].start_byte, -edit[0].end_byte),
        )
        buffer = bytearray(parsed.source)
        for span, content in reversed(replacements):
            buffer[span.start_byte : span.end_byte] = content
        return buffer.decode("utf-8")`,
    },
    SKEL: {
      label: "contextcraft/languages/structural.py [SKEL — 389 / 2,523 tokens]",
      badge: "84.6% tokens saved · 100% types & docstrings kept (u = 0.82)",
      code: `import hmac
from contextcraft.ast import ByteRange, ParsedAst, Symbol

class StructuralSkeletonBuilder(SkeletonBuilder):
    """Surgically elides function bodies in reverse byte order."""

    def build(self, parsed: ParsedAst) -> str:
        ...`,
    },
    SIGS: {
      label: "contextcraft/languages/structural.py [SIGS — 180 / 2,523 tokens]",
      badge: "92.8% tokens saved · Unused 'import hmac' trimmed (u = 0.45)",
      code: `from contextcraft.ast import ParsedAst

class StructuralSkeletonBuilder(SkeletonBuilder):
    def build(self, parsed: ParsedAst) -> str: ...`,
    },
    TREE: {
      label: "contextcraft/languages/structural.py [TREE — 0 body tokens]",
      badge: "Listed in repository architecture map only (u = 0.00)",
      code: `contextcraft/
├── ast/
│   └── __init__.py [FULL] (PR: 13.7%)
└── languages/
    └── structural.py [TREE] (PR: 6.9% · 0 body tokens emitted)`,
    },
  };

  const CMD_ITEMS = [
    { title: "VietCheckMed (AAAI 2026 · Co-first author)", sub: "Medical regulatory compliance checking · HCMC Dept. of Health", view: "publications" },
    { title: "MM-RegCheck (ACM Multimedia 2026 · CORE A*)", sub: "Training-free Bayesian causal multimodal reasoning (TF-BEAR) & MedReg-MM benchmark", view: "publications"},
    { title: "VietCheckMed Engine (ACM CIKM 2026 · CORE A)", sub: "Scalable KaaS regulatory oversight platform ($0.0004/sample) · vietcheckmed.org", view: "publications"},
    { title: "ViFactCheck (AAAI 2025 · Oral Presentation)", sub: "Multi-domain Vietnamese news fact-checking benchmark", view: "publications" },
    { title: "Open-ViTabQA (Knowledge-Based Systems 2025 · SCIE Q1 IF: 8.8)", sub: "Complex table question answering · 5,000+ HF downloads", view: "publications" },
    { title: "ViHOS (EACL 2023 · Oral Presentation)", sub: "Explainable hate speech spans detection for Vietnamese", view: "publications" },
    { title: "PhoBERT-CNN (Neural Computing & Applications 2022 · First Author Q1)", sub: "Streaming hate speech detection · VNU-HCMC President's Award", view: "publications" },
    { title: "ContextCraft (Rust + Rayon + PyO3 Core)", sub: "Co-created with Ngo Duc Hoang Son (@pinanek) · 7.21s on 30,018 files", view: "systems" },
    { title: "Ngo Duc Hoang Son (@pinanek) — GitHub Collaborator", sub: "Co-Creator of ContextCraft · PR #34 Rust Core & PR #19 35-Language Pipeline", view: "systems" },
    { title: "@tyza66 — Open-Source Contributor", sub: "Contributed --encoding tokenizer flag (PR #17)", view: "systems" },
    { title: "Teaching & Student Mentorship (100+ students, 20 student papers)", sub: "Applied NLP for Social Good seminar & ML coursework", view: "teaching" },
    { title: "Honors & Fellowships (VinIF, EMNLP Outstanding Reviewer, PACLIC)", sub: "Valedictorian M.Sc. GPA 9.3/10.0 (Ranked 1st/40)", view: "honors" },
  ];

  // Expose safe global handlers for inline onclick attributes
  window.switchView = function switchView(target, pushHistory = true) {
    const cleanTarget = VIEWS.includes(target) ? target : "overview";
    VIEWS.forEach((v) => {
      const pane = document.getElementById("view-" + v);
      const nav = document.getElementById("nav-" + v);
      const mnav = document.getElementById("mnav-" + v);
      if (pane) pane.classList.toggle("hidden", v !== cleanTarget);
      if (nav) nav.classList.toggle("active", v === cleanTarget);
      if (mnav) {
        mnav.className =
          v === cleanTarget
            ? "text-[#3B97B6] font-semibold shrink-0"
            : "muted-copy shrink-0";
      }
    });
    if (pushHistory && history.pushState) {
      const hash = cleanTarget === "overview" ? "#about" : "#" + cleanTarget;
      if (window.location.hash !== hash) {
        history.pushState({ view: cleanTarget }, "", hash);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.switchHomePubTab = function switchHomePubTab(tab) {
    ["selected", "student", "systems"].forEach((t) => {
      const pill = document.getElementById("pill-" + t);
      const pane = document.getElementById("home-pub-" + t);
      if (pill) pill.classList.toggle("active", t === tab);
      if (pane) pane.classList.toggle("hidden", t !== tab);
    });
  };

  window.toggleNewsHeight = function toggleNewsHeight(btn) {
    const box = document.getElementById("newsContainer");
    if (!box) return;
    const isExpanded = box.classList.contains("max-h-[900px]");
    box.classList.toggle("max-h-[900px]", !isExpanded);
    box.classList.toggle("max-h-[205px]", isExpanded);
    if (btn) {
      btn.textContent = isExpanded
        ? "[Expand all 11 items]"
        : "[Collapse to scrollable view]";
    }
  };

  window.toggleDrawer = function toggleDrawer(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden");
  };

  window.showToast = function showToast(msg) {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.remove("hidden");
    setTimeout(() => t.classList.add("hidden"), 2200);
  };

  window.copyText = function copyText(text, toastMsg) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(toastMsg || "Copied to clipboard");
    });
  };

  window.toggleTheme = function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    const moon = document.getElementById("themeMoon");
    const sun = document.getElementById("themeSun");
    if (moon) moon.classList.toggle("hidden", isDark);
    if (sun) sun.classList.toggle("hidden", !isDark);
    try {
      localStorage.setItem("tqk_theme", isDark ? "dark" : "light");
    } catch (_) {}
  };

  window.showCollab = function showCollab(e, key) {
    const data = COLLAB_DATA[key];
    const card = document.getElementById("collabCard");
    if (!data || !card) return;
    const avatarEl = document.getElementById("collabAvatar");
    if (avatarEl) {
      if (data.avatar) {
        avatarEl.src = data.avatar;
        avatarEl.style.display = "block";
      } else {
        avatarEl.style.display = "none";
      }
    }
    document.getElementById("collabName").textContent = data.name;
    document.getElementById("collabHandle").textContent = data.handle;
    document.getElementById("collabRole").textContent = data.role;
    document.getElementById("collabHighlight").textContent = data.highlight;
    const x = Math.min(e.clientX + 14, window.innerWidth - 340);
    const y = Math.min(e.clientY + 18, window.innerHeight - 160);
    card.style.left = Math.max(12, x) + "px";
    card.style.top = Math.max(12, y) + "px";
    card.classList.remove("hidden");
  };

  window.hideCollab = function hideCollab() {
    const card = document.getElementById("collabCard");
    if (card) card.classList.add("hidden");
  };

  window.showCite = function showCite(e, key) {
    const data = CITE_DATA[key];
    const card = document.getElementById("hoverCard");
    if (!data || !card) return;
    document.getElementById("hoverCardVenue").textContent = data.venue;
    document.getElementById("hoverCardTitle").textContent = data.title;
    document.getElementById("hoverCardAuthors").textContent = data.authors;
    document.getElementById("hoverCardImpact").textContent = data.impact;
    const x = Math.min(e.clientX + 14, window.innerWidth - 400);
    const y = Math.min(e.clientY + 18, window.innerHeight - 160);
    card.style.left = Math.max(12, x) + "px";
    card.style.top = Math.max(12, y) + "px";
    card.classList.remove("hidden");
  };

  window.hideCite = function hideCite() {
    const card = document.getElementById("hoverCard");
    if (card) card.classList.add("hidden");
  };

  // XSS-Safe DOM Construction for the Budget Simulator Table
  window.setBudgetSim = function setBudgetSim(budgetKey) {
    ["8k", "12k"].forEach((k) => {
      const btn = document.getElementById("sim-btn-" + k);
      if (btn) {
        btn.className =
          k === budgetKey
            ? "px-3 py-1 rounded bg-[#3B97B6] text-white font-semibold"
            : "px-3 py-1 rounded border hairline hover:border-[#3B97B6]";
      }
    });
    const data = BUDGET_SIM_DATA[budgetKey];
    if (!data) return;
    document.getElementById("simSummaryText").textContent = data.summary;
    document.getElementById("simTierCounts").textContent = data.counts;

    const badgeColor = {
      FULL: "text-emerald-600 dark:text-emerald-400 font-bold",
      SKEL: "text-[#3B97B6] font-bold",
      SIGS: "text-amber-600 dark:text-amber-400 font-bold",
    };

    const tbody = document.getElementById("simTableBody");
    if (!tbody) return;
    tbody.replaceChildren();

    data.rows.forEach((r) => {
      const tr = document.createElement("tr");

      const tdPath = document.createElement("td");
      tdPath.className = "py-2 font-medium";
      tdPath.textContent = r.path;

      const tdPr = document.createElement("td");
      tdPr.className = "py-2 text-center";
      tdPr.textContent = r.pr;

      const tdTier = document.createElement("td");
      tdTier.className = `py-2 text-center ${badgeColor[r.tier] || ""}`;
      tdTier.textContent = `[${r.tier}]`;

      const tdTok = document.createElement("td");
      tdTok.className = "py-2 text-right";
      tdTok.textContent = r.tok;

      const tdNote = document.createElement("td");
      tdNote.className = "py-2 text-right muted-copy";
      tdNote.textContent = r.note;

      tr.append(tdPath, tdPr, tdTier, tdTok, tdNote);
      tbody.appendChild(tr);
    });
  };

  window.setAstTier = function setAstTier(tier) {
    ["FULL", "SKEL", "SIGS", "TREE"].forEach((t) => {
      const btn = document.getElementById("tier-btn-" + t);
      if (btn) {
        btn.className =
          t === tier
            ? "px-2.5 py-1 rounded bg-[#3B97B6] text-white font-semibold"
            : "px-2.5 py-1 rounded border hairline hover:border-[#3B97B6]";
      }
    });
    const item = AST_TIERS[tier];
    if (!item) return;
    document.getElementById("astFileLabel").textContent = item.label;
    document.getElementById("astSavingsBadge").textContent = item.badge;
    document.getElementById("astCodePreview").textContent = item.code;
  };

  window.filterChronologicalPubs = function filterChronologicalPubs(q) {
    const query = (q || "").trim().toLowerCase();
    document.querySelectorAll(".chrono-pub-item").forEach((el) => {
      el.classList.toggle(
        "hidden",
        Boolean(query && !el.textContent.toLowerCase().includes(query))
      );
    });
  };

  window.filterPubCategory = function filterPubCategory(cat, btnEl) {
    document.querySelectorAll(".pub-cat-pill").forEach((b) => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
    document.querySelectorAll(".chrono-pub-item").forEach((el) => {
      const tags = (el.getAttribute("data-tags") || "").split(" ");
      el.classList.toggle("hidden", cat !== "all" && !tags.includes(cat));
    });
  };

  window.openBlogPost = function openBlogPost(postId) {
    document.getElementById("blogIndexView").classList.add("hidden");
    document.getElementById("blog-post-1").classList.toggle("hidden", postId !== "post-1");
    document.getElementById("blog-post-2").classList.toggle("hidden", postId !== "post-2");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.closeBlogPost = function closeBlogPost() {
    document.getElementById("blogIndexView").classList.remove("hidden");
    document.getElementById("blog-post-1").classList.add("hidden");
    document.getElementById("blog-post-2").classList.add("hidden");
  };

  // XSS-Safe DOM Construction for the Command Palette (⌘K)
  window.renderCommandList = function renderCommandList(q) {
    const query = (q || "").trim().toLowerCase();
    const list = document.getElementById("cmdList");
    if (!list) return;
    list.replaceChildren();

    const matches = CMD_ITEMS.filter(
      (i) =>
        !query ||
        i.title.toLowerCase().includes(query) ||
        i.sub.toLowerCase().includes(query)
    );

    matches.forEach((m) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "w-full text-left px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition block";
      btn.addEventListener("click", () => {
        window.switchView(m.view);
        window.closeCommandModal();
      });

      const titleDiv = document.createElement("div");
      titleDiv.className = "font-semibold text-[13px] text-[#3B97B6]";
      titleDiv.textContent = m.title;

      const subDiv = document.createElement("div");
      subDiv.className = "muted-copy text-[11.5px] mt-0.5";
      subDiv.textContent = m.sub;

      btn.append(titleDiv, subDiv);
      list.appendChild(btn);
    });
  };

  window.openCommandModal = function openCommandModal() {
    const modal = document.getElementById("cmdModal");
    const inp = document.getElementById("cmdInput");
    if (!modal || !inp) return;
    modal.classList.remove("hidden");
    inp.value = "";
    window.renderCommandList("");
    setTimeout(() => inp.focus(), 30);
  };

  window.closeCommandModal = function closeCommandModal() {
    const modal = document.getElementById("cmdModal");
    if (modal) modal.classList.add("hidden");
  };

  // Security Hygiene & Initialization on DOMContentLoaded
  window.addEventListener("DOMContentLoaded", () => {
    // 1. Enforce rel="noopener noreferrer" on all external _blank links
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.setAttribute("rel", "noopener noreferrer");
    });

    // 2. Wire up anti-scraper email button & mailto icon
    const emailBtn = document.getElementById("emailCopyBtn");
    const mailtoLink = document.getElementById("emailMailtoLink");
    if (emailBtn) {
      const addr = `${atob(emailBtn.dataset.u || "a2hhbmh0cQ==")}@${atob(
        emailBtn.dataset.d || "dS5udXMuZWR1"
      )}`;
      emailBtn.addEventListener("click", () => {
        window.copyText(addr, `Copied email: ${addr}`);
      });
      if (mailtoLink) {
        mailtoLink.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.href = `mailto:${addr}`;
        });
      }
    }

    // 3. Restore saved theme preference
    try {
      if (localStorage.getItem("tqk_theme") === "dark") {
        document.documentElement.classList.add("dark");
        document.getElementById("themeMoon")?.classList.add("hidden");
        document.getElementById("themeSun")?.classList.remove("hidden");
      }
    } catch (_) {}

    // 4. Initialize Knapsack Simulator & URL Hash Deep-Linking
    window.setBudgetSim("8k");
    const applyHashRoute = () => {
      const rawHash = window.location.hash.replace("#", "").toLowerCase();
      if (rawHash === "about" || !rawHash) {
        window.switchView("overview", false);
      } else if (VIEWS.includes(rawHash)) {
        window.switchView(rawHash, false);
      }
    };
    applyHashRoute();
    window.addEventListener("popstate", applyHashRoute);
  });

  // Global Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      window.openCommandModal();
      return;
    }
    if (e.key === "Escape") {
      window.closeCommandModal();
      return;
    }
    const tag = (document.activeElement && document.activeElement.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) {
      return;
    }
    const num = parseInt(e.key, 10);
    if (num >= 1 && num <= VIEWS.length) {
      window.switchView(VIEWS[num - 1]);
    }
  });
})();