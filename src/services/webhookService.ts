/**
 * Webhook Service for sending form data to n8n backend
 */

export interface GapScanFormData {
  name: string;
  email: string;
  company: string;
  mostTime: string;
  automate: string;
}

export interface WebhookPayload extends GapScanFormData {
  timestamp: string;
  language: string;
  userAgent: string;
  pageUrl: string;
  referrer: string;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
}

/**
 * Extracts UTM parameters from current URL
 */
const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get('utm_source') || undefined,
    medium: params.get('utm_medium') || undefined,
    campaign: params.get('utm_campaign') || undefined,
    term: params.get('utm_term') || undefined,
    content: params.get('utm_content') || undefined,
  };

  // Only return if at least one UTM param exists
  return Object.values(utm).some(v => v) ? utm : undefined;
};

/**
 * Enriches form data with metadata
 */
const enrichFormData = (
  formData: GapScanFormData,
  language: string
): WebhookPayload => {
  return {
    ...formData,
    timestamp: new Date().toISOString(),
    language,
    userAgent: navigator.userAgent,
    pageUrl: window.location.href,
    referrer: document.referrer || 'direct',
    utmParams: getUtmParams(),
  };
};

/**
 * Sends form data to n8n webhook
 *
 * @param formData - The form data to send
 * @param language - Current language setting
 * @returns Promise that resolves when webhook call succeeds
 * @throws Error if webhook URL is not configured or request fails
 */
export const sendToN8nWebhook = async (
  formData: GapScanFormData,
  language: string
): Promise<void> => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('N8N webhook URL not configured');
    throw new Error('Webhook configuration missing. Please contact support.');
  }

  const payload = enrichFormData(formData, language);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed with status ${response.status}`);
    }

    // Optionally parse response if n8n returns data
    const responseData = await response.json().catch(() => null);
    console.log('Webhook response:', responseData);

  } catch (error) {
    console.error('Error sending to n8n webhook:', error);
    throw new Error('Failed to submit form. Please try again later.');
  }
};
