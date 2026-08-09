/**
 * Modliq Agent Guardrails & Safety Policy
 * Enforces product safety, Level 0-3 autonomy bounds, human approval rules,
 * and prevents uncontrolled execution or secret leakage.
 */

export const FORBIDDEN_KEYWORDS = [
  'eval',
  'exec',
  'system(',
  'shell',
  'drop database',
  'delete from users',
  'raw sql',
  'rm -rf',
  'process.env',
  'secret',
];

export const ACTIONS_REQUIRING_APPROVAL = [
  'RUN_OPTIMIZATION',
  'APPLY_CLEANING',
  'RETRAIN_MODEL',
  'CREATE_SHARE_LINK',
  'EXPORT_QUALITY_PASSPORT',
  'CREATE_TRIAL_PLAN',
];

export const MAX_AUTONOMY_LEVEL = 3; // Level 4 (uncontrolled execution) is strictly disabled

export function isActionRequiringApproval(actionType: string): boolean {
  return ACTIONS_REQUIRING_APPROVAL.includes(actionType.toUpperCase());
}

export function validateUserPrompt(prompt: string): { safe: boolean; warning?: string } {
  if (!prompt || typeof prompt !== 'string') {
    return { safe: false, warning: 'Prompt must be a non-empty string.' };
  }

  const lower = prompt.toLowerCase();
  for (const forbidden of FORBIDDEN_KEYWORDS) {
    if (lower.includes(forbidden)) {
      return {
        safe: false,
        warning: `Security Guardrail: Arbitrary code execution or system command ('${forbidden}') is strictly forbidden.`,
      };
    }
  }

  return { safe: true };
}

export function sanitizeAgentOutput<T>(data: T): T {
  if (!data) return data;
  let str = JSON.stringify(data);
  // Redact potential tokens or passwords
  str = str.replace(/("password"|"secret"|"token"|"apiKey")\s*:\s*"[^"]+"/gi, '$1:"[REDACTED]"');
  return JSON.parse(str);
}
