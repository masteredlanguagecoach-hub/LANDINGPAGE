import nodemailer from 'nodemailer';

export interface WelcomeEmailData {
  studentName: string;
  studentEmail: string;
  courseName: string;
  whatsappNumber: string;
  paymentId: string;
  admissionNumber?: string;
}

/**
 * Creates Nodemailer transporter based on SMTP configuration.
 * Uses console fallback if SMTP credentials are not configured.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);

  if (!host || !user || !pass || pass.includes('placeholder')) {
    return null; // Return null to use dev log transport
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Generates responsive, high-converting HTML welcome email.
 */
export function buildWelcomeEmailHtml(data: WelcomeEmailData): string {
  const practiceUrl = process.env.PRACTICE_WEBAPP_URL || 'https://practice.masteredlanguagecoach.com';
  const logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`;
  const admissionNum = data.admissionNumber || 'MLC786';
  const supportWhatsapp = (process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_NUMBER || '919876543210').replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${supportWhatsapp}?text=${encodeURIComponent(`Hi Mastered Language Coach, I have enrolled in the Speaking Challenge! Admission No: ${admissionNum}`)}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Mastered Language Coach</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f8; margin: 0; padding: 0; color: #1e293b; }
    .wrapper { max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .header { background-color: #ffffff; padding: 30px; text-align: center; border-bottom: 2px solid #f1f5f9; }
    .logo { height: 60px; max-width: 200px; object-fit: contain; }
    .content { padding: 40px 35px; }
    .badge { display: inline-block; background-color: #dcfce7; color: #15803d; font-size: 13px; font-weight: 700; padding: 6px 14px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; }
    h1 { color: #0f172a; font-size: 24px; font-weight: 800; margin: 0 0 15px 0; }
    p { font-size: 16px; line-height: 1.6; color: #475569; margin: 0 0 20px 0; }
    .account-box { background-color: #fff1f2; border: 2px solid #fecdd3; border-radius: 14px; padding: 20px; margin: 25px 0; text-align: center; }
    .account-title { color: #e11d48; font-size: 16px; font-weight: 800; margin-bottom: 10px; }
    .details-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 25px 0; }
    .details-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e2e8f0; }
    .details-row:last-child { border-bottom: none; }
    .details-label { color: #64748b; font-size: 14px; font-weight: 600; }
    .details-value { color: #0f172a; font-size: 14px; font-weight: 700; text-align: right; }
    .cta-container { text-align: center; margin: 30px 0 15px 0; }
    .btn { display: inline-block; background-color: #E50914; color: #ffffff !important; font-size: 18px; font-weight: 700; padding: 16px 36px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 14px rgba(229, 9, 20, 0.35); }
    .btn-wa { display: inline-block; background-color: #16a34a; color: #ffffff !important; font-size: 16px; font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; margin-top: 10px; }
    .footer { background-color: #0b0f19; padding: 30px; text-align: center; color: #94a3b8; font-size: 14px; }
    .footer p { color: #94a3b8; font-size: 13px; margin: 5px 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <img src="${logoUrl}" alt="Mastered Language Coach" class="logo" />
    </div>
    <div class="content">
      <div style="text-align: center;">
        <span class="badge">Payment Confirmed ✓</span>
      </div>
      <h1>Hi ${data.studentName},</h1>
      <p>Your enrollment in the <strong>${data.courseName}</strong> has been successfully confirmed.</p>
      
      <div class="account-box">
        <div class="account-title">🎉 Your account has been created in the app!</div>
        <p style="margin: 0; font-size: 14px; color: #475569;">You can sign in now with your registered email and password:</p>
        <div style="margin-top: 12px; font-family: monospace; font-size: 15px; font-weight: 700; color: #0f172a;">
          <div>Email: <strong>${data.studentEmail}</strong></div>
          <div style="margin-top: 4px;">Password: <strong style="color: #E50914;">${admissionNum}</strong></div>
        </div>
      </div>

      <div class="details-box">
        <div class="details-row">
          <span class="details-label">Admission Number</span>
          <span class="details-value" style="color: #E50914; font-weight: 800;">${admissionNum}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Course Enrolled</span>
          <span class="details-value">${data.courseName}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Payment Status</span>
          <span class="details-value" style="color: #16a34a;">Successful ✓</span>
        </div>
        <div class="details-row">
          <span class="details-label">Registered WhatsApp</span>
          <span class="details-value">${data.whatsappNumber}</span>
        </div>
        <div class="details-row">
          <span class="details-label">Payment Reference</span>
          <span class="details-value">${data.paymentId}</span>
        </div>
      </div>

      <div class="cta-container">
        <a href="${practiceUrl}" target="_blank" class="btn">Sign In to Practice Web App →</a>
        <div style="margin-top: 15px;">
          <a href="${whatsappUrl}" target="_blank" class="btn-wa">💬 Message Us on WhatsApp</a>
        </div>
      </div>

      <p style="font-size: 14px; color: #64748b; margin-top: 25px;">Keep this email for future reference. If you need assistance, our support team is available on WhatsApp.</p>
    </div>
    <div class="footer">
      <p><strong>Mastered Language Coach</strong></p>
      <p>Speak With Confidence</p>
      <p style="margin-top: 15px; font-size: 12px; color: #64748b;">© ${new Date().getFullYear()} Mastered Language Coach. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends welcome transactional email to enrolled student.
 */
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<{ success: boolean; error?: string }> {
  const from = process.env.EMAIL_FROM || '"Mastered Language Coach" <support@masteredlanguagecoach.com>';
  const subject = `Welcome to Mastered Language Coach - Admission No: ${data.admissionNumber || 'MLC786'}`;
  const html = buildWelcomeEmailHtml(data);

  const transporter = createTransporter();

  if (!transporter) {
    console.log('[Email Simulation] Welcome email generated for:', data.studentEmail, 'Admission No:', data.admissionNumber || 'MLC786');
    console.log('[Email Simulation] Target URL:', process.env.PRACTICE_WEBAPP_URL);
    return { success: true };
  }

  try {
    await transporter.sendMail({
      from,
      to: data.studentEmail,
      subject,
      html,
    });
    return { success: true };
  } catch (error: any) {
    console.error('[Email Service] Failed to send welcome email:', error);
    return {
      success: false,
      error: error?.message || 'SMTP delivery failed',
    };
  }
}
