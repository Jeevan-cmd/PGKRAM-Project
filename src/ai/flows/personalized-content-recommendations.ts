'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized content recommendations to users.
 *
 * The flow analyzes a user's viewing history to suggest relevant resources and employment opportunities.
 * - personalizedContentRecommendations - A function that generates personalized content recommendations.
 * - PersonalizedContentRecommendationsInput - The input type for the personalizedContentRecommendations function.
 * - PersonalizedContentRecommendationsOutput - The return type for the personalizedContentRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedContentRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to generate recommendations.'),
  viewingHistory: z
    .array(z.string())
    .describe('An array of content IDs representing the user\'s viewing history.'),
});
export type PersonalizedContentRecommendationsInput = z.infer<
  typeof PersonalizedContentRecommendationsInputSchema
>;

const PersonalizedContentRecommendationsOutputSchema = z.object({
  recommendedResources: z
    .array(z.string())
    .describe('An array of content IDs representing recommended resources.'),
  recommendedJobCategories: z
    .array(z.string())
    .describe('An array of job category IDs representing recommended job categories.'),
});
export type PersonalizedContentRecommendationsOutput = z.infer<
  typeof PersonalizedContentRecommendationsOutputSchema
>;

export async function personalizedContentRecommendations(
  input: PersonalizedContentRecommendationsInput
): Promise<PersonalizedContentRecommendationsOutput> {
  return personalizedContentRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedContentRecommendationsPrompt',
  input: {schema: PersonalizedContentRecommendationsInputSchema},
  output: {schema: PersonalizedContentRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized content recommendations to users of a job and business support portal.

  Based on the user's viewing history, suggest relevant resources and job categories that might be of interest to them.

  User ID: {{{userId}}}
  Viewing History: {{#if viewingHistory}}{{#each viewingHistory}}- {{{this}}}{{/each}}{{else}}No viewing history available.{{/if}}

  Please provide recommendations for resources and job categories that align with the user's interests based on their viewing history.
  Format your response as a JSON object with \"recommendedResources\" and \"recommendedJobCategories\" arrays.
  Limit the number of recommendations to 5 for each category.
  `,
});

const personalizedContentRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedContentRecommendationsFlow',
    inputSchema: PersonalizedContentRecommendationsInputSchema,
    outputSchema: PersonalizedContentRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
