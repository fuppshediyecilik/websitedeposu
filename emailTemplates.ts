/**
 * Email template generator for various notification types
 * All templates are responsive HTML emails with Obsidian Luxe styling
 */

interface EmailTemplateData {
  userName?: string;
  userEmail?: string;
  planName?: string;
  planPrice?: number;
  planFeatures?: string[];
  invoiceNumber?: string;
  invoiceAmount?: number;
  invoiceDate?: string;
  invoiceDueDate?: string;
  renewalDate?: string;
  downloadUrl?: string;
  supportEmail?: string;
  unsubscribeToken?: string;
}

const baseStyles = `
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; line-height: 1.6; color: #e5e5e5; background: #0a0a0a; }
    .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center; }
    .header h1 { margin: 0; color: #000; font-size: 28px; font-weight: 700; }
    .content { padding: 40px 30px; }
    .content h2 { color: #fbbf24; font-size: 20px; margin-top: 0; margin-bottom: 15px; }
    .content p { margin: 10px 0; font-size: 14px; }
    .feature-list { list-style: none; padding: 0; margin: 15px 0; }
    .feature-list li { padding: 8px 0; padding-left: 25px; position: relative; font-size: 14px; }
    .feature-list li:before { content: "✓"; position: absolute; left: 0; color: #fbbf24; font-weight: bold; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #000; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 20px 0; }
    .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
    .invoice-table th { background: rgba(251, 191, 36, 0.1); padding: 12px; text-align: left; color: #fbbf24; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .invoice-table td { padding: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
    .invoice-total { font-weight: bold; color: #fbbf24; font-size: 16px; }
    .footer { background: rgba(0, 0, 0, 0.3); padding: 20px 30px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid rgba(255, 255, 255, 0.05); }
    .footer a { color: #fbbf24; text-decoration: none; }
    .divider { height: 1px; background: rgba(255, 255, 255, 0.05); margin: 20px 0; }
  </style>
`;

