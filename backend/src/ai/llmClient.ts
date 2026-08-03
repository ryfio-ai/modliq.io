import axios from 'axios';

export type LLMProvider = 'groq' | 'gemini' | 'nvidia' | 'cohere' | 'cloudflare' | 'openrouter' | 'auto';

export interface CallLLMParams {
  systemPrompt?: string;
  userPrompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeoutMs?: number;
  reasoning?: boolean;
  module?: string;
  userId?: string;
}

export interface LLMAttempt {
  provider: string;
  model?: string;
  success: boolean;
  error?: string;
}

export interface LLMCallResult {
  success: boolean;
  content: string;
  provider?: string;
  model?: string;
  error?: string;
  attempts?: LLMAttempt[];
}

const GUARDRAIL_SYSTEM_PROMPT = `
You are Modliq AI Copilot, a manufacturing process, quality, operations, supply chain, and lean improvement assistant.

Use only the provided context.
Do not invent facts.
If information is missing, say insufficient data.
Do not guarantee production outcomes.
Always recommend controlled validation and responsible engineering approval.
Do not recalculate deterministic values already computed by Modliq.
Never override hard constraints.
Never fabricate supplier, batch, machine, material lot, or shift names.
`;

// Simple in-memory rate limiter (10 calls/min per user)
const USER_RATE_LIMITS = new Map<string, number[]>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60000;

function checkRateLimit(userId: string): boolean {
  if (!userId) return true;
  const now = Date.now();
  const timestamps = (USER_RATE_LIMITS.get(userId) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) return false;
  timestamps.push(now);
  USER_RATE_LIMITS.set(userId, timestamps);
  return true;
}

/**
 * Returns model name based on provider and reasoning flag.
 */
function getProviderModel(provider: LLMProvider, reasoning: boolean = false, customModel?: string): string {
  if (customModel) return customModel;

  switch (provider) {
    case 'groq':
      return reasoning
        ? process.env.GROQ_MODEL_REASONING || 'llama-3.3-70b-versatile'
        : process.env.GROQ_MODEL_FAST || 'llama-3.1-8b-instant';

    case 'gemini':
      return reasoning
        ? process.env.GEMINI_MODEL_REASONING || 'gemini-1.5-pro'
        : process.env.GEMINI_MODEL_FAST || 'gemini-2.0-flash';

    case 'openrouter':
      return reasoning
        ? process.env.OPENROUTER_MODEL_REASONING || 'deepseek/deepseek-r1:free'
        : process.env.OPENROUTER_MODEL_FAST || 'meta-llama/llama-3.1-8b-instruct:free';

    case 'nvidia':
      return reasoning
        ? process.env.NVIDIA_MODEL_REASONING || 'nvidia/llama-3.1-nemotron-70b-instruct'
        : process.env.NVIDIA_MODEL_FAST || 'meta/llama-3.1-8b-instruct';

    case 'cohere':
      return reasoning
        ? process.env.COHERE_MODEL_REASONING || 'command-r-plus'
        : process.env.COHERE_MODEL_FAST || 'command-r';

    case 'cloudflare':
      return reasoning
        ? process.env.CF_MODEL_REASONING || '@cf/meta/llama-3.3-70b-instruct-fp8-fast'
        : process.env.CF_MODEL_FAST || '@cf/meta/llama-3.1-8b-instruct';

    default:
      return 'llama-3.1-8b-instant';
  }
}

/**
 * Executes an OpenAI-compatible HTTP POST request to a single LLM provider.
 */
