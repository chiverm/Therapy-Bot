'use server';
/**
 * @fileOverview A flow for rating AI responses and providing feedback to improve the bot over time.
 *
 * - improvePrompt - A function that handles the process of receiving a rating and feedback for an AI response.
 * - ImprovePromptInput - The input type for the improvePrompt function.
 * - ImprovePromptOutput - The return type for the improvePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImprovePromptInputSchema = z.object({
  rating: z.number().describe('The rating given to the AI response (e.g., 1-5).'),
  feedback: z.string().describe('The feedback provided by the user about the AI response.'),
  conversationHistory: z.string().describe('The previous conversation history between the user and the AI.'),
});
export type ImprovePromptInput = z.infer<typeof ImprovePromptInputSchema>;

const ImprovePromptOutputSchema = z.object({
  success: z.boolean().describe('Whether the feedback was successfully processed.'),
  message: z.string().describe('A message indicating the status of the feedback processing.'),
});
export type ImprovePromptOutput = z.infer<typeof ImprovePromptOutputSchema>;

export async function improvePrompt(input: ImprovePromptInput): Promise<ImprovePromptOutput> {
  return improvePromptFlow(input);
}

const improvePromptFlow = ai.defineFlow(
  {
    name: 'improvePromptFlow',
    inputSchema: ImprovePromptInputSchema,
    outputSchema: ImprovePromptOutputSchema,
  },
  async input => {
    // In a real-world scenario, this is where you would send the rating
    // and feedback to a database or analytics service for further analysis
    // and model improvement.
    // For this example, we'll just log the feedback and return a success message.
    console.log('Received feedback:', input.feedback);
    console.log('Received rating:', input.rating);
    console.log('Conversation history:', input.conversationHistory);

    return {
      success: true,
      message: 'Thank you for your feedback! We will use it to improve our AI responses.',
    };
  }
);
