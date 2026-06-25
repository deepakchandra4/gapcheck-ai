import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { buildAnalysisPrompt } from "@/app/lib/prompt";
import { extractTextFromPDF } from "@/app/lib/pdf";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

function safeJsonParse(text: string) {
    try {
        return JSON.parse(text);
    } catch {
        // Try removing accidental markdown fences
        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        return JSON.parse(cleaned);
    }
}

export async function POST(req: NextRequest) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Missing GEMINI_API_KEY in environment variables." },
                { status: 500 }
            );
        }

        const formData = await req.formData();
        const jobDescription = formData.get("jobDescription") as string | null;
        const resumeFile = formData.get("resume") as File | null;
        const resumeTextInput = formData.get("resumeText") as string | null;

        if (!jobDescription || !jobDescription.trim()) {
            return NextResponse.json(
                { error: "Job description is required." },
                { status: 400 }
            );
        }

        let resumeText = "";

        if (resumeFile && resumeFile.size > 0) {
            const bytes = await resumeFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            resumeText = await extractTextFromPDF(buffer);
        } else if (resumeTextInput && resumeTextInput.trim()) {
            resumeText = resumeTextInput.trim();
        } else {
            return NextResponse.json(
                { error: "Please upload a resume PDF or paste resume text." },
                { status: 400 }
            );
        }

        if (!resumeText.trim()) {
            return NextResponse.json(
                { error: "Could not extract resume text." },
                { status: 400 }
            );
        }

        const prompt = buildAnalysisPrompt(resumeText, jobDescription);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        const parsed = safeJsonParse(responseText);

        return NextResponse.json(parsed, { status: 200 });
    } catch (error) {
        console.error("Analyze API error:", error);
        return NextResponse.json(
            {
                error: "Failed to analyze resume against job description.",
            },
            { status: 500 }
        );
    }
}