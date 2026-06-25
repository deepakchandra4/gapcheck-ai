"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, AlertTriangle } from "lucide-react";
import ResultCard from "./ResultCard";
import FileUploadCard from "./FileUploadCard";
import AnalysisLoader from "./AnalysisLoader";
import { AnalysisResult } from "@/app/types/analysis";

export default function ResumeForm() {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {
        if (loading) return;
        setError("");
        setResult(null);

        if (!jobDescription.trim()) {
            setError("Please paste a job description.");
            return;
        }

        if (!resumeFile && !resumeText.trim()) {
            setError("Please upload a resume PDF or paste resume text.");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("jobDescription", jobDescription);

            if (resumeFile) {
                formData.append("resume", resumeFile);
            }

            if (resumeText.trim()) {
                formData.append("resumeText", resumeText);
            }

            const response = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setResult(data);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Failed to analyze resume.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResumeFile(null);
        setResumeText("");
        setJobDescription("");
        setResult(null);
        setError("");
    };

    return (
        <div className="mx-auto mt-10 max-w-5xl">
            {/* Main Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md md:p-8"
            >
                {/* Visual Glass Edge Light */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-cyan-500/5 via-transparent to-indigo-500/5" />

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white md:text-3xl tracking-tight">
                        Analyze Resume Alignment
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        Upload your PDF resume or paste its text, specify the target job details, and receive comprehensive matching analytics.
                    </p>
                </div>

                <div className="grid gap-6">
                    {/* File Upload Card component */}
                    <FileUploadCard
                        selectedFile={resumeFile}
                        onFileChange={(file) => {
                            setResumeFile(file);
                            if (file) {
                                setError(""); // Clear error if resolved
                            }
                        }}
                    />

                    {/* Resume Text Fallback */}
                    <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-5 focus-within:border-cyan-500/40 transition-colors">
                        <label className="mb-2 block text-sm font-semibold text-slate-200">
                            Or Paste Resume Text
                        </label>
                        <textarea
                            rows={6}
                            value={resumeText}
                            onChange={(e) => setResumeText(e.target.value)}
                            placeholder="Type or paste plain resume text here if you don't have a PDF file..."
                            className="w-full rounded-xl border border-white/5 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-cyan-500/30 transition-all focus:ring-1 focus:ring-cyan-500/20"
                        />
                    </div>

                    {/* Job Description Input */}
                    <div className="rounded-2xl border border-white/10 bg-slate-950/20 p-5 focus-within:border-cyan-500/40 transition-colors">
                        <label className="mb-2 block text-sm font-semibold text-slate-200">
                            Target Job Description
                        </label>
                        <textarea
                            rows={8}
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the full job post details (role, duties, keywords, competencies)..."
                            className="w-full rounded-xl border border-white/5 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-cyan-500/30 transition-all focus:ring-1 focus:ring-cyan-500/20"
                        />
                        <p className="mt-2 text-[11px] text-slate-400">
                            Provide complete specs to yield maximum analysis granularity.
                        </p>
                    </div>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                        >
                            <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0 text-red-400 mt-0.5" />
                            <span>{error}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form Buttons */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="relative overflow-hidden group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white transition-all shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <Sparkles className="h-4.5 w-4.5" />
                        Analyze Resume
                    </button>

                    <button
                        onClick={handleReset}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 active:scale-[0.99]"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </button>
                </div>
            </motion.div>

            {/* Analysis Loader with AnimatePresence */}
            <AnimatePresence>
                {loading && <AnalysisLoader />}
            </AnimatePresence>

            {/* Results output */}
            <AnimatePresence>
                {result && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <ResultCard result={result} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}