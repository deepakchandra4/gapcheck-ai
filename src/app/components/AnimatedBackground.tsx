"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full bg-[#030712] overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07]" 
        style={{
          backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px), 
                            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px",
        }}
      />

      {/* Floating Glow Orbs */}
      <div className="absolute inset-0 filter blur-[120px] opacity-45 mix-blend-screen">
        {/* Cyan Orb */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -100, 60, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-10 left-1/4 h-[350px] w-[350px] rounded-full bg-cyan-500/20"
        />

        {/* Purple/Indigo Orb */}
        <motion.div
          animate={{
            x: [0, -100, 60, 0],
            y: [0, 80, -90, 0],
            scale: [1, 0.85, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/15"
        />

        {/* Emerald/Green Orb */}
        <motion.div
          animate={{
            x: [0, 50, -60, 0],
            y: [0, 60, 90, 0],
            scale: [1, 1.1, 0.85, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-1/3 h-[300px] w-[300px] rounded-full bg-emerald-500/10"
        />
      </div>

      {/* Radial Gradient vignette to darken the edges and spotlight the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030712_80%)]" />
    </div>
  );
}
