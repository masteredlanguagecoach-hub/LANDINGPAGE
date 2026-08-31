'use client';

import React, { useState } from 'react';
import { PaidStudentRow } from '@/types';
import { Copy, Check, MessageSquare, ExternalLink, ShieldCheck, Clock, User, Mail, Smartphone, CreditCard } from 'lucide-react';

interface AdminDataTableProps {
  students: PaidStudentRow[];
  isLoading: boolean;
}

export default function AdminDataTable({ students, isLoading }: AdminDataTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (isLoading) {
    return (
      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-12 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-400 font-semibold text-sm">Syncing live records with Google Sheet database...</p>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="bg-[#111827] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
        <p className="text-slate-300 font-bold text-lg">No records found</p>
        <p className="text-slate-500 text-sm">Try adjusting your search terms or filter selection.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-3xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#1F2937]/80 text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4">Admission / ID</th>
              <th className="px-6 py-4">Student Info</th>
              <th className="px-6 py-4">WhatsApp Contact</th>
              <th className="px-6 py-4">Course / Source</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment Ref / Channel</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {students.map((student, idx) => {
              const isManual = student.paymentChannel === 'MANUAL';
              const admissionNo = String(student.admissionNumber || `MLC${786 + idx}`);
              const rawPhone = String(student.whatsappNumber || '');
              const cleanWhatsApp = rawPhone.replace(/\D/g, '');
              const studentName = String(student.fullName || 'Student');
              const studentEmail = String(student.email || 'N/A');

              // Pre-filled WhatsApp Welcome & Motivation Message
              const welcomeMessage = `Hello ${studentName} 👋,\n\nWelcome to Mastered Language Coach Speaking Challenge! 🚀\n\nHere are your official enrollment details:\n📌 Admission Number: ${admissionNo}\n📧 Email ID: ${studentEmail}\n\n🔗 Practice App Portal:\nhttps://mastered-module-web.vercel.app/\n\n⚠️ Important: Please keep your Admission Number strictly confidential as it is your unique access credential.\n\n💡 Pro Tip: Make practicing English with your AI Speaking Coach a daily hobby! Spend just 10-15 minutes every day speaking out loud, and watch your fluency and confidence skyrocket. 🌟\n\nWe are excited to support you on your speaking journey! If you have any questions, feel free to reply right here.\n\nWarm regards,\nMastered Language Coach Team 🎯`;

              const waLink = cleanWhatsApp
                ? `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(welcomeMessage)}`
                : null;
              
              let formattedDate = '—';
              try {
                const dateVal = student.createdAt || student.timestamp;
                if (dateVal) {
                  const parsedDate = new Date(dateVal);
                  if (!isNaN(parsedDate.getTime())) {
                    formattedDate = parsedDate.toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                  } else {
                    formattedDate = String(dateVal);
                  }
                }
              } catch (e) {
                formattedDate = '—';
              }

              return (
                <tr key={student.razorpayPaymentId || idx} className="hover:bg-[#1F2937]/40 transition-colors">
                  {/* 1. Admission Number with 1-Click Copy */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-2 bg-[#1F2937] border border-slate-700/80 px-3 py-1.5 rounded-xl font-mono text-xs text-brand-300 font-bold">
                      <span>{admissionNo}</span>
                      <button
                        onClick={() => handleCopy(admissionNo, `adm-${idx}`)}
                        className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Copy Admission Number"
                      >
                        {copiedId === `adm-${idx}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* 2. Student Info */}
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-brand-400" />
                        <span>{studentName}</span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{studentEmail}</span>
                      </div>
                    </div>
                  </td>

                  {/* 3. WhatsApp Direct Contact with Pre-filled Welcome Message */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {waLink ? (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
                        title="Send Welcome & Portal Link via WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{rawPhone}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    ) : (
                      <span className="text-slate-500 text-xs">—</span>
                    )}
                  </td>

                  {/* 4. Course / Source */}
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-300">
                    {isManual ? (
                      <span className="inline-flex items-center gap-1 text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full text-xs font-bold">
                        <Smartphone className="w-3 h-3" /> {student.courseName}
                      </span>
                    ) : (
                      <span>{student.courseCode === 'HI-EN' ? 'Hindi → English' : 'Malayalam → English'}</span>
                    )}
                  </td>

                  {/* 5. Amount */}
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-emerald-400 text-base">
                    ₹{student.amount || 399}
                  </td>

                  {/* 6. Payment Channel / Ref ID */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isManual ? (
                      <span className="inline-flex items-center gap-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold px-2.5 py-1 rounded-lg">
                        <Smartphone className="w-3.5 h-3.5" /> Direct Entry
                      </span>
                    ) : student.razorpayPaymentId ? (
                      <div className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-lg">
                        <CreditCard className="w-3 h-3 text-brand-400" />
                        <span>{String(student.razorpayPaymentId)}</span>
                        <button
                          onClick={() => handleCopy(String(student.razorpayPaymentId), `pay-${idx}`)}
                          className="hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedId === `pay-${idx}` ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-500 text-xs">—</span>
                    )}
                  </td>

                  {/* 7. Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.paymentStatus === 'SUCCESS' ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold px-2.5 py-1 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold px-2.5 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>

                  {/* 8. Timestamp */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs text-slate-400">
                    {formattedDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
