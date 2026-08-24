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
import { getAllCourses } from '@/lib/courses';
import { Course } from '@/types';

const INITIAL_COURSES: Course[] = getAllCourses();

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

      {/* 3. Problem Awareness Section */}
      <ProblemSection />

      {/* 4. Solution / Methodology Section */}
      <SolutionSection />

      {/* 5. Course Selection Section */}
      <CourseCards
        courses={INITIAL_COURSES}
        selectedCourseId={selectedCourseId}
        onSelectCourse={(id) => setSelectedCourseId(id)}
      />

      {/* 6. How It Works Step-by-Step */}
      <HowItWorks />

      {/* 7. Conversion Enrollment Form */}
      <EnrollmentForm
        courses={INITIAL_COURSES}
        selectedCourseId={selectedCourseId}
        onSelectCourse={(id) => setSelectedCourseId(id)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 8. Student Testimonials */}
      <Testimonials />

      {/* 9. Frequently Asked Questions */}
      <FaqSection />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
