'use client';

import React, { useState } from 'react';
import { Play, Video, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

interface CourseVideosSectionProps {
  selectedCourseId: string;
}

interface VideoItem {
  id: string;
  youtubeId: string;
  number: string;
  title: string;
  description: string;
}

const MALAYALAM_VIDEOS: VideoItem[] = [
  {
    id: 'ml-1',
    youtubeId: 'geHhYzLdJZk',
    number: '01',
    title: 'WHY DO WE CHARGE ₹399 IF WE GIVE ₹300 BACK?',
    description: 'Understand why payment is part of the commitment system and why successful completion can earn ₹300 back.',
  },
  {
    id: 'ml-2',
    youtubeId: 'eRAfMiJub7Q',
    number: '02',
    title: 'WHY DO YOU HAVE ONLY 2 MONTHS?',
    description: 'The deadline is not designed to stop you from getting the refund. It exists to encourage consistency.',
  },
  {
    id: 'ml-3',
    youtubeId: 'nsi8mrIFSX0',
    number: '03',
    title: 'WHAT WILL YOU GAIN BY COMPLETING THE CHALLENGE?',
    description: 'The real return is not only ₹300. It is the speaking practice, confidence and consistency you build while completing the challenge.',
  },
  {
    id: 'ml-4',
    youtubeId: 'edJSjuwe8pM',
    number: '04',
    title: 'HOW DO YOU COMPLETE AND WIN?',
    description: 'Understand the challenge journey, speaking missions and what you need to do to successfully complete it.',
  },
];

const HINDI_VIDEOS: VideoItem[] = [
  {
    id: 'hi-1',
    youtubeId: 'lHND7N2ZnxY',
    number: '01',
    title: 'WHY DO WE CHARGE ₹399 IF WE GIVE ₹300 BACK?',
    description: 'Understand why payment is part of the commitment system and why successful completion can earn ₹300 back.',
  },
  {
    id: 'hi-2',
    youtubeId: '0DOgEaDbbsI',
    number: '02',
    title: 'WHY DO YOU HAVE ONLY 2 MONTHS?',
    description: 'The deadline is not designed to stop you from getting the refund. It exists to encourage consistency.',
  },
  {
    id: 'hi-3',
    youtubeId: 'WjFOxrlQ630',
    number: '03',
    title: 'WHAT WILL YOU GAIN BY COMPLETING THE CHALLENGE?',
    description: 'The real return is not only ₹300. It is the speaking practice, confidence and consistency you build while completing the challenge.',
  },
  {
    id: 'hi-4',
    youtubeId: 'hlOvw2pSItQ',
    number: '04',
    title: 'HOW DO YOU COMPLETE AND WIN?',
    description: 'Understand the challenge journey, speaking missions and what you need to do to successfully complete it.',
  },
];

export default function CourseVideosSection({ selectedCourseId }: CourseVideosSectionProps) {
  const isMalayalam = selectedCourseId === 'ML-EN';
  const videos = isMalayalam ? MALAYALAM_VIDEOS : HINDI_VIDEOS;
  
  // Track active playing video ID for performance click-to-play
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  return (
    <section id="videos" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 px-4 py-1.5 rounded-full text-brand-400 text-xs font-black uppercase tracking-wider">
            <Video className="w-4 h-4 text-brand-400" />
            <span>EXPLANATION VIDEOS ({isMalayalam ? 'MALAYALAM TRACK' : 'HINDI TRACK'})</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            BEFORE YOU ACCEPT THE CHALLENGE
          </h2>

          <p className="text-base sm:text-lg text-slate-300">
            Watch these 4 short videos. They explain why the challenge works, what you need to do, and what you can gain from completing it.
          </p>

          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-400">
            <Globe className="w-4 h-4 text-brand-400" />
            <span>Showing 4 Videos Tailored For: <strong className="text-white font-extrabold">{isMalayalam ? 'Malayalam → English Learners' : 'Hindi → English Learners'}</strong></span>
          </div>
        </div>

        {/* 4 Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {videos.map((vid) => {
            const isPlaying = playingVideoId === vid.id;
            const thumbnailUrl = `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`;

            return (
              <div
                key={vid.id}
                className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                {/* Header info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-lg">
                      VIDEO {vid.number}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isMalayalam ? 'Malayalam Explanation' : 'Hindi Explanation'}</span>
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                    {vid.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {vid.description}
                  </p>
                </div>

                {/* Video Player / Lazy Thumbnail Container */}
                <div className="pt-2">
                  <div className="relative overflow-hidden rounded-2xl border-2 border-slate-800 bg-slate-950 aspect-video ring-1 ring-slate-800/80 group">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                        title={vid.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full rounded-2xl"
                      />
                    ) : (
                      <div
                        onClick={() => setPlayingVideoId(vid.id)}
                        className="absolute inset-0 w-full h-full cursor-pointer group flex items-center justify-center"
                      >
                        {/* Background Thumbnail Image */}
                        <img
                          src={thumbnailUrl}
                          alt={vid.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

                        {/* Play Button Icon Overlay */}
                        <div className="relative w-14 h-14 bg-brand-500/90 hover:bg-brand-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-500/50 transform group-hover:scale-110 transition-all">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
