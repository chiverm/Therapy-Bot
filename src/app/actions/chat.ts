'use server';

import { z } from 'zod';
import { generateEmpatheticResponse } from '@/ai/flows/empathetic-chat-flow';

const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  sender: z.enum(['user', 'ai']),
  timestamp: z.date(),
});

export type Message = z.infer<typeof MessageSchema>;

const HandleUserMessageInputSchema = z.object({
  userMessage: z.string().min(1, "Message cannot be empty."),
  conversationHistory: z.array(MessageSchema),
});

export type HandleUserMessageInput = z.infer<typeof HandleUserMessageInputSchema>;

// Helper function to format conversation history for the AI prompt
function formatConversationHistory(history: Message[]): string {
  return history
    .map(msg => `${msg.sender === 'user' ? 'User' : 'AI'}: ${msg.text}`)
    .join('\\n');
}

export async function handleUserMessage(input: HandleUserMessageInput): Promise<Message> {
  try {
    const validatedInput = HandleUserMessageInputSchema.parse(input);
    
    console.log("Received user message:", validatedInput.userMessage);
    console.log("Conversation history length:", validatedInput.conversationHistory.length);

    const formattedHistory = formatConversationHistory(validatedInput.conversationHistory);

    const flowInput = {
      userMessage: validatedInput.userMessage,
      formattedConversationHistory: formattedHistory,
    };

    const aiFlowResponse = await generateEmpatheticResponse(flowInput);

    return {
      id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      text: aiFlowResponse.aiResponse,
      sender: 'ai',
      timestamp: new Date(),
    };
  } catch (error) {
    console.error("Error handling user message:", error);
    let errorMessage = "I'm having a little trouble understanding right now. Could you try rephrasing?";
    if (error instanceof z.ZodError) {
      errorMessage = "There was an issue with the message format.";
    } else if (error instanceof Error) {
      // More specific error logging for Genkit/API issues
      errorMessage = `Sorry, I encountered an issue: ${error.message}. Please try again.`;
    }
    // Fallback AI error response
    return {
      id: `ai-error-${Date.now()}`,
      text: errorMessage,
      sender: 'ai',
      timestamp: new Date(),
    };
  }
}
