'use client';

import React, { useState } from 'react';
import { Course } from '@/types';
import { validateFullName, validateWhatsAppNumber } from '@/lib/validation';
import {
  CheckCircle2,
  Lock,
  Loader2,
  ArrowRight,
  AlertCircle,
  Mail,
  User,
} from 'lucide-react';

interface EnrollmentFormProps {
  courses: Course[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
  onPaymentSuccess: (successData: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function EnrollmentForm({
  courses,
  selectedCourseId,
  onSelectCourse,
  onPaymentSuccess,
}: EnrollmentFormProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  // Email Verification State
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailVerifyMsg, setEmailVerifyMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Field Errors
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    whatsappNumber?: string;
    courseId?: string;
    general?: string;
  }>({});

  // Payment State
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Selected Course
  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const currentPrice = selectedCourse ? selectedCourse.price : 5;

  // Reset Email Verification if user changes email text
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (isEmailVerified) {
      setIsEmailVerified(false);
      setEmailVerifyMsg(null);
    }
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // Trigger Email Existence Verification
  const handleVerifyEmail = async (): Promise<boolean> => {
    setEmailVerifyMsg(null);
    setErrors((prev) => ({ ...prev, email: undefined }));

    const trimmed = email.trim();
    if (!trimmed) {
      setErrors((prev) => ({ ...prev, email: 'Please enter your email address.' }));
      return false;
    }

    setIsVerifyingEmail(true);

    try {
      const res = await fetch('/api/email/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (data.valid) {
        setIsEmailVerified(true);
        setEmailVerifyMsg({ text: data.message || '✓ Email verified and active', isError: false });
        return true;
      } else {
        setIsEmailVerified(false);
        setEmailVerifyMsg({ text: data.message || 'This email domain does not appear to exist.', isError: true });
        setErrors((prev) => ({ ...prev, email: data.message }));
        return false;
      }
    } catch (err: any) {
      console.error('Email verify error:', err);
      setEmailVerifyMsg({ text: 'Error verifying email address. Please try again.', isError: true });
      return false;
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  // Submit Handler -> Validates -> Auto Verifies Email if needed -> Creates Order -> Opens Razorpay
  const handleEnrollAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // 1. Validate Full Name
    const nameVal = validateFullName(fullName);
    if (!nameVal.valid) {
      setErrors((prev) => ({ ...prev, fullName: nameVal.error }));
      return;
    }

    // 2. Validate & Verify Email
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: 'Please enter your email address.' }));
      return;
    }

    let verified = isEmailVerified;
    if (!verified) {
      verified = await handleVerifyEmail();
      if (!verified) return;
    }

    // 3. Validate WhatsApp Number
    const waVal = validateWhatsAppNumber(whatsappNumber);
    if (!waVal.valid) {
      setErrors((prev) => ({ ...prev, whatsappNumber: waVal.error }));
      return;
    }

    // 4. Validate Course Selected
    if (!selectedCourse) {
      setErrors((prev) => ({ ...prev, courseId: 'Please select a course.' }));
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Step A: Create Order on Server
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          whatsappNumber: waVal.normalized || whatsappNumber.trim(),
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        setErrors({ general: orderData.message || 'Failed to initialize payment. Please try again.' });
        setIsProcessingPayment(false);
        return;
      }

      // Step B: Check Razorpay SDK availability
      if (typeof window === 'undefined' || !window.Razorpay) {
        setErrors({ general: 'Razorpay Checkout SDK is loading. Please try clicking pay again in 2 seconds.' });
        setIsProcessingPayment(false);
        return;
      }

