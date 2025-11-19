'use server';
/**
 * @fileOverview This file implements the AI Resume Analyzer flow.
 *
 * The flow takes resume text as input and returns an ATS score and analysis.
 *
 * @exports analyzeResume - The main function to trigger the resume analysis flow.
 * @exports ResumeAnalyzerInput - The input type for the analyzeResume function.
 * @exports ResumeAnalyzerOutput - The output type for the analyzeResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ResumeAnalyzerInputSchema = z.object({
  resumeText: z.string().describe('The full text content of the user\'s resume.'),
});
export type ResumeAnalyzerInput = z.infer<typeof ResumeAnalyzerInputSchema>;

const ResumeAnalyzerOutputSchema = z.object({
  atsScore: z
    .number()
    .describe(
      'The calculated ATS score out of 100, representing how well the resume is optimized for Applicant Tracking Systems.'
    ),
  analysis: z
    .string()
    .describe(
      'A detailed analysis of the resume, including strengths, weaknesses, and suggestions for improvement.'
    ),
  suggestedImprovements: z
    .array(z.string())
    .describe('A list of specific, actionable improvement suggestions.'),
});
export type ResumeAnalyzerOutput = z.infer<typeof ResumeAnalyzerOutputSchema>;

export async function analyzeResume(
  input: ResumeAnalyzerInput
): Promise<ResumeAnalyzerOutput> {
  return resumeAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeAnalyzerPrompt',
  input: { schema: ResumeAnalyzerInputSchema },
  output: { schema: ResumeAnalyzerOutputSchema },
  prompt: `You are an expert resume analyst and career coach, specializing in optimizing resumes for Applicant Tracking Systems (ATS).

  Your task is to analyze the provided resume text and provide an ATS score, a detailed analysis, and actionable suggestions for improvement.

  **Resume Text:**
  {{{resumeText}}}

  **Analysis Instructions:**
  1.  **ATS Score:** Calculate a score from 0 to 100. Base this on keyword optimization, formatting, clarity, and the presence of critical sections (like Contact Info, Experience, Skills, Education). A score of 85+ is considered excellent.
  2.  **Detailed Analysis:** Provide a summary of the resume's strengths and weaknesses. Mention what it does well and where it falls short from an ATS perspective.
  3.  **Actionable Suggestions:** Provide a list of clear, specific, and actionable tips for the user to improve their resume. Focus on things that will directly impact the ATS score and readability.

  Please generate the output in the required JSON format.`,
});

const resumeAnalyzerFlow = ai.defineFlow(
  {
    name: 'resumeAnalyzerFlow',
    inputSchema: ResumeAnalyzerInputSchema,
    outputSchema: ResumeAnalyzerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
