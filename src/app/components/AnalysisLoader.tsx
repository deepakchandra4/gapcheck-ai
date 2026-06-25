"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";

const LOADING_STEPS = [
  "Analyzing resume layout and text...",
  "Parsing key professional experiences...",
  "Comparing technical skills with job requirements...",
  "Identifying crucial competency gaps...",
  "Running ATS compatibility benchmarks...",
  "Formulating strategic improvement advice...",
  "Drafting typical interview questions...",
  "Assembling your personalized career roadmap...",
];

export default function AnalysisLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-cyan-500/20 bg-[#0B1020]/60 p-8 shadow-[0_0_50px_rgba(6,182,212,0.1)] backdrop-blur-lg text-center"
    >
      {/* Pulse Orb */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Outer glowing pulse rings */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-full w-full rounded-full bg-cyan-500/10"
        />
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.2, 0, 0.2],
          }}
          transition={{
            duration: 2.5,
            delay: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-full w-full rounded-full bg-indigo-500/10"
        />

        {/* Center rotating orb */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-16 w-16 rounded-full border-2 border-dashed border-cyan-400/40"
        />

        <div className="z-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-4 text-white shadow-lg shadow-cyan-500/30">
          <Sparkles className="h-6 w-6 animate-pulse" />
        </div>
      </div>

      {/* Rotating Message text */}
      <div className="mt-6 min-h-[50px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-1.5"
          >
            <p className="text-sm font-semibold tracking-wider uppercase text-cyan-400 flex items-center gap-1">
              <Compass className="h-3.5 w-3.5 animate-spin" /> Engine Processing
            </p>
            <p className="text-base font-medium text-slate-200">
              {LOADING_STEPS[currentStep]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex w-48 gap-1.5 justify-center">
        {LOADING_STEPS.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentStep
                ? "w-8 bg-cyan-400"
                : "w-2 bg-white/10"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
