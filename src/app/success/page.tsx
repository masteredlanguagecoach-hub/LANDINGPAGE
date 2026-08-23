'use client';

import React, { Suspense } from 'react';
import SuccessView from '@/components/SuccessView';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();

  const mockData = {
    admissionNumber: searchParams?.get('admissionNumber') || searchParams?.get('enrollmentId') || 'MLC786',
    maskedPaymentId: searchParams?.get('paymentId') || 'pay_N1x***8491',
    fullPaymentId: searchParams?.get('paymentId') || 'pay_N1x8491',
    courseName: searchParams?.get('course') || 'Malayalam to English Speaking Challenge',
    registeredEmail: searchParams?.get('email') || 'student@example.com',
  };

  return <SuccessView data={mockData} />;
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
