// Email Configuration - Multiple email service options for sending real notifications
// This file provides configuration for different email services

export interface EmailConfig {
  service: 'emailjs' | 'formspree' | 'custom';
  enabled: boolean;
  config: any;
}

// EmailJS Configuration
export const emailjsConfig: EmailConfig = {
  service: 'emailjs',
  enabled: false, // Set to true after setting up EmailJS
  config: {
    serviceId: 'YOUR_EMAILJS_SERVICE_ID', // Replace with your EmailJS service ID
    templateId: 'YOUR_EMAILJS_TEMPLATE_ID', // Replace with your EmailJS template ID
    userId: 'YOUR_EMAILJS_USER_ID', // Replace with your EmailJS user ID
  }
};

// Formspree Configuration (Alternative free service)
export const formspreeConfig: EmailConfig = {
  service: 'formspree',
  enabled: false, // Set to true after setting up Formspree
  config: {
    endpoint: 'YOUR_FORMSPREE_ENDPOINT', // Replace with your Formspree endpoint
  }
};

// Custom Email Service Configuration
export const customEmailConfig: EmailConfig = {
  service: 'custom',
  enabled: false, // Set to true after setting up custom email service
  config: {
    apiUrl: 'YOUR_CUSTOM_EMAIL_API_URL',
    apiKey: 'YOUR_CUSTOM_EMAIL_API_KEY',
  }
};

// Active email configuration
export const activeEmailConfig: EmailConfig = emailjsConfig; // Change this to use different service

// Email template for support ticket updates
export const emailTemplates = {
  supportTicketUpdate: {
    subject: 'Update on Your Support Ticket #{{ticketNumber}}',
    body: `
Hello {{customerName}},

Your support ticket has been updated by our support team.

Ticket Details:
- Ticket Number: {{ticketNumber}}
- Subject: {{subject}}
- Status: {{status}}
- Admin Reply: {{adminReply}}

Reply Details:
{{adminReply}}

This response was sent on {{replyDate}} by {{adminName}}.

If you have any further questions, please don't hesitate to contact us.

Best regards,
DevExpress Support Team

---
This is an automated notification. Please do not reply to this email.
    `.trim()
  }
};

// Helper function to send email using configured service
export async function sendEmail(to: string, subject: string, body: string): Promise<boolean> {
  try {
    if (!activeEmailConfig.enabled) {
      console.log('Email service not enabled, skipping email send');
      return false;
    }

    switch (activeEmailConfig.service) {
      case 'emailjs':
        return await sendEmailViaEmailJS(to, subject, body);
      case 'formspree':
        return await sendEmailViaFormspree(to, subject, body);
      case 'custom':
        return await sendEmailViaCustom(to, subject, body);
      default:
        console.error('Unknown email service:', activeEmailConfig.service);
        return false;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// EmailJS implementation
async function sendEmailViaEmailJS(to: string, subject: string, body: string): Promise<boolean> {
  try {
    if (typeof window === 'undefined' || !(window as any).emailjs) {
      console.error('EmailJS not available');
      return false;
    }

    const emailjs = (window as any).emailjs;
    const { serviceId, templateId, userId } = activeEmailConfig.config;

    const templateParams = {
      to_email: to,
      subject: subject,
      message: body,
    };

    await emailjs.send(serviceId, templateId, templateParams, userId);
    console.log('Email sent successfully via EmailJS');
    return true;
  } catch (error) {
    console.error('Error sending email via EmailJS:', error);
    return false;
  }
}

// Formspree implementation
async function sendEmailViaFormspree(to: string, subject: string, body: string): Promise<boolean> {
  try {
    const { endpoint } = activeEmailConfig.config;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: to,
        subject: subject,
        message: body,
      }),
    });

    if (response.ok) {
      console.log('Email sent successfully via Formspree');
      return true;
    } else {
      console.error('Formspree error:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error sending email via Formspree:', error);
    return false;
  }
}

// Custom email service implementation
async function sendEmailViaCustom(to: string, subject: string, body: string): Promise<boolean> {
  try {
    const { apiUrl, apiKey } = activeEmailConfig.config;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: to,
        subject: subject,
        body: body,
      }),
    });

    if (response.ok) {
      console.log('Email sent successfully via custom service');
      return true;
    } else {
      console.error('Custom email service error:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error sending email via custom service:', error);
    return false;
  }
}
