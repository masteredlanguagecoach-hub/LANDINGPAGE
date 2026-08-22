export interface Course {
  id: string; // e.g. "ML-EN", "HI-EN"
  name: string; // e.g. "Malayalam to English Speaking Challenge"
  displayLanguage: string; // "Malayalam → English"
  description: string;
  price: number; // In INR (e.g. 499)
  currency: string; // "INR"
  badge?: string;
  popular?: boolean;
}

export interface EnrollmentFormData {
  fullName: string;
  email: string;
  whatsappNumber: string; // Normalized format e.g. "+919876543210"
  courseId: string;
}

export interface OTPRecord {
  otpHash: string;
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
  isVerified: boolean;
}

export interface CreateOrderRequest {
  courseId: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  courseId: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
}

export interface PaidStudentRow {
  timestamp: string;
  enrollmentId: string;
  fullName: string;
  email: string;
  emailVerified: string; // "YES"
  whatsappNumber: string;
  courseCode: string;
  courseName: string;
  amount: number;
  currency: string;
  paymentStatus: string; // "SUCCESS"
  razorpayOrderId: string;
  razorpayPaymentId: string;
  paymentVerificationStatus: string; // "VERIFIED_HMAC_SHA256"
  enrollmentStatus: string; // "ACTIVE"
  emailDeliveryStatus: string; // "SENT" | "FAILED"
  createdAt: string;
}

export interface PaymentLogRow {
  timestamp: string;
  internalEnrollmentId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  course: string;
  amount: number;
  currency: string;
  paymentStatus: string;
  signatureVerification: string;
  webhookStatus: string;
  email: string;
  whatsappNumber: string;
  notes: string;
}
