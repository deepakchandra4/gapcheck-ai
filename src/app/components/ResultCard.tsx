"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, TrendingUp, Key, Edit3, Map, HelpCircle } from "lucide-react";
import { AnalysisResult } from "../types/analysis";
import ScoreCard from "./ScoreCard";

interface ResultCardProps {
    result: AnalysisResult;
}

const colorMap = {
    cyan: {
        border: "border-cyan-500/20",
        bg: "bg-cyan-500/5",
        text: "text-cyan-300",
        badge: "bg-cyan-500/10 border-cyan-400/20 text-cyan-300",
        icon: "text-cyan-400"
    },
    green: {
        border: "border-emerald-500/20",
        bg: "bg-emerald-500/5",
        text: "text-emerald-300",
        badge: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
        icon: "text-emerald-400"
    },
    red: {
        border: "border-rose-500/20",
        bg: "bg-rose-500/5",
        text: "text-rose-300",
        badge: "bg-rose-500/10 border-rose-400/20 text-rose-300",
        icon: "text-rose-400"
    },
    yellow: {
        border: "border-amber-500/20",
        bg: "bg-amber-500/5",
        text: "text-amber-300",
        badge: "bg-amber-500/10 border-amber-400/20 text-amber-300",
        icon: "text-amber-400"
    },
    purple: {
        border: "border-purple-500/20",
        bg: "bg-purple-500/5",
        text: "text-purple-300",
        badge: "bg-purple-500/10 border-purple-400/20 text-purple-300",
        icon: "text-purple-400"
    },
};

function SectionBlock({
    title,
    items,
    color = "cyan",
    icon: Icon,
}: {
    title: string;
    items: string[];
    color?: "cyan" | "green" | "red" | "yellow" | "purple";
    icon: React.ComponentType<any>;
}) {
    const config = colorMap[color];

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`rounded-2xl border ${config.border} bg-slate-950/30 p-6 backdrop-blur-md transition-all duration-300 hover:bg-slate-900/30 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]`}
        >
            <div className="flex items-center gap-2.5 mb-4">
                <div className={`rounded-xl ${config.bg} p-2 ${config.icon}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
            </div>

            {items.length === 0 ? (
                <p className="text-sm text-slate-400">No items generated for this section.</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {items.map((item, index) => (
                        <span
                            key={index}
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide ${config.badge} transition-all duration-200 hover:brightness-110 cursor-default`}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default function ResultCard({ result }: ResultCardProps) {
    return (
        <section className="mt-10 space-y-8">
            {/* Score Card Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <ScoreCard score={result.matchScore} />
            </motion.div>

            {/* Insight Grid staggers elements */}
            <motion.div 
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.1
                        }
                    }
                }}
                initial="hidden"
                animate="show"
                className="grid gap-6 md:grid-cols-2"
            >
                <SectionBlock
                    title="Matched Skills"
                    items={result.matchedSkills}
                    color="green"
                    icon={CheckCircle2}
                />

                <SectionBlock
                    title="Missing Skills"
                    items={result.missingSkills}
                    color="red"
                    icon={AlertCircle}
                />

                <SectionBlock
                    title="Strengths Found"
                    items={result.strengths}
                    color="cyan"
                    icon={TrendingUp}
                />

                <SectionBlock
                    title="ATS Keywords to Inject"
                    items={result.atsKeywords}
                    color="yellow"
                    icon={Key}
                />

                <SectionBlock
                    title="Resume Recommendations"
                    items={result.resumeImprovements}
                    color="purple"
                    icon={Edit3}
                />

                <SectionBlock
                    title="Immediate Improvement Plan"
                    items={result.improvementPlan}
                    color="cyan"
                    icon={Map}
                />
            </motion.div>

            {/* Interview questions block */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="rounded-2xl border border-white/10 bg-slate-950/30 p-6 md:p-8 backdrop-blur-md"
            >
                <div className="flex items-center gap-2.5 mb-6">
                    <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400">
                        <HelpCircle className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                        Target Interview Questions
                    </h3>
                </div>

                {result.interviewQuestions.length === 0 ? (
                    <p className="text-sm text-slate-400">No specific interview questions available.</p>
                ) : (
                    <ul className="grid gap-3 md:grid-cols-2">
                        {result.interviewQuestions.map((question, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ scale: 1.005, x: 2 }}
                                className="flex items-start gap-3 rounded-xl border border-white/5 bg-slate-900/30 p-4 text-sm text-slate-200 transition-colors hover:border-indigo-500/20 hover:bg-slate-900/60"
                            >
                                <span className="flex h-5 w-5 items-center justify-center rounded bg-indigo-500/10 text-xs font-bold text-indigo-300">
                                    {index + 1}
                                </span>
                                <span className="flex-1 leading-relaxed">{question}</span>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </motion.div>
        </section>
    );
}