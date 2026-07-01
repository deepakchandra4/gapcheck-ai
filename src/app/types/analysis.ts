export interface AnalysisResult {
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    strengths: string[];
    resumeImprovements: string[];
    atsKeywords: string[];
    interviewQuestions: string[];
    improvementPlan: string[];
}