async function callSingleProvider(
  provider: LLMProvider,
  params: CallLLMParams
): Promise<{ success: boolean; content: string; model: string; error?: string }> {
  const timeoutMs = params.timeoutMs || parseInt(process.env.AI_TIMEOUT_MS || '30000', 10);
  const reasoning = params.reasoning || false;
  const model = getProviderModel(provider, reasoning, params.model);
  const temperature = params.temperature ?? (reasoning ? 0.2 : 0.6);
  const maxTokens = params.maxTokens || 1200;

  let baseURL = '';
  let apiKey = '';
  const extraHeaders: Record<string, string> = {};

  if (provider === 'groq') {
    baseURL = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
    apiKey = process.env.GROQ_API_KEY || '';
  } else if (provider === 'gemini') {
    baseURL = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai';
    apiKey = process.env.GEMINI_API_KEY || '';
  } else if (provider === 'nvidia') {
    baseURL = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
    apiKey = process.env.NVIDIA_API_KEY || '';
  } else if (provider === 'cohere') {
    baseURL = process.env.COHERE_BASE_URL || 'https://api.cohere.com/v2';
    apiKey = process.env.COHERE_API_KEY || '';
  } else if (provider === 'cloudflare') {
    baseURL = process.env.CF_AI_BASE_URL || `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/v1`;
    apiKey = process.env.CF_API_TOKEN || '';
  } else if (provider === 'openrouter') {
    baseURL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
    apiKey = process.env.OPENROUTER_API_KEY || '';
    extraHeaders['HTTP-Referer'] = process.env.OPENROUTER_SITE_URL || 'https://modliq.vercel.app';
    extraHeaders['X-Title'] = process.env.OPENROUTER_APP_NAME || 'Modliq';
  }

  if (!apiKey) {
    return {
      success: false,
      content: '',
      model,
      error: `API key missing for provider '${provider}'`,
    };
  }

  const systemMessage = `${GUARDRAIL_SYSTEM_PROMPT}\n${params.systemPrompt || ''}`.trim();

  try {
    const response = await axios.post(
      `${baseURL.replace(/\/$/, '')}/chat/completions`,
      {
        model,
        temperature,
        max_tokens: maxTokens,
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: params.userPrompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          ...extraHeaders,
        },
        timeout: timeoutMs,
      }
    );

    const content = response.data?.choices?.[0]?.message?.content?.trim() || '';
    if (!content) {
      return { success: false, content: '', model, error: 'Empty content returned by model' };
    }

    return { success: true, content, model };
  } catch (err: any) {
    const errorMsg = err.response?.data?.error?.message || err.message || 'LLM request failed';
    return { success: false, content: '', model, error: errorMsg };
  }
}

/**
 * Main LLM Client Gateway Function with Automatic Failover.
 */
export async function callLLM(params: CallLLMParams): Promise<LLMCallResult> {
  if (process.env.AI_FEATURES_ENABLED === 'false') {
    return {
      success: false,
      content: 'AI features are currently disabled. Deterministic Modliq features remain fully available.',
      error: 'AI_DISABLED',
    };
  }

  if (params.userId && !checkRateLimit(params.userId)) {
    return {
      success: false,
      content: 'AI rate limit exceeded (10 requests/min). Please try again in a moment.',
      error: 'RATE_LIMIT_EXCEEDED',
    };
  }

  const selectedProvider = (process.env.LLM_PROVIDER as LLMProvider) || 'auto';

  // Specific single provider selection
  if (selectedProvider !== 'auto') {
    const result = await callSingleProvider(selectedProvider, params);
    if (result.success) {
      return {
        success: true,
        content: result.content,
        provider: selectedProvider,
        model: result.model,
      };
    }

    return {
      success: false,
      content: 'AI insight could not be generated right now. Calculated Modliq results remain fully available.',
      provider: selectedProvider,
      model: result.model,
      error: result.error || 'AI_PROVIDER_ERROR',
    };
  }

  // Automatic Failover Priority Sequence: Groq -> Gemini -> NVIDIA -> Cohere -> Cloudflare -> OpenRouter
  const failoverSequence: LLMProvider[] = ['groq', 'gemini', 'nvidia', 'cohere', 'cloudflare', 'openrouter'];
  const attempts: LLMAttempt[] = [];

  for (const provider of failoverSequence) {
    const result = await callSingleProvider(provider, params);
    attempts.push({
      provider,
      model: result.model,
      success: result.success,
      error: result.error,
    });

    if (result.success) {
      return {
        success: true,
        content: result.content,
        provider,
        model: result.model,
        attempts,
      };
    }
  }

  return {
    success: false,
    content: 'AI insight could not be generated right now. Calculated Modliq results remain fully available.',
    error: 'AI_ALL_PROVIDERS_FAILED',
    attempts,
  };
}
