# GapCheck AI — AI Resume-JD Match Analyzer

GapCheck AI is a high-fidelity Next.js web application designed to evaluate candidate alignment against target job descriptions. By integrating deep analysis parameters powered by Google Gemini, the platform parses PDF resumes, isolates core skill sets, details matching and missing competencies, evaluates ATS compliance, and generates predictive interview prep guides to empower candidates to optimize their profiles.

---

## 🌟 Key Features

- **Dual Upload Input Flow**: Drag-and-drop or select native PDF resume files, or paste direct text content for immediate processing.
- **Competency Gap Analyzer**: Isolates matching credentials and lists missing requirements, helping candidates align their portfolios with target requirements.
- **Interactive Scoring Gauge**: Displays a premium animated match-rate gauge based on job-competency coverage metrics.
- **ATS Optimization Guide**: Generates strategic keyword injections to bypass automated screening filters.
- **Interview Simulator**: Prepares users with custom role-specific questions and targeted guides based on CV-job description alignment.
- **Subtle Glassmorphic Design**: Responsive dashboard built on top of a dark ambient grid overlay and animated glowing gradients.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server-Side API Handlers)
- **Language**: [TypeScript](https://www.typescript.org/) (Strictly-typed static checks)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Core Dependencies**:
  - `pdf-parse` (v2.4.5 ESM-compatible build for PDF buffer extraction)
  - `pdfjs-dist` (v5.4.296 backend PDF engine)
  - `@google/generative-ai` (Gemini API integration)
  - `lucide-react` (Interface iconography)

---

## 📁 Folder Structure

```text
gapcheck-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts         # Server-Side Gemini API handler
│   │   ├── components/
│   │   │   ├── AnalysisLoader.tsx    # Sequentially updating loading spinner
│   │   │   ├── AnimatedBackground.tsx# Neon background grid design
│   │   │   ├── FileUploadCard.tsx    # Drag-and-drop upload handler with file remove X button
│   │   │   ├── HeroSection.tsx       # Landing header and badge
│   │   │   ├── Navbar.tsx            # Sticky header logo bar
│   │   │   ├── ResultCard.tsx        # Structured metric layout wrapper
│   │   │   └── ScoreCard.tsx         # Circular SVG match gauge
│   │   ├── lib/
│   │   │   ├── pdf.ts                # PDF-to-Text extraction utility
│   │   │   └── prompt.ts             # Engineering prompts for Gemini
│   │   ├── types/
│   │   │   └── analysis.ts           # Unified TypeScript definitions
│   │   ├── globals.css               # Global Tailwind CSS configurations
│   │   ├── layout.tsx                # Page HTML structure metadata
│   │   └── page.tsx                  # Home layout entry point
├── package.json
└── README.md
```

---

## 🔌 Setup & Environment Variables

To run the application locally, you will need a Google Gemini Developer API key. 

Create a `.env.local` file in the root of the project directory and configure the following variable:

```env
GEMINI_API_KEY=YOUR_GEMINI_DEVELOPER_API_KEY
```

> Get your API Key from [Google AI Studio](https://aistudio.google.com/).

---

## ⚙️ Operational Mechanics: How it Works

### 1. Resume Extraction
- If a user uploads a PDF file, the file's binary stream is read on the server using `ArrayBuffer` conversion.
- The `pdf-parse` parser processes the binary buffer. It calls on the legacy worker thread of `pdfjs-dist` to parse internal PDF streams and extract plain text.
- If the user opts to paste text directly, the text input is used directly as a fallback.

### 2. Prompt Engineering & Gemini Synthesis
- The target job description and the extracted resume text are structured into a strict JSON-forcing schema within `src/app/lib/prompt.ts`.
- The API handler at `src/app/api/analyze/route.ts` fires a POST request to Google's Generative AI endpoint utilizing the robust, lightning-fast **`gemini-2.5-flash`** model.
- The API processes the request and responds with a serialized JSON payload containing scores, missing/matching skills, keywords, and interview guides.

### 3. Client Presentation
- While parsing, the frontend triggers `AnalysisLoader` to cycle through status steps and displays an animated AI pulsing orb.
- Once loaded, the payload is parsed and rendered in a staggered list of section blocks, featuring active hover lift (3D depth) transitions and interactive components.

---

## 💻 Running Locally

Follow these steps to spin up the local development environment:

1. **Clone & Navigate**:
   ```bash
   git clone <repository-url>
   cd gapcheck-ai
   ```

2. **Install Dependencies**:
   ```bash
   npm.cmd install
   # Or standard npm command:
   npm install
   ```

3. **Spin up Dev Server**:
   ```bash
   npm.cmd run dev
   # Or:
   npm run dev
   ```

4. **Access the Port**:
   Open [http://localhost:3000](http://localhost:3000) inside your web browser.

---

## 💡 Challenges Solved: Server-Side PDF Workers in Next.js Bundles

### The Issue:
During server-side PDF parsing in Next.js, `pdfjs-dist` attempts to load its internal worker file (`pdf.worker.mjs`) dynamically. Because Next.js bundles and runs API files under local `.next` chunks paths (e.g., `.next/dev/server/chunks/`), the relative path resolution within the package breaks, causing a critical `"Setting up fake worker failed: Cannot find module..."` crash.

### The Resolution:
Rather than relying on fragile bundler-relative imports, we resolved the absolute path to the worker file from the local workspace node_modules dynamically using `path.resolve` combined with `process.cwd()`. We then converted the absolute file path to a valid `file://` protocol URL using Node's `pathToFileURL` library:

```typescript
import path from "path";
import { pathToFileURL } from "url";
import { PDFParse } from "pdf-parse";

const workerPath = path.resolve(
    process.cwd(),
    "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs"
);
PDFParse.setWorker(pathToFileURL(workerPath).toString());
```

This bypasses bundler chunk directory restrictions, allowing Node's native module loader to resolve the worker stream directly, and ensures 100% stable server-side PDF text extraction.

---

## 💼 Resume-Worthy Project Description (For Portfolio)

**GapCheck AI — Full-Stack AI Engineer Portfolio Project**
- Developed a high-fidelity web-based resume intelligence platform utilizing **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** to assess candidate CV alignment against target job posts.
- Integrated **Google Gemini v1beta API** (`gemini-2.5-flash`) to orchestrate prompt engineering pipelines, generating structured JSON evaluations covering skill alignment, ATS keyword optimization, and interview preparation guides.
- Implemented server-side PDF parsing and extraction using the `pdf-parse` library, solving bundler directory compilation issues by dynamically injecting absolute `file://` URL configurations to worker pools.
- Refactored frontend codebase into fully decoupled, reusable components (loading states, drag-and-drop file inputs, circular score progress gauges) and incorporated staggering entrance transitions to elevate UX.

---

## 📈 Future Roadmap

- [ ] **Multi-format Support**: Support DOCX and RTF document uploads.
- [ ] **Historical Analytics**: Persist previous matches using a local database (MongoDB/PostgreSQL) to show candidate improvement trends over time.
- [ ] **Direct Job Sourcing**: Fetch relevant matching job posts from job search APIs based on CV skills matches.
