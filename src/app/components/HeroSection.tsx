"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Activity } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="max-w-4xl pt-6 pb-2">
      {/* Premium Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
      >
        <Sparkles className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
        AI-First Hiring Intelligence
      </motion.div>

      {/* Main Hero Header */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl"
      >
        Optimizing Candidate Fit with{" "}
        <span className="relative block sm:inline mt-1 sm:mt-0">
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
            GapCheck AI
          </span>
          <span className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-cyan-500/40 via-teal-500/20 to-transparent rounded-full" />
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-8 max-w-3xl text-base leading-relaxed text-slate-300/90 md:text-lg md:leading-loose"
      >
        A premium intelligence layer designed to check alignments between candidate resumes and target job profiles. 
        Evaluating fit metrics, finding missing core competencies, predicting ATS scoring bottlenecks, and generating 
        precision interview guides.
      </motion.p>
    </div>
  );
}
