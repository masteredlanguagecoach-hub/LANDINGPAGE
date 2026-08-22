'use client';

import React from 'react';
import { Course } from '@/types';
import { CheckCircle2, Sparkles, ArrowRight, Globe } from 'lucide-react';

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
    const formEl = document.getElementById('enrollment');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="courses" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            Available Track Options
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Choose Your <span className="text-brand-500">Speaking Challenge</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Select your primary native language track to receive tailored speaking prompts and exercises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {courses.map((course) => {
            const isSelected = selectedCourseId === course.id;
            return (
              <div
                key={course.id}
                onClick={() => handleCardClick(course.id)}
                className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 ${
                  isSelected
                    ? 'bg-white border-brand-500 shadow-2xl shadow-brand-500/15 scale-[1.02] ring-4 ring-brand-500/10'
                    : 'bg-white border-slate-200/90 hover:border-brand-300 hover:shadow-lg'
                }`}
              >
                {/* Badge if available */}
                {course.badge && (
                  <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-brand-500 to-red-600 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{course.badge}</span>
                  </div>
                )}

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold text-slate-800">
                      <Globe className="w-4 h-4 text-brand-500" />
                      <span>{course.displayLanguage}</span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-brand-500 text-white shadow-md'
                          : 'border-2 border-slate-300 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 fill-current" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 mb-2">
                      {course.name}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
                      Challenge Fee
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-950">
                      ₹{course.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-brand-500 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{isSelected ? 'Selected ✓' : 'Select Course'}</span>
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
