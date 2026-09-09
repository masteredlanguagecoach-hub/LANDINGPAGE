import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { appendPaidStudentRow, appendPaymentLogRow, isPaymentAlreadyProcessed, getNextAdmissionNumber } from '@/lib/sheets';
import { getCourseById } from '@/lib/courses';
import { sendWelcomeEmail } from '@/lib/email';
import { PaidStudentRow, PaymentLogRow } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ success: false, message: 'Missing webhook signature header' }, { status: 400 });
    }

    // 1. Verify Webhook Signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn('[Webhook Warning] Invalid webhook signature received');
      return NextResponse.json({ success: false, message: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const payment = payload.payload?.payment?.entity;
    const order = payload.payload?.order?.entity;

    console.log(`[Webhook Event Received] Event: ${event}`);

    // Handle payment.captured or order.paid
    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentId = payment?.id || order?.id;
      const orderId = payment?.order_id || order?.id;
      const notes = payment?.notes || order?.notes || {};

      const courseId = notes.courseId || notes.course_id;
      const fullName = notes.fullName || notes.full_name || notes.name || '';
      const email = notes.email || payment?.email || order?.email || '';
      const whatsappNumber = notes.whatsappNumber || notes.whatsapp || payment?.contact || '';

      if (paymentId) {
        // Idempotency Check
        const alreadyProcessed = await isPaymentAlreadyProcessed(paymentId, orderId);
        if (alreadyProcessed) {
          console.log(`[Webhook] Payment ${paymentId} already processed. Skipping duplicate append.`);
          return NextResponse.json({ success: true, message: 'Already processed' });
        }

        // If client verify route is handling the payment with full student details,
        // do not append an empty-named row from webhook race conditions.
        if (!fullName || fullName.trim() === '' || fullName === 'Valued Student') {
          console.log(`[Webhook] Skipping webhook write for ${paymentId} because name is empty/generic (client verify route handles full enrollment).`);
          return NextResponse.json({ success: true, message: 'Client verify handles full enrollment' });
        }

        const resolvedCourseId = courseId || 'ML-EN';
        const course = getCourseById(resolvedCourseId);
        if (course) {
          const nowIso = new Date().toISOString();
          const admissionNumber = await getNextAdmissionNumber();

          // Dispatch email if not already sent
          const emailRes = await sendWelcomeEmail({
            studentName: fullName.trim(),
            studentEmail: email.trim().toLowerCase(),
            courseName: course.name,
            whatsappNumber: whatsappNumber.trim(),
            paymentId,
            admissionNumber,
          });

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
            razorpayOrderId: orderId || '',
            razorpayPaymentId: paymentId,
            paymentVerificationStatus: 'VERIFIED_WEBHOOK_HMAC',
            enrollmentStatus: 'ACTIVE',
            emailDeliveryStatus: emailRes.success ? 'SENT' : 'FAILED',
            createdAt: nowIso,
          };

          await appendPaidStudentRow(paidStudent);

          const paymentLog: PaymentLogRow = {
            timestamp: nowIso,
            admissionNumber,
            internalEnrollmentId: admissionNumber,
            razorpayOrderId: orderId || '',
            razorpayPaymentId: paymentId,
            course: course.name,
            amount: course.price,
            currency: course.currency,
            paymentStatus: 'SUCCESS',
            signatureVerification: 'VERIFIED_WEBHOOK',
            webhookStatus: event,
            email: email || '',
            whatsappNumber: whatsappNumber || '',
            notes: 'Webhook processed idempotently',
          };

          await appendPaymentLogRow(paymentLog);
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Webhook processed successfully' });
  } catch (error: any) {
    console.error('[API /api/razorpay/webhook] Error:', error);
    return NextResponse.json({ success: false, message: 'Webhook handler error' }, { status: 500 });
  }
}