      // Step C: Configure Razorpay Checkout modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Mastered Language Coach',
        description: selectedCourse.name,
        image: '/logo.png',
        order_id: orderData.orderId,
        prefill: {
          name: fullName.trim(),
          email: email.trim().toLowerCase(),
          contact: waVal.normalized || whatsappNumber.trim(),
        },
        theme: {
          color: '#E50914',
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseId: selectedCourse.id,
                fullName: fullName.trim(),
                email: email.trim().toLowerCase(),
                whatsappNumber: waVal.normalized || whatsappNumber.trim(),
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              onPaymentSuccess(verifyData);
            } else {
              setErrors({ general: verifyData.message || 'Server payment verification failed.' });
              setIsProcessingPayment(false);
            }
          } catch (err: any) {
            console.error('Payment verification API error:', err);
            setErrors({ general: 'Payment verification failed due to network issue. Please contact support.' });
            setIsProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
            setErrors({ general: 'Payment process was cancelled. You can try again whenever ready.' });
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (response: any) {
        setIsProcessingPayment(false);
        setErrors({
          general: response.error?.description || 'Payment transaction failed. Please try a different payment method.',
        });
      });

      razorpayInstance.open();
    } catch (err: any) {
      console.error('Order creation error:', err);
      setErrors({ general: 'An unexpected error occurred while setting up your payment.' });
      setIsProcessingPayment(false);
    }
  };

  return (
    <section id="enrollment" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3.5 py-1 rounded-full">
            Secure Student Enrollment
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight">
            Enroll in the <span className="text-brand-500">Speaking Challenge</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Fill in your details below to activate instant access to your daily practice web app.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xl shadow-slate-200/50">
          {/* General Error Banner */}
          {errors.general && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm font-medium">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleEnrollAndPay} className="space-y-6">
            {/* Course Selector Visual Cards inside Form */}
            <div>
              <label className="block text-sm font-extrabold text-slate-900 mb-2">
                Selected Course Track
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {courses.map((course) => {
                  const isSel = selectedCourseId === course.id;
                  return (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => onSelectCourse(course.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSel
                          ? 'border-brand-500 bg-brand-50/50 text-slate-900 shadow-sm'
                          : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-brand-600 block">
                          {course.displayLanguage}
                        </span>
                        <span className="text-sm font-extrabold text-slate-900 block">
                          ₹{course.price}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          isSel ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSel && <CheckCircle2 className="w-4 h-4 fill-current" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field: Full Name */}
            <div>
              <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                Full Name <span className="text-brand-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="Enter your full name"
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl border ${
                    errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-slate-200 focus:border-brand-500'
                  } bg-white text-slate-900 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Field: Email Address + Verify Email Button */}
            <div>
              <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                Email Address <span className="text-brand-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl border ${
                      errors.email ? 'border-red-500 bg-red-50/30' : isEmailVerified ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-200 focus:border-brand-500'
                    } bg-white text-slate-900 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all`}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleVerifyEmail()}
                  disabled={isVerifyingEmail || isEmailVerified || !email.trim()}
                  className={`px-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all flex-shrink-0 cursor-pointer ${
                    isEmailVerified
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-slate-900 hover:bg-slate-800 text-white disabled:bg-slate-200 disabled:text-slate-400'
                  }`}
                >
                  {isVerifyingEmail ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying...</span>
                    </>
                  ) : isEmailVerified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>✓ Email Verified</span>
                    </>
                  ) : (
                    <span>Verify Email</span>
                  )}
                </button>
              </div>

              {/* Status Message for Email Verification */}
              {emailVerifyMsg && (
                <p
                  className={`mt-1.5 text-xs font-semibold flex items-center gap-1 ${
                    emailVerifyMsg.isError ? 'text-red-600' : 'text-emerald-700'
                  }`}
                >
                  {emailVerifyMsg.isError ? (
                    <AlertCircle className="w-3.5 h-3.5" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  <span>{emailVerifyMsg.text}</span>
                </p>
              )}

              {errors.email && !emailVerifyMsg && (
                <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Field: WhatsApp Number */}
            <div>
              <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                WhatsApp Number <span className="text-brand-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm font-bold">
                  <span>🇮🇳 +91</span>
                </div>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => {
                    setWhatsappNumber(e.target.value);
                    if (errors.whatsappNumber) setErrors((prev) => ({ ...prev, whatsappNumber: undefined }));
                  }}
                  placeholder="Enter your 10-digit WhatsApp number"
                  className={`w-full pl-20 pr-4 py-3.5 rounded-xl border ${
                    errors.whatsappNumber ? 'border-red-500 bg-red-50/30' : 'border-slate-200 focus:border-brand-500'
                  } bg-white text-slate-900 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all`}
                />
              </div>
              {errors.whatsappNumber && (
                <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.whatsappNumber}</span>
                </p>
              )}
            </div>

            {/* Summary & Price Display */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
                  Total Payable Amount
                </span>
                <span className="text-sm font-extrabold text-slate-900 block">
                  {selectedCourse ? selectedCourse.name : 'Speaking Challenge'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-black text-brand-600 block">
                  ₹{currentPrice}
                </span>
                <span className="text-[11px] text-emerald-700 font-bold">Inclusive of taxes</span>
              </div>
            </div>

            {/* Primary Payment CTA Button */}
            <button
              type="submit"
              disabled={isProcessingPayment || isVerifyingEmail}
              className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 disabled:bg-slate-300 text-white font-black text-lg sm:text-xl py-4 sm:py-5 rounded-2xl shadow-xl shadow-brand-500/20 hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer disabled:cursor-not-allowed"
            >
              {isProcessingPayment ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                  <span>Processing...</span>
                </>
              ) : isVerifyingEmail ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                  <span>Verifying Email...</span>
                </>
              ) : (
                <>
                  <span>Enroll & Pay ₹{currentPrice}</span>
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </button>

            {/* Razorpay Security Badge */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secure payment powered by Razorpay Standard Checkout</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
