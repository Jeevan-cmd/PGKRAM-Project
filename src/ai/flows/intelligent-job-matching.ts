'use server';

/**
 * @fileOverview This file implements the intelligent job matching flow.
 *
 * The flow takes user skills, experience, and preferences, along with a list of available jobs,
 * and returns personalized job recommendations from that list.
 *
 * @exports intelligentJobMatching - The main function to trigger the job matching flow.
 * @exports IntelligentJobMatchingInput - The input type for the intelligentJobMatching function.
 * @exports IntelligentJobMatchingOutput - The output type for the intelligentJobMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  company: z.string(),
  location: z.string(),
  type: z.string(),
  sector: z.string(),
  qualification: z.string(),
  experience: z.number(),
});

const IntelligentJobMatchingInputSchema = z.object({
  category: z.string().describe('The desired job category.'),
  experienceLevel: z.string().describe('The job seeker\'s experience level (e.g., Entry-level, Mid-level, Senior).'),
  jobType: z.string().describe('The preferred type of employment (e.g., Full-time, Part-time).'),
  jobs: z.array(JobSchema).describe('The list of available jobs to match against.'),
});
export type IntelligentJobMatchingInput = z.infer<typeof IntelligentJobMatchingInputSchema>;

const IntelligentJobMatchingOutputSchema = z.object({
  jobRecommendations: z.array(z.string()).describe('A list of titles of the most suitable jobs from the provided list.'),
});
export type IntelligentJobMatchingOutput = z.infer<typeof IntelligentJobMatchingOutputSchema>;

export async function intelligentJobMatching(input: IntelligentJobMatchingInput): Promise<IntelligentJobMatchingOutput> {
  return intelligentJobMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentJobMatchingPrompt',
  input: {schema: IntelligentJobMatchingInputSchema},
  output: {schema: IntelligentJobMatchingOutputSchema},
  prompt: `You are an expert AI career counselor for the Punjab Opportunities Hub. Your task is to act as a recommendation engine.

You will be given a job seeker's preferences (category, experience level, job type) and a list of available jobs in JSON format.

Analyze the user's preferences and compare them against each job in the list. Based on this analysis, identify the top 3-5 most suitable jobs for the user.

Return only the titles of the recommended jobs in the 'jobRecommendations' array.

**Job Seeker Preferences:**
- Category: {{{category}}}
- Experience Level: {{{experienceLevel}}}
- Job Type: {{{jobType}}}

**Available Jobs List (JSON):**
{{{json jobs}}}

Based on your analysis, provide the personalized job recommendations.`,
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
