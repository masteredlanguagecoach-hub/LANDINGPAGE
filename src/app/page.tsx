'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import CourseCards from '@/components/CourseCards';
import HowItWorks from '@/components/HowItWorks';
import EnrollmentForm from '@/components/EnrollmentForm';
import Testimonials from '@/components/Testimonials';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import SuccessView from '@/components/SuccessView';
import { Course } from '@/types';

const INITIAL_COURSES: Course[] = [
  {
    id: 'ML-EN',
    name: 'Malayalam to English Speaking Challenge',
    displayLanguage: 'Malayalam → English',
    description: 'Designed specifically for Malayalam speakers looking to overcome hesitations and speak fluent, confident English in everyday situations.',
    price: 499,
    currency: 'INR',
    popular: true,
    badge: 'Most Popular in Kerala',
  },
  {
    id: 'HI-EN',
    name: 'Hindi to English Speaking Challenge',
    displayLanguage: 'Hindi → English',
    description: 'Designed specifically for Hindi speakers who want to stop translating in their head and speak natural, fluent English effortlessly.',
    price: 499,
    currency: 'INR',
    badge: 'High Conversion',
  },
];

export default function LandingPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('ML-EN');
  const [verifiedPaymentData, setVerifiedPaymentData] = useState<any | null>(null);

  const handlePaymentSuccess = (successPayload: any) => {
    setVerifiedPaymentData(successPayload);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (verifiedPaymentData) {
    return <SuccessView data={verifiedPaymentData} />;
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* 1. Sticky Navigation */}
      <Navbar />

      {/* 2. Conversion Hero Section */}
      <Hero />

      {/* 3. Problem Section */}
      <ProblemSection />

      {/* 4. Solution Section */}
      <SolutionSection />

      {/* 5. Course Selection Section */}
      <CourseCards
        courses={INITIAL_COURSES}
        selectedCourseId={selectedCourseId}
        onSelectCourse={setSelectedCourseId}
      />

      {/* 6. How It Works Section */}
      <HowItWorks />

      {/* 7. Enrollment & Razorpay Payment Section */}
      <EnrollmentForm
        courses={INITIAL_COURSES}
        selectedCourseId={selectedCourseId}
        onSelectCourse={setSelectedCourseId}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 8. Testimonials Section */}
      <Testimonials />

      {/* 9. FAQ Section */}
      <FaqSection />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
