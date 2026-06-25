"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, X, CheckCircle } from "lucide-react";

interface FileUploadCardProps {
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
}

export default function FileUploadCard({
  selectedFile,
  onFileChange,
}: FileUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        onFileChange(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatBytes = (bytes: number, decimals = 1) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const triggerInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 transition-all duration-300 hover:border-cyan-500/20">
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-semibold text-white tracking-wide">
          Upload Resume (PDF)
        </label>
        {selectedFile && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
            <CheckCircle className="h-3.5 w-3.5" /> Ready to Analyze
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerInputClick}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-cyan-400 bg-cyan-950/10 scale-[0.99]"
              : "border-white/10 bg-slate-900/50 hover:border-white/20 hover:bg-slate-900/80"
          }`}
        >
          <div className="rounded-full bg-slate-800 p-3 text-cyan-400 group-hover:scale-110 transition-transform">
            <UploadCloud className="h-6 w-6" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-200">
            Drag & drop your PDF resume here, or{" "}
            <span className="text-cyan-400 hover:underline">browse</span>
          </p>
          <p className="mt-1.5 text-xs text-slate-400">
            Supports PDF files up to 10MB
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-4 transition-all duration-300">
          <div className="flex items-center gap-3.5 overflow-hidden">
            <div className="rounded-lg bg-cyan-500/20 p-2.5 text-cyan-400 flex-shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-200">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-400">
                {formatBytes(selectedFile.size)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className="rounded-lg border border-white/10 bg-slate-900 p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200"
            title="Remove File"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