export function generateWelcomeEmail(data: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to NexGen AI</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to NexGen AI</h1>
        </div>
        <div class="content">
          <p>Hi ${data.userName || 'there'},</p>
          <p>Thank you for subscribing to NexGen AI! We're excited to have you on board.</p>
          
          <h2>Your Account is Ready</h2>
          <p>You can now start creating stunning AI-generated videos and images. Here's what you can do:</p>
          
          <ul class="feature-list">
            <li>Generate unlimited AI videos with cinema-grade quality</li>
            <li>Create professional images with advanced AI tools</li>
            <li>Access our full library of effects and templates</li>
            <li>Collaborate with team members (Pro plan and above)</li>
            <li>Priority customer support</li>
          </ul>
          
          <p><a href="https://nexgen-ai.manus.space" class="cta-button">Start Creating Now →</a></p>
          
          <div class="divider"></div>
          
          <h2>Need Help?</h2>
          <p>Check out our <a href="https://nexgen-ai.manus.space/docs" style="color: #fbbf24;">documentation</a> or <a href="https://nexgen-ai.manus.space/tutorials" style="color: #fbbf24;">video tutorials</a> to get started.</p>
          <p>If you have any questions, our support team is here to help at <a href="mailto:${data.supportEmail || 'support@nexgen-ai.com'}" style="color: #fbbf24;">${data.supportEmail || 'support@nexgen-ai.com'}</a></p>
        </div>
        <div class="footer">
          <p>© 2026 NexGen AI. All rights reserved.</p>
          <p><a href="https://nexgen-ai.manus.space/privacy">Privacy Policy</a> | <a href="https://nexgen-ai.manus.space/terms">Terms of Service</a></p>
          ${data.unsubscribeToken ? `<p><a href="https://nexgen-ai.manus.space/unsubscribe?token=${data.unsubscribeToken}">Unsubscribe</a></p>` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generatePaymentSuccessEmail(data: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Confirmed - NexGen AI</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Payment Confirmed</h1>
        </div>
        <div class="content">
          <p>Hi ${data.userName || 'there'},</p>
          <p>Your payment has been successfully processed. Your ${data.planName} subscription is now active!</p>
          
          <h2>Invoice Details</h2>
          <table class="invoice-table">
            <tr>
              <th>Item</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>${data.planName} Plan</td>
              <td>$${data.planPrice || '0'}/month</td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: right; padding-top: 15px; border-top: 2px solid rgba(251, 191, 36, 0.3);">
                <span class="invoice-total">Total: $${data.planPrice || '0'}</span>
              </td>
            </tr>
          </table>
          
          <p><strong>Invoice Number:</strong> ${data.invoiceNumber || 'N/A'}</p>
          <p><strong>Invoice Date:</strong> ${data.invoiceDate || new Date().toLocaleDateString()}</p>
          <p><strong>Next Billing Date:</strong> ${data.renewalDate || 'TBD'}</p>
          
          <div class="divider"></div>
          
          <h2>What's Included in Your Plan</h2>
          <ul class="feature-list">
            ${(data.planFeatures || []).map(feature => `<li>${feature}</li>`).join('')}
          </ul>
          
          <p><a href="${data.downloadUrl || 'https://nexgen-ai.manus.space/billing'}" class="cta-button">Download Invoice →</a></p>
          
          <div class="divider"></div>
          
          <p>If you have any questions about your subscription, visit your <a href="https://nexgen-ai.manus.space/billing" style="color: #fbbf24;">billing dashboard</a>.</p>
        </div>
        <div class="footer">
          <p>© 2026 NexGen AI. All rights reserved.</p>
          <p><a href="https://nexgen-ai.manus.space/privacy">Privacy Policy</a> | <a href="https://nexgen-ai.manus.space/terms">Terms of Service</a></p>
          ${data.unsubscribeToken ? `<p><a href="https://nexgen-ai.manus.space/unsubscribe?token=${data.unsubscribeToken}">Unsubscribe</a></p>` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateRenewalReminderEmail(data: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Subscription Renewal Reminder - NexGen AI</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📅 Subscription Renewal Reminder</h1>
        </div>
        <div class="content">
          <p>Hi ${data.userName || 'there'},</p>
          <p>Your ${data.planName} subscription will renew on <strong>${data.renewalDate || 'the upcoming billing date'}</strong>.</p>
          
          <h2>Renewal Details</h2>
          <table class="invoice-table">
            <tr>
              <th>Plan</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>${data.planName}</td>
              <td>$${data.planPrice || '0'}/month</td>
            </tr>
          </table>
          
          <p>Your subscription will automatically renew using the payment method on file. No action is needed unless you'd like to make changes.</p>
          
          <div class="divider"></div>
          
          <h2>Manage Your Subscription</h2>
          <p>You can:</p>
          <ul class="feature-list">
            <li>Upgrade to a higher plan for more features</li>
            <li>Downgrade to a lower plan to save costs</li>
            <li>Cancel your subscription anytime</li>
            <li>Update your payment method</li>
          </ul>
          
          <p><a href="https://nexgen-ai.manus.space/billing" class="cta-button">Manage Subscription →</a></p>
          
          <div class="divider"></div>
          
          <p>If you have any questions or concerns, please contact our support team at <a href="mailto:${data.supportEmail || 'support@nexgen-ai.com'}" style="color: #fbbf24;">${data.supportEmail || 'support@nexgen-ai.com'}</a></p>
        </div>
        <div class="footer">
          <p>© 2026 NexGen AI. All rights reserved.</p>
          <p><a href="https://nexgen-ai.manus.space/privacy">Privacy Policy</a> | <a href="https://nexgen-ai.manus.space/terms">Terms of Service</a></p>
          ${data.unsubscribeToken ? `<p><a href="https://nexgen-ai.manus.space/unsubscribe?token=${data.unsubscribeToken}">Unsubscribe</a></p>` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generatePaymentFailedEmail(data: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Failed - NexGen AI</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
          <h1>⚠️ Payment Failed</h1>
        </div>
        <div class="content">
          <p>Hi ${data.userName || 'there'},</p>
          <p>We were unable to process your payment for your ${data.planName} subscription renewal.</p>
          
          <h2>What Happened?</h2>
          <p>Your payment method was declined. This could be due to:</p>
          <ul class="feature-list">
            <li>Expired credit card</li>
            <li>Insufficient funds</li>
            <li>Incorrect billing information</li>
            <li>Bank security restrictions</li>
          </ul>
          
          <div class="divider"></div>
          
          <h2>Update Your Payment Method</h2>
          <p>Please update your payment information to avoid service interruption:</p>
          <p><a href="https://nexgen-ai.manus.space/billing/payment-method" class="cta-button" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">Update Payment Method →</a></p>
          
          <div class="divider"></div>
          
          <p>If you continue to experience issues, please contact our support team at <a href="mailto:${data.supportEmail || 'support@nexgen-ai.com'}" style="color: #fbbf24;">${data.supportEmail || 'support@nexgen-ai.com'}</a></p>
          <p>We're here to help!</p>
        </div>
        <div class="footer">
          <p>© 2026 NexGen AI. All rights reserved.</p>
          <p><a href="https://nexgen-ai.manus.space/privacy">Privacy Policy</a> | <a href="https://nexgen-ai.manus.space/terms">Terms of Service</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateNewsletterWelcomeEmail(data: EmailTemplateData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to NexGen AI Newsletter</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 Welcome to Our Newsletter</h1>
        </div>
        <div class="content">
          <p>Hi ${data.userName || 'there'},</p>
          <p>Thank you for subscribing to the NexGen AI newsletter! You'll now receive:</p>
          
          <ul class="feature-list">
            <li>Weekly tips and tricks for AI video/image creation</li>
            <li>New feature announcements and updates</li>
            <li>Exclusive tutorials and case studies</li>
            <li>Special promotions and early access to new tools</li>
            <li>Community highlights and user spotlights</li>
          </ul>
          
          <p>Our first newsletter will be sent next week. In the meantime, check out our <a href="https://nexgen-ai.manus.space/blog" style="color: #fbbf24;">blog</a> for the latest articles.</p>
          
          <div class="divider"></div>
          
          <p>We respect your inbox and won't spam you. You can manage your preferences or unsubscribe anytime.</p>
        </div>
        <div class="footer">
          <p>© 2026 NexGen AI. All rights reserved.</p>
          <p><a href="https://nexgen-ai.manus.space/privacy">Privacy Policy</a> | <a href="https://nexgen-ai.manus.space/terms">Terms of Service</a></p>
          ${data.unsubscribeToken ? `<p><a href="https://nexgen-ai.manus.space/unsubscribe?token=${data.unsubscribeToken}">Unsubscribe</a></p>` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}
