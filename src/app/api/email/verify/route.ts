import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailExistence } from '@/lib/email-verify';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, valid: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const result = await verifyEmailExistence(email);

    if (!result.valid) {
      return NextResponse.json(
        { success: false, valid: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      valid: true,
      message: '✓ Email address verified and active!',
    });
  } catch (error: any) {
    console.error('[API /api/email/verify] Error:', error);
    return NextResponse.json(
      { success: false, valid: false, message: 'Failed to verify email address. Please try again.' },
      { status: 500 }
    );
  }
}
