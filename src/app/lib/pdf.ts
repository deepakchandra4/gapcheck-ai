import { PDFParse } from "pdf-parse";
import { getData } from "pdf-parse/worker";

// Initialize the PDF worker using the Base64 inlined Data URL to prevent path resolution crashes in Serverless/Vercel.
PDFParse.setWorker(getData());

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