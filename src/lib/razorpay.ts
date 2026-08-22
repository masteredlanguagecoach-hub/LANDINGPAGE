import crypto from 'node:crypto';
import Razorpay from 'razorpay';
import { getCoursePrice } from './courses';

// Initialize Razorpay instance lazily or with fallbacks
export function getRazorpayClient(): Razorpay {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || 'placeholder_razorpay_secret_key';

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export interface RazorpayOrderResult {
  id: string;
  entity: string;
  amount: number | string;
  amount_paid: number | string;
  amount_due: number | string;
  currency: string;
  receipt?: string | null;
  status: string;
  keyId: string;
}

/**
 * Creates a Razorpay Order server-side for the specified course.
 * Uses authoritative server-side price calculation in paise.
 */
export async function createServerRazorpayOrder(
  courseId: string,
  userMetadata: { fullName: string; email: string; whatsappNumber: string }
): Promise<RazorpayOrderResult> {
  const priceINR = getCoursePrice(courseId);
  const amountPaise = priceINR * 100; // Convert to paise
  const receiptId = `rcpt_${courseId.toLowerCase()}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const razorpay = getRazorpayClient();

  // Create order via Razorpay SDK
  const order = await razorpay.orders.create({
    amount: amountPaise,
    currency: 'INR',
    receipt: receiptId,
    notes: {
      courseId,
      fullName: userMetadata.fullName,
      email: userMetadata.email,
      whatsappNumber: userMetadata.whatsappNumber,
    },
  });

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id';

  return {
    ...order,
    amount: typeof order.amount === 'number' ? order.amount : parseInt(order.amount as string, 10),
    keyId,
  };
}

/**
 * Verifies Razorpay Payment Signature using HMAC-SHA256.
 * Signature formula: HMAC_SHA256(order_id + "|" + payment_id, secret)
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET || 'placeholder_razorpay_secret_key';
  
  if (!orderId || !paymentId || !signature) {
    return false;
  }

  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(generatedSignature),
    Buffer.from(signature)
  );
}

/**
 * Verifies Razorpay Webhook Signature using HMAC-SHA256.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string
): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'placeholder_razorpay_webhook_secret';
  
  if (!rawBody || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature)
  );
}
