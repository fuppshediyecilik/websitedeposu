import { notifyOwner } from "./notification";
import {
  generateWelcomeEmail,
  generatePaymentSuccessEmail,
  generateRenewalReminderEmail,
  generatePaymentFailedEmail,
  generateNewsletterWelcomeEmail,
} from "./emailTemplates";

interface SendEmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  fromName?: string;
  replyTo?: string;
}

/**
 * Send email using Manus notification API
 * Falls back to logging if API is not available
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  try {
    const { to, subject, htmlContent, fromName = "NexGen AI", replyTo } = options;

    // Log email for debugging
    console.log(`[Email Service] Sending email to ${to} with subject: ${subject}`);

    // Try to use Manus notification API
    const response = await fetch(
      `${process.env.BUILT_IN_FORGE_API_URL}/notification/email/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
        },
        body: JSON.stringify({
          to,
          subject,
          htmlContent,
          fromName,
          replyTo,
        }),
      }
    );

    if (!response.ok) {
      console.warn(
        `[Email Service] Failed to send email: ${response.statusText}`
      );
      // Still return true to not break webhook processing
      return false;
    }

    console.log(`[Email Service] Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error("[Email Service] Error sending email:", error);
    // Return false but don't throw to allow webhook to complete
    return false;
  }
}

/**
 * Send welcome email to new subscriber
 */
export async function sendWelcomeEmail(
  userEmail: string,
  userName?: string,
  supportEmail?: string
): Promise<boolean> {
  const htmlContent = generateWelcomeEmail({
    userEmail,
    userName,
    supportEmail,
  });

  return sendEmail({
    to: userEmail,
    subject: "🎉 Welcome to NexGen AI",
    htmlContent,
  });
}

/**
 * Send payment success email
 */
export async function sendPaymentSuccessEmail(
  userEmail: string,
  userName: string,
  planName: string,
  planPrice: number,
  planFeatures: string[],
  invoiceNumber?: string,
  invoiceDate?: string,
  renewalDate?: string,
  downloadUrl?: string
): Promise<boolean> {
  const htmlContent = generatePaymentSuccessEmail({
    userEmail,
    userName,
    planName,
    planPrice,
    planFeatures,
    invoiceNumber,
    invoiceDate,
    renewalDate,
    downloadUrl,
  });

  return sendEmail({
    to: userEmail,
    subject: "✅ Payment Confirmed - NexGen AI",
    htmlContent,
  });
}

/**
 * Send renewal reminder email
 */
export async function sendRenewalReminderEmail(
  userEmail: string,
  userName: string,
  planName: string,
  planPrice: number,
  renewalDate: string,
  supportEmail?: string
): Promise<boolean> {
  const htmlContent = generateRenewalReminderEmail({
    userEmail,
    userName,
    planName,
    planPrice,
    renewalDate,
    supportEmail,
  });

  return sendEmail({
    to: userEmail,
    subject: "📅 Subscription Renewal Reminder",
    htmlContent,
  });
}

/**
 * Send payment failed email
 */
export async function sendPaymentFailedEmail(
  userEmail: string,
  userName: string,
  planName: string,
  supportEmail?: string
): Promise<boolean> {
  const htmlContent = generatePaymentFailedEmail({
    userEmail,
    userName,
    planName,
    supportEmail,
  });

  return sendEmail({
    to: userEmail,
    subject: "⚠️ Payment Failed - Action Required",
    htmlContent,
  });
}

/**
 * Send newsletter welcome email
 */
export async function sendNewsletterWelcomeEmail(
  userEmail: string,
  userName?: string,
  unsubscribeToken?: string
): Promise<boolean> {
  const htmlContent = generateNewsletterWelcomeEmail({
    userEmail,
    userName,
    unsubscribeToken,
  });

  return sendEmail({
    to: userEmail,
    subject: "📬 Welcome to NexGen AI Newsletter",
    htmlContent,
  });
}

/**
 * Send email to admin/owner about important events
 */
export async function notifyAdminAboutEmail(
  emailType: string,
  recipientEmail: string,
  details: Record<string, any>
): Promise<void> {
  try {
    await notifyOwner({
      title: `Email Notification: ${emailType}`,
      content: `Email sent to ${recipientEmail}\n\nDetails: ${JSON.stringify(details, null, 2)}`,
    });
  } catch (error) {
    console.error("[Email Service] Failed to notify admin:", error);
  }
}
