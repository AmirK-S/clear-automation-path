# N8N Webhook Integration Setup Guide

## Overview

Your Gap Scan form is now connected to an n8n webhook backend. This guide will help you set up the n8n workflow to receive and process form submissions.

---

## 📋 Form Data Being Collected

### User Input Fields
- **name** (string, min 2 chars) - User's full name
- **email** (string, email format) - User's email address
- **company** (string, min 2 chars) - Company name
- **mostTime** (string, 10-150 chars) - What takes the most time in their business
- **automate** (string, 10-150 chars) - What they would like to automate

### Automatically Enriched Metadata
- **timestamp** (ISO 8601 string) - Submission date/time
- **language** (string: "en" | "fr") - User's selected language
- **userAgent** (string) - Browser and device information
- **pageUrl** (string) - Full URL where form was submitted
- **referrer** (string) - Where the user came from (or "direct")
- **utmParams** (object, optional) - Marketing campaign tracking
  - `source` - utm_source parameter
  - `medium` - utm_medium parameter
  - `campaign` - utm_campaign parameter
  - `term` - utm_term parameter
  - `content` - utm_content parameter

### Example Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "mostTime": "Managing customer support tickets manually takes hours every day",
  "automate": "I'd love to automate email responses and ticket categorization",
  "timestamp": "2025-01-15T14:30:00.000Z",
  "language": "en",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
  "pageUrl": "https://amirks.eu?utm_source=google&utm_campaign=automation",
  "referrer": "https://google.com",
  "utmParams": {
    "source": "google",
    "campaign": "automation"
  }
}
```

---

## 🔧 Frontend Setup

### 1. Configure Your Webhook URL

Edit `.env.local` and add your n8n webhook URL:

```bash
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/gap-scan-form
```

**Important:**
- The variable MUST start with `VITE_` to be accessible in the browser
- Restart your dev server after changing environment variables
- Never commit `.env.local` to git (it's already in .gitignore)

### 2. Start Your Dev Server

```bash
npm run dev
```

---

## 🔌 N8N Workflow Setup

### Step 1: Create a Webhook Node

1. In n8n, create a new workflow
2. Add a **Webhook** node as the trigger
3. Configure the webhook:
   - **HTTP Method**: POST
   - **Path**: `gap-scan-form` (or your preferred path)
   - **Response Mode**: "When Last Node Finishes"
   - **Response Code**: 200

### Step 2: Access the Webhook URL

After saving, n8n will provide you with:
- **Test URL**: For development (e.g., `https://your-instance.com/webhook-test/gap-scan-form`)
- **Production URL**: For production (e.g., `https://your-instance.com/webhook/gap-scan-form`)

Copy the appropriate URL to your `.env.local` file.

### Step 3: Recommended Workflow Nodes

Here's a recommended n8n workflow structure:

```
Webhook → [Validate Data] → [Split Flow] → [Action Branches]
```

#### Example Nodes to Add:

1. **Webhook** (Trigger)
   - Receives the form data

2. **Set Node** (Optional)
   - Extract and format specific fields
   - Example: Format timestamp, parse user agent

3. **Function Node** (Optional)
   - Add custom validation
   - Score lead quality
   - Calculate priority

4. **Split Flow** (Parallel actions)

   **Branch A: Save to Database**
   - Use **Postgres**, **MySQL**, **Airtable**, or **Google Sheets** node
   - Store all form submissions for record-keeping

   **Branch B: Send Notification**
   - **Email Node** (Gmail, SendGrid, etc.)
   - Send you a notification about the new lead
   - Include all form details

   **Branch C: Send Welcome Email**
   - **Email Node**
   - Send automated response to the user
   - Personalize based on their language preference
   - Promise specific recommendations in 10 minutes

   **Branch D: CRM Integration** (Optional)
   - **HubSpot**, **Pipedrive**, **Salesforce** node
   - Create a new contact or lead
   - Add UTM parameters as tags/properties

   **Branch E: Slack/Discord Notification** (Optional)
   - Alert your team in real-time
   - Include lead score or priority

5. **Respond to Webhook**
   - Return success response to frontend
   - Optional: Include custom data (e.g., confirmation ID)

---

## 📊 Example N8N Workflow (JSON)

Here's a basic workflow you can import to n8n:

