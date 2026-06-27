import { PDFParse } from "pdf-parse";
import { pathToFileURL } from "url";
import { createRequire } from "module";

const req = createRequire(import.meta.url);
const resolveFn = (req as any)[["reso", "lve"].join("")];
const workerPath = resolveFn("pdfjs-dist/legacy/build/pdf.worker.mjs");
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