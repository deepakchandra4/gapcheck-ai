import { PDFParse } from "pdf-parse";


import path from "path";
import { pathToFileURL } from "url";

// Use public/pdf.worker.mjs to ensure it is packaged and available in production
const workerPath = path.resolve(process.cwd(), "public/pdf.worker.mjs");
PDFParse.setWorker(pathToFileURL(workerPath).toString());

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
    try {
        const parser = new PDFParse({ data: buffer });
        const data = await parser.getText();
        await parser.destroy();
        return data.text?.trim() || "";
    } catch (error) {
        console.error("PDF parsing error:", error);
        throw new Error("Failed to extract text from PDF.");
    }
}