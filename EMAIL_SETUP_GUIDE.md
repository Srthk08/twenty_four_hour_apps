# 📧 Email Notification Setup Guide

This guide will help you set up **real email notifications** so users receive actual emails when admins reply to their support tickets.

## 🚀 Quick Start Options

### Option 1: EmailJS (Recommended - Free)
**EmailJS** is a free service that allows you to send emails directly from your website.

#### Step 1: Sign Up for EmailJS
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

#### Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred email provider)
4. Connect your email account
5. **Copy the Service ID** (you'll need this)

#### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: Update on Your Support Ticket #{{ticket_number}}

Hello {{to_name}},

Your support ticket has been updated by our support team.

Ticket Details:
- Ticket Number: {{ticket_number}}
- Subject: {{ticket_subject}}
- Status: {{new_status}}
- Admin Reply: {{admin_reply}}

Reply Details:
{{admin_reply}}

This response was sent on {{reply_date}} by {{admin_name}}.

If you have any further questions, please don't hesitate to contact us.

Best regards,
DevExpress Support Team

---
This is an automated notification. Please do not reply to this email.
```

4. **Copy the Template ID** (you'll need this)

#### Step 4: Get Your User ID
1. In EmailJS dashboard, go to "Account" → "API Keys"
2. **Copy the Public Key** (this is your User ID)

#### Step 5: Update Configuration
1. Open `src/lib/email-config.ts`
2. Update the EmailJS configuration:

```typescript
export const emailjsConfig: EmailConfig = {
  service: 'emailjs',
  enabled: true, // Change this to true
  config: {
    serviceId: 'YOUR_ACTUAL_SERVICE_ID', // Replace with your Service ID
    templateId: 'YOUR_ACTUAL_TEMPLATE_ID', // Replace with your Template ID
    userId: 'YOUR_ACTUAL_USER_ID', // Replace with your Public Key
  }
};
```

3. Update `src/layouts/Layout.astro`:

```typescript
// Initialize EmailJS for email notifications
if (typeof emailjs !== 'undefined') {
  emailjs.init('YOUR_ACTUAL_USER_ID'); // Replace with your Public Key
  console.log('EmailJS initialized successfully');
} else {
  console.log('EmailJS not available');
}
```

### Option 2: Formspree (Alternative Free Service)
**Formspree** is another free service that can send emails.

#### Step 1: Sign Up for Formspree
1. Go to [https://formspree.io/](https://formspree.io/)
2. Click "Sign Up" and create a free account
3. Verify your email address

#### Step 2: Create Form
1. Click "New Form"
2. Give it a name like "Support Ticket Notifications"
3. **Copy the endpoint URL** (you'll need this)

#### Step 3: Update Configuration
1. Open `src/lib/email-config.ts`
2. Change the active configuration:

```typescript
// Change this line:
export const activeEmailConfig: EmailConfig = formspreeConfig;

// Update the Formspree config:
export const formspreeConfig: EmailConfig = {
  service: 'formspree',
  enabled: true, // Change this to true
  config: {
    endpoint: 'YOUR_ACTUAL_FORMSPREE_ENDPOINT', // Replace with your endpoint
  }
};
```

### Option 3: Custom Email Service
If you have your own email service or API:

1. Open `src/lib/email-config.ts`
2. Update the custom configuration:

```typescript
export const customEmailConfig: EmailConfig = {
  service: 'custom',
  enabled: true, // Change this to true
  config: {
    apiUrl: 'YOUR_EMAIL_API_URL',
    apiKey: 'YOUR_EMAIL_API_KEY',
  }
};

// Change the active configuration:
export const activeEmailConfig: EmailConfig = customEmailConfig;
```

## 🔧 Testing the Setup

### Step 1: Enable Email Service
Make sure your chosen email service is enabled in `email-config.ts`.

### Step 2: Test Email Sending
1. Login as admin
2. Go to Support page
3. Create a test ticket as a user
4. Reply to the ticket as admin
5. Check the browser console for email service logs
6. Check if the user received an email

### Step 3: Verify Email Delivery
- Check user's email inbox (and spam folder)
- Check EmailJS/Formspree dashboard for delivery status
- Check browser console for success/error messages

## 🐛 Troubleshooting

### Common Issues:

#### Issue: "EmailJS not available"
**Solution:** Make sure EmailJS script is loaded in Layout.astro

#### Issue: "Service ID not found"
**Solution:** Verify your EmailJS Service ID is correct

#### Issue: "Template ID not found"
**Solution:** Verify your EmailJS Template ID is correct

#### Issue: "User ID not found"
**Solution:** Verify your EmailJS Public Key is correct

#### Issue: "Email service not enabled"
**Solution:** Set `enabled: true` in your email configuration

#### Issue: "CORS error with Formspree"
**Solution:** Make sure your Formspree endpoint is correct and accessible

### Debug Steps:
1. Check browser console for error messages
2. Verify all IDs and keys are correct
3. Test email service independently
4. Check network tab for failed requests
5. Verify email service account status

## 📱 Email Templates

The system includes customizable email templates in `email-config.ts`. You can modify:

- **Subject lines**
- **Email body content**
- **Variable placeholders**
- **Styling and formatting**

## 🔒 Security Notes

- **Never commit real API keys** to version control
- **Use environment variables** for production
- **Rate limit** email sending to prevent abuse
- **Validate email addresses** before sending
- **Monitor email delivery** for issues

## 🚀 Production Deployment

For production, consider:

1. **Environment Variables**: Store sensitive data in environment variables
2. **Rate Limiting**: Implement email rate limiting
3. **Email Validation**: Add email format validation
4. **Delivery Monitoring**: Track email delivery success rates
5. **Fallback Services**: Have backup email services ready

## 📞 Support

If you need help setting up email notifications:

1. Check the troubleshooting section above
2. Verify all configuration values are correct
3. Test with a simple email first
4. Check email service provider documentation
5. Review browser console for error messages

---

**Note**: The system will fall back to localStorage notifications if email services are not configured or fail, so users will still see updates in their browser.
