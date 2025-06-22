import { createOpenAI } from '@ai-sdk/openai';

/**
 * Validates that required OpenRouter environment variables are present
 * @throws Error if required environment variables are missing
 */
export function validateOpenRouterEnv(): {
  apiKey: string;
  model: string;
} {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';

  if (!apiKey) {
    throw new Error(
      'OPENROUTER_API_KEY environment variable is required. ' +
      'Please set it in your .env.local file or environment variables. ' +
      'Get your API key from: https://openrouter.ai/keys'
    );
  }

  if (!apiKey.startsWith('sk-or-v1-')) {
    throw new Error(
      'Invalid OPENROUTER_API_KEY format. ' +
      'OpenRouter API keys should start with "sk-or-v1-". ' +
      'Please check your API key from: https://openrouter.ai/keys'
    );
  }

  return { apiKey, model };
}

/**
 * Creates and configures OpenRouter client using OpenAI-compatible interface
 * @returns Configured OpenAI client pointing to OpenRouter
 */
export function createOpenRouterClient() {
  const { apiKey } = validateOpenRouterEnv();
  
  return createOpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
  });
}

/**
 * Gets the configured OpenRouter model name
 * @returns The model name to use for requests
 */
export function getOpenRouterModel(): string {
  const { model } = validateOpenRouterEnv();
  return model;
} 