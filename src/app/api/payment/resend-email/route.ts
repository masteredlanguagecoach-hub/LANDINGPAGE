import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';
import { updateEmailDeliveryStatus } from '@/lib/sheets';

// Simple in-memory rate limiting map for resend email
const resendRateLimitMap = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { paymentId, email, fullName, courseName, whatsappNumber } = body;

    if (!paymentId || !email) {
      return NextResponse.json(
        { success: false, message: 'Payment ID and email are required to resend.' },
        { status: 400 }
      );
    }

    // Rate Limiting: 60s cooldown per payment ID
    const lastSent = resendRateLimitMap.get(paymentId) || 0;
    const now = Date.now();
    if (now - lastSent < 60000) {
      const remainingSecs = Math.ceil((60000 - (now - lastSent)) / 1000);
      return NextResponse.json(
        {
          success: false,
          message: `Please wait ${remainingSecs} seconds before requesting another email.`,
        },
        { status: 429 }
      );
    }

    resendRateLimitMap.set(paymentId, now);

    const emailResult = await sendWelcomeEmail({
      studentName: fullName || 'Valued Student',
      studentEmail: email,
      courseName: courseName || 'Speaking Challenge',
      whatsappNumber: whatsappNumber || '',
      paymentId,
    });

    if (emailResult.success) {
      await updateEmailDeliveryStatus(paymentId, 'SENT');
      return NextResponse.json({
        success: true,
        message: 'Welcome email resent successfully! Please check your Inbox and Spam folders.',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Email service delivery failed. Please verify your email address or contact support.',
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('[API /api/payment/resend-email] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error while resending email.' },
      { status: 500 }
    );
  }
}
