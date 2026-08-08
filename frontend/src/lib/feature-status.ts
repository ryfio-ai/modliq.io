export type FeatureStatus = 'LIVE' | 'BETA' | 'COMING_SOON' | 'HIDDEN';

export const featureStatus = {
  // P0 Core Features (Must be LIVE)
  publicHomepage: 'LIVE',
  contactLeadForm: 'LIVE',
  authLogin: 'LIVE',
  authSignup: 'LIVE',
  adminConsole: 'LIVE',
  userConsoleDashboard: 'LIVE',
  createProject: 'LIVE',
  demoDataset: 'LIVE',
  csvUpload: 'LIVE',
  datasetPreview: 'LIVE',
  datasetHealth: 'LIVE',
  goalParser: 'LIVE',
  goalCrosscheck: 'LIVE',
  safetyAck: 'LIVE',
  optimization: 'LIVE',
  results: 'LIVE',
  qualityPassport: 'LIVE',
  adminLeadView: 'LIVE',
  legalPages: 'LIVE',
  healthEndpoints: 'LIVE',
  seoMetadata: 'LIVE',

  // P1 Extended Features
  excelUpload: 'BETA',
  pdfWordExtraction: 'BETA',
  databaseConnectors: 'BETA',
  qualityStudio: 'LIVE',
  operations: 'BETA',
  supplyChain: 'BETA',
  lean: 'BETA',
  aiCopilot: 'BETA',
  buyerShareLinks: 'BETA',
  templateLibrary: 'LIVE',
  supportTickets: 'LIVE',
  notifications: 'LIVE',
  usageMetering: 'LIVE',
  websiteControlCenter: 'LIVE',
} as const;

export function isFeatureAvailable(status: FeatureStatus): boolean {
  return status === 'LIVE' || status === 'BETA';
}

export function isFeatureBeta(status: FeatureStatus): boolean {
  return status === 'BETA';
}

export function isFeatureComingSoon(status: FeatureStatus): boolean {
  return status === 'COMING_SOON';
}

export function isFeatureHidden(status: FeatureStatus): boolean {
  return status === 'HIDDEN';
}