```json
{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "gap-scan-form",
        "responseMode": "lastNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300],
      "webhookId": "your-webhook-id"
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "message",
              "value": "Form received successfully"
            }
          ]
        },
        "options": {}
      },
      "name": "Respond",
      "type": "n8n-nodes-base.set",
      "position": [850, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "sheetId": "your-sheet-id",
        "range": "Sheet1",
        "options": {}
      },
      "name": "Save to Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "position": [550, 200]
    },
    {
      "parameters": {
        "fromEmail": "you@example.com",
        "toEmail": "={{ $json.email }}",
        "subject": "Thanks for your submission!",
        "text": "Hi {{ $json.name }},\n\nWe received your Gap Scan submission..."
      },
      "name": "Send Welcome Email",
      "type": "n8n-nodes-base.emailSend",
      "position": [550, 400]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Save to Google Sheets",
            "type": "main",
            "index": 0
          },
          {
            "node": "Send Welcome Email",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Save to Google Sheets": {
      "main": [
        [
          {
            "node": "Respond",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Send Welcome Email": {
      "main": [
        [
          {
            "node": "Respond",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

---

## 🎯 Recommended Data Processing

### 1. Lead Scoring

Add a Function node to score leads based on:
- Company size (inferred from company name or domain)
- Urgency keywords in their answers
- UTM campaign value
- Language (prioritize your primary market)

### 2. Auto-Responder Email Template

Personalize based on the `language` field:

**English Version:**
```
Subject: Your Custom Automation Recommendations

Hi {{ name }},

Thanks for completing our Gap Scan!

Based on your response about "{{ mostTime }}", here are some specific automation ideas:

[Your recommendations here]

Ready to discuss? Book a call: [Cal.com link]

Best,
Amir
```

**French Version:**
```
Subject: Vos Recommandations d'Automatisation

Bonjour {{ name }},

Merci d'avoir complété notre Gap Scan !

Selon votre réponse concernant "{{ mostTime }}", voici quelques idées d'automatisation :

[Your recommendations here]

Prêt à en discuter ? Réservez un appel : [Cal.com link]

Cordialement,
Amir
```

### 3. Track Campaign Performance

Use the `utmParams` to:
- Measure which marketing campaigns drive the most leads
- Calculate cost per lead
- Identify best-performing channels

---

## 🔒 Security Best Practices

1. **Validate Input in N8N**
   - Check email format
   - Verify field lengths
   - Sanitize text fields to prevent injection attacks

2. **Rate Limiting**
   - Implement rate limiting in n8n to prevent spam
   - Use the **HTTP Request** node to check against spam databases

3. **CORS Configuration**
   - If your n8n instance requires CORS, configure it to allow your domain
   - Add your domain to the allowed origins list

4. **Webhook Authentication** (Optional)
   - Add a secret token to your webhook URL
   - Verify it in n8n before processing

---

## 🧪 Testing

### Test the Integration

1. **Local Testing:**
   ```bash
   npm run dev
   ```
   - Fill out the form at `http://localhost:5173`
   - Check n8n workflow execution

2. **Console Debugging:**
   - Open browser DevTools
   - Submit the form
   - Check Console for "Form submitted successfully" message

3. **Network Tab:**
   - Open DevTools → Network tab
   - Submit form
   - Look for POST request to your webhook URL
   - Verify 200 status code

### Common Issues

**"Webhook configuration missing" error:**
- Make sure `VITE_N8N_WEBHOOK_URL` is set in `.env.local`
- Restart your dev server after changing env variables

**CORS errors:**
- Configure CORS in n8n settings
- Add your domain to allowed origins

**404 on webhook:**
- Verify the webhook path matches in both n8n and your env file
- Make sure n8n workflow is active (not paused)

---

## 📈 Analytics & Tracking

### Recommended Metrics to Track

1. **Conversion Rate**: Visitors → Form Submissions
2. **Lead Quality Score**: Based on answers and company
3. **Response Time**: Time from submission to first contact
4. **Channel Performance**: UTM parameter analysis
5. **Language Distribution**: EN vs FR submissions
6. **Drop-off Rate**: Started vs completed forms

### Google Analytics Integration (Optional)

Add this to your `SimpleGapScanForm.tsx` after successful submission:

```typescript
// Track successful form submission
if (typeof window.gtag !== 'undefined') {
  window.gtag('event', 'generate_lead', {
    value: 1,
    currency: 'EUR',
  });
}
```

---

## 🚀 Deployment

### Environment Variables for Production

1. **Vercel / Netlify:**
   - Go to project settings
   - Add environment variable: `VITE_N8N_WEBHOOK_URL`
   - Set to your production webhook URL

2. **Activate N8N Workflow:**
   - Switch from test webhook to production webhook
   - Activate the workflow in n8n

3. **Test Production:**
   - Submit a test form on your live site
   - Verify data arrives in n8n

---

## 📞 Support & Next Steps

### Immediate Next Steps:
1. ✅ Set up n8n webhook (Step 1)
2. ✅ Add webhook URL to `.env.local`
3. ✅ Test locally
4. ✅ Configure email notifications
5. ✅ Set up data storage (Sheets, Airtable, etc.)
6. ✅ Deploy to production

### Future Enhancements:
- Add conditional logic based on answers
- Implement AI-powered lead scoring
- Create drip email campaigns
- Integrate with your CRM
- A/B test different form variations

---

## 📝 Files Modified

- `src/services/webhookService.ts` - Webhook integration service
- `src/components/SimpleGapScanForm.tsx` - Updated form with webhook
- `.env.local` - Environment configuration
- `.env.example` - Example environment file

---

Need help? Check the n8n community forum or documentation at https://docs.n8n.io
