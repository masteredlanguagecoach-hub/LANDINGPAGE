'use client';

import React from 'react';
import { Filter, Search, Calendar, ChevronDown, Layers, ShieldCheck, CreditCard } from 'lucide-react';

interface AdminFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedChannel: string;
  setSelectedChannel: (channel: string) => void;
}

export default function AdminFiltersBar({
  searchQuery,
  setSearchQuery,
  dateRange,
  setDateRange,
  selectedCourse,
  setSelectedCourse,
  selectedStatus,
  setSelectedStatus,
  selectedChannel,
  setSelectedChannel,
}: AdminFiltersBarProps) {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      {/* Label Header */}
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400">
        <Filter className="w-4 h-4 text-brand-400" />
        <span>FILTER SALES & INCOMES DATA</span>
      </div>

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Input */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, email, phone, admission..."
            className="w-full bg-[#1F2937] border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        {/* Income Channel / Source Filter (Allows showing Razorpay students normally!) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
            <CreditCard className="w-4 h-4" />
          </div>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="w-full bg-[#1F2937] border border-slate-700/80 rounded-xl pl-10 pr-8 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 appearance-none cursor-pointer font-bold"
          >
            <option value="all">All Payment Sources</option>
            <option value="razorpay">Razorpay Students Only (Online)</option>
            <option value="manual">Manual / Direct Payments Only</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Date Range Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-400">
            <Calendar className="w-4 h-4" />
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full bg-[#1F2937] border border-slate-700/80 rounded-xl pl-10 pr-8 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 appearance-none cursor-pointer"
          >
            <option value="all_time">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this_week">This Week (Last 7 Days)</option>
            <option value="this_month">This Month (Last 30 Days)</option>
            <option value="this_year">This Year (Last 365 Days)</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Course Filter Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-400">
            <Layers className="w-4 h-4" />
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full bg-[#1F2937] border border-slate-700/80 rounded-xl pl-10 pr-8 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 appearance-none cursor-pointer"
          >
            <option value="all">All Courses</option>
            <option value="ML-EN">Malayalam → English</option>
            <option value="HI-EN">Hindi → English</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full bg-[#1F2937] border border-slate-700/80 rounded-xl pl-10 pr-8 py-3 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="SUCCESS">Verified Success Only</option>
            <option value="PENDING">Pending Orders Only</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
