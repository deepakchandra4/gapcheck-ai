"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030712]/60 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo and Name */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-2 text-white shadow-md shadow-cyan-500/10 group-hover:scale-105 transition-transform">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              GapCheck AI
            </h1>
            <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5 uppercase tracking-wide">
              Resume Intelligence
            </p>
          </div>
        </motion.div>

        {/* Action Badge */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.05)]"
        >
          <Sparkles className="h-3 w-3 animate-pulse text-cyan-400" />
          <span>v1.0.0 Stable</span>
        </motion.div>
      </div>
    </header>
  );
}