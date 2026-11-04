# Tran Quoc Khanh — Academic & Systems Engineering Homepage (`khanhtq29vn.github.io`)

Personal academic and open-source systems homepage of **Tran Quoc Khanh** (**Khanh Quoc Tran**), Fundamental AI Researcher in Low-Resource NLP, Model Efficiency, and Trustworthy & Explainable AI (`AAAI`, `EACL`, `Knowledge-Based Systems`, `Neural Computing and Applications`), and Co-Creator of [`ContextCraft`](https://github.com/khanhtq29vn/contextcraft).

🔗 **Live Website:** [https://khanhtq29vn.github.io](https://khanhtq29vn.github.io)

---

## ✨ Engineering & Architectural Highlights

Although hosted statically on GitHub Pages, this homepage is architected from scratch as a zero-dependency, security-hardened Single-Page Academic Monograph:

1. **Clean-Room Semantic HTML5 & Modular Controller (`assets/site.js`):**
   - Strictly separates document structure (`index.html`) from interactive state and data (`assets/site.js`).
   - **Zero DOM-XSS Surface:** All dynamic views (the `⌘K` Command Palette and the Multi-Budget Knapsack Simulator) are constructed via `document.createElement()` and `textContent`—never `innerHTML` string concatenation.
2. **Client-Side Security Hardening:**
   - Enforces a strict `Content-Security-Policy` (CSP), `X-Content-Type-Options: nosniff`, and `strict-origin-when-cross-origin` referrer policy.
   - Protects institutional email addresses against automated web scrapers via runtime Base64 assembly.
3. **Interactive Systems & Research Demos:**
   - **Live MCKP Budget Simulator & 4-Tier AST Inspector:** Demonstrates how [`ContextCraft`](https://github.com/khanhtq29vn/contextcraft) allocates `FULL`, `SKEL`, `SIGS`, and `TREE` tiers across `8k` and `12k` token budgets.
   - **Progressive Disclosure Hover Cards:** Displays inline citation previews and GitHub collaborator attribution cards at zero static layout cost.
   - **Highwire Press Meta Tags:** Embedded `citation_*` metadata in `<head>` for accurate indexing by Google Scholar.

---

## 🙏 Acknowledgments, Design Lineage & Credits

In the spirit of open-source collegiality and academic transparency, I gratefully acknowledge the following individuals and projects whose work inspired the visual layout and engineering of this site:

1. **Academic Layout & Typography Inspiration:**
   - [**Do Xuan Long (`dxlong2000.github.io`)**](https://dxlong2000.github.io/) (NUS Computing): Special thanks to Do Xuan Long for the inspiration behind the minimalist two-column monograph proportion, the bounded scrollable `| News` viewport, the cerulean section accents, and the `Selected Papers` / `Student Papers` pill organization.
   - [**AcademicPages (`academicpages.github.io`)**](https://github.com/academicpages/academicpages.github.io) (forked from Minimal Mistakes by Stuart Geiger) and [**Jon Barron (`jonbarron.info`)**](https://jonbarron.info/): For pioneering the multi-section navigation tabs (`Publications`, `Teaching`, `Honors`, `Blog Posts`) and clean academic web conventions widely adopted across Computer Science departments.
   - *Note on Implementation Provenance:* All HTML, CSS, SVG diagrams, and JavaScript (`assets/site.js`) in this repository were written **from scratch (clean-room implementation)** without copying template source files or third-party theme bundles.

2. **Open-Source Systems Collaborators & Research Advisors:**
   - [**Ngo Duc Hoang Son (`@pinanek`)**](https://github.com/pinanek): Co-Creator and Core Systems Architect of [`ContextCraft`](https://github.com/khanhtq29vn/contextcraft) (architected the Rust + Rayon + PyO3 core migration in PR `#34`, the 35-language pipeline in PR `#19`, and BM25F ranking in PR `#23`).
   - [**`@tyza66`**](https://github.com/tyza66): First external community contributor to [`ContextCraft`](https://github.com/khanhtq29vn/contextcraft) (implemented the `--encoding` CLI tokenizer flag in PR `#17`).
   - **Assoc. Prof. Binh Thanh Nguyen** (VNUHCM-US / AISIA Research Lab) and **Dr. Kiet Van Nguyen** (VNUHCM-UIT): For their dedicated mentorship and supervision across our research publications.

---

## 📄 License & Reuse Policy

- **Source Code (`index.html`, `assets/site.js`):** Released under the [MIT License](LICENSE). Fellow students and researchers are welcome to fork or reference the code structure—please retain attribution in your `README.md` and footer, and replace all personal biographical data before publishing.
- **Personal Content & Publications:** All biographical text, publication metadata, and personal profile information are Copyright © 2026 Tran Quoc Khanh.
