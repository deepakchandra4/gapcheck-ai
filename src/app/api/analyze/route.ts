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
        // 1. Verify GEMINI_API_KEY environment variable
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured on the server." },
                { status: 500 }
            );
        }

        // 2. Validate Content-Type
        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("multipart/form-data")) {
            return NextResponse.json(
                { error: "Content-Type must be multipart/form-data." },
                { status: 400 }
            );
        }

        // 3. Early size checking (Vercel has a 4.5MB request body limit)
        const contentLength = req.headers.get("content-length");
        if (contentLength && parseInt(contentLength, 10) > 4.5 * 1024 * 1024) {
            return NextResponse.json(
                { error: "Payload exceeds 4.5MB size limit." },
                { status: 413 }
            );
        }

        // 4. Robust multipart form data parsing
        let formData: FormData;
        try {
            formData = await req.formData();
        } catch (error: unknown) {
            console.error("Multipart/form-data parsing error:", error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            return NextResponse.json(
                { error: "Failed to parse form data. The request may be corrupt or incomplete.", details: errorMessage },
                { status: 400 }
            );
        }

        const jobDescription = formData.get("jobDescription") as string | null;
        const resumeFile = formData.get("resume") as File | null;
        const resumeTextInput = formData.get("resumeText") as string | null;

        if (!jobDescription || !jobDescription.trim()) {
            return NextResponse.json(
                { error: "Job description is required." },
                { status: 400 }
            );
        }

        // 5. Check resume file size
        if (resumeFile && resumeFile.size > 4 * 1024 * 1024) {
            return NextResponse.json(
                { error: "Uploaded file is too large. Resume must be less than 4MB." },
                { status: 413 }
            );
        }

        let resumeText = "";

        // 6. Extraction logic
        if (resumeFile && resumeFile.size > 0) {
            try {
                const bytes = await resumeFile.arrayBuffer();
                const buffer = Buffer.from(bytes);
                resumeText = await extractTextFromPDF(buffer);
            } catch (error: unknown) {
                console.error("PDF parsing error:", error);
                const errorMessage = error instanceof Error ? error.message : String(error);
                return NextResponse.json(
                    { error: "Failed to extract text from the PDF file.", details: errorMessage },
                    { status: 422 }
                );
            }
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
                { error: "Could not extract any text content from the resume." },
                { status: 400 }
            );
        }

        // 7. Prompt building
        const prompt = buildAnalysisPrompt(resumeText, jobDescription);

        // 8. Call Gemini with structured output setting
        let responseText = "";
        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                generationConfig: {
                    responseMimeType: "application/json"
                }
            });

            const result = await model.generateContent(prompt);
            responseText = result.response.text();
        } catch (error: unknown) {
            console.error("Gemini AI API error:", error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            return NextResponse.json(
                { error: "Downstream AI service failed to analyze the inputs.", details: errorMessage },
                { status: 502 }
            );
        }

        // 9. Safe JSON parsing of output
        let parsed;
        try {
            parsed = safeJsonParse(responseText);
        } catch (error: unknown) {
            console.error("JSON parsing error on AI response:", error, "Raw response:", responseText);
            const errorMessage = error instanceof Error ? error.message : String(error);
            return NextResponse.json(
                { error: "AI generated invalid JSON layout.", details: errorMessage },
                { status: 502 }
            );
        }

        return NextResponse.json(parsed, { status: 200 });
    } catch (error: unknown) {
        console.error("Unexpected analyze route handler error:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: "An unexpected server error occurred during analysis.", details: errorMessage },
            { status: 500 }
        );
    }
}