import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { getCourseById } from '@/lib/courses';
import { appendPaidStudentRow, appendPaymentLogRow, getNextAdmissionNumber } from '@/lib/sheets';
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
        admissionNumber: `FAILED_${Date.now()}`,
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

    // 4. Generate Admission Number Starting from MLC786 (MLC786, MLC787, ...)
    const admissionNumber = await getNextAdmissionNumber();
    const nowIso = new Date().toISOString();

    // 5. Attempt Welcome Email Delivery
    const emailResult = await sendWelcomeEmail({
      studentName: fullName.trim(),
      studentEmail: email.trim().toLowerCase(),
      courseName: course.name,
      whatsappNumber: whatsappNumber.trim(),
      paymentId: razorpay_payment_id,
      admissionNumber,
    });

    const emailStatus = emailResult.success ? 'SENT' : 'FAILED';

    // 6. Construct Paid Student Database Row
    const paidStudent: PaidStudentRow = {
      timestamp: nowIso,
      admissionNumber,
      enrollmentId: admissionNumber,
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
      admissionNumber,
      internalEnrollmentId: admissionNumber,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      course: course.id,
      amount: course.price,
      currency: course.currency,
      paymentStatus: 'SUCCESS',
      signatureVerification: 'VERIFIED_HMAC_SHA256',
      webhookStatus: 'PENDING_OR_DIRECT',
      email: email.trim().toLowerCase(),
      whatsappNumber: whatsappNumber.trim(),
      notes: sheetsResult.duplicate
        ? 'Duplicate payment verification request ignored.'
        : 'Payment verified successfully and student row appended.',
    };

    await appendPaymentLogRow(paymentLog);

    // Mask Payment ID for security display (e.g. pay_N1x***8491)
    const maskedPaymentId =
      razorpay_payment_id.length > 8
        ? `${razorpay_payment_id.slice(0, 5)}***${razorpay_payment_id.slice(-4)}`
        : razorpay_payment_id;

    return NextResponse.json({
      success: true,
      admissionNumber,
      enrollmentId: admissionNumber,
      maskedPaymentId,
      fullPaymentId: razorpay_payment_id,
      courseName: course.name,
      registeredEmail: email.trim().toLowerCase(),
      emailDeliveryStatus: emailStatus,
      message: 'Payment verified successfully. Welcome to Mastered Language Coach!',
    });
  } catch (error: any) {
    console.error('[API /api/payment/verify] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error during payment verification.' },
      { status: 500 }
    );
  }
}
