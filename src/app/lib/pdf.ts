import { PDFParse } from "pdf-parse";
import { pathToFileURL } from "url";
import path from "path";

// Use process.cwd() to resolve the path at runtime.
// The next.config.ts explicitly traces and packages this file under Vercel/production.
const workerPath = path.resolve(
    process.cwd(),
    "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs"
);
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