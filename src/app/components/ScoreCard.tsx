"use client";

import { motion } from "framer-motion";

interface ScoreCardProps {
  score: number;
}

export default function ScoreCard({ score }: ScoreCardProps) {
  // Circular gauge setup
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * score) / 100;

  const getScoreColor = () => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-rose-400";
  };

  const getStrokeColorClass = () => {
    if (score >= 80) return "stroke-emerald-400";
    if (score >= 60) return "stroke-amber-400";
    return "stroke-rose-400";
  };

  const getGlowColorClass = () => {
    if (score >= 80) return "shadow-emerald-500/20";
    if (score >= 60) return "shadow-amber-500/20";
    return "shadow-rose-500/20";
  };

  const getStatusText = () => {
    if (score >= 80) return "Strong Match Alignment";
    if (score >= 60) return "Moderate Fit (Skill Gaps)";
    return "Weak Fit (Action Required)";
  };

  const getStatusDescription = () => {
    if (score >= 80) {
      return "Your resume demonstrates excellent alignment with this role. Your profile satisfies the majority of critical core competencies, technologies, and experience benchmarks.";
    }
    if (score >= 60) {
      return "You possess several matching capabilities, but some core credentials or technical skills are missing. Injecting the missing keywords and addressing recommendations will significantly improve your profile.";
    }
    return "There is a substantial divergence between your profile and this job post. Review the recommendations below to structure an update of your experience bullet points to match the target description.";
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-6 md:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center gap-8`}>
      {/* Visual background gradient edge */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />

      {/* SVG Circular Progress Ring */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        <svg className="h-36 w-36 -rotate-90">
          {/* Background circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Glowing/Blurred background bar */}
          <motion.circle
            cx="72"
            cy="72"
            r={radius}
            className={getStrokeColorClass()}
            strokeWidth="10"
            strokeLinecap="round"
            fill="transparent"
            style={{
              strokeDasharray: circumference,
              filter: "blur(2px)",
              opacity: 0.5,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Foreground active bar */}
          <motion.circle
            cx="72"
            cy="72"
            r={radius}
            className={getStrokeColorClass()}
            strokeWidth="10"
            strokeLinecap="round"
            fill="transparent"
            style={{
              strokeDasharray: circumference,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Text score centered inside circle */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`text-4xl font-extrabold tracking-tight ${getScoreColor()}`}
          >
            {score}
          </motion.span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Match %</span>
        </div>
      </div>

      {/* Score details */}
      <div className="flex-1 text-center md:text-left">
        <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
          Evaluation Result
        </p>
        <h3 className={`mt-1 text-2xl font-extrabold tracking-tight ${getScoreColor()}`}>
          {getStatusText()}
        </h3>
        <p className="mt-3.5 text-sm leading-relaxed text-slate-300">
          {getStatusDescription()}
        </p>
      </div>
    </div>
  );
}