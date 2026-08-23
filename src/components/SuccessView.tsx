'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  MailCheck,
  ExternalLink,
  RotateCcw,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface SuccessViewProps {
  data: {
    admissionNumber?: string;
    enrollmentId?: string;
    maskedPaymentId: string;
    fullPaymentId?: string;
    courseName: string;
    registeredEmail: string;
    whatsappNumber?: string;
  };
  onReset?: () => void;
}

export default function SuccessView({ data }: SuccessViewProps) {
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ text: string; isError: boolean } | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const admissionNum = data.admissionNumber || data.enrollmentId || 'MLC786';

  // Practice Web App Link from env or default
  const practiceUrl = process.env.NEXT_PUBLIC_PRACTICE_WEBAPP_URL || 'https://practice.masteredlanguagecoach.com';

  // Cooldown timer effect
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  const handleResendEmail = async () => {
    if (cooldownSeconds > 0 || isResending) return;

    setIsResending(true);
    setResendStatus(null);

    try {
      const res = await fetch('/api/payment/resend-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: data.fullPaymentId || data.maskedPaymentId,
          email: data.registeredEmail,
          fullName: 'Valued Student',
          courseName: data.courseName,
          whatsappNumber: data.whatsappNumber || '',
          admissionNumber: admissionNum,
        }),
      });

      const resData = await res.json();

      if (resData.success) {
        setResendStatus({ text: resData.message, isError: false });
        setCooldownSeconds(60);
      } else {
        setResendStatus({ text: resData.message || 'Failed to resend email.', isError: true });
      }
    } catch (err: any) {
      console.error('Resend email error:', err);
      setResendStatus({ text: 'Error connecting to server. Please try again.', isError: true });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 border border-slate-200 relative overflow-hidden">
        {/* Top Decorative Banner */}
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-emerald-500 via-brand-500 to-emerald-600" />

        {/* Brand Logo Header */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="relative h-16 w-16">
            <Image
              src="/logo.png"
              alt="Mastered Language Coach Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-950 block">
              Mastered Language Coach
            </span>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">
              Speak With Confidence
            </span>
          </div>
        </div>

        {/* Success Icon Animation & Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
            <CheckCircle2 className="w-12 h-12 fill-emerald-600 text-white" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Enrollment Successful!
          </h1>
          <p className="text-base sm:text-lg font-bold text-slate-700">
            Welcome to the Mastered Language Coach Speaking Challenge.
          </p>
        </div>

        {/* Primary Callout: Check Email */}
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 sm:p-6 text-center space-y-2">
          <div className="inline-flex items-center justify-center gap-2 text-emerald-800 font-black text-lg">
            <MailCheck className="w-6 h-6 text-emerald-600" />
            <span>Please check your email.</span>
          </div>
          <p className="text-sm font-medium text-emerald-900 leading-relaxed">
            We have sent your Speaking Challenge practice web app link and enrollment details to your registered email address:
          </p>
          <div className="bg-white py-2 px-4 rounded-xl border border-emerald-200 inline-block font-extrabold text-slate-900 text-sm">
            {data.registeredEmail}
          </div>
        </div>

        {/* Enrollment Summary Details Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-2">
            Enrollment Receipt Details
          </h3>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-slate-500 font-semibold">Admission Number:</span>
            <span className="text-brand-600 font-mono font-black text-right">{admissionNum}</span>

            <span className="text-slate-500 font-semibold">Course Enrolled:</span>
            <span className="text-slate-950 font-extrabold text-right">{data.courseName}</span>

            <span className="text-slate-500 font-semibold">Payment Status:</span>
            <span className="text-emerald-700 font-extrabold text-right flex items-center justify-end gap-1">
              <ShieldCheck className="w-4 h-4" /> Successful
            </span>

            <span className="text-slate-500 font-semibold">Payment Reference:</span>
            <span className="text-slate-950 font-mono font-bold text-right">{data.maskedPaymentId}</span>
          </div>
        </div>

        {/* Practice Web App Direct Launch Button */}
        <div className="space-y-3">
          <a
            href={practiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-extrabold text-lg py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 text-center"
          >
            <span>Start Practice Web App Now</span>
            <ExternalLink className="w-5 h-5" />
          </a>

          {/* Spam Folder Warning & Resend Button */}
          <div className="text-center space-y-2 pt-2 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500">
              Didn't receive the email? Check your <strong className="text-slate-700">Spam</strong> or <strong className="text-slate-700">Promotions</strong> folder.
            </p>

            <button
              onClick={handleResendEmail}
              disabled={isResending || cooldownSeconds > 0}
              className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-600 hover:text-brand-700 disabled:text-slate-400 cursor-pointer disabled:cursor-not-allowed transition-colors"
            >
              {isResending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Resending email...</span>
                </>
              ) : cooldownSeconds > 0 ? (
                <span>Resend available in {cooldownSeconds}s</span>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resend Welcome Email</span>
                </>
              )}
            </button>

            {resendStatus && (
              <p
                className={`text-xs font-semibold mt-1 flex items-center justify-center gap-1 ${
                  resendStatus.isError ? 'text-red-600' : 'text-emerald-700'
                }`}
              >
                {resendStatus.isError ? (
                  <AlertCircle className="w-3.5 h-3.5" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                <span>{resendStatus.text}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
