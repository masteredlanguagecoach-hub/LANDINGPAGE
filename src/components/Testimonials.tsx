'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Anjali R.',
      location: 'Kochi, Kerala',
      track: 'Malayalam → English',
      rating: 5,
      comment:
        'I used to hesitate in team meetings because I was translating Malayalam sentences into English line by line. After 2 weeks in this challenge, my speaking speed doubled and I stopped stuttering!',
    },
    {
      name: 'Rahul Sharma',
      location: 'New Delhi',
      track: 'Hindi → English',
      rating: 5,
      comment:
        'The practice web app prompts forced me to open my mouth and speak every single day. No grammar rules to memorize—just active daily practice. My interviewers even complimented my clarity!',
    },
    {
      name: 'Dr. Vishnu K.',
      location: 'Thiruvananthapuram',
      track: 'Malayalam → English',
      rating: 5,
      comment:
        'As a doctor, communicating clearly with international peers was essential. Mastered Language Coach gave me the confidence to speak fluently without fear of mistakes.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
            Real Student Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Hear From Our <span className="text-brand-500">Challengers</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Thousands of Malayalam and Hindi speakers built their English confidence with Mastered Language Coach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50/90 rounded-2xl p-6 sm:p-8 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-brand-500/20" />
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-slate-950">{rev.name}</h4>
                  <span className="text-xs font-semibold text-slate-500">{rev.location}</span>
                </div>
                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-100">
                  {rev.track}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
