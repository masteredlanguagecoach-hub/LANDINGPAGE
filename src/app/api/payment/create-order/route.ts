import { NextRequest, NextResponse } from 'next/server';
import { getCourseById } from '@/lib/courses';
import { createServerRazorpayOrder } from '@/lib/razorpay';
import { validateFullName, validateWhatsAppNumber } from '@/lib/validation';
import { verifyEmailExistence } from '@/lib/email-verify';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId, fullName, email, whatsappNumber } = body;

    // 1. Validate Course Selection & Server Price
    const course = getCourseById(courseId);
    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Please select a valid course.' },
        { status: 400 }
      );
    }

    // 2. Validate Full Name
    const nameVal = validateFullName(fullName || '');
    if (!nameVal.valid) {
      return NextResponse.json(
        { success: false, message: nameVal.error },
        { status: 400 }
      );
    }

    // 3. Validate Email Existence
    const emailVerify = await verifyEmailExistence(email || '');
    if (!emailVerify.valid) {
      return NextResponse.json(
        { success: false, message: emailVerify.message },
        { status: 400 }
      );
    }

    // 4. Validate WhatsApp Number
    const waVal = validateWhatsAppNumber(whatsappNumber || '');
    if (!waVal.valid) {
      return NextResponse.json(
        { success: false, message: waVal.error },
        { status: 400 }
      );
    }

    // 5. Create Razorpay Order on Server using Authoritative Price
    const order = await createServerRazorpayOrder(course.id, {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      whatsappNumber: waVal.normalized || whatsappNumber.trim(),
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount, // in paise
      currency: order.currency,
      keyId: order.keyId,
      courseName: course.name,
      displayPrice: course.price,
    });
  } catch (error: any) {
    console.error('[API /api/payment/create-order] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create payment order. Please try again.' },
      { status: 500 }
    );
  }
}
