"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ResumeForm from "./components/ResumeForm";
import AnimatedBackground from "./components/AnimatedBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen text-slate-100 selection:bg-cyan-500/35 selection:text-white pb-20">
      {/* Dynamic Animated Glow Grid Backdrop */}
      <AnimatedBackground />

      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 flex flex-col gap-6">
        <HeroSection />
        <ResumeForm />
      </section>
    </main>
  );
}