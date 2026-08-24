'use client';

import React from 'react';
import { RotateCw, Download, LogOut, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  onRefresh: () => void;
  onExportCsv: () => void;
  onLogout: () => void;
  isRefreshing: boolean;
}

export default function AdminHeader({
  onRefresh,
  onExportCsv,
  onLogout,
  isRefreshing,
}: AdminHeaderProps) {
  return (
    <header className="bg-[#0B0F17]/90 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Title Section */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-brand-400">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
            <span>ADMIN CONSOLE</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-semibold">Mastered Language Coach</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Registrations & Sales Reports
          </h1>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh Live Data"
            className="p-3 bg-[#111827] hover:bg-[#1F2937] border border-slate-700 text-slate-300 hover:text-white rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <RotateCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-brand-400' : ''}`} />
          </button>

          {/* Export CSV Button */}
          <button
            onClick={onExportCsv}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-900/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            <span>Export Sales Report CSV</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            title="Lock Console"
            className="p-3 bg-[#111827] hover:bg-red-950/40 border border-slate-700 hover:border-red-500/50 text-slate-400 hover:text-red-400 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
