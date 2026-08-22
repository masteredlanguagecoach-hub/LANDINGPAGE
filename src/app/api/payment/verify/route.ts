import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { getCourseById } from '@/lib/courses';
import { appendPaidStudentRow, appendPaymentLogRow, updateEmailDeliveryStatus } from '@/lib/sheets';
import { sendWelcomeEmail } from '@/lib/email';
import { PaidStudentRow, PaymentLogRow } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
      fullName,
      email,
      whatsappNumber,
    } = body;

    // 1. Verify Mandatory Parameters
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseId) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment payload details.' },
        { status: 400 }
      );
    }

    // 2. HMAC SHA-256 Signature Verification
    const isSignatureValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isSignatureValid) {
      console.warn(`[Security Alert] Invalid payment signature attempt for order ${razorpay_order_id}`);

      // Log suspicious failed attempt to PAYMENT_LOGS
      await appendPaymentLogRow({
        timestamp: new Date().toISOString(),
        internalEnrollmentId: `FAILED_${Date.now()}`,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        course: courseId,
        amount: 0,
        currency: 'INR',
        paymentStatus: 'FAILED',
        signatureVerification: 'FAILED_HMAC_SHA256',
        webhookStatus: 'N/A',
        email: email || '',
        whatsappNumber: whatsappNumber || '',
        notes: 'Tampered or invalid Razorpay payment signature detected.',
      });

      return NextResponse.json(
        { success: false, message: 'Payment signature verification failed. Enrollment denied.' },
        { status: 400 }
      );
    }

    // 3. Resolve Authoritative Course Details
    const course = getCourseById(courseId);
    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Invalid course reference.' },
        { status: 400 }
      );
    }

    // 4. Generate Unique Internal Enrollment ID
    const enrollmentId = `MLC-${course.id}-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    const nowIso = new Date().toISOString();

    // 5. Attempt Email Delivery
    const emailResult = await sendWelcomeEmail({
      studentName: fullName.trim(),
      studentEmail: email.trim().toLowerCase(),
      courseName: course.name,
      whatsappNumber: whatsappNumber.trim(),
      paymentId: razorpay_payment_id,
    });

    const emailStatus = emailResult.success ? 'SENT' : 'FAILED';

    // 6. Construct Paid Student Database Row
    const paidStudent: PaidStudentRow = {
      timestamp: nowIso,
      enrollmentId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      emailVerified: 'YES',
      whatsappNumber: whatsappNumber.trim(),
      courseCode: course.id,
      courseName: course.name,
      amount: course.price,
      currency: course.currency,
      paymentStatus: 'SUCCESS',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      paymentVerificationStatus: 'VERIFIED_HMAC_SHA256',
      enrollmentStatus: 'ACTIVE',
      emailDeliveryStatus: emailStatus,
      createdAt: nowIso,
    };

    // 7. Append to PAID_STUDENTS (Idempotent)
    const sheetsResult = await appendPaidStudentRow(paidStudent);

    // 8. Construct Transaction Log Row
    const paymentLog: PaymentLogRow = {
      timestamp: nowIso,
      internalEnrollmentId: enrollmentId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      course: `${course.name} (${course.id})`,
      amount: course.price,
      currency: course.currency,
      paymentStatus: 'SUCCESS',
      signatureVerification: 'VERIFIED',
      webhookStatus: 'CLIENT_CALLBACK',
      email: email.trim().toLowerCase(),
      whatsappNumber: whatsappNumber.trim(),
      notes: sheetsResult.duplicate ? 'Duplicate callback ignored safely' : 'Initial verified payment append',
    };

    await appendPaymentLogRow(paymentLog);

    // Mask Payment ID for safe UI display (e.g., pay_N1x***987)
    const maskedPaymentId =
      razorpay_payment_id.length > 8
        ? `${razorpay_payment_id.substring(0, 6)}***${razorpay_payment_id.substring(razorpay_payment_id.length - 4)}`
        : razorpay_payment_id;

    return NextResponse.json({
      success: true,
      enrollmentId,
      maskedPaymentId,
      fullPaymentId: razorpay_payment_id,
      courseName: course.name,
      registeredEmail: email.trim().toLowerCase(),
      emailDeliveryStatus: emailStatus,
      message: 'Payment verified and enrollment confirmed!',
    });
  } catch (error: any) {
    console.error('[API /api/payment/verify] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server verification failed. Please contact support.' },
      { status: 500 }
    );
  }
}
