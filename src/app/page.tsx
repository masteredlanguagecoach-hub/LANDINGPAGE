'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CourseCards from '@/components/CourseCards';
import RefundObjectionSection from '@/components/RefundObjectionSection';
import WhyChallengeSection from '@/components/WhyChallengeSection';
import CourseVideosSection from '@/components/CourseVideosSection';
import HowItWorks from '@/components/HowItWorks';
import TwoMonthRuleSection from '@/components/TwoMonthRuleSection';
import WhatYouGetSection from '@/components/WhatYouGetSection';
import CommitmentEquationSection from '@/components/CommitmentEquationSection';
import FinalConversionCta from '@/components/FinalConversionCta';
import ChallengeRulesSection from '@/components/ChallengeRulesSection';
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

  // Restore saved course track from session storage if present
  useEffect(() => {
    try {
      const savedCourse = sessionStorage.getItem('mlc_selected_course');
      if (savedCourse && (savedCourse === 'ML-EN' || savedCourse === 'HI-EN')) {
        setSelectedCourseId(savedCourse);
      }
    } catch (e) {}
  }, []);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    try {
      sessionStorage.setItem('mlc_selected_course', courseId);
    } catch (e) {}
  };

  const handlePaymentSuccess = (successPayload: any) => {
    setVerifiedPaymentData(successPayload);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (verifiedPaymentData) {
    return <SuccessView data={verifiedPaymentData} />;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar />

      {/* SECTION 1 — HERO */}
      <Hero />

      {/* SECTION 2 — COURSE SELECTION (FIRST INTERACTION) */}
      <CourseCards
        courses={INITIAL_COURSES}
        selectedCourseId={selectedCourseId}
        onSelectCourse={handleSelectCourse}
      />

      {/* SECTION 3 — ANSWER THE BIGGEST QUESTION FIRST */}
      <RefundObjectionSection />

      {/* SECTION 4 — WHY THE CHALLENGE EXISTS */}
      <WhyChallengeSection />

      {/* SECTION 5 — THE 4 COURSE-SPECIFIC EXPLANATION VIDEOS */}
      <CourseVideosSection selectedCourseId={selectedCourseId} />

      {/* SECTION 6 — HOW IT WORKS (STEP-BY-STEP) */}
      <HowItWorks />

      {/* SECTION 7 — WHY ONLY TWO MONTHS? */}
      <TwoMonthRuleSection />

      {/* SECTION 8 — WHAT DO I ACTUALLY GET? */}
      <WhatYouGetSection />

      {/* SECTION 9 — WHY ₹399? */}
      <CommitmentEquationSection />

      {/* SECTION 10 — FINAL CONVERSION SECTION */}
      <FinalConversionCta />

      {/* ENROLLMENT & PAYMENT FORM (PRESERVED FUNCTIONAL PAYMENTS) */}
      <EnrollmentForm
        courses={INITIAL_COURSES}
        selectedCourseId={selectedCourseId}
        onSelectCourse={handleSelectCourse}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* STUDENT TESTIMONIALS */}
      <Testimonials />

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FaqSection />

      {/* SECTION 11 — CHALLENGE & REFUND RULES TRANSPARENCY */}
      <ChallengeRulesSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
