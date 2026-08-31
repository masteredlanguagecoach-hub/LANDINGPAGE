'use client';

import React from 'react';
import { Course } from '@/types';
import { CheckCircle2, Sparkles, Globe, ArrowRight } from 'lucide-react';

interface CourseCardsProps {
  courses: Course[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
}

export default function CourseCards({
  courses,
  selectedCourseId,
  onSelectCourse,
}: CourseCardsProps) {
  const handleCardClick = (courseId: string) => {
    onSelectCourse(courseId);
  };

  return (
    <section id="courses" className="py-16 sm:py-24 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/30 px-3.5 py-1.5 rounded-full inline-block">
            STEP 1: CHOOSE YOUR PATH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            CHOOSE YOUR LEARNING PATH
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Select the language you want us to use to guide you while you build your English speaking practice.
          </p>
        </div>

        {/* 2 Interactive Native Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {courses.map((course) => {
            const isSelected = selectedCourseId === course.id;
            const isMalayalam = course.id === 'ML-EN';

            return (
              <div
                key={course.id}
                onClick={() => handleCardClick(course.id)}
                className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 ${
                  isSelected
                    ? 'bg-[#111827] border-brand-500 shadow-2xl shadow-brand-500/20 scale-[1.02] ring-4 ring-brand-500/20'
                    : 'bg-[#111827]/60 border-slate-800 hover:border-slate-700 hover:bg-[#111827]'
                }`}
              >
                {/* Popular Badge */}
                {course.badge && (
                  <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-brand-500 to-red-600 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{course.badge}</span>
                  </div>
                )}

                <div className="space-y-5">
                  {/* Top Bar with Language Tag & Check Icon */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold text-brand-300 border border-slate-700">
                      <Globe className="w-4 h-4 text-brand-400" />
                      <span>{isMalayalam ? 'I SPEAK MALAYALAM' : 'मैं हिंदी बोलता/बोलती हूँ'}</span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-brand-500 text-white shadow-lg'
                          : 'border-2 border-slate-700 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-6 h-6 fill-current" />
                    </div>
                  </div>

                  {/* Course Title & Language Transition */}
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-1">
                      {isMalayalam ? 'Malayalam → English Track' : 'Hindi → English Track'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                      {course.name}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Price & Selection CTA */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                      Challenge Entry Fee
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        ₹{course.price}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        ₹300 Refundable
                      </span>
                    </div>
                  </div>

                  <button
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-black text-xs sm:text-sm transition-all ${
                      isSelected
                        ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span>{isSelected ? 'SELECTED TRACK' : 'SELECT TRACK'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
