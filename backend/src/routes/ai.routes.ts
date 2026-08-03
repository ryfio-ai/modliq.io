import { Router, Request, Response } from 'express';
import axios from 'axios';
import { requireAuth } from '../middleware/auth';
import { callLLM, LLMProvider } from '../ai/llmClient';

const router = Router();

// --------------------------------------------------
// PROVIDER HEALTH CHECK ENDPOINT
// --------------------------------------------------

router.get('/provider-health', async (req: Request, res: Response) => {
  const selectedProvider = (process.env.LLM_PROVIDER as LLMProvider) || 'auto';

  const providersConfig = [
    { provider: 'groq', name: 'Groq', baseURL: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1', apiKey: process.env.GROQ_API_KEY },
    { provider: 'gemini', name: 'Google Gemini', baseURL: process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai', apiKey: process.env.GEMINI_API_KEY },
    { provider: 'nvidia', name: 'NVIDIA', baseURL: process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1', apiKey: process.env.NVIDIA_API_KEY },
    { provider: 'cohere', name: 'Cohere AI', baseURL: process.env.COHERE_BASE_URL || 'https://api.cohere.com/v2', apiKey: process.env.COHERE_API_KEY },
    { provider: 'cloudflare', name: 'Cloudflare AI', baseURL: process.env.CF_AI_BASE_URL || `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/v1`, apiKey: process.env.CF_API_TOKEN },
    { provider: 'openrouter', name: 'OpenRouter', baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1', apiKey: process.env.OPENROUTER_API_KEY },
  ];

  const providerHealths = await Promise.all(
    providersConfig.map(async (p) => {
      const configured = !!p.apiKey;
      if (!configured) {
        return {
          provider: p.provider,
          name: p.name,
          configured: false,
          reachable: false,
          modelsEndpoint: false,
        };
      }

      try {
        const response = await axios.get(`${p.baseURL.replace(/\/$/, '')}/models`, {
          headers: p.apiKey ? { Authorization: `Bearer ${p.apiKey}` } : {},
          timeout: 10000,
        });
        return {
          provider: p.provider,
          name: p.name,
          configured: true,
          reachable: response.status === 200,
          modelsEndpoint: response.status === 200,
        };
      } catch (err: any) {
        return {
          provider: p.provider,
          name: p.name,
          configured: true,
          reachable: false,
          modelsEndpoint: false,
          message: err.message || 'Provider unreachable',
        };
      }
    })
  );

  res.json({
    success: true,
    selectedProvider,
    aiFeaturesEnabled: process.env.AI_FEATURES_ENABLED !== 'false',
    providers: providerHealths,
  });
});

// --------------------------------------------------
// ASK MODLIQ COPILOT CHAT
// --------------------------------------------------

router.post('/chat', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const { message, history = [], context } = req.body;

  const userPrompt = `User Query: "${message || 'Summarize workspace metrics'}"\nContext: ${JSON.stringify(context || {})}`;
  const systemPrompt = 'Answer user manufacturing queries using workspace metrics. Provide concise, actionable advice.';

  const result = await callLLM({
    systemPrompt,
    userPrompt,
    reasoning: false,
    userId,
    module: 'chat',
  });

  if (!result.success) {
    return res.json({
      success: false,
      code: result.error,
      answer: result.content,
    });
  }

  res.json({
    success: true,
    answer: result.content,
    provider: result.provider,
    model: result.model,
    suggestedActions: [
      'How can I improve OEE?',
      'Analyze raw material risks',
      'Recommend next Kaizen steps',
    ],
  });
});

// --------------------------------------------------
// CONTEXTUAL AI INSIGHTS
// --------------------------------------------------

router.post('/insight', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const { module, context } = req.body;

  const systemPrompt = `You are a manufacturing intelligence assistant for module '${module || 'dashboard'}'. Generate 3 bullet insights.`;
  const userPrompt = `Analyze context: ${JSON.stringify(context || {})}`;

  const result = await callLLM({
    systemPrompt,
    userPrompt,
    reasoning: false,
    userId,
    module: module || 'insight',
  });

  res.json({
    success: result.success,
    content: result.content,
    provider: result.provider,
    model: result.model,
  });
});

// --------------------------------------------------
// AI TRIAL SOP GENERATOR
// --------------------------------------------------

router.post('/sop', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const { goal, settings, constraints } = req.body;

  const systemPrompt = 'Generate a 7-Batch Manufacturing Trial SOP in Markdown with target setpoints, safety ranges, and rollback criteria.';
  const userPrompt = `Goal: ${goal || 'Maximize Yield'}\nSettings: ${JSON.stringify(settings || {})}\nConstraints: ${JSON.stringify(constraints || {})}`;

  const result = await callLLM({
    systemPrompt,
    userPrompt,
    reasoning: true, // Uses reasoning model for SOP
    userId,
    module: 'sop',
  });

  res.json({
    success: result.success,
    sopMarkdown: result.content,
    provider: result.provider,
    model: result.model,
  });
});

// --------------------------------------------------
// AI CAPA & CONTROL PLAN GENERATOR
// --------------------------------------------------

router.post('/capa', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const { processName, outOfControlPoints, lsl, usl } = req.body;

  const systemPrompt = 'Generate an ISO/IATF compliant Corrective and Preventive Action (CAPA) plan for process instability.';
  const userPrompt = `Process: ${processName || 'Yield Control'}\nViolations: ${outOfControlPoints || 2}\nLSL/USL: ${lsl}/${usl}`;

  const result = await callLLM({
    systemPrompt,
    userPrompt,
    reasoning: true, // Uses reasoning model for CAPA
    userId,
    module: 'capa',
  });

  res.json({
    success: result.success,
    capaMarkdown: result.content,
    provider: result.provider,
    model: result.model,
  });
});

// --------------------------------------------------
// AI ROOT CAUSE ANALYZER
// --------------------------------------------------

router.post('/root-cause', requireAuth, async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId || (req as any).user?.id;
  const { issueDescription, metrics } = req.body;

  const systemPrompt = 'Perform a 5-Why root cause analysis for the manufacturing quality issue.';
  const userPrompt = `Issue: ${issueDescription || 'Yield Drop'}\nMetrics: ${JSON.stringify(metrics || {})}`;

  const result = await callLLM({
    systemPrompt,
    userPrompt,
    reasoning: true,
    userId,
    module: 'root-cause',
  });

  res.json({
    success: result.success,
    analysis: result.content,
    provider: result.provider,
    model: result.model,
  });
});

export default router;
