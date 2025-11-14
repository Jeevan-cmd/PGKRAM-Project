'use server';

/**
 * @fileOverview This file implements the intelligent job matching flow.
 *
 * The flow takes user skills, experience, and preferences as input and returns personalized job recommendations.
 *
 * @exports intelligentJobMatching - The main function to trigger the job matching flow.
 * @exports IntelligentJobMatchingInput - The input type for the intelligentJobMatching function.
 * @exports IntelligentJobMatchingOutput - The output type for the intelligentJobMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentJobMatchingInputSchema = z.object({
  skills: z.array(z.string()).describe('List of skills possessed by the job seeker.'),
  experience: z.string().describe('Description of the job seeker\'s work experience.'),
  preferences: z.string().describe('Job seeker\'s preferences regarding job type, location, etc.'),
});
export type IntelligentJobMatchingInput = z.infer<typeof IntelligentJobMatchingInputSchema>;

const IntelligentJobMatchingOutputSchema = z.object({
  jobRecommendations: z.array(z.string()).describe('List of job recommendations based on the input.'),
});
export type IntelligentJobMatchingOutput = z.infer<typeof IntelligentJobMatchingOutputSchema>;

export async function intelligentJobMatching(input: IntelligentJobMatchingInput): Promise<IntelligentJobMatchingOutput> {
  return intelligentJobMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentJobMatchingPrompt',
  input: {schema: IntelligentJobMatchingInputSchema},
  output: {schema: IntelligentJobMatchingOutputSchema},
  prompt: `You are an AI job recommendation system.

  Based on the job seeker's skills, experience, and preferences, provide a list of personalized job recommendations.

  Skills: {{skills}}
  Experience: {{experience}}
  Preferences: {{preferences}}

  Job Recommendations:`,
});

const intelligentJobMatchingFlow = ai.defineFlow(
  {
    name: 'intelligentJobMatchingFlow',
    inputSchema: IntelligentJobMatchingInputSchema,
    outputSchema: IntelligentJobMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
