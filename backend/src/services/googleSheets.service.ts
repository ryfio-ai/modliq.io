import axios from 'axios';

export interface LeadPayload {
  id?: string;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  city?: string | null;
  industry?: string | null;
  role?: string | null;
  interest?: string | null;
  message?: string | null;
  status?: string;
  createdAt?: string;
}

/**
 * Sync lead submission data to Google Sheet via Google Apps Script Web App webhook.
 * Target Google Sheet: https://docs.google.com/spreadsheets/d/1W_J4pPZ-CMvqxOYhghOOPufunVYUu-WRKaXPOy5LMEk/edit?gid=0#gid=0
 * Target Google Apps Script: https://script.google.com/u/0/home/projects/19Y3AWI5Q_REJPbmOW41i73996kz0LOeFBCIEgsQD8n9KBgN4henxdZLn/edit
 */
export async function syncLeadToGoogleSheet(leadData: LeadPayload): Promise<{ success: boolean; message: string }> {
  const webappUrl =
    process.env.GOOGLE_SHEETS_WEBAPP_URL ||
    process.env.GOOGLE_SCRIPT_WEBAPP_URL ||
    '';

  const payload = {
    id: leadData.id || `lead_${Date.now()}`,
    name: leadData.name,
    company: leadData.company || 'N/A',
    email: leadData.email,
    phone: leadData.phone || 'N/A',
    city: leadData.city || 'N/A',
    industry: leadData.industry || 'General',
    role: leadData.role || 'N/A',
    interest: leadData.interest || 'Demo Booking / Quote',
    message: leadData.message || 'N/A',
    status: leadData.status || 'NEW',
    createdAt: leadData.createdAt || new Date().toISOString(),
    spreadsheetId: '1W_J4pPZ-CMvqxOYhghOOPufunVYUu-WRKaXPOy5LMEk',
    scriptProjectId: '19Y3AWI5Q_REJPbmOW41i73996kz0LOeFBCIEgsQD8n9KBgN4henxdZLn',
  };

  if (!webappUrl) {
    console.log('[GoogleSheetsService] No GOOGLE_SHEETS_WEBAPP_URL configured in env. Lead logged for sync:', payload.id);
    return {
      success: true,
      message: 'Lead recorded. Google Sheets sync pending webapp URL configuration.',
    };
  }

  try {
    const response = await axios.post(webappUrl, JSON.stringify(payload), {
      headers: { 'Content-Type': 'application/json' },
      timeout: 8000, // 8 seconds max
    });

    console.log('[GoogleSheetsService] Lead successfully synced to Google Sheet:', leadData.email, response.status);
    return { success: true, message: 'Synced to Google Sheet successfully' };
  } catch (error: any) {
    console.warn('[GoogleSheetsService] Google Sheet WebApp sync notice:', error.message || error);
    // Return true so we do not block lead creation in local DB
    return { success: false, message: error.message || 'Network notice during Google Sheet sync' };
  }
}
